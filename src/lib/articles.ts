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

export const articles: Article[] = [
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
      caption: "Turn photos, receipts, and scans into an ordered, high-resolution PDF on iPhone, mobile, or computer.",
      ...heroDims,
    },
    intro: [
      "To learn [how to convert JPG to PDF in iPhone](/jpg-to-pdf), mobile, or on your computer, use the free [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U. Simply add your images, arrange the page sequence, and click Convert. Each picture is compiled directly in your browser tab at 100% native quality with zero compression blur.",
      "Whether you want to combine multiple photos into a single PDF for a university submission, create an expense receipt document, or convert scanned documents on Windows 11, iPhone, or Android, this guide explains every free method without requiring paid software like Adobe Acrobat.",
      "All conversions with MyPDF4U happen locally on your own device using client-side JavaScript. Your photos, IDs, contracts, and confidential records are never uploaded to any remote server.",
    ],
    blocks: [
      { type: "h2", text: "Quick Way to Convert JPG to PDF Online" },
      {
        type: "p",
        text: "Converting JPG and JPEG pictures into a clean PDF document takes just a few seconds without installing apps or signing up:",
      },
      {
        type: "steps",
        items: [
          "Upload the JPG images by dragging them into the dropzone or tapping to choose files from your device.",
          "Arrange them in the required order by dragging thumbnails into your preferred sequence (Page 1, 2, 3...).",
          "Adjust settings if available, such as rotating sideways scans or removing unwanted pictures.",
          "Select Convert to build your high-resolution document instantly.",
          "Download the PDF file directly to your phone or computer.",
        ],
      },
      {
        type: "cta",
        toolSlug: "jpg-to-pdf",
        toolName: "JPG to PDF Converter",
        buttonText: "Convert JPG to PDF Free",
        text: "Upload your images, arrange page order, and download your finished PDF — 100% free, no watermark, no sign-up.",
      },
      { type: "h2", text: "How to Convert JPG to PDF on iPhone" },
      {
        type: "p",
        text: "If you are searching for [how to convert JPG to PDF in iPhone](/jpg-to-pdf), you can complete the conversion directly through Safari without installing additional software.",
      },
      { type: "h3", text: "Method 1: Using MyPDF4U in Safari (Best for Visual Sorting)" },
      {
        type: "steps",
        items: [
          "Open Safari on your iPhone and navigate to the [JPG to PDF tool](/jpg-to-pdf).",
          "Tap Select JPG images, then choose Photo Library or Choose Files.",
          "Select your photos and tap Add. Drag thumbnails to reorder pages, and tap the rotate icon on any sideways pictures.",
          "Tap Convert to PDF and download your finished document directly into the Files app.",
        ],
      },
      { type: "h3", text: "Method 2: Using the Apple Photos App (Pinch-to-Print Trick)" },
      {
        type: "steps",
        items: [
          "Open the Photos app on your iPhone and tap the photo you want to convert.",
          "Tap the Share button (the square with an upward arrow) and select Print.",
          "On the Print Options screen, perform a two-finger pinch-out zoom gesture on the photo preview — iOS will immediately generate a full-screen PDF preview.",
          "Tap the Share button in the top-right corner and tap Save to Files.",
        ],
      },
      { type: "h3", text: "Method 3: Using the iOS Files App (For Multiple Images)" },
      {
        type: "steps",
        items: [
          "In Photos, select your photos, tap Share, and select Save to Files.",
          "Open the Files app, tap the three dots (...) at the top right, tap Select, and choose your pictures in the desired order.",
          "Tap More (...) in the bottom-right corner and select Create PDF. iOS generates a combined PDF in the same folder.",
        ],
      },
      { type: "h2", text: "How to Convert JPG to PDF on Mobile (Android & Tablets)" },
      {
        type: "p",
        text: "If you are looking for [how to convert JPG to PDF in mobile](/jpg-to-pdf) phones running Android (such as Samsung Galaxy, Google Pixel, or Xiaomi), you can easily convert single or multiple pictures:",
      },
      { type: "h3", text: "Method 1: Using MyPDF4U in Mobile Chrome or Samsung Internet" },
      {
        type: "steps",
        items: [
          "Open your mobile browser and navigate to the [JPG to PDF tool](/jpg-to-pdf).",
          "Tap to select pictures from your Gallery, Google Photos, or file manager.",
          "Drag thumbnails to arrange your pages, rotate any orientation issues, and tap Convert to download your PDF instantly.",
        ],
      },
      { type: "h3", text: "Method 2: Built-in Android Print Service" },
      {
        type: "steps",
        items: [
          "Open the picture in Google Photos or your phone's Gallery app.",
          "Tap the three-dot menu (or Share) and select Print.",
          "Change the printer destination at the top to Save as PDF.",
          "Tap the yellow or blue PDF save button and choose a folder in Downloads.",
        ],
      },
      { type: "h2", text: "How to Save JPG as PDF on Windows 10 & 11" },
      {
        type: "p",
        text: "When learning [how to save JPG to PDF](/jpg-to-pdf) on a Windows PC, the browser-based method gives you full visual page reordering, while Windows also provides a built-in virtual printer.",
      },
      { type: "h3", text: "Method 1: Browser-Based via MyPDF4U (Recommended for Multiple Files)" },
      {
        type: "steps",
        items: [
          "Open the [JPG to PDF converter](/jpg-to-pdf) in Chrome, Edge, or Firefox.",
          "Drag and drop your JPG or JPEG files directly from File Explorer into the browser.",
          "Reorder pages, rotate any orientation issues, and click Convert.",
          "Click Download to save the combined PDF to your PC.",
        ],
      },
      { type: "h3", text: "Method 2: Windows Built-In Print to PDF" },
      {
        type: "steps",
        items: [
          "Open your JPG image in the Windows Photos app.",
          "Press Ctrl + P (or click the three dots '...' and select Print).",
          "Set the Printer to Microsoft Print to PDF.",
          "Set Paper Size to A4 or Letter, select Fit or Fill, and click Print.",
          "Choose a destination folder, enter a filename, and click Save.",
        ],
      },
      {
        type: "note",
        text: "Windows File Explorer's built-in print dialog has limited visual page ordering. To visually sort, rotate individual pages, and combine photos at full quality, use the [MyPDF4U browser tool](/jpg-to-pdf).",
      },
      { type: "h2", text: "How to Convert Multiple JPG Images into One PDF" },
      {
        type: "p",
        text: "When compiling university assignments, multi-receipt expense reports, or photo portfolios, using a reliable [jpg joiner to pdf](/jpg-to-pdf) allows you to create a seamless [jpg to pdf multiple pages](/merge-pdf) document. Learning [how to merge jpg files into one pdf](/merge-pdf) takes only three steps:",
      },
      {
        type: "steps",
        items: [
          "Upload all your images simultaneously into the [JPG to PDF converter](/jpg-to-pdf).",
          "Arrange the image sequence by dragging thumbnails: Page 1, Page 2, Page 3, and so on.",
          "Rotate individual scans: If any document was photographed sideways or upside-down, click the rotate button on that specific thumbnail.",
          "Click Convert to PDF to join every image into a single, unified document.",
        ],
      },
      {
        type: "note",
        text: "Need to combine existing PDF documents with your newly converted photo pages? Use our free [Merge PDF tool](/merge-pdf) to merge multiple PDF files together.",
      },
      { type: "h2", text: "How to Convert a Scanned JPG to PDF" },
      {
        type: "p",
        text: "Many flatbed hardware scanners, office multi-function copiers, and mobile scanner apps save pages as individual image files. Converting [scanner jpg to pdf](/jpg-to-pdf) ensures your documents adhere to official submission guidelines for job portals, tax departments, insurance claims, and legal filings.",
      },
      {
        type: "steps",
        items: [
          "Save your scanned JPG or JPEG files to your computer or smartphone.",
          "Drag all scanned pages into the [JPG to PDF tool](/jpg-to-pdf).",
          "Check the page order so multi-page contracts or double-sided documents follow their proper sequence.",
          "Rotate any skewed or sideways scans to upright orientation.",
          "Select Convert to PDF to generate a crisp, standardized multi-page document.",
        ],
      },
      { type: "h2", text: "How to Convert JPG to PDF Without Losing Quality" },
      {
        type: "p",
        text: "A common drawback of conventional online converters is that they aggressively downsample images, leaving contract text unreadable and fine details blurry. Preserving image quality during PDF conversion comes down to resolution and compression.",
      },
      {
        type: "p",
        text: "MyPDF4U embeds the raw binary JPG streams directly into PDF page objects at 100% native resolution without re-sampling or downscaling. If your source image is a sharp 12-megapixel photograph or a 300 DPI scan, the resulting PDF displays every pixel cleanly. Transparent diagrams or software screenshots can also be converted cleanly using our lossless [PNG to PDF converter](/png-to-pdf).",
      },
      { type: "h2", text: "How to Create a Small JPG-to-PDF File" },
      {
        type: "p",
        text: "Government job portals, visa applications, state licensing portals, and university submission forms often place strict file size ceilings on uploaded PDFs. Since modern smartphone cameras produce JPG photos between 2MB and 6MB each, converting them directly creates a file that exceeds these limits. To achieve a compact file size without unreadable text, follow this two-step process:",
      },
      {
        type: "steps",
        items: [
          "Convert your JPG images to PDF first using the [JPG to PDF converter](/jpg-to-pdf).",
          "Open our free [Compress PDF tool](/compress-pdf) and upload your newly created PDF.",
          "Choose your compression preset: Balanced (recommended) or Strong (for strict upload limits).",
          "Download your smaller PDF. If needed, repeat compression or crop away unnecessary margins from the original photo before converting.",
        ],
      },
      { type: "h3", text: "Convert JPG to PDF Under 100KB" },
      {
        type: "p",
        text: "To [convert jpg to pdf less than 100kb](/compress-pdf), you need an efficient [jpg to pdf converter under 100kb](/compress-pdf) workflow. Start with a single clean document or tightly crop out excess background from your photo before conversion. Convert the image on MyPDF4U, then run the PDF through our [Compress PDF tool](/compress-pdf) using Strong compression. For single-page IDs, certificates, and invoices, Strong compression typically reduces document size below 100KB while preserving text legibility.",
      },
      { type: "h3", text: "Convert JPG to PDF Under 200KB" },
      {
        type: "p",
        text: "If an application requires you to [convert jpg to pdf less than 200kb](/compress-pdf), convert your JPG on MyPDF4U and then use [Compress PDF](/compress-pdf) with Balanced or Strong compression. A 200KB budget provides plenty of room for multi-page forms, letter receipts, and scanned signatures without noticeable visual degradation.",
      },
      { type: "h3", text: "Convert JPG to PDF Under 300KB" },
      {
        type: "p",
        text: "For documents that need to be [jpg to pdf less than 300kb](/compress-pdf), converting the image first and applying Balanced compression in our [Compress PDF tool](/compress-pdf) reliably shrinks multi-megabyte camera photos under 300KB. For users who need to [convert jpg to pdf 50 kb online](/compress-pdf), crop closely around the document edges before converting and apply Strong compression to reach that ultra-compact footprint.",
      },
    ],
    faqs: [
      {
        q: "How do I convert JPG to PDF on iPhone?",
        a: "Open Safari and go to MyPDF4U's free [JPG to PDF tool](/jpg-to-pdf), tap Select JPG images, choose your photos, arrange them, and tap Convert. Alternatively, open Apple Photos, tap Share → Print, pinch out on the thumbnail preview, tap Share, and choose Save to Files.",
      },
      {
        q: "How do I save a JPG as a PDF?",
        a: "Upload your image to MyPDF4U's [JPG to PDF converter](/jpg-to-pdf) and click Convert to download it instantly. On Windows, you can also open the image in the Photos app, press Ctrl + P, select 'Microsoft Print to PDF', and click Save.",
      },
      {
        q: "Can I combine multiple JPG images into one PDF?",
        a: "Yes. Select all your JPG or JPEG images at once in MyPDF4U, drag the thumbnails to establish your desired page order, rotate any sideways pages, and click Convert to download one consolidated multi-page PDF.",
      },
      {
        q: "How do I convert JPG to PDF under 100KB?",
        a: "First, convert your JPG to PDF on MyPDF4U. Next, open our [Compress PDF tool](/compress-pdf) and select Strong compression. To ensure the file stays under 100KB, crop out unnecessary margins from your original photo before converting.",
      },
      {
        q: "How do I convert JPG to PDF under 200KB?",
        a: "Convert your image to PDF first, then pass the file through our [Compress PDF tool](/compress-pdf) using Balanced or Strong compression. This easily shrinks multi-megabyte smartphone photos under 200KB.",
      },
      {
        q: "How do I convert JPG to PDF under 300KB?",
        a: "Convert your picture using our JPG to PDF tool, then apply Balanced compression in the [Compress PDF tool](/compress-pdf). It reduces camera files to under 300KB while keeping text sharp and readable.",
      },
      {
        q: "Does converting JPG to PDF reduce image quality?",
        a: "No. MyPDF4U embeds your original JPG image data directly into the PDF at 100% native resolution without downsampling or applying lossy re-compression.",
      },
      {
        q: "Can I convert a scanned JPG to PDF?",
        a: "Yes. Upload your flatbed or smartphone scanner JPG files to the MyPDF4U JPG to PDF tool, rotate any skewed pages, arrange them in numerical sequence, and click Convert to create a professional PDF.",
      },
      {
        q: "Is the MyPDF4U JPG-to-PDF converter free?",
        a: "Yes, 100% free with no watermark, no sign-up or registration required, and no hidden file limits.",
      },
      {
        q: "Do I need to install software?",
        a: "No software or browser extensions are required. Everything processes securely inside your web browser on iPhone, Android, Windows, or Mac.",
      },
    ],
    related: ["how-to-compress-pdf-for-email", "how-to-convert-png-to-pdf", "how-to-merge-pdf-files"],
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
      "To convert PNG images to PDF without blurry text or pixelation, use the free [PNG to PDF converter](/png-to-pdf) on MyPDF4U. It renders full lossless screenshots, diagrams, and illustrations directly into print-ready A4 or custom-dimension PDF pages.",
      "PNG is the universal standard for screenshots, software mockups, and charts because of its lossless compression. When converted to PDF, maintaining that pixel-perfect sharpness is essential for technical reports, presentations, and design deliverables.",
      "Everything runs securely in your browser tab. Your design assets and confidential screenshots are never uploaded to any remote server.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "png-to-pdf",
        toolName: "PNG to PDF Converter",
        text: "Drop your PNG files in, arrange the pages, and download your clean PDF — free, fast, no account required.",
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
          "Single shareable document: Combines dozens of loose screenshot files into one organized report.",
        ],
      },
      { type: "h2", text: "How to convert multiple PNG files into one PDF (step by step)" },
      {
        type: "steps",
        items: [
          "Go to the [PNG to PDF converter tool](/png-to-pdf).",
          "Drag and drop your PNG screenshots or images into the dropzone.",
          "Rearrange thumbnails by dragging them to establish the exact reading sequence.",
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
        a: "Upload your PNG to MyPDF4U's PNG to PDF tool and click Convert to PDF. It generates your PDF immediately in your browser with no cost, no registration, and no watermarks.",
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
    related: ["how-to-convert-jpg-to-pdf", "how-to-compress-pdf-for-email", "how-to-merge-pdf-files"],
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
      "To compress a PDF file under 25MB for Gmail or 10MB for Outlook, upload your document to MyPDF4U's [free PDF compressor](/compress-pdf), select 'Balanced' or 'Strong' compression, and download the reduced file in seconds.",
      "Most email providers reject attachments larger than 20–25 MB (Gmail and Yahoo cap at 25 MB, Outlook/Exchange often caps at 10–20 MB). Heavy scanned contracts, design portfolios, and slide decks frequently trigger bounce-back errors when emailed.",
      "Our compression engine resamples bloated high-DPI scans and eliminates redundant font tables locally in your browser, keeping your documents confidential and instantly ready for sending.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "compress-pdf",
        toolName: "Compress PDF Tool",
        text: "Upload your large PDF, pick a compression level, and shrink your file below email limits — free, private, no account.",
      },
      { type: "h2", text: "Email provider attachment limits (Gmail, Outlook, Yahoo, Apple Mail)" },
      {
        type: "p",
        text: "Before sending, check the maximum file attachment limits of popular mail providers:",
      },
      {
        type: "list",
        items: [
          "Gmail (Google Workspace): 25 MB max (larger files require Google Drive links).",
          "Outlook / Hotmail: 20 MB max (many corporate Exchange servers restrict to 10 MB).",
          "Yahoo Mail: 25 MB max total email size.",
          "Apple iCloud Mail: 20 MB max (automatically prompts Mail Drop for larger files).",
          "ProtonMail: 25 MB max per message.",
        ],
      },
      { type: "h2", text: "How to compress a PDF for email step by step" },
      {
        type: "steps",
        items: [
          "Open the [Compress PDF tool](/compress-pdf) in your browser.",
          "Upload your PDF by dragging it into the box or clicking to browse your device.",
          "Select your preferred compression level: Light, Balanced (recommended), or Strong.",
          "Click Compress PDF and download your optimized smaller document.",
        ],
      },
      { type: "h2", text: "Choosing the right compression level: Light vs Balanced vs Strong" },
      {
        type: "list",
        items: [
          "Light Compression: Retains near-original image quality with minor data trimming. Ideal when your file is just slightly over the limit (e.g. 27 MB down to 22 MB).",
          "Balanced (Recommended): Cuts 50% to 75% of overall file size by optimizing embedded scan resolution to standard screen viewing DPI while keeping fine typography razor-sharp.",
          "Strong Compression: Yields the smallest possible file footprint (often 80%+ reduction). Best for multi-page scanned contracts and archival receipts where meeting strict upload caps is the top priority.",
        ],
      },
      {
        type: "note",
        text: "Have a document containing pages you don't actually need to send? Use the [Organize & Delete PDF Pages tool](/organize-pdf) or [Split PDF](/split-pdf) to extract only relevant pages before compressing.",
      },
      { type: "h2", text: "Why scanned PDFs are so huge and how to fix them" },
      {
        type: "p",
        text: "Office scanners frequently capture pages at 300 to 600 DPI in uncompressed 24-bit color. A 10-page document can easily reach 80 MB. The MyPDF4U compressor intelligently downsamples image rasters to a web-optimized 150 DPI without degrading text readability, shrinking the document to under 3 MB.",
      },
      { type: "h2", text: "How to compress PDF on Mac without installing software" },
      {
        type: "p",
        text: "On macOS: open the PDF in Preview, choose File → Export, click the Quartz Filter dropdown menu, and select 'Reduce File Size'. Note: Preview's Quartz filter can occasionally make images over-compressed. For adjustable control between Light, Balanced, and Strong, use [MyPDF4U](/compress-pdf).",
      },
    ],
    faqs: [
      {
        q: "How do I make a PDF file smaller than 25MB to send via Gmail?",
        a: "Upload your file to MyPDF4U's Compress PDF tool, select 'Balanced' compression, and click Compress. It reduces image bloat and outputs a file that easily fits within Gmail's 25MB ceiling.",
      },
      {
        q: "How much file size reduction can I expect?",
        a: "Scanned documents, photos, and presentation slides typically shrink by 50% to 80%. Pure text PDFs with no images are already compact and will see modest reductions.",
      },
      {
        q: "Will compressing a PDF make the text blurry?",
        a: "No. With Light and Balanced compression, text and line art maintain clear readability on all desktop and mobile screens.",
      },
      {
        q: "Is the PDF compressor free with no file limit?",
        a: "Yes. The tool is 100% free with no account creation, no watermark, and no artificial daily conversion limits.",
      },
      {
        q: "Can I compress password-protected PDF files?",
        a: "You must unlock the PDF first. Use our free [Unlock PDF tool](/unlock-pdf) if you know the password, then compress the unlocked copy.",
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
      "To merge PDF files for free without uploading sensitive documents to a server, drag your files into MyPDF4U's [Merge PDF tool](/merge-pdf), drag the thumbnails into your desired order, and click Merge PDFs. Your combined document is generated locally in seconds.",
      "Combining separate documents into a single PDF is essential for job applications (CV + cover letter + certificates), legal contracts, tax packets, and school assignments. While Adobe Acrobat requires an expensive monthly subscription to combine files, MyPDF4U offers unlimited merging for free.",
      "This complete guide covers how to combine PDF files on Windows 11, Mac, iPhone, Android, Linux CLI, and Python — keeping your files private on your own device.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "merge-pdf",
        toolName: "Merge PDF Tool",
        text: "Drop your PDFs in, arrange page sequence, and download one merged file — 100% free, no file-size limits.",
      },
      { type: "h2", text: "How to merge multiple PDF files online for free (any device)" },
      {
        type: "p",
        text: "Follow these simple steps in any browser on Windows, Mac, iPad, iPhone, or Android:",
      },
      {
        type: "steps",
        items: [
          "Open the free [Merge PDF tool](/merge-pdf) on MyPDF4U.",
          "Drag and drop two or more PDF files into the upload area (or tap to browse your device files).",
          "Drag the document cards left or right to set your preferred file order.",
          "Click Merge PDFs — your merged document downloads immediately to your computer or phone.",
        ],
      },
      { type: "h2", text: "How to combine PDF files on Windows 10 & 11 for free without Adobe" },
      {
        type: "p",
        text: "Adobe Acrobat Reader (the free tier) does not support combining files — it forces users toward a £17–$20/month subscription. Here are the best free methods on Windows:",
      },
      { type: "h3", text: "Method 1: MyPDF4U in Microsoft Edge / Chrome / Firefox (Recommended)" },
      {
        type: "p",
        text: "Open [mypdf4u.com/merge-pdf](/merge-pdf) in Microsoft Edge or Chrome, drag your PDF files directly from File Explorer into the window, set the order, and download your consolidated file. It runs locally in your browser with no upload delay.",
      },
      { type: "h3", text: "Method 2: Open-Source PDFtk CLI on Windows" },
      {
        type: "p",
        text: "For command-line automation on Windows, install the open-source PDFtk toolkit and run `pdftk file1.pdf file2.pdf cat output merged.pdf` in PowerShell.",
      },
      { type: "h2", text: "How to merge PDF files on Mac using built-in Preview" },
      {
        type: "p",
        text: "Mac owners can merge PDFs natively using Apple's built-in Preview app without third-party downloads:",
      },
      {
        type: "steps",
        items: [
          "Open your primary PDF in Preview.",
          "Click View → Thumbnails in the top menu bar to display the page sidebar.",
          "Drag additional PDF files from Finder directly into the thumbnail sidebar where you want them inserted.",
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
          "Tap the More icon ('...' circle at top right) and choose Select.",
          "Tap the PDF files you want to combine in the order you want them merged.",
          "Tap the More icon at the bottom right and tap Create PDF.",
        ],
      },
      {
        type: "p",
        text: "Alternatively, open [MyPDF4U Merge PDF](/merge-pdf) in Safari for full drag-and-drop visual sorting.",
      },
      { type: "h2", text: "How to merge PDF files on Android phones" },
      {
        type: "p",
        text: "Android does not provide a native multi-file PDF merger in stock settings. Open Chrome on your Android device, go to [mypdf4u.com/merge-pdf](/merge-pdf), select your files from Google Drive or Downloads, reorder them with your thumb, and download the combined document in seconds.",
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
        text: "Need to create a single file from a mix of Word files, receipts, and existing PDFs? Convert your photos using [JPG to PDF](/jpg-to-pdf) or [PNG to PDF](/png-to-pdf), convert Word documents using [Word to PDF](/word-to-pdf), and merge them all in the [Merge PDF tool](/merge-pdf).",
      },
    ],
    faqs: [
      {
        q: "How do I combine PDF files for free without Adobe Acrobat?",
        a: "Use MyPDF4U's Merge PDF tool. It is 100% free, requires no Adobe subscription, and works directly in your web browser with zero uploads.",
      },
      {
        q: "How do I merge PDF files on Windows 10 / 11?",
        a: "Open mypdf4u.com/merge-pdf in Edge or Chrome, drag in your PDF files from File Explorer, arrange their order, and click Merge PDFs.",
      },
      {
        q: "How do I combine PDF files on Mac for free?",
        a: "Open the first PDF in Preview, show the Thumbnails sidebar (View → Thumbnails), drag your second PDF into the sidebar, and save via File → Export as PDF.",
      },
      {
        q: "How can I merge PDF documents on iPhone?",
        a: "In the iOS Files app, tap '...' → Select, choose your PDF files, tap '...' at the bottom right, and select 'Create PDF'. Or use MyPDF4U in Safari.",
      },
      {
        q: "Is there a limit on how many PDFs I can merge?",
        a: "No arbitrary file count limits exist on MyPDF4U. You can merge 2, 10, or 50+ documents depending on your device memory.",
      },
      {
        q: "Does merging PDFs lower the text or image quality?",
        a: "No. Pages and vectors are merged byte-for-byte without re-compressing or degrading resolution.",
      },
      {
        q: "Are my merged documents safe and private?",
        a: "Yes. Processing takes place entirely inside your browser using client-side JavaScript. Your files are never uploaded to any server.",
      },
    ],
    related: ["how-to-compress-pdf-for-email", "how-to-convert-jpg-to-pdf", "how-to-convert-png-to-pdf"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
