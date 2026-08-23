/**
 * Generates a favicon.ico (actually a 32x32 PNG inside ICO wrapper)
 * from the logo SVG using only built-in Node APIs + sharp (auto-installed).
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { createRequire } from "module";

// Install sharp if not present
try {
  createRequire(import.meta.url)("sharp");
} catch {
  console.log("Installing sharp...");
  execSync("npm install sharp --no-save", { stdio: "inherit" });
}

const { default: sharp } = await import("sharp");

const svgBuf = await readFile("public/logo.svg");

// Generate 32x32 PNG
const png32 = await sharp(svgBuf)
  .resize(32, 32)
  .png()
  .toBuffer();

// Generate 16x16 PNG
const png16 = await sharp(svgBuf)
  .resize(16, 16)
  .png()
  .toBuffer();

// Build a minimal ICO with two images (16x16 and 32x32)
function buildIco(images) {
  const count = images.length;
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: 1 = icon
  header.writeUInt16LE(count, 4); // image count

  // Each directory entry: 16 bytes
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;
  const dataOffset = 6 + dirSize;

  const dirs = [];
  let currentOffset = dataOffset;
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 0); // width (0 = 256)
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 1); // height
    entry.writeUInt8(0, 2);  // color count
    entry.writeUInt8(0, 3);  // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(img.data.length, 8);  // size of image data
    entry.writeUInt32LE(currentOffset, 12);   // offset of image data
    dirs.push(entry);
    currentOffset += img.data.length;
  }

  return Buffer.concat([header, ...dirs, ...images.map(i => i.data)]);
}

const ico = buildIco([
  { size: 16, data: png16 },
  { size: 32, data: png32 },
]);

await writeFile("public/favicon.ico", ico);
console.log("✅ favicon.ico generated successfully (16x16 + 32x32)");
