/**
 * Browser-side PDF operations.
 *
 * Every operation takes the user's files plus options and returns one or more
 * output blobs. Nothing is uploaded anywhere: processing happens in the tab.
 * Heavy libraries are imported lazily so tool pages stay light on first load.
 */

export type ProcessedOutput = {
  name: string;
  blob: Blob;
};

export type OperationContext = {
  onProgress?: (fraction: number) => void;
  /** Human readable step, e.g. "Processing image 14 of 40 (35%)". */
  onStage?: (stage: string) => void;
  options?: Record<string, string | number | boolean>;
  /** Clockwise rotation in degrees per input file, used by image → PDF. */
  rotations?: number[];
};

export type Operation = (files: File[], ctx: OperationContext) => Promise<ProcessedOutput[]>;

export class ProcessingError extends Error {}

const baseName = (name: string) => name.replace(/\.[^./\\]+$/, "") || "document";

const safeName = (name: string) =>
  baseName(name)
    .replace(/[^\w\-. ]+/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 60) || "document";

async function loadPdfLib() {
  return import("pdf-lib");
}

/**
 * pdf.js 6 expects the very new Map/WeakMap getOrInsert helpers. Browsers that
 * are a version or two behind would otherwise throw while rendering, so fill
 * the gap before the library loads.
 */
function polyfillMapHelpers() {
  for (const Ctor of [Map, WeakMap] as unknown as { prototype: Record<string, unknown> }[]) {
    const proto = Ctor.prototype as unknown as {
      get(key: unknown): unknown;
      set(key: unknown, value: unknown): unknown;
      has(key: unknown): boolean;
      getOrInsert?: unknown;
      getOrInsertComputed?: unknown;
    };
    if (typeof proto.getOrInsert !== "function") {
      proto.getOrInsert = function (key: unknown, value: unknown) {
        if (!this.has(key)) this.set(key, value);
        return this.get(key);
      };
    }
    if (typeof proto.getOrInsertComputed !== "function") {
      proto.getOrInsertComputed = function (key: unknown, factory: (key: unknown) => unknown) {
        if (!this.has(key)) this.set(key, factory(key));
        return this.get(key);
      };
    }
  }
}

async function loadPdfJs() {
  polyfillMapHelpers();
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs;
}

async function readPdf(file: File) {
  const { PDFDocument } = await loadPdfLib();
  try {
    return await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: false });
  } catch {
    throw new ProcessingError(
      `We couldn't read “${file.name}”. It may be password protected or damaged.`,
    );
  }
}

async function renderPages(
  file: File,
  scale: number,
  onPage: (canvas: HTMLCanvasElement, pageNumber: number, total: number) => Promise<void> | void,
  onProgress?: (fraction: number) => void,
  onStage?: (stage: string) => void,
  stagePrefix = "Processing",
) {
  onStage?.("Loading document pages...");
  const pdfjs = await loadPdfJs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const total = doc.numPages;

  for (let pageNumber = 1; pageNumber <= total; pageNumber++) {
    const percent = Math.round((pageNumber / total) * 100);
    onStage?.(`${stagePrefix} page ${pageNumber} of ${total} (${percent}%)`);
    const page = await doc.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) throw new ProcessingError("Your browser blocked the canvas used for rendering.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    await onPage(canvas, pageNumber, total);
    onProgress?.(pageNumber / total);
  }
}

const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ProcessingError("Rendering the page failed."))),
      type,
      quality,
    );
  });

async function zipOutputs(name: string, outputs: ProcessedOutput[]): Promise<ProcessedOutput> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const output of outputs) zip.file(output.name, output.blob);
  return { name, blob: await zip.generateAsync({ type: "blob" }) };
}

/**
 * Images (JPG/PNG) -> a single PDF, one image per page.
 * `rotations[i]` is a clockwise angle in degrees (0/90/180/270) that is baked
 * into the page geometry, so the downloaded PDF matches the workspace preview.
 */
