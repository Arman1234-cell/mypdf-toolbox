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
    metaTitle: "How to Convert JPG to PDF Free — Windows 11, Mac, iPhone & Android",
    description:
      "Step-by-step guide to convert JPG to PDF on Windows, iPhone, Android and Mac. Combine multiple images into one high-resolution PDF for free with zero quality loss.",
    date: "2025-01-15",
    updated: "2026-09-02",
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
      "To convert a JPG to PDF without losing quality, upload your image to the free [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U, arrange your page order, and click Convert. Each image is embedded at its native 100% resolution with no compression loss.",
      "Whether you need to combine multiple photos into a single PDF for a university submission, create an expense receipt document, or change a picture to PDF on Windows 11, iPhone, or Android, this guide covers every free method without requiring paid software like Adobe Acrobat.",
      "All conversions with MyPDF4U happen client-side in your browser tab via JavaScript. Your photos, IDs, and scanned records remain completely private on your own device.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "jpg-to-pdf",
        toolName: "JPG to PDF Converter",
        text: "Add your images, arrange page order, and download one high-resolution PDF — 100% free, no sign-up.",
      },
      { type: "h2", text: "How to combine multiple JPG images into one PDF online (free & private)" },
      {
        type: "p",
        text: "Combining multiple JPG or JPEG pictures into a single multi-page PDF document takes three simple steps without uploading files to any remote server:",
      },
      {
        type: "steps",
        items: [
          "Open the [JPG to PDF tool](/jpg-to-pdf) in any web browser on desktop or mobile.",
          "Drag and drop all your JPG files into the upload box, or tap to choose them from your photo gallery.",
          "Drag thumbnails to arrange your desired page sequence (Page 1, 2, 3...) and click rotate on any sideways scan.",
          "Click Convert to PDF and download your finished document instantly.",
        ],
      },
      {
        type: "note",
        text: "Working with screenshots or diagrams with transparent backgrounds? Use our lossless [PNG to PDF converter](/png-to-pdf) to keep lines and small typography crisp.",
      },
      { type: "h2", text: "How to convert JPG to PDF on Windows 10 & 11 without third-party software" },
      {
        type: "p",
        text: "Windows 10 and Windows 11 include a native virtual printer called Microsoft Print to PDF that allows you to turn a picture into a PDF without installing any extra software.",
      },
      { type: "h3", text: "Method 1: Windows Photos App (Ctrl + P)" },
      {
        type: "steps",
        items: [
          "Open your JPG file in the Windows Photos app.",
          "Press Ctrl + P (or click the three dots '...' menu and choose Print).",
          "Under the Printer dropdown menu, select Microsoft Print to PDF.",
          "Set Paper Size to A4 or Letter, select Fit or Fill, then click Print.",
          "Choose a destination folder and file name, then click Save.",
        ],
      },
      { type: "h3", text: "Method 2: Right-click directly in File Explorer" },
      {
        type: "steps",
        items: [
          "In File Explorer, select your JPG image (or hold Ctrl and select multiple images).",
          "Right-click the selected file(s) and select Print.",
          "Set the Printer to Microsoft Print to PDF and click Print to export your PDF.",
        ],
      },
      {
        type: "note",
        text: "Windows File Explorer Print to PDF has limited visual page ordering. To visually sort, rotate individual pages, and combine photos at full quality, use the [MyPDF4U browser tool](/jpg-to-pdf).",
      },
      { type: "h2", text: "How to change a picture to PDF on iPhone and iPad (iOS Files)" },
      {
        type: "p",
        text: "You can convert any photo on an iPhone or iPad into a PDF directly inside the Apple Photos app without installing third-party apps:",
      },
      {
        type: "steps",
        items: [
          "Open the Photos app on your iPhone/iPad and tap the image you want to convert.",
          "Tap the Share icon (the square with an arrow pointing up).",
          "Scroll down and tap Print.",
          "On the Print Options preview screen, perform a two-finger pinch-out zoom gesture on the photo thumbnail — this immediately reveals iOS's hidden PDF preview.",
          "Tap the Share button at the top right and tap Save to Files.",
        ],
      },
      {
        type: "p",
        text: "For multiple photos on iPhone: select all pictures in Photos, tap Share → Save to Files. In the Files app, tap the three dots '...', choose Select, select your photos, tap More (bottom right), and choose Create PDF. Alternatively, visit [MyPDF4U's JPG to PDF tool](/jpg-to-pdf) in Safari to drag and sort them visually.",
      },
      { type: "h2", text: "How to convert photos to PDF on Android phones and tablets" },
      {
        type: "p",
        text: "Android devices running Google Photos or Samsung Gallery can convert pictures to PDF through the system print service:",
      },
      {
        type: "steps",
        items: [
          "Open the photo in Google Photos or your Gallery app.",
          "Tap the three-dot menu (or Share) and select Print.",
          "Change the printer destination at the top to Save as PDF.",
          "Tap the yellow or blue PDF download circle to save the document to your Downloads folder.",
        ],
      },
      { type: "h2", text: "How to convert JPG to PDF in Adobe Acrobat, Foxit, and Google Drive" },
      {
        type: "p",
        text: "If you already use desktop software or cloud suites, here is how each compares:",
      },
      { type: "h3", text: "Adobe Acrobat Pro vs Free Acrobat Online" },
      {
        type: "p",
        text: "In Adobe Acrobat Pro: click Tools → Create PDF → Select File → Convert. While Acrobat provides good output, the standalone pro subscription costs ~£17–$20/month. The free MyPDF4U web tool gives you identical full-resolution output at zero cost.",
      },
      { type: "h3", text: "Google Drive & Google Docs" },
      {
        type: "p",
        text: "Upload your image to Google Drive, right-click → Open with Google Docs, then choose File → Download → PDF Document (.pdf). Note that Google Docs re-flows image margins, which can alter alignment. A direct browser tool keeps 1:1 image scaling intact.",
      },
      { type: "h2", text: "How to maintain 100% maximum resolution & quality" },
      {
        type: "p",
        text: "Many online converters automatically compress images, resulting in blurry text on scanned contracts and pixelated receipt numbers. MyPDF4U embeds the raw binary JPG streams directly into PDF page objects without re-sampling. If the output document exceeds email limits, you can easily [compress the PDF for email](/compress-pdf) afterwards with full quality control.",
      },
    ],
    faqs: [
      {
        q: "How do I convert my JPG to PDF for free without losing quality?",
        a: "Open MyPDF4U's JPG to PDF converter, drag in your pictures, arrange the order, and click Convert to PDF. Your images are embedded at their exact original pixel resolution with no re-compression.",
      },
      {
        q: "How do I combine multiple JPG files into one single PDF?",
        a: "Select all your JPG images at once on the JPG to PDF tool page. Drag the thumbnails to set the page order you want, rotate any scans, and click Convert to PDF to download one consolidated file.",
      },
      {
        q: "How do I turn a JPEG into a PDF file on Windows 11?",
        a: "Open the image in the Windows Photos app, press Ctrl + P, select 'Microsoft Print to PDF' as the printer, and click Print. For batch conversions with custom ordering, use MyPDF4U in Chrome or Edge.",
      },
      {
        q: "How can I convert a JPG to PDF on my iPhone without an app?",
        a: "In Apple Photos, tap Share → Print, pinch outward on the preview image to convert it into a PDF, then tap Share → Save to Files. No App Store download is required.",
      },
      {
        q: "How do I convert pictures to PDF on Android?",
        a: "Open your image in Google Photos or Samsung Gallery, tap Share/Menu → Print, choose 'Save as PDF' from the printer dropdown, and tap the PDF save button.",
      },
      {
        q: "Is there a file size limit when converting JPG to PDF?",
        a: "No fixed server caps exist on MyPDF4U because conversions run inside your device's browser memory. You can convert large 50+ image sets smoothly.",
      },
      {
        q: "Are my photos uploaded to a third-party server?",
        a: "No. The conversion executes entirely in your browser using client-side JavaScript. Your files never leave your computer or phone.",
      },
    ],
    related: ["how-to-convert-png-to-pdf", "how-to-compress-pdf-for-email", "how-to-merge-pdf-files"],
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
