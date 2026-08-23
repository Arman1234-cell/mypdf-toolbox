/**
 * Generates public/og-image.png (1200×630) using only the Canvas API
 * that ships with Node.js via the @napi-rs/canvas package (auto-installed).
 * No external image service needed.
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import { createRequire } from "module";

// Auto-install @napi-rs/canvas if missing
const require2 = createRequire(import.meta.url);
try { require2("@napi-rs/canvas"); } catch {
  console.log("Installing @napi-rs/canvas …");
  execSync("npm install @napi-rs/canvas --no-save", { stdio: "inherit" });
}

const { createCanvas } = await import("@napi-rs/canvas");
const { writeFileSync } = await import("fs");

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// ── Background gradient ────────────────────────────────────────────────────
const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, "#122a1c");
grad.addColorStop(1, "#1e4d30");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

// ── Subtle grid pattern ────────────────────────────────────────────────────
ctx.strokeStyle = "rgba(255,255,255,0.04)";
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

// ── Document icon (top-left decorative) ───────────────────────────────────
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// Large faint document behind logo
ctx.save();
ctx.globalAlpha = 0.07;
ctx.fillStyle = "#3eb489";
roundRect(80, 100, 160, 200, 16);
ctx.fill();
ctx.globalAlpha = 0.12;
ctx.fillStyle = "#3eb489";
roundRect(96, 116, 130, 170, 12);
ctx.fill();
ctx.restore();

// ── Logo mark (top-left) ───────────────────────────────────────────────────
const lx = 100, ly = 48;
// document shape
ctx.save();
ctx.fillStyle = "#2E8B57";
ctx.globalAlpha = 0.9;
roundRect(lx, ly, 40, 50, 6);
ctx.fill();
// folded corner
ctx.beginPath();
ctx.moveTo(lx + 26, ly); ctx.lineTo(lx + 40, ly + 14); ctx.lineTo(lx + 26, ly + 14);
ctx.closePath();
ctx.fillStyle = "#1a5c38";
ctx.globalAlpha = 1;
ctx.fill();
// leaf
ctx.beginPath();
ctx.fillStyle = "#3eb489";
ctx.globalAlpha = 1;
ctx.ellipse(lx + 20, ly + 38, 10, 6, -0.4, 0, Math.PI * 2);
ctx.fill();
ctx.restore();

// Brand name next to logo
ctx.fillStyle = "#ffffff";
ctx.font = "bold 32px sans-serif";
ctx.fillText("MyPDF4U", lx + 52, ly + 33);

// ── Divider line ───────────────────────────────────────────────────────────
ctx.strokeStyle = "rgba(62,180,137,0.3)";
ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(100, 118); ctx.lineTo(W - 100, 118); ctx.stroke();

// ── Hero headline ─────────────────────────────────────────────────────────
ctx.fillStyle = "#ffffff";
ctx.font = "bold 82px sans-serif";
ctx.textAlign = "center";
ctx.fillText("Simple PDF Tools.", W / 2, 260);

ctx.fillStyle = "#3eb489";
ctx.font = "bold 82px sans-serif";
ctx.fillText("Fast Results.", W / 2, 358);

// ── Subtitle ──────────────────────────────────────────────────────────────
ctx.fillStyle = "rgba(255,255,255,0.65)";
ctx.font = "28px sans-serif";
ctx.fillText("Convert · Compress · Merge · Split · OCR — free in your browser", W / 2, 418);

// ── Tool pills ────────────────────────────────────────────────────────────
const pills = ["JPG to PDF", "Compress PDF", "Merge PDF", "Split PDF", "PDF to Word", "OCR PDF"];
const pillH = 44, pillR = 22, pillPadX = 22, gap = 18;
ctx.font = "bold 18px sans-serif";

// measure widths
const widths = pills.map(p => ctx.measureText(p).width + pillPadX * 2);
const totalW = widths.reduce((a, b) => a + b, 0) + gap * (pills.length - 1);
let px = (W - totalW) / 2;
const py = 488;

pills.forEach((label, i) => {
  const pw = widths[i];
  // pill background
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#3eb489";
  roundRect(px, py, pw, pillH, pillR);
  ctx.fill();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "#3eb489";
  ctx.lineWidth = 1.5;
  roundRect(px, py, pw, pillH, pillR);
  ctx.stroke();
  ctx.restore();
  // label
  ctx.fillStyle = "#c8f0dc";
  ctx.globalAlpha = 1;
  ctx.fillText(label, px + pw / 2, py + pillH / 2 + 7);
  px += pw + gap;
});

// ── Domain watermark ──────────────────────────────────────────────────────
ctx.fillStyle = "rgba(255,255,255,0.25)";
ctx.font = "20px sans-serif";
ctx.textAlign = "right";
ctx.fillText("mypdf4u.com", W - 60, H - 36);

// ── Save ──────────────────────────────────────────────────────────────────
const buf = canvas.toBuffer("image/png");
writeFileSync("public/og-image.png", buf);
console.log(`✅ og-image.png generated — ${(buf.length / 1024).toFixed(0)} KB`);
