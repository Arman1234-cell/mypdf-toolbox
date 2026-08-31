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
  | { type: "code"; lang: string; text: string }
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
    title: "How to Merge PDF Files on Any Device — Free, No Upload",
    metaTitle: "How to Merge PDF Files Free — Windows, Mac, Phone",
    description:
      "Merge PDF files on Windows, Mac, iPhone, Android or Linux — free, private, no upload. Covers browser tool, CLI, Python, and Adobe alternatives.",
    date: "2025-01-28",
    updated: "2026-08-31",
    readTime: "10 min read",
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
      "Whether you need to merge PDF files on Windows, combine files on iPhone, or join documents from the command line on Linux — you shouldn't have to pay for Adobe Acrobat or upload sensitive files to an unknown server.",
      "The free [Merge PDF tool](/merge-pdf) on MyPDF4U runs entirely in your browser. Drag in as many files as you need, set the page order visually, and download one clean combined PDF in seconds — on any device, no account required.",
      "This guide covers every method: browser-based (fastest for all devices), device-native options, command-line and Python workflows for developers, plus honest comparisons with Adobe Acrobat, PDFtk, PDF-XChange, Smallpdf, and other popular tools.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "merge-pdf",
        toolName: "Merge PDF Tool",
        text: "Drop your PDFs in, drag them into order, and download one combined file — free, no account, nothing uploaded.",
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
          "Multi-page documents — turning a scanned multi-image set into a single ordered PDF.",
        ],
      },
      { type: "h2", text: "How to merge PDF files: step by step (any browser, any device)" },
      {
        type: "steps",
        items: [
          "Open the [Merge PDF tool](/merge-pdf) on MyPDF4U — no install, no account needed.",
          "Drag all your PDF files onto the upload area, or tap to browse your device storage.",
          "Drag the document thumbnails to set the exact page order you want.",
          "Click Merge PDFs — the combined file downloads instantly to your device.",
        ],
      },
      { type: "h2", text: "How to merge PDF files on Windows" },
      {
        type: "p",
        text: "Windows does not include a built-in PDF merger. The fastest way to merge PDF files on Windows without installing anything is to open the [MyPDF4U Merge PDF tool](/merge-pdf) in any browser — Chrome, Edge, or Firefox. Drag your files in, reorder them, and download the result in seconds.",
      },
      {
        type: "p",
        text: "If you prefer a desktop app, Microsoft Print to PDF can consolidate content from multiple open files into one print job — but this re-rasterises images and loses bookmarks. The browser tool is faster, free, and preserves full quality.",
      },
      { type: "h3", text: "Merge PDF files on Windows with Microsoft Edge" },
      {
        type: "steps",
        items: [
          "Open Edge and navigate to mypdf4u.com/merge-pdf.",
          "Drag your PDFs from File Explorer directly into the browser window.",
          "Reorder the thumbnails, then click Merge PDFs.",
          "Edge will prompt you to save — choose a folder and click Save.",
        ],
      },
      { type: "h2", text: "How to merge PDFs on Mac, iPad, and iPhone" },
      { type: "h3", text: "Mac — Preview (built-in, completely free)" },
      {
        type: "steps",
        items: [
          "Open the first PDF in Preview.",
          "Go to View → Thumbnails to reveal the sidebar.",
          "Drag additional PDFs from Finder into the thumbnail sidebar in your desired order.",
          "Go to File → Export as PDF to save the merged document.",
        ],
      },
      { type: "h3", text: "Merge PDF on iPad and combine files on iPhone" },
      {
        type: "p",
        text: "iOS has no native PDF merger. The easiest way to combine files on iPhone or merge PDF on iPad is to open mypdf4u.com/merge-pdf in Safari or Chrome. Upload your files from Files or iCloud Drive, reorder them with a drag, and download the combined PDF directly to Files.",
      },
      {
        type: "steps",
        items: [
          "Open Safari or Chrome on your iPhone or iPad.",
          "Go to mypdf4u.com/merge-pdf.",
          "Tap the upload area and select your PDFs from Files or iCloud Drive.",
          "Drag thumbnails to reorder, then tap Merge PDFs.",
          "Tap the downloaded file to save it to your Files app.",
        ],
      },
      { type: "h2", text: "How to combine PDF files on Android" },
      {
        type: "p",
        text: "Android lacks a system-level PDF merger. Open Chrome on your Android device, navigate to mypdf4u.com/merge-pdf, and upload your PDFs from internal storage or Google Drive. The merged file downloads to your Downloads folder instantly. No app installation needed.",
      },
      { type: "h2", text: "How to merge PDF files on Linux (command line)" },
      {
        type: "p",
        text: "Linux users have two great options: a browser tool for simplicity, or command-line tools for automation. To combine PDF files on Linux with a GUI, open Firefox or Chromium and use the MyPDF4U tool. For terminal power users, Ghostscript or PDFtk are the standard choices.",
      },
      { type: "h3", text: "Linux merge PDF files with Ghostscript" },
      {
        type: "code",
        lang: "bash",
        text: "# Install Ghostscript (Debian/Ubuntu)\nsudo apt install ghostscript\n\n# Merge PDF files on the command line\ngs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite \\\n   -sOutputFile=merged.pdf file1.pdf file2.pdf file3.pdf",
      },
      { type: "h3", text: "Combine PDFs with PDFtk on Linux" },
      {
        type: "code",
        lang: "bash",
        text: "# Install PDFtk (Ubuntu/Debian)\nsudo apt install pdftk\n\n# pdftk merge — combine PDFs into one\npdftk file1.pdf file2.pdf file3.pdf cat output merged.pdf",
      },
      { type: "h2", text: "How to merge PDF files using Python" },
      {
        type: "p",
        text: "For developers who need to merge PDF files programmatically, the pypdf library is the simplest Python solution. Install it with pip and use the PdfMerger class:",
      },
      {
        type: "code",
        lang: "python",
        text: "# Install pypdf\npip install pypdf\n\nfrom pypdf import PdfMerger\n\nmerger = PdfMerger()\nfiles = ['file1.pdf', 'file2.pdf', 'file3.pdf']\n\nfor pdf in files:\n    merger.append(pdf)\n\nmerger.write('merged.pdf')\nmerger.close()\nprint('Done — merged.pdf created')",
      },
      {
        type: "note",
        text: "For large-scale server-side automation, Ghostscript or pypdf are reliable choices. For one-off tasks without writing code, the [MyPDF4U Merge PDF tool](/merge-pdf) is the fastest option.",
      },
      { type: "h2", text: "Free alternatives to Adobe Acrobat for merging PDFs" },
      {
        type: "p",
        text: "Adobe Acrobat Pro costs around £17/month — expensive for occasional use. Critically, Adobe Acrobat Reader (the free version) cannot merge PDFs at all. Only the paid Pro tier includes Combine Files. Here's how the main free alternatives compare:",
      },
      {
        type: "list",
        items: [
          "MyPDF4U — 100% free, browser-based, no upload, no file-size limit. Fastest for privacy-sensitive documents.",
          "Mac Preview — built into every Mac, completely free. Excellent for occasional use.",
          "PDFtk — free, open-source CLI tool (pdftk merge). Ideal for scripting and batch jobs on Linux/Mac/Windows.",
          "PDF-XChange Editor — freemium Windows desktop app. Combine PDFs via File → New Document → Combine Files. Some features need a licence.",
          "Smallpdf merge tool — polished web tool with a free daily limit and file-size cap. Files are uploaded to their servers.",
          "PDF Candy merge — free online tool, no usage limits claimed, but files are processed server-side.",
          "Sejda — clean web UI, free for files under 50 MB or 200 pages. Also has a desktop version.",
          "PDFMergy / pdfmergy Google Drive — simple Google Drive integration; convenient for Drive-stored files.",
        ],
      },
      {
        type: "note",
        text: "If privacy matters — tax documents, medical records, legal contracts — use MyPDF4U. Files processed by Smallpdf, Sejda, Adobe online, and PDF Candy pass through their servers. MyPDF4U never receives your file.",
      },
      { type: "h2", text: "Merging mixed file types: HEIC, images, PNG, and Word" },
      {
        type: "p",
        text: "The Merge PDF tool only accepts PDF files directly. But it's quick to convert other formats to PDF first, then combine everything into one document.",
      },
      { type: "h3", text: "HEIC to PDF merge (iPhone camera roll)" },
      {
        type: "steps",
        items: [
          "On your iPhone, open the HEIC photo in Photos and tap Share → Print.",
          "Pinch outward on the print preview — this exports it as a PDF to Files.",
          "Repeat for each photo, then open mypdf4u.com/merge-pdf and combine all the PDFs.",
        ],
      },
      { type: "h3", text: "Combine PDF and PNG (or JPG) images" },
      {
        type: "steps",
        items: [
          "Convert your PNG images to PDF using the [PNG to PDF converter](/png-to-pdf).",
          "Convert any JPG photos using the [JPG to PDF converter](/jpg-to-pdf).",
          "Add all resulting PDFs (images + documents) to the [Merge PDF tool](/merge-pdf).",
          "Set the order and click Merge PDFs.",
        ],
      },
      { type: "h3", text: "Combine PDF with Word documents" },
      {
        type: "steps",
        items: [
          "In Microsoft Word, open your .docx file and go to File → Save As → PDF.",
          "Repeat for each Word document you want to include.",
          "Add all PDFs to the [Merge PDF tool](/merge-pdf) and combine them in order.",
        ],
      },
      { type: "h2", text: "Multiple pages into one PDF — what this means" },
      {
        type: "p",
        text: "'Multiple pages to a single PDF' usually means one of two things: (1) combining separate documents into one multi-page PDF — which the MyPDF4U tool handles perfectly — or (2) placing several pages on a single printed sheet (N-up layout, e.g. 4 pages on one A4 sheet).",
      },
      {
        type: "p",
        text: "For N-up printing, use your PDF reader's print dialog: File → Print → Pages per sheet → 4. This affects only the printout, not the PDF file itself.",
      },
      { type: "h2", text: "Merging PDFs with different page sizes" },
      {
        type: "p",
        text: "The MyPDF4U tool preserves each document's original page dimensions. If you merge an A4 report with a landscape presentation, each section retains its original size inside the combined PDF. Nearly all PDF readers handle mixed page sizes correctly.",
      },
      { type: "h2", text: "Reducing the size of a merged PDF" },
      {
        type: "p",
        text: "Merging does not compress content — the output is roughly the sum of the input file sizes. If the result is too large for email, run it through the [PDF compressor](/compress-pdf) afterwards. Balanced compression typically cuts image-heavy merged PDFs by 40–70%.",
      },
    ],
    faqs: [
      {
        q: "How do I merge PDF files on Windows for free?",
        a: "Open mypdf4u.com/merge-pdf in any browser on Windows — Chrome, Edge, or Firefox. Drag in your PDFs, set the order, and click Merge PDFs. No software to install and nothing is ever uploaded; everything runs in the browser.",
      },
      {
        q: "How do I merge PDF files on Linux from the command line?",
        a: "Install Ghostscript (sudo apt install ghostscript) then run: gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=merged.pdf file1.pdf file2.pdf. Alternatively, use pdftk: pdftk file1.pdf file2.pdf cat output merged.pdf.",
      },
      {
        q: "How do I merge PDF files using Python?",
        a: "Install pypdf with pip install pypdf. Create a PdfMerger instance, call merger.append() for each file, then merger.write('merged.pdf'). Full code is shown in the Python section above.",
      },
      {
        q: "Can I merge PDFs on my iPhone or iPad?",
        a: "Yes. Open Safari or Chrome, go to mypdf4u.com/merge-pdf, upload your PDFs from Files or iCloud Drive, reorder them, and download the merged result directly to your device.",
      },
      {
        q: "How do I combine PDF files on Android?",
        a: "Open Chrome on Android, visit mypdf4u.com/merge-pdf, and upload your PDFs from storage or Google Drive. The merged file downloads to your Downloads folder automatically — no app needed.",
      },
      {
        q: "Can I merge PDFs without Adobe Acrobat?",
        a: "Yes. Adobe Acrobat Reader (the free app) cannot merge files at all — only the paid Pro tier can. Free alternatives include MyPDF4U (browser-based, no upload), PDFtk (CLI), Ghostscript (terminal), and Mac Preview (built-in).",
      },
      {
        q: "Does Adobe Reader merge PDFs?",
        a: "No. Adobe Acrobat Reader is a viewer only. To combine PDFs without a subscription, use MyPDF4U — it's completely free and nothing leaves your device.",
      },
      {
        q: "How do I merge HEIC photos into a PDF?",
        a: "On iPhone, share each HEIC photo via Print and pinch the preview to export it as a PDF to Files. Then open mypdf4u.com/merge-pdf and combine all the exported PDFs into one document.",
      },
      {
        q: "How do I combine PDF and PNG or image files?",
        a: "Convert your images to PDF first: use the PNG to PDF or JPG to PDF converters on MyPDF4U. Then merge all resulting PDFs together with the Merge PDF tool.",
      },
      {
        q: "How do I combine a PDF with a Word document?",
        a: "In Microsoft Word, save each .docx as a PDF (File → Save As → PDF). Then add all the PDFs to the MyPDF4U Merge PDF tool and combine them in the correct order.",
      },
      {
        q: "Is the Merge PDF tool free?",
        a: "Yes. Completely free — no account, no watermark, no file-size limit, and nothing is ever uploaded to a server.",
      },
      {
        q: "How many PDFs can I merge at once?",
        a: "There is no hard limit. Add as many files as you need. Performance depends on the total file size and your device's available memory.",
      },
      {
        q: "Does merging reduce PDF quality?",
        a: "No. The tool combines files without re-encoding any content. Text, images and vector graphics are preserved exactly as in the originals.",
      },
      {
        q: "Can I merge password-protected PDFs?",
        a: "No. Remove the password from each file before merging. MyPDF4U does not process encrypted PDFs.",
      },
      {
        q: "Does my file get uploaded to a server?",
        a: "No. Everything runs inside your browser using JavaScript. Your files never leave your device.",
      },
    ],
    related: ["how-to-compress-pdf-for-email", "how-to-convert-jpg-to-pdf"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
