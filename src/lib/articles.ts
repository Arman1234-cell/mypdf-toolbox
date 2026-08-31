/**
 * Blog content model.
 *
 * Images use static public-folder URLs (e.g. /blog/image.jpg) so they work
 * correctly in SSR / Cloudflare Workers without JS module imports.
 *
 * Paragraph text supports inline markdown-style links, e.g.
 * "[JPG to PDF](/jpg-to-pdf)". These are rendered by RichText in ArticleBody.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string }
  | { type: "cta"; toolSlug: string; toolName: string; text: string };

export interface ArticleImage {
  desktop: string;
  mobile: string;
  alt: string;
  caption?: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
}

export interface Article {
  slug: string;
  title: string;
  /** Search-result title. Falls back to `title` when omitted. */
  metaTitle?: string;
  description: string;
  date: string;
  updated?: string;
  readTime: string;
  toolSlug: string;
  toolName: string;
  hero: ArticleImage;
  /** Short above-the-fold introduction: 2-3 concise paragraphs. */
  intro: string[];
  blocks: ArticleBlock[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const heroDims = {
  desktopWidth: 1536,
  desktopHeight: 768,
  mobileWidth: 768,
  mobileHeight: 576,
};

export const articles: Article[] = [
  {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF on Any Device (Free, No Quality Loss)",
    metaTitle: "How to Convert JPG to PDF Free — Windows, Phone & Browser",
    description:
      "Convert JPG to PDF on Windows, iPhone or Android — free, no upload, no quality loss. Covers built-in tools, Adobe, Foxit & Google Drive.",
    date: "2025-01-15",
    updated: "2026-08-31",
    readTime: "8 min read",
    toolSlug: "jpg-to-pdf",
    toolName: "JPG to PDF Converter",
    hero: {
      desktop: "/blog/jpg-to-pdf-workflow-desktop-v2.jpg",
      mobile: "/blog/jpg-to-pdf-workflow-mobile.jpg",
      alt: "Several JPG photos and scans being combined into one PDF document",
      caption: "Photos, receipts and scans become ordered pages inside one PDF.",
      ...heroDims,
    },
    intro: [
      "If you're asking yourself how do I turn a JPEG into a PDF file without losing a single pixel of quality — you're in the right place. Whether you snapped a photo on your phone, scanned a document, or have a folder of images that need to become one shareable file, this guide covers every route: browser-based, Windows built-in, mobile, and common software alternatives like Adobe and Foxit.",
      "The fastest, most private way is the free [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U. Add your images, drag them into the right order, rotate anything sideways, and download a single PDF — everything runs inside your browser, so your photos never leave your device.",
      "Quality matters here. Each JPG is embedded at its original resolution rather than re-encoded, so a 12-megapixel photo stays as sharp inside the PDF as it was in your gallery.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "jpg-to-pdf",
        toolName: "JPG to PDF Converter",
        text: "Add your images, set the page order and download one PDF — free, no sign-up.",
      },
      { type: "h2", text: "Why convert JPG images to PDF at all?" },
      {
        type: "list",
        items: [
          "One attachment instead of fifteen — forms, universities and HR portals usually accept a single PDF only.",
          "Fixed page order, so a reviewer reads pages 1, 2, 3 rather than guessing from filenames like IMG_4821.",
          "Consistent rendering: a PDF looks the same on Windows, macOS, Android and iOS.",
          "Print-friendly output, because each image is placed on a proper page instead of being scaled by a photo viewer.",
        ],
      },
      { type: "h2", text: "How to convert JPG to PDF: step by step (browser, any device)" },
      {
        type: "steps",
        items: [
          "Open the [JPG to PDF tool](/jpg-to-pdf) — nothing to install, and no account required.",
          "Drag your JPG or JPEG files into the upload area, or tap to pick them from your phone's gallery.",
          "Reorder the thumbnails by dragging them until the sequence matches the document you want.",
          "Rotate any sideways photo with the rotate button on its thumbnail, and remove images you no longer need.",
          "Click Convert to PDF, then download the finished file. The conversion happens locally, so it takes seconds.",
        ],
      },
      {
        type: "note",
        text: "Working with screenshots rather than photos? Use the [PNG to PDF converter](/png-to-pdf) instead — the workflow is identical, and PNG keeps text and UI edges perfectly crisp.",
      },
      { type: "h2", text: "How to convert JPG to PDF on Windows (built-in, no software)" },
      {
        type: "p",
        text: "Windows 10 and Windows 11 both include a built-in PDF printer, so you can save a JPG as PDF without installing anything extra. There are two quick methods.",
      },
      { type: "h3", text: "Method 1 — Print to PDF (Windows 10 & 11)" },
      {
        type: "steps",
        items: [
          "Open the JPG in the Windows Photos app or any image viewer.",
          "Press Ctrl + P to open the Print dialog.",
          "Under Printer, select Microsoft Print to PDF.",
          "Choose paper size (A4 is standard) and orientation, then click Print.",
          "Pick a save location and filename, then click Save — the PDF appears instantly.",
        ],
      },
      { type: "h3", text: "Method 2 — Right-click 'Print' from File Explorer" },
      {
        type: "steps",
        items: [
          "In File Explorer, right-click your JPG file and select Print.",
          "In the Print Pictures dialog, choose Microsoft Print to PDF from the printer list.",
          "Select a paper size, then click Print and save.",
        ],
      },
      {
        type: "note",
        text: "The Windows Print-to-PDF method creates one page per print job. To convert multiple JPG images into one PDF on Windows — with a custom page order — use the [JPG to PDF tool](/jpg-to-pdf) instead. It handles batch conversion entirely in your browser.",
      },
      { type: "h2", text: "How to convert a JPG to PDF on your phone (iOS & Android)" },
      {
        type: "p",
        text: "Both iPhone and Android have built-in ways to change a photo to PDF without downloading any app. If you need to combine several images into one document, the browser-based tool is the quickest route on mobile.",
      },
      { type: "h3", text: "iPhone / iPad (iOS 16+)" },
      {
        type: "steps",
        items: [
          "Open the Photos app and tap the image you want to convert.",
          "Tap the Share button (the box with an arrow pointing up).",
          "Scroll down and tap Print.",
          "In the Printer Options screen, pinch outward on the preview thumbnail — iOS silently converts it to a PDF.",
          "Tap the Share icon that appears, then save to Files or share directly.",
        ],
      },
      { type: "h3", text: "Android (Google Files / Chrome)" },
      {
        type: "steps",
        items: [
          "Open your photo in the Gallery or Files app.",
          "Tap Share, then choose Print.",
          "In the printer list, select Save as PDF.",
          "Tap the PDF icon in the top-right corner and save the file.",
        ],
      },
      {
        type: "p",
        text: "For multi-image conversion on a phone — for example, several photos of a scanned form — visit [MyPDF4U's JPG to PDF tool](/jpg-to-pdf) in your mobile browser. Upload all images at once, drag to reorder, and download one PDF. No app installation needed.",
      },
      { type: "h2", text: "Software alternatives: Adobe, Foxit, and Google Drive" },
      {
        type: "p",
        text: "You may be wondering how to convert JPG to PDF using Adobe, Foxit, or Google Drive. All three work — but each has trade-offs worth knowing before you choose.",
      },
      { type: "h3", text: "Adobe Acrobat" },
      {
        type: "p",
        text: "Adobe Acrobat Pro (paid, ~£17/month) and Acrobat Online (free tier, with limits) both support JPG to PDF. In Acrobat: File → Create → PDF from File, then select your image. The quality is excellent, but the subscription cost is hard to justify for occasional conversions. A free browser-based tool delivers identical output at zero cost.",
      },
      { type: "h3", text: "Foxit PDF Editor" },
      {
        type: "p",
        text: "Foxit PDF Editor offers a similar 'Create from Image' workflow. The free Foxit Reader tier is limited; advanced conversion requires a paid licence. If you already have Foxit installed it's a solid option, but if you're downloading it purely to convert a JPG, a browser tool is faster and free.",
      },
      { type: "h3", text: "Google Drive" },
      {
        type: "p",
        text: "To convert JPG to PDF on Google Drive: upload the image → right-click → Open with Google Docs → File → Download → PDF Document. This is handy if you live in the Google ecosystem, but it routes your file through Google's servers and can slightly shift the image layout. For privacy-conscious users or high-volume conversions, a local browser tool is faster and safer.",
      },
      {
        type: "note",
        text: "MyPDF4U's [JPG to PDF converter](/jpg-to-pdf) is free, has no file-size cap, and processes everything locally — no files ever reach Google, Adobe or any third-party server.",
      },
      { type: "h2", text: "How to convert multiple JPG images into one PDF" },
      {
        type: "p",
        text: "Multi-image conversion is the normal use-case, not a special mode. Select every photo in one go — the tool creates one PDF page per image in the order shown in the grid. Because the order is set visually, you can fix a mis-sorted scan in a second instead of renaming files.",
      },
      {
        type: "p",
        text: "A practical tip for scanned documents: photograph every page in the same orientation before converting. Consistent pages make the finished PDF easier to read and compress better if you later need to [reduce the PDF file size](/compress-pdf).",
      },
      { type: "h2", text: "Keeping image quality intact" },
      {
        type: "p",
        text: "The MyPDF4U converter embeds each JPEG at its native resolution inside the PDF — no re-compression, no quality loss. If the resulting PDF is too large for email, run it through the [PDF compressor](/compress-pdf) afterwards.",
      },
      { type: "h2", text: "JPG vs JPEG: is there a difference?" },
      {
        type: "p",
        text: "No. JPG and JPEG refer to the same image format. The shorter extension became common because early Windows versions required three-character file extensions. Both work identically in the converter.",
      },
    ],
    faqs: [
      {
        q: "How do I convert my JPG to PDF for free?",
        a: "Open the JPG to PDF tool on MyPDF4U, drag in your images, arrange them, and click Convert to PDF. It is completely free — no account, no watermark, and nothing is uploaded to any server.",
      },
      {
        q: "How do I turn a JPEG into a PDF file on Windows?",
        a: "On Windows 10 or 11, open the image in Photos, press Ctrl+P, select 'Microsoft Print to PDF' as the printer, and click Print. To batch-convert multiple images into one ordered PDF on Windows, use the MyPDF4U browser tool — the built-in method only handles one image per job.",
      },
      {
        q: "How can I convert a JPG file to PDF on my phone?",
        a: "On iPhone, open the photo, tap Share → Print, then pinch outward on the print preview to reveal a PDF you can save to Files. On Android, tap Share → Print → Save as PDF. For multiple images, visit the MyPDF4U JPG to PDF tool in your mobile browser.",
      },
      {
        q: "How do I convert JPG to PDF using Adobe?",
        a: "In Adobe Acrobat, go to File → Create → PDF from File and select your JPG. The free Acrobat Online tier also supports this with usage limits. For no-cost, no-login conversion, the MyPDF4U browser tool produces equivalent quality.",
      },
      {
        q: "How do I convert JPG to PDF using Foxit?",
        a: "In Foxit PDF Editor, use File → Create → From File, select your JPG, and save as PDF. If you don't already have Foxit installed, the MyPDF4U browser tool is faster and requires no download.",
      },
      {
        q: "How do I convert JPG to PDF on Google Drive?",
        a: "Upload the JPG to Google Drive, right-click → Open with Google Docs, then File → Download → PDF Document. This routes the file through Google's servers. For privacy, use a local browser tool like MyPDF4U instead.",
      },
      {
        q: "Does converting JPG to PDF reduce image quality?",
        a: "No. The tool embeds each image at its original resolution. No re-encoding takes place, so the quality in the PDF matches the original file exactly.",
      },
      {
        q: "Can I convert multiple JPGs into one PDF?",
        a: "Yes — add as many images as you like. Each image becomes one page, in the order you set in the thumbnail grid.",
      },
      {
        q: "Is the JPG to PDF converter free?",
        a: "Yes, the tool is completely free. No account, no watermark and no file-size cap.",
      },
      {
        q: "Does my photo get uploaded to a server?",
        a: "No. The conversion happens entirely inside your browser using JavaScript. Nothing is sent to any server.",
      },
      {
        q: "What image formats are supported besides JPG?",
        a: "The tool accepts JPEG and JPG files. For PNG images, use the dedicated PNG to PDF converter on MyPDF4U.",
      },
    ],
    related: ["how-to-convert-png-to-pdf", "how-to-compress-pdf-for-email"],
  },
  {
    slug: "how-to-convert-png-to-pdf",
    title: "How to Convert PNG to PDF Online for Free",
    metaTitle: "How to Convert PNG to PDF Free Online — No Upload | MyPDF4U",
    description:
      "Turn one or more PNG screenshots, diagrams or designs into a PDF in seconds. Free, browser-based, no account required.",
    date: "2025-02-10",
    updated: "2026-08-29",
    readTime: "4 min read",
    toolSlug: "png-to-pdf",
    toolName: "PNG to PDF Converter",
    hero: {
      desktop: "/blog/png-to-pdf-workflow-desktop-v2.jpg",
      mobile: "/blog/png-to-pdf-workflow-mobile.jpg",
      alt: "PNG diagrams and screenshots being converted to a PDF document",
      caption: "Screenshots, diagrams and UI designs become crisp PDF pages.",
      ...heroDims,
    },
    intro: [
      "PNG is the go-to format for screenshots, UI mockups and any image where crisp edges matter — but when you need to share them as a document, a PDF is far more professional than a folder of images.",
      "The [PNG to PDF converter](/png-to-pdf) on MyPDF4U handles the conversion entirely in your browser. Drop your PNGs in, arrange them, and download a single PDF. No file ever leaves your device.",
      "Because PNG uses lossless compression, text and fine lines inside screenshots stay razor-sharp inside the resulting PDF — which matters a lot for design presentations, technical diagrams and annotated screenshots.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "png-to-pdf",
        toolName: "PNG to PDF Converter",
        text: "Drop your PNGs in, arrange them, and download a clean PDF — free, no sign-up.",
      },
      { type: "h2", text: "When should you use PNG instead of JPG for PDFs?" },
      {
        type: "list",
        items: [
          "Screenshots — PNG preserves every pixel exactly, while JPEG smears fine text.",
          "UI mockups and wireframes — sharp edges and solid colours stay clean.",
          "Charts and diagrams — no compression artefacts around thin lines or text labels.",
          "Logos and graphics with transparency — PNG supports alpha channels; JPEG does not.",
        ],
      },
      { type: "h2", text: "How to convert PNG to PDF: step by step" },
      {
        type: "steps",
        items: [
          "Open the [PNG to PDF tool](/png-to-pdf) on MyPDF4U.",
          "Drag and drop your PNG files onto the upload area, or click to browse.",
          "Drag thumbnails to set the correct page order.",
          "Click Convert to PDF and download the file.",
        ],
      },
      { type: "h2", text: "Converting multiple PNGs into one PDF" },
      {
        type: "p",
        text: "Multi-page conversion works exactly the same as single-image conversion. Select all your PNG files at once — the tool creates one PDF page per image. You can reorder pages visually before converting.",
      },
      {
        type: "note",
        text: "Have a mix of JPG photos and PNG screenshots to combine? Convert the PNGs first, then [merge PDF files](/merge-pdf) with the JPG-based PDF to produce a single document.",
      },
      { type: "h2", text: "File size: PNG vs JPG in PDF" },
      {
        type: "p",
        text: "PNGs are typically larger than JPGs because they use lossless compression. A PDF containing many full-screen screenshots can be quite large. If you need to reduce the file size afterwards, use the [PDF compressor](/compress-pdf) on MyPDF4U — it can shrink screenshot-heavy PDFs significantly without visible quality loss.",
      },
    ],
    faqs: [
      {
        q: "Is the PNG to PDF converter free?",
        a: "Yes. The tool is free to use with no account, no watermark and no file-size limit.",
      },
      {
        q: "Can I convert multiple PNG files into one PDF?",
        a: "Yes. Add as many PNGs as you need. Each becomes one page in the order you set.",
      },
      {
        q: "Does PNG to PDF conversion reduce image quality?",
        a: "No. PNGs are lossless, and the tool embeds each image at its full native resolution.",
      },
      {
        q: "My PNG has a transparent background — what happens?",
        a: "Transparency is replaced with a white background in the PDF, which is the standard behaviour for print-ready documents.",
      },
      {
        q: "Does my file get uploaded to a server?",
        a: "No. Everything runs in your browser using JavaScript. Your files are never sent anywhere.",
      },
    ],
    related: ["how-to-convert-jpg-to-pdf", "how-to-compress-pdf-for-email"],
  },
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress Large PDF Files for Email Attachments",
    metaTitle: "How to Compress a PDF for Email (Free, Fast) | MyPDF4U",
    description:
      "Learn how to reduce PDF file size below 10 MB or 25 MB email limits while keeping text and diagrams crisp. Free browser tool, no upload.",
    date: "2025-01-20",
    updated: "2026-08-29",
    readTime: "5 min read",
    toolSlug: "compress-pdf",
    toolName: "Compress PDF Tool",
    hero: {
      desktop: "/blog/compress-pdf-workflow-desktop-v2.jpg",
      mobile: "/blog/compress-pdf-workflow-mobile.jpg",
      alt: "A large PDF file being compressed to a smaller size for email",
      caption: "Reduce PDF size below email limits while keeping text crisp.",
      ...heroDims,
    },
    intro: [
      "Most email providers cap attachments at 20–25 MB. Image-heavy reports, scanned contracts and slide decks frequently exceed that limit — and a 50 MB PDF is painful to download on a phone.",
      "The [PDF compressor](/compress-pdf) on MyPDF4U reduces file size by optimising embedded images and removing redundant data. Everything runs in your browser; the file never leaves your device.",
      "You get three compression levels — Light, Balanced, and Strong — so you can choose the right trade-off between file size and visual quality for each document.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "compress-pdf",
        toolName: "Compress PDF Tool",
        text: "Upload your PDF, choose a compression level and download a smaller file — free, no account.",
      },
      { type: "h2", text: "Why are some PDFs so large?" },
      {
        type: "list",
        items: [
          "Scanned pages — a scanner saves each page as a high-resolution image, which adds up fast.",
          "Presentation slides — background images, charts and photos on every slide inflate the file.",
          "Embedded fonts — some PDFs embed entire font files rather than a subset of used characters.",
          "No prior optimisation — PDFs exported from some apps include internal audit trails, edit history or embedded previews.",
        ],
      },
      { type: "h2", text: "How to compress a PDF: step by step" },
      {
        type: "steps",
        items: [
          "Open the [Compress PDF tool](/compress-pdf) on MyPDF4U.",
          "Upload your PDF by dragging it onto the page or clicking to browse.",
          "Choose a compression level: Light (minimal quality change), Balanced (recommended for most documents), or Strong (maximum size reduction).",
          "Click Compress PDF and download the smaller file.",
        ],
      },
      { type: "h2", text: "Which compression level should I choose?" },
      {
        type: "list",
        items: [
          "Light — good for PDFs that are only slightly over a size limit. Very little visible change.",
          "Balanced — the best default. Cuts 40–70% of file size for most image-heavy PDFs with no noticeable quality loss on screen.",
          "Strong — use when you need the smallest possible file and can accept some reduction in image sharpness. Still legible for most documents.",
        ],
      },
      {
        type: "note",
        text: "Text-only PDFs (typed documents with no images) compress very little regardless of the level you choose, because they are already small. Compression has the biggest impact on scanned documents and image-heavy slides.",
      },
      { type: "h2", text: "How small can a PDF get?" },
      {
        type: "p",
        text: "It depends on the content. A 10 MB scanned contract can often be reduced to 1–3 MB with Balanced compression. A 10 MB slide deck with photos might compress to 3–5 MB. Text-only PDFs may see no change at all.",
      },
      { type: "h2", text: "Compressing PDFs that are already compressed" },
      {
        type: "p",
        text: "If a PDF has already been through a compressor, running it again typically yields little further reduction. In that case, consider whether the source document could be re-exported at a lower resolution, or whether a different format would serve better.",
      },
    ],
    faqs: [
      {
        q: "Will compressing a PDF reduce its quality?",
        a: "Text and vector graphics are not affected. Only embedded images are resampled. At Light or Balanced level, the difference is invisible on screen. Strong compression may soften detailed photographs.",
      },
      {
        q: "How much can I reduce a PDF's file size?",
        a: "A scanned document with no prior compression can often be reduced by 60–80%. A PDF that has already been optimised will see less improvement.",
      },
      {
        q: "Is the PDF compressor free?",
        a: "Yes. No account, no watermark and no file-size limit.",
      },
      {
        q: "Does my PDF get uploaded to a server?",
        a: "No. Compression runs entirely in your browser. Your file never leaves your device.",
      },
      {
        q: "Can I compress a password-protected PDF?",
        a: "No. You need to remove the password before compressing. MyPDF4U does not store or transmit any part of your document.",
      },
    ],
    related: ["how-to-merge-pdf-files", "how-to-convert-jpg-to-pdf"],
  },
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge Multiple PDF Documents into One",
    metaTitle: "How to Merge PDF Files Online Free — Fast | MyPDF4U",
    description:
      "Combine separate invoices, reports and contracts into a unified PDF in the exact sequence you choose. Free, browser-based, no upload.",
    date: "2025-01-28",
    updated: "2026-08-29",
    readTime: "4 min read",
    toolSlug: "merge-pdf",
    toolName: "Merge PDF Tool",
    hero: {
      desktop: "/blog/merge-pdf-workflow-desktop-v2.jpg",
      mobile: "/blog/merge-pdf-workflow-mobile.jpg",
      alt: "Several separate PDF documents being merged into a single PDF file",
      caption: "Combine invoices, contracts and reports into one ordered PDF.",
      ...heroDims,
    },
    intro: [
      "When you need to submit a single document packet — a CV with cover letter, an invoice with receipts, or a report with appendices — juggling separate PDFs is frustrating. Merging them into one file fixes that immediately.",
      "The [Merge PDF tool](/merge-pdf) on MyPDF4U lets you drag in as many files as you need, reorder them visually, and download one combined PDF. The whole process runs in your browser, so nothing is uploaded.",
      "Page order is crucial when merging. The tool shows a visual thumbnail for each document so you can verify the sequence before combining.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "merge-pdf",
        toolName: "Merge PDF Tool",
        text: "Drop your PDFs in, drag them into order, and download one combined file — free, no account.",
      },
      { type: "h2", text: "Common uses for merging PDFs" },
      {
        type: "list",
        items: [
          "Job applications — CV, cover letter and certificates in one attachment.",
          "Invoice packs — invoice, delivery note and receipts combined for an accountant.",
          "Legal documents — contract, amendment and schedule merged for a client.",
          "Academic submissions — report, data appendix and ethical approval in one file.",
          "Property records — survey, floor plan and title deed combined for a solicitor.",
        ],
      },
      { type: "h2", text: "How to merge PDF files: step by step" },
      {
        type: "steps",
        items: [
          "Open the [Merge PDF tool](/merge-pdf) on MyPDF4U.",
          "Drag all your PDF files onto the upload area, or click to browse.",
          "Drag the document thumbnails to set the correct order.",
          "Click Merge PDFs and download the combined file.",
        ],
      },
      { type: "h2", text: "Merging PDFs with different page sizes" },
      {
        type: "p",
        text: "The tool preserves each document's original page size. If you merge an A4 report with a landscape presentation, each section will retain its original dimensions inside the combined PDF. Most PDF readers handle mixed page sizes correctly.",
      },
      {
        type: "note",
        text: "Need to combine images with PDFs? Convert your images first using the [JPG to PDF converter](/jpg-to-pdf) or [PNG to PDF converter](/png-to-pdf), then merge all the resulting PDFs together.",
      },
      { type: "h2", text: "Reducing the size of a merged PDF" },
      {
        type: "p",
        text: "Merging does not compress the content — the combined file is roughly the sum of the input files. If the result is too large for email, run it through the [PDF compressor](/compress-pdf) afterwards. Balanced compression typically cuts image-heavy merged PDFs by 40–70%.",
      },
    ],
    faqs: [
      {
        q: "Is the Merge PDF tool free?",
        a: "Yes. Completely free — no account, no watermark and no file-size limit.",
      },
      {
        q: "How many PDFs can I merge at once?",
        a: "There is no hard limit. Add as many files as you need. Performance depends on the total size and your device.",
      },
      {
        q: "Does merging reduce PDF quality?",
        a: "No. The tool combines the files without re-encoding any content. Text, images and vector graphics are preserved exactly.",
      },
      {
        q: "Can I merge password-protected PDFs?",
        a: "No. Remove the password from each file before merging.",
      },
      {
        q: "Does my file get uploaded to a server?",
        a: "No. Everything runs in your browser. Your files never leave your device.",
      },
    ],
    related: ["how-to-compress-pdf-for-email", "how-to-convert-jpg-to-pdf"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