export const imagesToPdf: Operation = async (files, { onProgress, onStage, rotations }) => {
  const total = files.length;
  onStage?.(total > 1 ? `Preparing ${total} images...` : "Preparing image...");
  const { PDFDocument, degrees } = await loadPdfLib();
  const pdf = await PDFDocument.create();

  for (const [index, file] of files.entries()) {
    const currentNum = index + 1;
    const percent = Math.round((currentNum / total) * 100);
    onStage?.(
      total > 1
        ? `Processing image ${currentNum} of ${total} (${percent}%)`
        : "Embedding image into document...",
    );

    const bytes = new Uint8Array(await file.arrayBuffer());
    const isPng = file.type === "image/png" || /\.png$/i.test(file.name);
    let image;
    try {
      image = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    } catch {
      throw new ProcessingError(`“${file.name}” isn't a supported JPG or PNG image.`);
    }
    const { width: w, height: h } = image;
    const angle = (((rotations?.[index] ?? 0) % 360) + 360) % 360;
    const quarter = Math.round(angle / 90) % 4;
    const page = pdf.addPage(quarter % 2 === 1 ? [h, w] : [w, h]);
    const placement =
      quarter === 1
        ? { x: 0, y: w, rotate: degrees(-90) }
        : quarter === 2
          ? { x: w, y: h, rotate: degrees(180) }
          : quarter === 3
            ? { x: h, y: 0, rotate: degrees(90) }
            : { x: 0, y: 0, rotate: degrees(0) };
    page.drawImage(image, { width: w, height: h, ...placement });
    onProgress?.(currentNum / total);
  }

  onStage?.("Finalizing and generating PDF document...");
  const out = await pdf.save();
  const name = files.length === 1 ? `${safeName(files[0]!.name)}.pdf` : "mypdf4u-images.pdf";
  return [{ name, blob: new Blob([out as BlobPart], { type: "application/pdf" }) }];
};

/** Merge several PDFs in the given order. */
export const mergePdf: Operation = async (files, { onProgress, onStage }) => {
  if (files.length < 2) throw new ProcessingError("Add at least two PDF files to merge.");
  const { PDFDocument } = await loadPdfLib();
  const merged = await PDFDocument.create();
  const total = files.length;

  for (const [index, file] of files.entries()) {
    const currentNum = index + 1;
    const percent = Math.round((currentNum / total) * 100);
    onStage?.(`Merging document ${currentNum} of ${total} (${percent}%)`);
    const source = await readPdf(file);
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
    onProgress?.(currentNum / total);
  }

  onStage?.("Finalizing merged PDF...");
  const out = await merged.save();
  return [
    { name: "mypdf4u-merged.pdf", blob: new Blob([out as BlobPart], { type: "application/pdf" }) },
  ];
};

function parseRanges(input: string, pageCount: number): number[][] {
  const trimmed = input.trim();
  if (!trimmed) return Array.from({ length: pageCount }, (_, i) => [i]);
  const groups: number[][] = [];
  for (const chunk of trimmed.split(",")) {
    const match = chunk.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new ProcessingError(`“${chunk.trim()}” isn't a valid page range.`);
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    if (start < 1 || end < start || end > pageCount) {
      throw new ProcessingError(`Pages must be between 1 and ${pageCount}.`);
    }
    groups.push(Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i));
  }
  return groups;
}

