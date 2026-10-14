import { convertGuides } from "./guides/convert-guides";
import { organizeGuides } from "./guides/organize-guides";

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
  | { type: "cta"; toolSlug: string; toolName: string; text: string; buttonText?: string };

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

const coreArticles: Article[] = [
  {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF on iPhone, Mobile and Computer",
    metaTitle: "How to Convert JPG to PDF on iPhone, Mobile & PC",
    description:
      "Learn how to convert JPG to PDF in iPhone, mobile, and PC. Combine multiple images, preserve quality, and create a smaller PDF under 100KB or 200KB for free.",
    date: "2025-01-15",
    updated: "2026-09-03",
    readTime: "8 min read",
    toolSlug: "jpg-to-pdf",
    toolName: "JPG to PDF Converter",
    hero: {
      desktop: "/blog/jpg-to-pdf-workflow-desktop-v2.jpg",
      mobile: "/blog/jpg-to-pdf-workflow-mobile.jpg",
      alt: "How to convert JPG to PDF in iPhone, Android, and PC using MyPDF4U",
      caption:
        "Turn photos, receipts, and scans into an ordered, high-resolution PDF on iPhone, mobile, or computer.",
      ...heroDims,
    },
    intro: [
      "Whether you need to [convert JPG to PDF on an iPhone](/jpg-to-pdf), an Android phone, or a Windows or Mac computer, the free [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U handles it in seconds. Add your images, arrange the page order, and click Convert — every photo is embedded directly in your browser at 100% native quality, with no compression or quality loss.",
      "This guide covers every free approach: combining multiple photos into one PDF for a university submission, building an expense receipt pack, or converting scanned documents on Windows 10, Windows 11, iPhone, or Android. No Adobe Acrobat licence is required.",
      "Every conversion on MyPDF4U runs entirely in your browser using client-side JavaScript. Your photos, IDs, contracts, and personal documents never leave your device — nothing is sent to a server.",
    ],
    blocks: [
      { type: "h2", text: "The quickest way to convert JPG to PDF online" },
      {
        type: "p",
        text: "Converting JPG and JPEG images into a clean PDF takes a matter of seconds — no app installation, no account required:",
      },
      {
        type: "steps",
        items: [
          "Drag your JPG images into the dropzone, or tap to choose files from your device.",
          "Drag the thumbnails into the order you want (Page 1, Page 2, Page 3…).",
          "Rotate any sideways scans or remove images you no longer need.",
          "Click Convert to generate your high-resolution PDF.",
          "Download the finished file directly to your phone or computer.",
        ],
      },
      {
        type: "cta",
        toolSlug: "jpg-to-pdf",
        toolName: "JPG to PDF Converter",
        buttonText: "Convert JPG to PDF Free",
        text: "Add your images, set the page order, and download your PDF — 100% free, no watermark, no sign-up.",
      },
      { type: "h2", text: "How to convert JPG to PDF on iPhone" },
      {
        type: "p",
        text: "You can convert JPG images to PDF on an iPhone without installing any extra app. Safari gives you a full visual workflow; the built-in Photos and Files apps offer quicker shortcuts for simple jobs.",
      },
      { type: "h3", text: "Method 1: MyPDF4U in Safari (best for sorting multiple photos)" },
      {
        type: "steps",
        items: [
          "Open Safari on your iPhone and go to the [JPG to PDF tool](/jpg-to-pdf).",
          "Tap Select JPG images, then choose Photo Library or Choose Files.",
          "Select your photos and tap Add. Drag thumbnails to set the page order and tap the rotate icon on any sideways images.",
          "Tap Convert to PDF, then save the finished document to the Files app.",
        ],
      },
      { type: "h3", text: "Method 2: Apple Photos app (pinch-to-print shortcut)" },
      {
        type: "steps",
        items: [
          "Open the Photos app and tap the photo you want to convert.",
          "Tap the Share button (square with an upward arrow) and select Print.",
          "On the Print Options screen, pinch outward with two fingers on the photo preview — iOS instantly creates a full-screen PDF preview.",
          "Tap the Share button in the top-right corner and choose Save to Files.",
        ],
      },
      { type: "h3", text: "Method 3: iOS Files app (for combining multiple images)" },
      {
        type: "steps",
        items: [
          "In Photos, select your images, tap Share, and choose Save to Files.",
          "Open the Files app, tap the three-dot menu at the top right, tap Select, and pick your images in the order you want.",
          "Tap More (...) in the bottom-right corner and choose Create PDF. iOS builds a combined PDF and saves it in the same folder.",
        ],
      },
      { type: "h2", text: "How to convert JPG to PDF on Android and tablets" },
      {
        type: "p",
        text: "On Android phones — whether a Samsung Galaxy, Google Pixel, Xiaomi, or any other model — you can convert one image or a whole batch using a browser or the built-in Print service:",
      },
      { type: "h3", text: "Method 1: MyPDF4U in Chrome or Samsung Internet" },
      {
        type: "steps",
        items: [
          "Open your browser and go to the [JPG to PDF tool](/jpg-to-pdf).",
          "Tap to select images from your Gallery, Google Photos, or file manager.",
          "Drag thumbnails to set the page order, rotate anything sideways, and tap Convert to download your PDF.",
        ],
      },
      { type: "h3", text: "Method 2: Android built-in Print to PDF" },
      {
        type: "steps",
        items: [
          "Open the image in Google Photos or your phone's Gallery app.",
          "Tap the three-dot menu (or Share) and select Print.",
          "Change the printer destination at the top to Save as PDF.",
          "Tap the PDF save button and pick a folder in Downloads.",
        ],
      },
      { type: "h2", text: "How to save JPG as PDF on Windows 10 and 11" },
      {
        type: "p",
        text: "Windows gives you two options: the browser-based approach in MyPDF4U, which lets you sort and rotate pages visually, and the built-in Microsoft Print to PDF virtual printer for single-image jobs.",
      },
      { type: "h3", text: "Method 1: MyPDF4U in Chrome, Edge, or Firefox (recommended for multiple files)" },
      {
        type: "steps",
        items: [
          "Open the [JPG to PDF converter](/jpg-to-pdf) in your browser.",
          "Drag your JPG or JPEG files from File Explorer directly into the browser window.",
          "Reorder pages, fix any orientation issues, and click Convert.",
          "Click Download to save the combined PDF to your PC.",
        ],
      },
      { type: "h3", text: "Method 2: Windows built-in Print to PDF" },
      {
        type: "steps",
        items: [
          "Open your JPG in the Windows Photos app.",
          "Press Ctrl + P (or click the three-dot menu and select Print).",
          "Set the Printer to Microsoft Print to PDF.",
          "Set Paper Size to A4 or Letter, choose Fit or Fill, and click Print.",
          "Pick a destination folder, enter a filename, and click Save.",
        ],
      },
      {
        type: "note",
        text: "The Windows File Explorer print dialog does not offer visual page reordering. For sorting pages, rotating individual images, and combining multiple photos at full quality, the [MyPDF4U browser tool](/jpg-to-pdf) is the better choice.",
      },
      { type: "h2", text: "How to combine multiple JPG images into one PDF" },
      {
        type: "p",
        text: "Whether you are putting together a university assignment, an expense report with multiple receipts, or a photo portfolio, the [JPG to PDF converter](/jpg-to-pdf) handles the whole batch in one go. Merging [multiple JPGs into a single PDF](/merge-pdf) takes three steps:",
      },
      {
        type: "steps",
        items: [
          "Upload all your images at once into the [JPG to PDF converter](/jpg-to-pdf).",
          "Drag the thumbnails into the correct reading order: Page 1, Page 2, Page 3, and so on.",
          "If any image was photographed sideways or upside-down, click the rotate button on that thumbnail to fix it.",
          "Click Convert to PDF to join every image into one unified document.",
        ],
      },
      {
        type: "note",
        text: "Need to combine the converted photos with existing PDF files? Use the free [Merge PDF tool](/merge-pdf) to bring everything together into one document.",
      },
      { type: "h2", text: "How to convert a scanned JPG to PDF" },
      {
        type: "p",
        text: "Flatbed scanners, office copiers, and mobile scanning apps all save pages as individual image files. Converting those [scanner JPGs to PDF](/jpg-to-pdf) gives you a single document that meets the submission standards required by job portals, tax offices, insurance providers, and legal services.",
      },
      {
        type: "steps",
        items: [
          "Save your scanned JPG or JPEG files to your computer or phone.",
          "Drag all the scanned pages into the [JPG to PDF tool](/jpg-to-pdf).",
          "Check the page order to make sure multi-page contracts or double-sided documents are in the right sequence.",
          "Rotate any skewed or sideways pages to an upright orientation.",
          "Click Convert to PDF to produce a clean, standard multi-page document.",
        ],
      },
      { type: "h2", text: "How to convert JPG to PDF without losing quality" },
      {
        type: "p",
        text: "Many online converters aggressively downsample images to reduce processing time, which leaves fine text unreadable and edges blurry. Quality during PDF conversion comes down to two things: resolution and compression.",
      },
      {
        type: "p",
        text: "MyPDF4U embeds the raw JPG data directly into the PDF at 100% native resolution — no re-sampling, no downscaling. A sharp 12-megapixel photograph or a 300 DPI scan comes through pixel-perfect. If your images contain transparent elements or software screenshots, our lossless [PNG to PDF converter](/png-to-pdf) is the better fit.",
      },
      { type: "h2", text: "How to create a smaller JPG-to-PDF file" },
      {
        type: "p",
        text: "Government job portals, visa applications, licensing portals, and university forms frequently cap upload sizes. Modern smartphone cameras produce JPG files between 2 MB and 6 MB each, so converting them directly can push the resulting PDF well above those limits. The fix is a simple two-step process:",
      },
      {
        type: "steps",
        items: [
          "Convert your JPG images to PDF using the [JPG to PDF converter](/jpg-to-pdf).",
          "Open the free [Compress PDF tool](/compress-pdf) and upload the newly created PDF.",
          "Choose a compression preset — Balanced works well for most documents, Strong for strict upload limits.",
          "Download the smaller PDF. If the file still exceeds the limit, crop away empty margins in the original photo before converting and try again.",
        ],
      },
      { type: "h3", text: "Convert JPG to PDF under 100 KB" },
      {
        type: "p",
        text: "To [convert a JPG to PDF under 100 KB](/compress-pdf), start with a single, tightly cropped image — removing excess background before conversion makes a meaningful difference. Convert the image on MyPDF4U, then run it through the [Compress PDF tool](/compress-pdf) using Strong compression. For single-page IDs, certificates, and invoices, Strong compression reliably brings the file below 100 KB while keeping text readable.",
      },
      { type: "h3", text: "Convert JPG to PDF under 200 KB" },
      {
        type: "p",
        text: "If a portal requires a PDF [under 200 KB](/compress-pdf), convert your JPG on MyPDF4U and run the result through [Compress PDF](/compress-pdf) with Balanced or Strong compression. A 200 KB budget comfortably accommodates multi-page forms, letter receipts, and scanned signatures without visible quality loss.",
      },
      { type: "h3", text: "Convert JPG to PDF under 300 KB" },
      {
        type: "p",
        text: "For a [PDF under 300 KB](/compress-pdf), convert your image first and then apply Balanced compression in the [Compress PDF tool](/compress-pdf). This reliably trims multi-megabyte camera photos well under 300 KB. If you need an even smaller file — say, [under 50 KB](/compress-pdf) — crop the image closely around the document content before converting and use Strong compression.",
      },
    ],
    faqs: [
      {
        q: "How do I convert JPG to PDF on iPhone?",
        a: "Open Safari, go to MyPDF4U's [JPG to PDF tool](/jpg-to-pdf), tap Select JPG images, pick your photos, arrange the pages, and tap Convert. If you only need to convert a single photo, the Apple Photos shortcut also works: tap Share → Print, pinch outward on the preview with two fingers, then tap Share and choose Save to Files.",
      },
      {
        q: "How do I save a JPG as a PDF?",
        a: "Upload your image to the [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U and click Convert — the PDF downloads immediately. On Windows, you can also open the image in Photos, press Ctrl + P, set the printer to Microsoft Print to PDF, and click Save.",
      },
      {
        q: "Can I combine multiple JPG images into one PDF?",
        a: "Yes. Open the [JPG to PDF tool](/jpg-to-pdf), select all your images at once, drag the thumbnails into the page order you want, rotate any sideways pages, and click Convert. You will get a single multi-page PDF as the download.",
      },
      {
        q: "How do I convert JPG to PDF under 100KB?",
        a: "Convert your JPG to PDF on MyPDF4U, then open the [Compress PDF tool](/compress-pdf) and choose Strong compression. Cropping away empty margins in the original photo before converting also helps bring the size down further.",
      },
      {
        q: "How do I convert JPG to PDF under 200KB?",
        a: "Convert your image to PDF first, then run the file through the [Compress PDF tool](/compress-pdf) using Balanced or Strong compression. Either preset comfortably shrinks a multi-megabyte smartphone photo to under 200 KB.",
      },
      {
        q: "How do I convert JPG to PDF under 300KB?",
        a: "Convert your image using the [JPG to PDF tool](/jpg-to-pdf), then apply Balanced compression in the [Compress PDF tool](/compress-pdf). This trims typical camera files to under 300 KB while keeping text sharp and legible.",
      },
      {
        q: "Does converting JPG to PDF reduce image quality?",
        a: "No. MyPDF4U embeds the original JPG data directly into the PDF at 100% native resolution. There is no downsampling and no lossy re-compression.",
      },
      {
        q: "Can I convert a scanned JPG to PDF?",
        a: "Yes. Drag your scanner JPG files into the [JPG to PDF tool](/jpg-to-pdf), arrange the pages in the correct sequence, rotate any skewed pages, and click Convert. The result is a clean, properly ordered PDF ready for official submission.",
      },
      {
        q: "Is the MyPDF4U JPG to PDF converter free?",
        a: "Yes — 100% free, with no watermark, no sign-up, and no hidden file limits.",
      },
      {
        q: "Do I need to install any software?",
        a: "No. Everything runs inside your browser on iPhone, Android, Windows, or Mac. No extensions or apps are needed.",
      },
    ],
    related: [
      "how-to-compress-pdf-for-email",
      "how-to-convert-png-to-pdf",
      "how-to-merge-pdf-files",
    ],
  },
  {
    slug: "how-to-convert-png-to-pdf",
    title: "How to Convert PNG to PDF Online for Free (No Quality Loss)",
    metaTitle: "How to Convert PNG to PDF Free — Crisp Screenshots & Transparent PNGs",
    description:
      "Convert PNG screenshots, transparent graphics and diagrams to PDF online for free. Lossless quality, no blurry text, no upload, and batch conversion supported.",
    date: "2025-02-10",
    updated: "2026-09-02",
    readTime: "5 min read",
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
      "To convert a PNG image to PDF without blurry text or pixelation, use the free [PNG to PDF converter](/png-to-pdf) on MyPDF4U. It renders full lossless screenshots, diagrams, and illustrations directly into print-ready A4 or custom-dimension PDF pages.",
      "PNG is the universal standard for screenshots, software mockups, and charts because of its lossless compression. When converting to PDF, maintaining that pixel-perfect sharpness is essential for technical reports, presentations, and design deliverables.",
      "Everything runs securely in your browser tab. Your design assets and confidential screenshots are never uploaded to any remote server. Drop your PNG file in, arrange the pages, and download your clean PDF — free, fast, and no account required.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "png-to-pdf",
        toolName: "PNG to PDF Converter",
        text: "Open the PNG to PDF Converter",
      },
      { type: "h2", text: "Why convert PNG to PDF instead of JPG?" },
      {
        type: "p",
        text: "Choosing PNG over JPG before building a PDF is crucial when your content contains text, charts, or interface mockups:",
      },
      {
        type: "list",
        items: [
          "Zero JPEG compression artifacts: Fine UI borders, small typography, and spreadsheet cells stay crisp.",
          "Lossless vector-like quality: Zooming in on screenshots reveals sharp edges rather than blurry halos.",
          "Clean handling of transparent layers: Transparent backgrounds are rendered onto standard clean white document pages.",
          "A single shareable document: Combine dozens of loose screenshot files into one organized report.",
        ],
      },
      { type: "h2", text: "How to convert multiple PNG files into one PDF (step-by-step)" },
      {
        type: "steps",
        items: [
          "Go to the [PNG to PDF converter tool](/png-to-pdf).",
          "Drag and drop your PNG screenshots or images into the dropzone.",
          "Rearrange thumbnails by dragging them to form the exact reading sequence.",
          "Click Convert to PDF and save the merged PDF file to your computer or phone.",
        ],
      },
      {
        type: "note",
        text: "Need to combine both PNG screenshots and JPG camera photos? Convert both batches or use the [Merge PDF tool](/merge-pdf) to unite them into a single presentation pack.",
      },
      { type: "h2", text: "How transparent PNG backgrounds are handled in PDF documents" },
      {
        type: "p",
        text: "Standard PDF specifications require a background layer when rendering pages. When you convert a transparent PNG (such as a logo, icon, or chart cutout) on MyPDF4U, the transparent alpha channel is cleanly composite-blended against a crisp white page. This prevents the common 'black background' glitch that occurs in poorly configured converters.",
      },
      { type: "h2", text: "How to convert PNG to PDF on Mac (Preview app)" },
      {
        type: "p",
        text: "Mac users can also convert PNG to PDF locally using macOS's built-in Preview app:",
      },
      {
        type: "steps",
        items: [
          "Select all your PNG files in Finder.",
          "Right-click and choose Open With → Preview.",
          "In Preview, choose File → Print (or Cmd + P).",
          "In the bottom-left corner of the print dialog, click the PDF dropdown and select Save as PDF.",
        ],
      },
      { type: "h2", text: "Managing file size for screenshot-heavy PDFs" },
      {
        type: "p",
        text: "Because PNG uses lossless compression, documents with 20+ high-resolution retina screenshots can grow to 30–50 MB. If your document exceeds email attachment limits, run it through our [PDF compressor](/compress-pdf) using the 'Balanced' preset to cut size by 50–70% while keeping text fully legible.",
      },
    ],
    faqs: [
      {
        q: "How do I convert a PNG to a PDF for free?",
        a: "Upload your PNG to MyPDF4U's [PNG to PDF tool](/png-to-pdf) and click Convert to PDF. It generates your PDF immediately in your browser with no cost, no registration, and no watermarks.",
      },
      {
        q: "Can I convert multiple PNG files into a single PDF?",
        a: "Yes. You can upload multiple PNGs at the same time, reorder the page sequence visually in the grid, and merge them all into a single PDF document.",
      },
      {
        q: "What happens to transparent PNG backgrounds when converted to PDF?",
        a: "Transparent PNG pixels are mapped over a crisp white page background, which matches standard print and reader formatting without turning black.",
      },
      {
        q: "Does converting PNG to PDF reduce the image sharpness?",
        a: "No. The converter uses lossless preservation so each screenshot stays pixel-accurate at 100% native resolution.",
      },
      {
        q: "How do I convert PNG to PDF on Mac for free?",
        a: "Open your PNG images in Apple Preview, press Command + P, click the PDF dropdown at the bottom of the print dialog, and choose Save as PDF.",
      },
    ],
    related: [
      "how-to-convert-jpg-to-pdf",
      "how-to-compress-pdf-for-email",
      "how-to-merge-pdf-files",
    ],
  },
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress Large PDF Files for Email Attachments (Under 25MB / 10MB)",
    metaTitle: "How to Compress PDF for Email Free — Reduce Below 25MB & 10MB Limits",
    description:
      "Learn how to reduce PDF file size below 25MB for Gmail or 10MB for Outlook. Compress large scanned PDFs and presentations online without losing text readability.",
    date: "2025-01-20",
    updated: "2026-09-02",
    readTime: "6 min read",
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
      "If you need to compress a PDF file under 25 MB for Gmail or 10 MB for Outlook, the free [PDF compressor](/compress-pdf) on MyPDF4U gets it done in seconds. Upload your document, choose your compression level, and download the smaller file.",
      "Most email providers bounce attachments larger than 20 to 25 MB. Gmail and Yahoo cap out at 25 MB, while Outlook and Exchange servers often reject anything over 10 to 20 MB. That means heavy scanned contracts, design portfolios, and slide decks frequently fail to send.",
      "Our compression engine shrinks bloated high-DPI scans and removes redundant data. Everything happens locally in your browser, so your documents stay entirely private and are instantly ready to attach.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "compress-pdf",
        toolName: "Compress PDF Tool",
        text: "Upload your large PDF, pick a compression level, and shrink your file below email limits — free, private, and no account required.",
      },
      { type: "h2", text: "Email provider attachment limits (Gmail, Outlook, Yahoo, Apple Mail)" },
      {
        type: "p",
        text: "Before sending, check the maximum file attachment limit for your email provider:",
      },
      {
        type: "list",
        items: [
          "Gmail (Google Workspace): 25 MB max (larger files require a Google Drive link).",
          "Outlook / Hotmail: 20 MB max (many corporate Exchange servers restrict this to 10 MB).",
          "Yahoo Mail: 25 MB max total email size.",
          "Apple iCloud Mail: 20 MB max (automatically prompts you to use Mail Drop for larger files).",
          "ProtonMail: 25 MB max per message.",
        ],
      },
      { type: "h2", text: "How to compress a PDF for email step-by-step" },
      {
        type: "steps",
        items: [
          "Open the [Compress PDF tool](/compress-pdf) in your browser.",
          "Upload your PDF by dragging it into the dropzone or clicking to select the file.",
          "Choose a compression level: Light, Balanced (recommended), or Strong.",
          "Click Compress PDF and download your optimized, smaller document.",
        ],
      },
      { type: "h2", text: "Choosing the right compression level: Light vs. Balanced vs. Strong" },
      {
        type: "list",
        items: [
          "Light: Retains near-original image quality with minor data trimming. Ideal when your file is just slightly over the limit (for example, shrinking 27 MB down to 22 MB).",
          "Balanced (Recommended): Cuts 50% to 75% of the file size. It optimizes scanned images to standard screen-viewing resolutions while keeping fine typography razor-sharp.",
          "Strong: Yields the smallest possible file size, often reducing it by 80% or more. Best for multi-page scanned contracts and archival receipts where meeting strict upload caps is the only priority.",
        ],
      },
      {
        type: "note",
        text: "Have a document with pages you don't actually need to send? Use the [Organize & Delete PDF Pages tool](/organize-pdf) or [Split PDF](/split-pdf) to extract only the relevant pages before compressing.",
      },
      { type: "h2", text: "Why scanned PDFs are so huge and how to fix them" },
      {
        type: "p",
        text: "Office scanners frequently capture pages at 300 to 600 DPI in uncompressed 24-bit color. At those settings, a 10-page document can easily hit 80 MB. Our compressor intelligently scales those images down to a web-optimized 150 DPI without degrading text readability, easily shrinking that same document to under 3 MB.",
      },
      { type: "h2", text: "How to compress PDF on Mac without installing software" },
      {
        type: "p",
        text: "On macOS, you can open the PDF in the built-in Preview app, choose File → Export, click the Quartz Filter dropdown, and select 'Reduce File Size'.",
      },
      {
        type: "note",
        text: "Preview's built-in Quartz filter can occasionally over-compress images, making them blurry. For adjustable control between Light, Balanced, and Strong compression, the [MyPDF4U browser tool](/compress-pdf) is much safer.",
      },
    ],
    faqs: [
      {
        q: "How do I make a PDF file smaller than 25MB to send via Gmail?",
        a: "Upload your file to the [Compress PDF tool](/compress-pdf), select the Balanced compression level, and click Compress. This cuts out the bloat and outputs a file that easily sneaks under Gmail's 25 MB limit.",
      },
      {
        q: "How much file size reduction can I expect?",
        a: "Scanned documents, photos, and presentation slides typically shrink by 50% to 80%. Pure text PDFs without any images are already quite compact and will only see modest reductions.",
      },
      {
        q: "Will compressing a PDF make the text blurry?",
        a: "No. With Light and Balanced compression, text and line art remain perfectly readable on both desktop and mobile screens.",
      },
      {
        q: "Is the PDF compressor free with no file limit?",
        a: "Yes. The tool is 100% free with no account creation, no watermarks, and no artificial daily conversion limits.",
      },
      {
        q: "Can I compress password-protected PDF files?",
        a: "You must unlock the PDF first. Use our free [Unlock PDF tool](/unlock-pdf) to enter the password and remove the protection, then compress the unlocked copy.",
      },
    ],
    related: ["how-to-merge-pdf-files", "how-to-convert-jpg-to-pdf", "how-to-convert-png-to-pdf"],
  },
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files on Any Device (Free, No Upload, No Limits)",
    metaTitle: "How to Merge PDF Files Free — Windows 11, Mac, iPhone & Android",
    description:
      "Merge multiple PDF files into one single document on Windows 10/11, Mac, iPhone, Android and Linux. 100% free, browser-based, no upload, and no Adobe subscription.",
    date: "2025-01-28",
    updated: "2026-09-02",
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
      "If you need to merge PDF files for free without uploading sensitive documents to a server, just drag your files into MyPDF4U's [Merge PDF tool](/merge-pdf), arrange the thumbnails in your preferred order, and click Merge PDFs. Your combined document is generated locally in seconds.",
      "Combining separate documents into a single PDF is essential for job applications (like merging a CV, cover letter, and certificates), legal contracts, tax packets, and school assignments. While tools like Adobe Acrobat require an expensive monthly subscription to combine files, MyPDF4U offers unlimited merging for free.",
      "This complete guide covers how to combine PDF files on Windows 10 and 11, Mac, iPhone, Android, Linux command line, and even Python — all while keeping your files entirely private on your own device.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "merge-pdf",
        toolName: "Merge PDF Tool",
        text: "Drop your PDFs in, arrange the page sequence, and download one merged file — 100% free, with no file-size limits.",
      },
      { type: "h2", text: "How to merge multiple PDF files online for free (any device)" },
      {
        type: "p",
        text: "Follow these simple steps in any web browser on Windows, Mac, iPad, iPhone, or Android:",
      },
      {
        type: "steps",
        items: [
          "Open the free [Merge PDF tool](/merge-pdf) on MyPDF4U.",
          "Drag and drop two or more PDF files into the upload area (or tap to browse your device).",
          "Drag the document cards left or right to set your preferred reading order.",
          "Click Merge PDFs — your merged document will download immediately to your computer or phone.",
        ],
      },
      { type: "h2", text: "How to combine PDF files on Windows 10 & 11 for free without Adobe" },
      {
        type: "p",
        text: "Adobe Acrobat Reader (the free tier) doesn't support combining files — it pushes users toward a paid monthly subscription. Here are the best free methods on Windows:",
      },
      { type: "h3", text: "Method 1: MyPDF4U in Microsoft Edge, Chrome, or Firefox (Recommended)" },
      {
        type: "p",
        text: "Open the [Merge PDF tool](/merge-pdf) in your browser, drag your PDF files directly from File Explorer into the window, set the order, and download your consolidated file. It runs locally in your browser with zero upload delay.",
      },
      { type: "h3", text: "Method 2: Open-Source PDFtk CLI on Windows" },
      {
        type: "p",
        text: "For command-line automation on Windows, you can install the open-source PDFtk toolkit and run `pdftk file1.pdf file2.pdf cat output merged.pdf` in PowerShell.",
      },
      { type: "h2", text: "How to merge PDF files on Mac using built-in Preview" },
      {
        type: "p",
        text: "Mac owners can merge PDFs natively using Apple's built-in Preview app without any third-party downloads:",
      },
      {
        type: "steps",
        items: [
          "Open your primary PDF in Preview.",
          "Click View → Thumbnails in the top menu bar to display the page sidebar.",
          "Drag additional PDF files from Finder directly into the thumbnail sidebar exactly where you want them inserted.",
          "Go to File → Export as PDF to save the combined document.",
        ],
      },
      { type: "h2", text: "How to combine PDF files on iPhone and iPad (iOS Files app)" },
      {
        type: "p",
        text: "You can combine PDF documents directly inside the iOS Files app:",
      },
      {
        type: "steps",
        items: [
          "Open the Files app on your iPhone or iPad.",
          "Navigate to the folder containing your PDFs.",
          "Tap the More icon (the three dots inside a circle at the top right) and choose Select.",
          "Tap the PDF files you want to combine in the exact order you want them merged.",
          "Tap the More icon at the bottom right and tap Create PDF.",
        ],
      },
      {
        type: "p",
        text: "Alternatively, you can open [MyPDF4U Merge PDF](/merge-pdf) in Safari for full drag-and-drop visual sorting.",
      },
      { type: "h2", text: "How to merge PDF files on Android phones" },
      {
        type: "p",
        text: "Android does not provide a native multi-file PDF merger in its stock settings. Just open Chrome on your Android device, go to the [Merge PDF tool](/merge-pdf), select your files from Google Drive or Downloads, reorder them with your thumb, and download the combined document in seconds.",
      },
      { type: "h2", text: "How to merge PDF files on Linux (Ghostscript & PDFtk command line)" },
      {
        type: "p",
        text: "Linux developers can merge PDFs instantly via terminal utilities:",
      },
      { type: "h3", text: "Ghostscript command" },
      {
        type: "code",
        lang: "bash",
        text: "gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=combined.pdf doc1.pdf doc2.pdf doc3.pdf",
      },
      { type: "h3", text: "PDFtk command" },
      {
        type: "code",
        lang: "bash",
        text: "pdftk file1.pdf file2.pdf file3.pdf cat output combined.pdf",
      },
      { type: "h2", text: "How to merge PDF files programmatically with Python (pypdf)" },
      {
        type: "code",
        lang: "python",
        text: "# pip install pypdf\nfrom pypdf import PdfMerger\n\nmerger = PdfMerger()\nfor pdf_file in ['cover.pdf', 'report.pdf', 'appendix.pdf']:\n    merger.append(pdf_file)\n\nmerger.write('final_merged_document.pdf')\nmerger.close()\nprint('Successfully merged PDFs')",
      },
      { type: "h2", text: "Merging mixed formats: combine PDF with JPG, PNG, and Word" },
      {
        type: "p",
        text: "Need to create a single file from a mix of Word files, receipts, and existing PDFs? First, convert your photos using [JPG to PDF](/jpg-to-pdf) or [PNG to PDF](/png-to-pdf), convert Word documents using [Word to PDF](/word-to-pdf), and then merge everything together in the [Merge PDF tool](/merge-pdf).",
      },
    ],
    faqs: [
      {
        q: "How do I combine PDF files for free without Adobe Acrobat?",
        a: "Use MyPDF4U's [Merge PDF tool](/merge-pdf). It's 100% free, requires no Adobe subscription, and works directly in your web browser with zero file uploads.",
      },
      {
        q: "How do I merge PDF files on Windows 10 or 11?",
        a: "Open the [Merge PDF tool](/merge-pdf) in Edge or Chrome, drag your PDF files in from File Explorer, arrange their order, and click Merge PDFs.",
      },
      {
        q: "How do I combine PDF files on Mac for free?",
        a: "Open the first PDF in Preview, show the Thumbnails sidebar (View → Thumbnails), drag your second PDF into the sidebar, and save via File → Export as PDF.",
      },
      {
        q: "How can I merge PDF documents on an iPhone?",
        a: "In the iOS Files app, tap the three dots (More icon) → Select, choose your PDF files, tap the More icon at the bottom right, and select 'Create PDF'. You can also use MyPDF4U directly in Safari.",
      },
      {
        q: "Is there a limit on how many PDFs I can merge?",
        a: "There are no arbitrary file count limits on MyPDF4U. You can unite 2, 10, or even 50+ documents, depending entirely on your device's memory.",
      },
      {
        q: "Does merging PDFs lower the text or image quality?",
        a: "No. Pages and vectors are merged byte-for-byte without any re-compressing or resolution degradation.",
      },
      {
        q: "Are my merged documents safe and private?",
        a: "Yes. Processing takes place entirely inside your browser using client-side JavaScript. Your files are never uploaded to any server.",
      },
    ],
    related: [
      "how-to-compress-pdf-for-email",
      "how-to-convert-jpg-to-pdf",
      "how-to-convert-png-to-pdf",
    ],
  },
];

export const articles: Article[] = [...coreArticles, ...convertGuides, ...organizeGuides];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
