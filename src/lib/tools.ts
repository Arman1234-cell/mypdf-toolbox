import type { OperationName } from "./pdf/operations";

export type ToolCategory =
  | "Convert PDF"
  | "Organize PDF"
  | "Optimize PDF"
  | "Edit PDF"
  | "Security"
  | "Images to PDF"
  | "Documents to PDF";

export type ToolOptionField = {
  key: string;
  label: string;
  help?: string;
  type: "text" | "select" | "password";
  placeholder?: string;
  defaultValue: string;
  required?: boolean;
  choices?: { value: string; label: string }[];
};

export type ToolDefinition = {
  slug: string;
  name: string;
  h1: string;
  tagline: string;
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  category: ToolCategory;
  status: "live" | "soon";
  popular?: boolean;
  operation?: OperationName;
  accept: string;
  acceptLabel: string;
  multiple: boolean;
  reorder?: boolean;
  ctaLabel: string;
  actionLabel: string;
  outputHint: string;
  options?: ToolOptionField[];
  steps: string[];
  features: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  learn: string;
};

const IMAGE_ACCEPT = "image/jpeg,image/png,.jpg,.jpeg,.png";

export const tools: ToolDefinition[] = [
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    h1: "JPG to PDF Converter — Free Online & In-Browser",
    tagline: "Convert JPG images into a single PDF quickly, free, and without quality loss.",
    cardDescription: "Turn images into a single PDF.",
    metaTitle: "JPG to PDF Converter — Free Online (No Watermark) | MyPDF4U",
    metaDescription:
      "Convert JPG and JPEG images into a high-resolution PDF online for free. Combine multiple photos into one document with no file size limit and no sign-up.",
    category: "Images to PDF",
    status: "live",
    popular: true,
    operation: "imagesToPdf",
    accept: IMAGE_ACCEPT,
    acceptLabel: "JPG, JPEG and PNG images",
    multiple: true,
    reorder: true,
    ctaLabel: "Select JPG images",
    actionLabel: "Convert to PDF",
    outputHint: "One PDF page per image, in the order you arrange them.",
    steps: [
      "Select your JPG images or drop them into the upload area.",
      "Drag the files to set the page order you want and rotate any sideways images.",
      "Press Convert to PDF and download the finished high-resolution document.",
    ],
    features: [
      {
        title: "100% Private in-browser conversion",
        body: "Images never leave your device — the PDF is built locally with client-side JavaScript.",
      },
      {
        title: "Lossless full original resolution",
        body: "Each page matches the original pixel dimensions with zero re-compression blur.",
      },
      {
        title: "Drag-and-drop page reordering",
        body: "Arrange, rotate, or remove photos visually before generating your single PDF.",
      },
    ],
    faqs: [
      {
        q: "How do I combine multiple JPG files into one single PDF for free?",
        a: "Add all your JPG photos at once to the JPG to PDF tool, drag the thumbnails into your desired sequence, and click Convert to PDF. You will get one combined PDF with no watermark.",
      },
      {
        q: "Does converting JPG to PDF reduce image quality?",
        a: "No. MyPDF4U embeds your JPEG streams directly into the PDF pages at 100% original resolution without downsampling.",
      },
      {
        q: "Do you upload my private photos to a remote server?",
        a: "No. The converter runs inside your browser tab. Your files remain confidential on your computer or phone.",
      },
      {
        q: "Can I mix PNG and JPG images in the same conversion?",
        a: "Yes. JPG, JPEG, and PNG images can be added and ordered together in a single PDF document.",
      },
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "Photos taken on smartphones are usually stored as JPG files. Converting them to a standardized PDF keeps receipts, homework, or legal documents properly ordered in a format accepted by all portals.",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    h1: "PDF to JPG Converter — Extract PDF Pages as Images",
    tagline: "Turn each page of your PDF into a high-quality JPG image for free.",
    cardDescription: "Turn PDF pages into JPG images.",
    metaTitle: "PDF to JPG Converter — High Quality Image Extractor Free | MyPDF4U",
    metaDescription:
      "Convert PDF pages into high-resolution JPG images in your browser for free. Single page downloads directly; multi-page PDFs download as a ZIP archive.",
    category: "Convert PDF",
    status: "live",
    popular: true,
    operation: "pdfToJpg",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Convert to JPG",
    outputHint: "One JPG per page. Multi-page files download as a ZIP archive.",
    options: [
      {
        key: "scale",
        label: "Image quality",
        type: "select",
        defaultValue: "2",
        choices: [
          { value: "1", label: "Screen (smaller files)" },
          { value: "2", label: "High (recommended)" },
          { value: "3", label: "Print (largest files)" },
        ],
      },
    ],
    steps: [
      "Choose the PDF you want to turn into images.",
      "Pick your desired output quality (Screen, High, or Print).",
      "Convert and download the JPG files individually or as a ZIP.",
    ],
    features: [
      {
        title: "Page-perfect rendering",
        body: "Pages are rendered exactly as they appear in a PDF reader with crisp fonts.",
      },
      {
        title: "Quality resolution control",
        body: "Choose screen, high or print resolution before converting.",
      },
      {
        title: "Bundled multi-page downloads",
        body: "Multi-page documents are packed into a convenient single ZIP archive.",
      },
    ],
    faqs: [
      {
        q: "How do I extract images from a multi-page PDF?",
        a: "Upload your multi-page PDF, choose High quality, and click Convert. You will receive all rendered pages packaged into a single ZIP file.",
      },
      {
        q: "Will converted text stay sharp in the JPG?",
        a: "Yes. Selecting 'High' or 'Print' renders typography at 200–300 DPI for crisp reading on all screens and prints.",
      },
      {
        q: "Can I convert password-protected PDFs?",
        a: "Protected PDFs must be unlocked first. Use our free Unlock PDF tool to remove the known password before converting.",
      },
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "compress-pdf", "split-pdf"],
    learn:
      "Extracting PDF pages as JPG images allows you to easily insert document scans into PowerPoint presentations, web pages, or email bodies without requiring a PDF reader.",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    h1: "Compress PDF — Reduce PDF File Size Online",
    tagline: "Reduce the size of a PDF so it's easy to email or upload without losing readability.",
    cardDescription: "Reduce PDF size quickly.",
    metaTitle: "Compress PDF — Reduce File Size Online Free | MyPDF4U",
    metaDescription:
      "Compress PDF files online for free. Reduce document size below 10MB or 25MB email limits with Light, Balanced, or Strong compression without blurry text.",
    category: "Optimize PDF",
    status: "live",
    popular: true,
    operation: "compressPdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Compress PDF",
    outputHint: "Pages are re-encoded as optimised images, so text becomes non-selectable.",
    options: [
      {
        key: "level",
        label: "Compression level",
        type: "select",
        defaultValue: "balanced",
        help: "Stronger compression means smaller files and softer detail.",
        choices: [
          { value: "light", label: "Light — best quality" },
          { value: "balanced", label: "Balanced — recommended" },
          { value: "strong", label: "Strong — smallest size" },
        ],
      },
    ],
    steps: [
      "Upload the PDF you want to shrink.",
      "Choose light, balanced (recommended), or strong compression.",
      "Click Compress PDF and download the smaller file instantly.",
    ],
    features: [
      {
        title: "Three tailored compression levels",
        body: "Pick the exact balance between smallest file size and high visual fidelity.",
      },
      {
        title: "Cuts up to 80% of file size",
        body: "Massive savings on high-DPI scans, photos, and slide decks.",
      },
      {
        title: "Confidential local compression",
        body: "Optimization happens in your browser without transmitting files over the web.",
      },
    ],
    faqs: [
      {
        q: "How do I compress a PDF under 25MB for Gmail or Outlook?",
        a: "Upload your document to MyPDF4U's Compress PDF tool, select 'Balanced' compression, and click Compress. It resamples bulky scan images to under 25MB.",
      },
      {
        q: "How much smaller will my PDF file become?",
        a: "Scanned documents and image-heavy files usually drop by 50% to 80% in size. Text-only documents see smaller reductions.",
      },
      {
        q: "Is the PDF compressor free with no file limit?",
        a: "Yes. There are no daily conversion caps, no watermarks, and no sign-up requirements.",
      },
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    learn:
      "PDF file bloat almost always comes from uncompressed 300+ DPI scan images. Intelligent downsampling to 150 DPI provides sharp viewing while cutting megabytes off your document.",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    h1: "Merge PDF Files — Combine PDFs Online for Free",
    tagline: "Combine multiple PDF documents into one ordered file in seconds.",
    cardDescription: "Combine multiple PDFs into one.",
    metaTitle: "Merge PDF — Combine PDF Files Online Free (No Limits) | MyPDF4U",
    metaDescription:
      "Combine multiple PDF files into a single document online for free. Reorder pages visually and merge unlimited PDFs with no upload and no sign-up.",
    category: "Organize PDF",
    status: "live",
    popular: true,
    operation: "mergePdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: true,
    reorder: true,
    ctaLabel: "Select PDF files",
    actionLabel: "Merge PDFs",
    outputHint: "Pages are copied in the order shown in the list.",
    steps: [
      "Add two or more PDF files from your computer or phone.",
      "Drag the cards into your desired reading order.",
      "Click Merge PDFs and download the consolidated document.",
    ],
    features: [
      {
        title: "Byte-for-byte lossless quality",
        body: "Pages are joined without re-encoding, preserving exact text, vectors, and layouts.",
      },
      {
        title: "Unlimited file merging",
        body: "Combine as many files as you need with no artificial document caps.",
      },
      {
        title: "Visual drag-and-drop ordering",
        body: "Arrange documents effortlessly before finalizing the combined file.",
      },
    ],
    faqs: [
      {
        q: "How do I combine PDF files for free without Adobe Acrobat?",
        a: "Drag all your PDF files into MyPDF4U's Merge PDF tool, arrange their sequence, and click Merge PDFs. It combines documents for free with zero upload.",
      },
      {
        q: "Is there a limit on how many PDFs I can merge?",
        a: "No. You can merge 2, 10, or 50+ files smoothly inside your browser memory.",
      },
      {
        q: "Does merging reduce PDF quality?",
        a: "No. Content streams are appended directly without quality degradation.",
      },
    ],
    related: ["split-pdf", "organize-pdf", "compress-pdf", "rotate-pdf"],
    learn:
      "Merging is the fastest way to assemble comprehensive job application packets (CV + Cover Letter + Certifications) or consolidate invoices into a single accounting file.",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Split PDF — Extract Pages Online for Free",
    tagline: "Extract specific page ranges or split a PDF into separate files.",
    cardDescription: "Extract pages from a PDF.",
    metaTitle: "Split PDF — Extract Pages Online Free | MyPDF4U",
    metaDescription:
      "Split a PDF into separate files or extract specific page ranges (e.g. 1-3, 7) online for free. Fast, private, and runs entirely in your browser.",
    category: "Organize PDF",
    status: "live",
    popular: true,
    operation: "splitPdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Split PDF",
    outputHint: "Several outputs are delivered as a ZIP archive.",
    options: [
      {
        key: "ranges",
        label: "Page ranges",
        type: "text",
        placeholder: "e.g. 1-3, 5, 8-10",
        defaultValue: "",
        help: "Leave empty to split every page into its own PDF.",
      },
    ],
    steps: [
      "Upload the PDF you want to split.",
      "Type the page ranges to extract (e.g. 1-3, 5), or leave blank to burst every page.",
      "Split and download the resulting PDF files.",
    ],
    features: [
      { title: "Custom page range extraction", body: "Extract single pages and ranges like 1-4, 7, 10-12." },
      {
        title: "Burst all pages into separate files",
        body: "Leave the field blank to create an individual PDF for every single page.",
      },
      { title: "Original document fidelity", body: "Pages are extracted with exact fonts and images." },
    ],
    faqs: [
      {
        q: "How do I extract only one page from a PDF?",
        a: "Type the page number (e.g. '4') in the page range box and click Split PDF to download that single page.",
      },
      {
        q: "Why do multiple split pages arrive in a ZIP file?",
        a: "When a split operation produces multiple PDF files, they are packaged into one convenient ZIP archive.",
      },
      {
        q: "Does splitting a PDF damage its resolution?",
        a: "No. Pages are extracted byte-for-byte with no compression or layout alteration.",
      },
    ],
    related: ["merge-pdf", "organize-pdf", "rotate-pdf", "compress-pdf"],
    learn:
      "Splitting is helpful when you only need to share a specific contract clause, single payslip, or book chapter without sending confidential surrounding pages.",
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    h1: "PDF to PNG Converter — Free Lossless Image Export",
    tagline: "Render PDF pages into crystal-clear lossless PNG images.",
    cardDescription: "Export pages as lossless PNG files.",
    metaTitle: "PDF to PNG Converter — Free Lossless Image Export | MyPDF4U",
    metaDescription:
      "Convert PDF pages into lossless PNG images online for free. Perfect for charts, diagrams, and fine typography. Fast in-browser ZIP download.",
    category: "Convert PDF",
    status: "live",
    popular: true,
    operation: "pdfToPng",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Convert to PNG",
    outputHint: "One PNG per page. Multi-page files download as a ZIP archive.",
    options: [
      {
        key: "scale",
        label: "Image quality",
        type: "select",
        defaultValue: "2",
        choices: [
          { value: "1", label: "Screen (smaller files)" },
          { value: "2", label: "High (recommended)" },
          { value: "3", label: "Print (largest files)" },
        ],
      },
    ],
    steps: ["Add your PDF.", "Choose a rendering quality.", "Convert and download the PNG images."],
    features: [
      {
        title: "Lossless vector clarity",
        body: "PNG retains sharp edges and readable typography on charts and diagrams.",
      },
      { title: "Adjustable DPI scale", body: "Render at Screen, High (200 DPI), or Print (300 DPI)." },
      { title: "Batch download", body: "All exported PNG pages arrive together in one ZIP." },
    ],
    faqs: [
      {
        q: "Should I convert PDF to PNG or JPG?",
        a: "Use PNG for spreadsheets, diagrams, and text where razor-sharp lines matter. Use JPG for photograph-heavy documents.",
      },
      {
        q: "Is transparency preserved in PDF to PNG conversion?",
        a: "Pages are rendered over a clean white background matching standard paper reading.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "compress-pdf", "split-pdf"],
    learn:
      "PNG uses lossless compression, making it the superior format when page images will be annotated, cropped, or embedded into slide presentations.",
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    h1: "PNG to PDF Converter — Combine PNGs into PDF Free",
    tagline: "Turn PNG screenshots and graphics into clean, high-resolution PDFs.",
    cardDescription: "Combine PNG images into a PDF.",
    metaTitle: "PNG to PDF Converter — Free Online (Lossless Quality) | MyPDF4U",
    metaDescription:
      "Convert PNG images and screenshots into a single PDF online for free. Reorder pages, keep full quality, and download instantly without signing up.",
    category: "Images to PDF",
    status: "live",
    popular: true,
    operation: "imagesToPdf",
    accept: IMAGE_ACCEPT,
    acceptLabel: "PNG, JPG and JPEG images",
    multiple: true,
    reorder: true,
    ctaLabel: "Select PNG images",
    actionLabel: "Convert to PDF",
    outputHint: "One PDF page per image, in the order you arrange them.",
    steps: ["Add your PNG images.", "Arrange the page order.", "Convert and download the PDF."],
    features: [
      { title: "Sharp screenshot rendering", body: "Screenshots stay pixel-accurate with zero blurry artifacts." },
      { title: "Mix PNG and JPG formats", body: "Combine different image types in the same document." },
      { title: "Instant local download", body: "Generated directly on your device with no upload delay." },
    ],
    faqs: [
      {
        q: "Can I combine multiple PNG files into one PDF?",
        a: "Yes. Add all your PNG screenshots, arrange them in the grid, and download a single multi-page PDF.",
      },
      {
        q: "How are transparent PNG backgrounds handled?",
        a: "Transparent pixels are rendered cleanly on a white background, preventing any black box artifacts.",
      },
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "image-to-pdf", "merge-pdf"],
    learn:
      "PNG is the standard capture format on Mac, Windows, and smartphones. Converting captures to PDF creates professional, ordered reports.",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    h1: "Image to PDF Converter — JPG, PNG, WebP to PDF Free",
    tagline: "Convert a mix of photos and images into one organized PDF document.",
    cardDescription: "Any supported image into a PDF.",
    metaTitle: "Image to PDF Converter — JPG & PNG to PDF Free | MyPDF4U",
    metaDescription:
      "Convert JPG, JPEG, and PNG images into a single PDF online for free. Reorder pages, keep original resolution, and download in one click.",
    category: "Images to PDF",
    status: "live",
    popular: true,
    operation: "imagesToPdf",
    accept: IMAGE_ACCEPT,
    acceptLabel: "JPG, JPEG and PNG images",
    multiple: true,
    reorder: true,
    ctaLabel: "Select images",
    actionLabel: "Convert to PDF",
    outputHint: "One PDF page per image, in the order you arrange them.",
    steps: ["Add your images.", "Set the page order.", "Convert and download."],
    features: [
      { title: "Unified document output", body: "Every picture becomes a distinct page in one PDF." },
      { title: "Zero quality loss", body: "Photos are embedded at 100% full original resolution." },
      { title: "Private and offline-capable", body: "Processes client-side with no remote server upload." },
    ],
    faqs: [
      {
        q: "What image formats are supported?",
        a: "JPG, JPEG, and PNG are supported. HEIC photos can be converted via iPhone export.",
      },
      {
        q: "Do I need an account to convert images?",
        a: "No. All MyPDF4U tools work without registration or payment.",
      },
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "compress-pdf", "merge-pdf"],
    learn:
      "Grouping images into a PDF ensures pages open in sequence on every device, without relying on alphabetical file names.",
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    h1: "Rotate PDF Pages — Permanently Fix Sideways PDFs",
    tagline: "Permanently rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees.",
    cardDescription: "Turn pages the right way up.",
    metaTitle: "Rotate PDF Pages Online Free — Permanent Rotation | MyPDF4U",
    metaDescription:
      "Rotate PDF pages online by 90, 180, or 270 degrees and save permanently. Fix scanned pages for free directly in your browser.",
    category: "Edit PDF",
    status: "live",
    operation: "rotatePdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Rotate PDF",
    outputHint: "Rotation is applied to every page and saved into the file.",
    options: [
      {
        key: "angle",
        label: "Rotation",
        type: "select",
        defaultValue: "90",
        choices: [
          { value: "90", label: "90° clockwise" },
          { value: "180", label: "180°" },
          { value: "270", label: "90° counter-clockwise" },
        ],
      },
      {
        key: "pages",
        label: "Pages to rotate",
        type: "text",
        placeholder: "e.g. 1, 3-5",
        defaultValue: "",
        help: "Leave empty to rotate every page.",
      },
    ],
    steps: [
      "Upload the PDF.",
      "Choose the angle (90°, 180°, 270°) and target page numbers.",
      "Save and download your permanently rotated PDF.",
    ],
    features: [
      {
        title: "Permanent PDF rotation",
        body: "Rotation is written directly into the document metadata, not just the viewer.",
      },
      {
        title: "Selective page targeting",
        body: "Rotate entire documents or only specific sideways pages (e.g. 2, 4-6).",
      },
      {
        title: "Instant lossless save",
        body: "No re-encoding required — finishes in less than a second.",
      },
    ],
    faqs: [
      {
        q: "Will the rotated PDF stay the right way up in other apps?",
        a: "Yes. The rotation orientation flag is written permanently into the PDF file specification.",
      },
      {
        q: "Can I rotate just one page in a multi-page PDF?",
        a: "Yes. Type the page number (e.g. '3') in the Pages to Rotate field.",
      },
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "Document scanners often output orientation flags inconsistently. Permanent rotation ensures pages print and display identically across all platforms.",
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    h1: "Organize PDF — Reorder and Delete PDF Pages",
    tagline: "Rearrange, duplicate, or delete pages in your PDF document with ease.",
    cardDescription: "Reorder and delete pages.",
    metaTitle: "Organize PDF — Reorder & Delete Pages Online Free | MyPDF4U",
    metaDescription:
      "Rebuild a PDF with the exact pages you want in your preferred order. Reorder, duplicate, and delete PDF pages online for free.",
    category: "Organize PDF",
    status: "live",
    operation: "organizePdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Rebuild PDF",
    outputHint: "Only the pages you list are kept, in the order you list them.",
    options: [
      {
        key: "order",
        label: "Page order",
        type: "text",
        placeholder: "e.g. 3, 1, 2, 5-8",
        defaultValue: "",
        help: "Leave empty to keep the current order. Pages you leave out are removed.",
      },
      {
        key: "rotate",
        label: "Rotate kept pages",
        type: "select",
        defaultValue: "0",
        choices: [
          { value: "0", label: "Keep orientation" },
          { value: "90", label: "90° clockwise" },
          { value: "180", label: "180°" },
          { value: "270", label: "90° counter-clockwise" },
        ],
      },
    ],
    steps: [
      "Upload your PDF.",
      "Type your desired page sequence (e.g. 3, 1, 2, 5-8). Omitted pages are removed.",
      "Rebuild and download your restructured PDF.",
    ],
    features: [
      { title: "Reorder & delete in one step", body: "A single page string controls order, removal, and duplication." },
      { title: "Full range syntax support", body: "Combine ranges and single pages (e.g. 3, 1, 5-10)." },
      { title: "Lossless extraction", body: "Pages are copied without re-compression." },
    ],
    faqs: [
      {
        q: "How do I delete page 2 from a 5-page PDF?",
        a: "Enter '1, 3-5' in the page order box. Page 2 is omitted and deleted.",
      },
      {
        q: "Can I duplicate a page?",
        a: "Yes. Listing the same page number twice (e.g. 1, 1, 2, 3) duplicates that page.",
      },
    ],
    related: ["merge-pdf", "split-pdf", "rotate-pdf", "compress-pdf"],
    learn:
      "Restructuring page order creates a clean copy of your document while keeping your original source file completely untouched.",
  },
  {
    slug: "watermark-pdf",
    name: "Watermark PDF",
    h1: "Watermark PDF — Add Text Watermarks to PDF Free",
    tagline: "Stamp custom text like DRAFT, CONFIDENTIAL, or your company name across every page.",
    cardDescription: "Stamp text across every page.",
    metaTitle: "Watermark PDF — Add Text Watermarks Online Free | MyPDF4U",
    metaDescription:
      "Add custom diagonal or corner text watermarks (e.g. DRAFT, CONFIDENTIAL) to every page of a PDF online for free in your browser.",
    category: "Edit PDF",
    status: "live",
    operation: "watermarkPdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Add watermark",
    outputHint: "A semi-transparent diagonal stamp is drawn on every page.",
    options: [
      {
        key: "text",
        label: "Watermark text",
        type: "text",
        placeholder: "CONFIDENTIAL",
        defaultValue: "CONFIDENTIAL",
        help: "Short words work best — long text is scaled down to fit.",
      },
      {
        key: "position",
        label: "Position",
        type: "select",
        defaultValue: "center",
        choices: [
          { value: "center", label: "Centre (diagonal)" },
          { value: "top-left", label: "Top left" },
          { value: "top-right", label: "Top right" },
          { value: "bottom-left", label: "Bottom left" },
          { value: "bottom-right", label: "Bottom right" },
        ],
      },
      {
        key: "opacity",
        label: "Opacity",
        type: "select",
        defaultValue: "0.22",
        choices: [
          { value: "0.1", label: "Very light (10%)" },
          { value: "0.22", label: "Light (22%) — recommended" },
          { value: "0.4", label: "Medium (40%)" },
          { value: "0.65", label: "Strong (65%)" },
        ],
      },
      {
        key: "size",
        label: "Text size",
        type: "select",
        defaultValue: "auto",
        choices: [
          { value: "small", label: "Small" },
          { value: "auto", label: "Fit the page" },
          { value: "large", label: "Large" },
        ],
      },
    ],
    steps: [
      "Upload your PDF document.",
      "Type your watermark text, position (center/corner), and transparency.",
      "Apply watermark and download your stamped document.",
    ],
    features: [
      { title: "Custom placement control", body: "Stamp diagonally across the center or in any corner." },
      { title: "Adjustable opacity levels", body: "Choose from subtle 10% watermark to prominent 65% mark." },
      { title: "Preserves underlying text", body: "Original text remains selectable underneath the watermark." },
    ],
    faqs: [
      {
        q: "Can I customize the watermark text?",
        a: "Yes. You can enter any custom phrase such as DRAFT, SAMPLE, COPY, or client names.",
      },
      {
        q: "Does watermarking affect text selection?",
        a: "No. Existing text layers remain fully searchable and selectable.",
      },
    ],
    related: ["protect-pdf", "compress-pdf", "merge-pdf", "rotate-pdf"],
    learn:
      "Watermarks signal document status (draft, confidential, proprietary) to deter unauthorized sharing before contracts or proposals are finalized.",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    h1: "PDF to Word Converter — Free Editable DOCX Online",
    tagline: "Convert PDF files into editable Microsoft Word (.docx) documents in your browser.",
    cardDescription: "Convert PDF files into editable documents.",
    metaTitle: "PDF to Word Converter — Free & Editable DOCX Online | MyPDF4U",
    metaDescription:
      "Convert PDF into editable Microsoft Word (.docx) documents in your browser for free. Text is extracted locally with 100% privacy and no upload.",
    category: "Convert PDF",
    status: "live",
    popular: true,
    operation: "pdfToWord",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Convert to Word",
    outputHint: "You get a .docx file with the document's text as editable paragraphs.",
    steps: [
      "Upload the PDF you want to convert to Word.",
      "Click Convert to Word — text is extracted locally inside your browser.",
      "Download the editable .docx file and open in Word, Pages, or Google Docs.",
    ],
    features: [
      { title: "Fully editable Word paragraphs", body: "Converts text runs into standard editable Word docx paragraphs." },
      { title: "Complete privacy protection", body: "Your files are never uploaded to any cloud server." },
      { title: "Universal compatibility", body: "Outputs standard .docx compatible with Microsoft 365, Word, and Docs." },
    ],
    faqs: [
      {
        q: "How do I convert a PDF to an editable Word document for free?",
        a: "Upload your PDF to MyPDF4U's PDF to Word tool and click Convert. You can download the editable .docx file immediately.",
      },
      {
        q: "Why is my converted Word file blank?",
        a: "Scanned image-only PDFs do not have a text layer. Use our OCR PDF tool first to create a searchable text layer, then convert to Word.",
      },
    ],
    related: ["word-to-pdf", "ocr-pdf", "pdf-to-jpg", "merge-pdf"],
    learn:
      "PDFs store positioned glyph coordinates rather than natural word flows. Our parser reconstructs paragraph groupings so you can edit text immediately.",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    h1: "Word to PDF Converter — Convert DOCX to PDF Free",
    tagline: "Turn DOCX documents into clean, shareable PDF files in your browser.",
    cardDescription: "Turn DOC and DOCX files into PDFs.",
    metaTitle: "Word to PDF Converter — Convert DOCX to PDF Free | MyPDF4U",
    metaDescription:
      "Convert Word (.docx) documents into print-ready PDF files in your browser for free. Instant conversion, clean A4 layout, and zero upload.",
    category: "Documents to PDF",
    status: "live",
    popular: true,
    operation: "wordToPdf",
    accept: ".docx",
    acceptLabel: "DOCX documents",
    multiple: false,
    ctaLabel: "Select Word file",
    actionLabel: "Convert to PDF",
    outputHint: "Text is laid out on A4 pages. Images and complex layout are simplified.",
    steps: [
      "Choose your .docx file.",
      "Click Convert to PDF — rendered locally in your browser.",
      "Download your finished PDF document.",
    ],
    features: [
      { title: "Zero cloud upload required", body: "Read and converted locally inside your browser tab." },
      { title: "Standard A4 layout", body: "Clean paragraph wrapping with standard margins." },
      { title: "Instant conversion", body: "Typical documents convert in less than two seconds." },
    ],
    faqs: [
      {
        q: "How do I convert a Word docx to PDF for free?",
        a: "Select your .docx file on the Word to PDF page and click Convert to PDF to generate and download your PDF instantly.",
      },
      {
        q: "Can I convert legacy .doc files?",
        a: "Please save .doc files as modern .docx in Word or Google Docs before converting.",
      },
    ],
    related: ["pdf-to-word", "merge-pdf", "compress-pdf", "image-to-pdf"],
    learn:
      "Word documents reflow depending on the recipient's installed fonts. Converting to PDF locks layout and typography permanently across all devices.",
  },
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    h1: "Protect PDF — Add Password Protection to PDF",
    tagline: "Secure your PDF with strong password encryption.",
    cardDescription: "Add a password to a PDF.",
    metaTitle: "Protect PDF — Add Password Protection Online | MyPDF4U",
    metaDescription:
      "Secure and password-protect your PDF documents. Client-side encryption ensures only authorized recipients can open your files.",
    category: "Security",
    status: "soon",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Protect PDF",
    outputHint: "",
    steps: [
      "Upload the PDF you want to secure.",
      "Enter a strong password to lock the document.",
      "Download your encrypted password-protected PDF.",
    ],
    features: [
      { title: "Strong document encryption", body: "Locks viewing access behind password protection." },
      { title: "Client-side security", body: "Your password and file never leave your browser." },
    ],
    faqs: [
      {
        q: "How do I add a password to a PDF?",
        a: "Upload your document, choose your security password, and generate an encrypted copy.",
      },
    ],
    related: ["unlock-pdf", "watermark-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "PDF open passwords prevent unauthorized access by requiring a key before document contents can be decrypted by any PDF viewer.",
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    h1: "Unlock PDF — Remove Password from PDF Free Online",
    tagline: "Remove known passwords from PDF files so they open without prompts.",
    cardDescription: "Remove a known password.",
    metaTitle: "Unlock PDF — Remove Password from PDF Online Free | MyPDF4U",
    metaDescription:
      "Remove known passwords from protected PDFs in your browser for free. Decrypted copies open instantly without password prompts.",
    category: "Security",
    status: "live",
    operation: "unlockPdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Unlock PDF",
    outputHint: "Pages are rebuilt without encryption, so text becomes non-selectable.",
    options: [
      {
        key: "password",
        label: "Document password",
        type: "password",
        placeholder: "Enter the password you use to open the file",
        defaultValue: "",
        help: "The password stays in this browser tab and is never sent anywhere.",
      },
    ],
    steps: [
      "Upload the protected PDF.",
      "Type the password you use to open it.",
      "Click Unlock PDF and download your unencrypted copy.",
    ],
    features: [
      { title: "Password never leaves your device", body: "Decryption executes entirely in your browser memory." },
      { title: "Permanent password removal", body: "The unlocked PDF opens seamlessly without password prompts." },
      { title: "Free with no account", body: "Unlock documents instantly without registration." },
    ],
    faqs: [
      {
        q: "Will this tool crack an unknown password?",
        a: "No. You must enter the correct password. This tool removes protection from files you are authorized to open.",
      },
      {
        q: "Do you save or log my document password?",
        a: "Never. Passwords are processed in temporary local memory and never transmitted.",
      },
    ],
    related: ["protect-pdf", "ocr-pdf", "split-pdf", "compress-pdf"],
    learn:
      "Removing passwords simplifies sharing and printing for documents you legitimately own, avoiding repetitive password prompts.",
  },
  {
    slug: "heic-to-pdf",
    name: "HEIC to PDF",
    h1: "HEIC to PDF Converter — Convert iPhone Photos to PDF",
    tagline: "Convert Apple iPhone HEIC/HEIF photos into universal PDF documents.",
    cardDescription: "Convert iPhone photos to PDF.",
    metaTitle: "HEIC to PDF Converter — iPhone Photos to PDF Free | MyPDF4U",
    metaDescription:
      "Convert Apple iPhone HEIC and HEIF photos into PDF documents online for free. Combine multiple iPhone photos into one shareable file.",
    category: "Images to PDF",
    status: "soon",
    accept: ".heic,.heif",
    acceptLabel: "HEIC and HEIF photos",
    multiple: true,
    ctaLabel: "Select HEIC photos",
    actionLabel: "Convert to PDF",
    outputHint: "",
    steps: [
      "Select your iPhone HEIC photos.",
      "Arrange page order and orientation.",
      "Convert and download your combined PDF.",
    ],
    features: [
      { title: "Apple HEIC support", body: "Converts iPhone photos into standard PDF pages." },
      { title: "Batch photo conversion", body: "Combine multiple HEIC captures into a single document." },
    ],
    faqs: [
      {
        q: "How can I convert HEIC photos to PDF today?",
        a: "On iPhone: Share photo via Print, pinch out on preview to reveal PDF, and Save to Files. Or export as JPG and use our JPG to PDF tool.",
      },
    ],
    related: ["jpg-to-pdf", "image-to-pdf", "png-to-pdf", "compress-pdf"],
    learn:
      "HEIC is Apple's high-efficiency photo format. Wrapping photos into a PDF ensures they open on Windows, Android, and all web browsers without codec errors.",
  },
  {
    slug: "ocr-pdf",
    name: "OCR PDF",
    h1: "OCR PDF — Make Scanned PDFs Searchable Online Free",
    tagline: "Recognize text inside scanned documents and create searchable, copyable PDFs.",
    cardDescription: "Make scanned PDFs searchable.",
    metaTitle: "OCR PDF — Make Scanned PDFs Searchable Free Online | MyPDF4U",
    metaDescription:
      "Recognize text in scanned PDFs online for free with optical character recognition. Turn image scans into searchable, selectable PDF documents.",
    category: "Optimize PDF",
    status: "live",
    operation: "ocrPdf",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Run OCR",
    outputHint: "The result looks identical but the recognised text can be searched and copied.",
    options: [
      {
        key: "language",
        label: "Document language",
        type: "select",
        defaultValue: "eng",
        help: "The matching language data is downloaded once, the first time you run OCR.",
        choices: [
          { value: "eng", label: "English" },
          { value: "spa", label: "Spanish" },
          { value: "fra", label: "French" },
          { value: "deu", label: "German" },
          { value: "por", label: "Portuguese" },
          { value: "ita", label: "Italian" },
          { value: "nld", label: "Dutch" },
        ],
      },
    ],
    steps: [
      "Upload the scanned PDF.",
      "Select your document language (English, Spanish, German, etc.).",
      "Run OCR and download your searchable PDF with selectable text.",
    ],
    features: [
      {
        title: "Searchable and selectable text",
        body: "Invisible recognized text overlay allows Ctrl+F search and copy-pasting.",
      },
      {
        title: "Private local OCR recognition",
        body: "Tesseract OCR engine runs client-side inside your browser tab.",
      },
      {
        title: "7 European languages supported",
        body: "Accurate character recognition in English, Spanish, French, German, Portuguese, Italian, and Dutch.",
      },
    ],
    faqs: [
      {
        q: "How do I make a scanned PDF searchable for free?",
        a: "Upload your scanned PDF to MyPDF4U's OCR PDF tool, choose your language, and click Run OCR. It overlays a recognized text layer.",
      },
      {
        q: "Can I copy text from a scanned PDF after OCR?",
        a: "Yes. OCR generates selectable text so you can highlight, copy, and paste words into Word or email.",
      },
    ],
    related: ["pdf-to-word", "compress-pdf", "pdf-to-jpg", "split-pdf"],
    learn:
      "Scanned documents are pictures of paper with no underlying text data. OCR identifies character shapes and builds a text index directly over the page image.",
  },
];

export const toolsBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export const getTool = (slug: string) => toolsBySlug.get(slug);

export const popularTools = tools.filter((tool) => tool.popular);

export const liveTools = tools.filter((tool) => tool.status === "live");

/** The four tools people reach for most, surfaced at the top of the tools page. */
export const mostUsedSlugs = ["jpg-to-pdf", "compress-pdf", "pdf-to-word", "pdf-to-jpg"] as const;

export const mostUsedTools = mostUsedSlugs
  .map((slug) => toolsBySlug.get(slug))
  .filter((tool): tool is ToolDefinition => Boolean(tool));

/** Image → PDF tools get the interactive thumbnail workspace. */
export const isImageWorkspace = (tool: ToolDefinition) => tool.operation === "imagesToPdf";

export const categories: ToolCategory[] = [
  "Convert PDF",
  "Images to PDF",
  "Organize PDF",
  "Optimize PDF",
  "Edit PDF",
  "Security",
  "Documents to PDF",
];

export const toolsByCategory = categories.map((category) => ({
  category,
  items: tools.filter((tool) => tool.category === category),
}));