/** Split a PDF into ranges (or one PDF per page when no range is given). */
export const splitPdf: Operation = async (files, { onProgress, onStage, options }) => {
  const file = files[0]!;
  onStage?.("Reading source PDF...");
  const source = await readPdf(file);
  const { PDFDocument } = await loadPdfLib();
  const groups = parseRanges(String(options?.["ranges"] ?? ""), source.getPageCount());

  const outputs: ProcessedOutput[] = [];
  const total = groups.length;

  for (const [index, indices] of groups.entries()) {
    const currentNum = index + 1;
    const percent = Math.round((currentNum / total) * 100);
    onStage?.(`Extracting page set ${currentNum} of ${total} (${percent}%)`);
    const doc = await PDFDocument.create();
    const pages = await doc.copyPages(source, indices);
    pages.forEach((page) => doc.addPage(page));
    const out = await doc.save();
    const label =
      indices.length === 1
        ? `page-${indices[0]! + 1}`
        : `pages-${indices[0]! + 1}-${indices.at(-1)! + 1}`;
    outputs.push({
      name: `${safeName(file.name)}-${label}.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    });
    onProgress?.(currentNum / total);
  }

  if (outputs.length === 1) return outputs;
  onStage?.("Bundling split files into ZIP archive...");
  return [await zipOutputs(`${safeName(file.name)}-split.zip`, outputs)];
};

/** Compress by re-rendering pages as tuned JPEGs and rebuilding the PDF. */
export const compressPdf: Operation = async (files, { onProgress, onStage, options }) => {
  const level = String(options?.["level"] ?? "balanced");
  const preset =
    level === "strong"
      ? { scale: 1, quality: 0.55 }
      : level === "light"
        ? { scale: 1.6, quality: 0.85 }
        : { scale: 1.3, quality: 0.7 };

  const file = files[0]!;
  const { PDFDocument } = await loadPdfLib();
  const pdf = await PDFDocument.create();

  await renderPages(
    file,
    preset.scale,
    async (canvas) => {
      const blob = await canvasToBlob(canvas, "image/jpeg", preset.quality);
      const image = await pdf.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const page = pdf.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    },
    onProgress,
    onStage,
    "Optimizing and compressing",
  );

  onStage?.("Saving compressed document...");
  const out = await pdf.save();
  return [
    {
      name: `${safeName(file.name)}-compressed.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/** PDF pages -> images (one per page, zipped when there are several). */
function pdfToImages(format: "jpeg" | "png"): Operation {
  return async (files, { onProgress, onStage, options }) => {
    const file = files[0]!;
    const scale = Number(options?.["scale"] ?? 2);
    const extension = format === "jpeg" ? "jpg" : "png";
    const outputs: ProcessedOutput[] = [];

    await renderPages(
      file,
      scale,
      async (canvas, pageNumber) => {
        const blob = await canvasToBlob(
          canvas,
          `image/${format}`,
          format === "jpeg" ? 0.92 : undefined,
        );
        outputs.push({ name: `${safeName(file.name)}-page-${pageNumber}.${extension}`, blob });
      },
      onProgress,
      onStage,
      "Rendering image for",
    );

    if (outputs.length === 1) return outputs;
    onStage?.("Packaging images into ZIP archive...");
    return [await zipOutputs(`${safeName(file.name)}-${extension}.zip`, outputs)];
  };
}

export const pdfToJpg = pdfToImages("jpeg");
export const pdfToPng = pdfToImages("png");

/** Rotate all pages, or only the pages listed in the "pages" option. */
export const rotatePdf: Operation = async (files, { onProgress, onStage, options }) => {
  const angle = Number(options?.["angle"] ?? 90);
  const { degrees } = await loadPdfLib();
  const file = files[0]!;
  onStage?.("Reading PDF pages...");
  const doc = await readPdf(file);
  const pages = doc.getPages();
  const raw = String(options?.["pages"] ?? "").trim();
  const selected = raw
    ? new Set(raw.split(",").flatMap((chunk) => parseRanges(chunk, pages.length).flat()))
    : null;

  pages.forEach((page, index) => {
    if (!selected || selected.has(index)) {
      page.setRotation(degrees((page.getRotation().angle + angle) % 360));
    }
    onProgress?.((index + 1) / pages.length);
  });

  onStage?.("Saving rotated document...");
  const out = await doc.save();
  return [
    {
      name: `${safeName(file.name)}-rotated.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/** Stamp text on every page, with position, opacity, size and tilt controls. */
export const watermarkPdf: Operation = async (files, { onProgress, onStage, options }) => {
  const text = String(options?.["text"] ?? "").trim() || "CONFIDENTIAL";
  const position = String(options?.["position"] ?? "center");
  const opacity = Math.min(0.9, Math.max(0.05, Number(options?.["opacity"] ?? 0.22)));
  const tilt = Number(options?.["rotation"] ?? 35);
  const sizeChoice = String(options?.["size"] ?? "auto");
  const { StandardFonts, degrees, rgb } = await loadPdfLib();
  const file = files[0]!;
  onStage?.("Embedding watermark font and loading pages...");
  const doc = await readPdf(file);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages = doc.getPages();

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const auto = Math.max(18, Math.min(width, height) / (text.length * 0.42));
    const size =
      sizeChoice === "small"
        ? Math.max(12, auto * 0.6)
        : sizeChoice === "large"
          ? auto * 1.35
          : auto;
    const textWidth = font.widthOfTextAtSize(text, size);
    const angle = position === "center" ? tilt : 0;
    const drawWidth = angle ? textWidth * 0.75 : textWidth;
    const x =
      position === "top-left" || position === "bottom-left"
        ? 36
        : position === "top-right" || position === "bottom-right"
          ? Math.max(36, width - textWidth - 36)
          : width / 2 - drawWidth / 2;
    const y =
      position === "top-left" || position === "top-right"
        ? height - size - 36
        : position === "bottom-left" || position === "bottom-right"
          ? 36
          : height / 2 - size / 2;
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0.18, 0.55, 0.34),
      opacity,
      rotate: degrees(angle),
    });
    onProgress?.((index + 1) / pages.length);
  });

  onStage?.("Saving watermarked PDF...");
  const out = await doc.save();
  return [
    {
      name: `${safeName(file.name)}-watermarked.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/** Reorder / remove pages using a page order string like "3,1,2". */
export const organizePdf: Operation = async (files, { onProgress, onStage, options }) => {
  const file = files[0]!;
  onStage?.("Reading source document pages...");
  const source = await readPdf(file);
  const pageCount = source.getPageCount();
  const raw = String(options?.["order"] ?? "").trim();
  const indices = raw
    ? raw.split(",").flatMap((chunk) => parseRanges(chunk, pageCount).flat())
    : source.getPageIndices();
  if (!indices.length) throw new ProcessingError("Enter at least one page number to keep.");

  const { PDFDocument, degrees } = await loadPdfLib();
  const doc = await PDFDocument.create();
  const pages = await doc.copyPages(source, indices);
  const extraRotation = Number(options?.["rotate"] ?? 0);
  pages.forEach((page, index) => {
    if (extraRotation) page.setRotation(degrees((page.getRotation().angle + extraRotation) % 360));
    doc.addPage(page);
    onProgress?.((index + 1) / pages.length);
  });

  onStage?.("Saving organized PDF...");
  const out = await doc.save();
  return [
    {
      name: `${safeName(file.name)}-organized.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/* ------------------------------------------------------------------ */
/* Password removal, Word conversion and OCR                          */
/* ------------------------------------------------------------------ */

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Only WinAnsi-safe characters survive the standard PDF fonts. */
// eslint-disable-next-line no-control-regex
const latin = (value: string) => value.replace(/[^\u0009\u000A\u0020-\u00FF]/g, "");

/** Open a possibly encrypted PDF with pdf.js, mapping password issues to friendly errors. */
async function openWithPassword(file: File, password: string) {
  const pdfjs = await loadPdfJs();
  try {
    return await pdfjs.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
      password,
    }).promise;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "PasswordException") {
      throw new ProcessingError(
        password
          ? "That password didn't open the document. Please check it and try again."
          : "This PDF is password protected. Enter the password to continue.",
      );
    }
    throw new ProcessingError(
      "We couldn't read this PDF. It may be damaged or in an unusual format.",
    );
  }
}

/**
 * Remove a password the user already knows. The document is re-rendered page by
 * page into a new, unencrypted PDF — pages keep their exact appearance, but text
 * is no longer selectable because the pages are rebuilt as images.
 */
export const unlockPdf: Operation = async (files, { onProgress, onStage, options }) => {
  const file = files[0]!;
  const password = String(options?.["password"] ?? "");
  onStage?.("Verifying document password...");
  const doc = await openWithPassword(file, password);
  const { PDFDocument } = await loadPdfLib();
  const pdf = await PDFDocument.create();

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const percent = Math.round((pageNumber / doc.numPages) * 100);
    onStage?.(`Rebuilding unlocked page ${pageNumber} of ${doc.numPages} (${percent}%)`);
    const page = await doc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) throw new ProcessingError("Your browser blocked the canvas used for rendering.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);
    const image = await pdf.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const target = pdf.addPage([image.width / 2, image.height / 2]);
    target.drawImage(image, { x: 0, y: 0, width: image.width / 2, height: image.height / 2 });
    onProgress?.(pageNumber / doc.numPages);
  }

  onStage?.("Saving unlocked PDF document...");
  const out = await pdf.save();
  return [
    {
      name: `${safeName(file.name)}-unlocked.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/** Extract the text of a PDF, grouped into lines, page by page. */
async function extractText(
  file: File,
  onProgress?: (f: number) => void,
  onStage?: (s: string) => void,
) {
  const pdfjs = await loadPdfJs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: string[][] = [];

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const percent = Math.round((pageNumber / doc.numPages) * 100);
    onStage?.(`Reading text layer on page ${pageNumber} of ${doc.numPages} (${percent}%)`);
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    const lines = new Map<number, { x: number; text: string }[]>();
    for (const item of content.items as { str?: string; transform?: number[] }[]) {
      if (!item.str || !item.transform) continue;
      const y = Math.round(item.transform[5]! / 3);
      const bucket = lines.get(y) ?? [];
      bucket.push({ x: item.transform[4]!, text: item.str });
      lines.set(y, bucket);
    }
    const ordered = [...lines.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, parts]) =>
        parts
          .sort((a, b) => a.x - b.x)
          .map((part) => part.text)
          .join("")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .filter(Boolean);
    pages.push(ordered);
    onProgress?.(pageNumber / doc.numPages);
  }
  return pages;
}

/**
 * PDF -> DOCX. This extracts the real text layer and writes a valid Word file.
 * Layout, images and tables are not reconstructed, so it suits text documents.
 */
export const pdfToWord: Operation = async (files, { onProgress, onStage }) => {
  const file = files[0]!;
  const pages = await extractText(file, (f) => onProgress?.(f * 0.85), onStage);
  const paragraphs = pages.flatMap((lines, pageIndex) => [
    ...lines,
    ...(pageIndex < pages.length - 1 ? [""] : []),
  ]);

  if (!paragraphs.some((line) => line.trim())) {
    throw new ProcessingError(
      "This PDF has no selectable text — it looks like a scan. Run it through OCR PDF first, then convert.",
    );
  }

  onStage?.("Assembling formatted Word document (.docx)...");
  const body = paragraphs
    .map((line) => `<w:p><w:r><w:t xml:space="preserve">${xmlEscape(line)}</w:t></w:r></w:p>`)
    .join("");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  );
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>`,
  );

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  onProgress?.(1);
  return [{ name: `${safeName(file.name)}.docx`, blob }];
};

/** DOCX -> PDF. Paragraph text is laid out on A4 pages; complex layout is simplified. */
export const wordToPdf: Operation = async (files, { onProgress, onStage }) => {
  const file = files[0]!;
  if (/\.doc$/i.test(file.name)) {
    throw new ProcessingError(
      "Old .doc files aren't supported. Save the document as .docx in Word and try again.",
    );
  }

  onStage?.("Reading Word document structure...");
  const JSZip = (await import("jszip")).default;
  let xml: string;
  try {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    xml = (await zip.file("word/document.xml")?.async("string")) ?? "";
  } catch {
    throw new ProcessingError(
      "We couldn't open this Word file. It may be damaged or password protected.",
    );
  }
  if (!xml) throw new ProcessingError("This doesn't look like a Word (.docx) document.");

  const paragraphs = [...xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>|<w:p\/>/g)].map((match) => {
    const text = [...match[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)]
      .map((run) => run[1] ?? "")
      .join("")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&");
    return latin(text).trim();
  });
  if (!paragraphs.some(Boolean))
    throw new ProcessingError("This document doesn't contain any text to convert.");

  onStage?.("Laying out text onto PDF pages...");
  const { PDFDocument, StandardFonts } = await loadPdfLib();
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const size = 11;
  const leading = size * 1.5;
  const margin = 56;
  const [pageWidth, pageHeight] = [595.28, 841.89];
  const maxWidth = pageWidth - margin * 2;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let cursor = pageHeight - margin;
  const newLine = () => {
    if (cursor < margin + leading) {
      page = pdf.addPage([pageWidth, pageHeight]);
      cursor = pageHeight - margin;
    }
  };

  paragraphs.forEach((paragraph, index) => {
    if (!paragraph) {
      cursor -= leading * 0.6;
      newLine();
    } else {
      let line = "";
      for (const word of paragraph.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
          newLine();
          page.drawText(line, { x: margin, y: cursor, size, font });
          cursor -= leading;
          line = word;
        } else {
          line = candidate;
        }
      }
      if (line) {
        newLine();
        page.drawText(line, { x: margin, y: cursor, size, font });
        cursor -= leading;
      }
    }
    onProgress?.((index + 1) / paragraphs.length);
  });

  onStage?.("Saving PDF document...");
  const out = await pdf.save();
  return [
    {
      name: `${safeName(file.name)}.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

/**
 * OCR a scanned PDF in the browser with Tesseract and return a searchable PDF:
 * every page keeps its original picture, with the recognised words placed
 * invisibly on top so the text can be selected and searched.
 */
export const ocrPdf: Operation = async (files, { onProgress, onStage, options }) => {
  const file = files[0]!;
  const language = String(options?.["language"] ?? "eng");
  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  onStage?.("Initializing OCR language engine...");
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker(language);

  try {
    const pdfjs = await loadPdfJs();
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const total = doc.numPages;

    for (let pageNumber = 1; pageNumber <= total; pageNumber++) {
      const percent = Math.round((pageNumber / total) * 100);
      onStage?.(`Recognizing text on page ${pageNumber} of ${total} (${percent}%)`);
      const page = await doc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const context = canvas.getContext("2d");
      if (!context)
        throw new ProcessingError("Your browser blocked the canvas used for rendering.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: context, viewport }).promise;

      const jpeg = await canvasToBlob(canvas, "image/jpeg", 0.85);
      const image = await pdf.embedJpg(new Uint8Array(await jpeg.arrayBuffer()));
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const target = pdf.addPage([width, height]);
      target.drawImage(image, { x: 0, y: 0, width, height });

      const result = await worker.recognize(canvas.toDataURL("image/png"), {}, { blocks: true });
      const words =
        (
          result.data as {
            words?: { text: string; bbox: { x0: number; y0: number; x1: number; y1: number } }[];
          }
        ).words ??
        (result.data.blocks ?? []).flatMap((block) =>
          (block.paragraphs ?? []).flatMap((paragraph) =>
            (paragraph.lines ?? []).flatMap((line) => line.words ?? []),
          ),
        );

      for (const word of words) {
        const text = latin(word.text ?? "").trim();
        if (!text) continue;
        const boxHeight = (word.bbox.y1 - word.bbox.y0) / 2;
        const size = Math.max(4, boxHeight * 0.85);
        target.drawText(text, {
          x: word.bbox.x0 / 2,
          y: height - word.bbox.y1 / 2 + boxHeight * 0.15,
          size,
          font,
          color: rgb(0, 0, 0),
          opacity: 0,
        });
      }

      onProgress?.(pageNumber / total);
    }
  } finally {
    await worker.terminate();
  }

  onStage?.("Finalizing searchable PDF...");
  const out = await pdf.save();
  return [
    {
      name: `${safeName(file.name)}-searchable.pdf`,
      blob: new Blob([out as BlobPart], { type: "application/pdf" }),
    },
  ];
};

export const operations = {
  imagesToPdf,
  mergePdf,
  splitPdf,
  compressPdf,
  pdfToJpg,
  pdfToPng,
  rotatePdf,
  watermarkPdf,
  organizePdf,
  unlockPdf,
  pdfToWord,
  wordToPdf,
  ocrPdf,
} satisfies Record<string, Operation>;

export type OperationName = keyof typeof operations;
