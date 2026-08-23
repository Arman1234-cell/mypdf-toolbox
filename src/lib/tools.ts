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
    h1: "JPG to PDF Converter",
    tagline: "Convert JPG images into a PDF quickly and easily.",
    cardDescription: "Turn images into a single PDF.",
    metaTitle: "JPG to PDF Converter — Free & In-Browser | MyPDF4U",
    metaDescription:
      "Convert JPG images into one PDF right in your browser. Drag, drop, reorder pages and download instantly. No account, no installation.",
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
      "Drag the files to set the page order you want.",
      "Press Convert to PDF and download the finished document.",
    ],
    features: [
      {
        title: "Runs in your browser",
        body: "Images never leave your device — the PDF is built locally.",
      },
      {
        title: "Keeps full resolution",
        body: "Each page matches the original pixel size of the image.",
      },
      {
        title: "Reorder before converting",
        body: "Move files up or down until the page order is right.",
      },
    ],
    faqs: [
      {
        q: "Can I combine several JPG files into one PDF?",
        a: "Yes. Add as many images as you need, arrange them, and they become one PDF with a page per image.",
      },
      {
        q: "Do you upload my images to a server?",
        a: "No. This tool converts your images inside your browser tab, so nothing is transmitted to us.",
      },
      {
        q: "Does the tool support PNG too?",
        a: "It does. JPG, JPEG and PNG images can be mixed in the same document.",
      },
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "Photos taken on a phone are usually JPG files. Wrapping them into a PDF keeps a scanned receipt, ID or homework page together as one document that opens identically on every device, which is why most schools and offices ask for PDF rather than a folder of images.",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    h1: "PDF to JPG Converter",
    tagline: "Turn each page of a PDF into a JPG image.",
    cardDescription: "Turn PDF pages into JPG images.",
    metaTitle: "PDF to JPG Converter — Extract Pages as Images | MyPDF4U",
    metaDescription:
      "Convert PDF pages into high-quality JPG images in your browser. Single page downloads directly, multi-page PDFs arrive as a ZIP.",
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
      "Pick the output quality that fits your use.",
      "Convert and download the JPG files.",
    ],
    features: [
      {
        title: "Page-perfect rendering",
        body: "Pages are rendered exactly as they appear in a PDF reader.",
      },
      {
        title: "Quality you control",
        body: "Choose screen, high or print resolution before converting.",
      },
      {
        title: "Bundled downloads",
        body: "Multi-page documents are packed into a single ZIP file.",
      },
    ],
    faqs: [
      {
        q: "What happens with a 20-page PDF?",
        a: "You get 20 JPG images bundled in one ZIP download.",
      },
      {
        q: "Will text stay sharp?",
        a: "Choose High or Print quality for crisp text; Screen is best for previews.",
      },
      {
        q: "Can I convert a protected PDF?",
        a: "Password-protected files must be unlocked first — the tool cannot open them.",
      },
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "compress-pdf", "split-pdf"],
    learn:
      "Images are handy when a page needs to go into a slide deck, a chat message or a web page. Converting to JPG keeps file sizes small, while PNG is the better pick when you need crisp lines or transparency.",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    h1: "Compress PDF",
    tagline: "Reduce the size of a PDF so it's easy to email or upload.",
    cardDescription: "Reduce PDF size quickly.",
    metaTitle: "Compress PDF — Reduce File Size Online | MyPDF4U",
    metaDescription:
      "Shrink PDF files in your browser with light, balanced or strong compression. Ideal for email attachments and upload limits.",
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
      "Add the PDF you want to make smaller.",
      "Choose light, balanced or strong compression.",
      "Compress and download the smaller file.",
    ],
    features: [
      {
        title: "Three clear levels",
        body: "Pick the balance between file size and visual quality.",
      },
      { title: "Great for scans", body: "Photo-heavy documents and scans shrink the most." },
      { title: "Local processing", body: "Compression happens in your browser, not on a server." },
    ],
    faqs: [
      {
        q: "Will the text still be selectable?",
        a: "No. This compressor rasterises pages, which is what makes scans much smaller. Use Light if you need maximum fidelity.",
      },
      {
        q: "How much smaller will my file be?",
        a: "Scans and image-heavy PDFs often drop by 50–80%. Text-only files shrink less.",
      },
      {
        q: "Is there a size limit?",
        a: "The limit is your device's memory. Very large files take longer to process.",
      },
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    learn:
      "Most PDF bloat comes from full-resolution photos embedded in the page. Re-encoding those images at a sensible resolution is the single biggest win, and it is usually enough to slip under a 10 MB email limit.",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    h1: "Merge PDF Files",
    tagline: "Combine several PDFs into one document, in the order you choose.",
    cardDescription: "Combine multiple PDFs into one.",
    metaTitle: "Merge PDF — Combine PDF Files Online | MyPDF4U",
    metaDescription:
      "Combine multiple PDF files into a single document. Reorder before merging and download instantly — free and browser-based.",
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
      "Add two or more PDF files.",
      "Drag them into the order you want.",
      "Merge and download the combined PDF.",
    ],
    features: [
      {
        title: "Keeps original pages",
        body: "Pages are copied without re-encoding, so quality is untouched.",
      },
      { title: "Full control of order", body: "Reorder files before merging with a single drag." },
      {
        title: "No file count limit",
        body: "Merge as many documents as your device can hold in memory.",
      },
    ],
    faqs: [
      {
        q: "Are bookmarks kept?",
        a: "Page content and layout are preserved; document-level bookmarks are not carried over.",
      },
      {
        q: "Can I merge a protected PDF?",
        a: "Not yet — remove the password in your PDF reader first.",
      },
      {
        q: "Is the order guaranteed?",
        a: "Yes, the merged file follows exactly the order shown in the file list.",
      },
    ],
    related: ["split-pdf", "organize-pdf", "compress-pdf", "rotate-pdf"],
    learn:
      "Merging is the fastest way to turn a scattered set of invoices, contracts or chapters into one file that can be signed, printed or archived as a single unit.",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Split PDF",
    tagline: "Extract pages or break a PDF into separate documents.",
    cardDescription: "Extract pages from a PDF.",
    metaTitle: "Split PDF — Extract Pages Online | MyPDF4U",
    metaDescription:
      "Split a PDF into separate files or pull out specific page ranges such as 1-3, 7. Runs entirely in your browser.",
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
      "Type the page ranges to extract, or leave the field empty.",
      "Split and download the resulting files.",
    ],
    features: [
      { title: "Flexible ranges", body: "Mix single pages and ranges, like 1-3, 5, 9-12." },
      {
        title: "One file per page",
        body: "Leave the field blank to burst the document into single pages.",
      },
      { title: "Original quality", body: "Pages are copied as-is with no re-compression." },
    ],
    faqs: [
      {
        q: "How do I extract just one page?",
        a: "Type its page number, for example 4, and split.",
      },
      {
        q: "Why did I get a ZIP file?",
        a: "When a split produces more than one PDF we bundle them so it's a single download.",
      },
      {
        q: "Does splitting change quality?",
        a: "No, pages are copied byte-for-byte into the new documents.",
      },
    ],
    related: ["merge-pdf", "organize-pdf", "rotate-pdf", "compress-pdf"],
    learn:
      "Splitting is useful when only part of a document should be shared — a single payslip from a yearly statement, or one chapter from a long report — without exposing everything else.",
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    h1: "PDF to PNG Converter",
    tagline: "Render PDF pages as sharp PNG images.",
    cardDescription: "Export pages as lossless PNG files.",
    metaTitle: "PDF to PNG Converter — Lossless Page Images | MyPDF4U",
    metaDescription:
      "Convert PDF pages into lossless PNG images in your browser. Perfect for diagrams, screenshots and documents with fine lines.",
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
        title: "Lossless output",
        body: "PNG keeps every line crisp — ideal for charts and diagrams.",
      },
      { title: "Choose the resolution", body: "Render at screen, high or print scale." },
      { title: "Batch friendly", body: "All pages arrive together in one ZIP." },
    ],
    faqs: [
      {
        q: "PNG or JPG?",
        a: "Use PNG for text, diagrams and line art; JPG for photo-heavy pages and smaller files.",
      },
      {
        q: "Are PNGs bigger?",
        a: "Usually yes, because PNG is lossless. Lower the quality setting if size matters.",
      },
      {
        q: "Is transparency preserved?",
        a: "Pages are rendered on a white background so they look like printed pages.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "compress-pdf", "split-pdf"],
    learn:
      "PNG uses lossless compression, so repeated edits never degrade quality. That makes it the safer format when a page image will be cropped, annotated or re-exported later.",
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    h1: "PNG to PDF Converter",
    tagline: "Turn PNG images into a clean, shareable PDF.",
    cardDescription: "Combine PNG images into a PDF.",
    metaTitle: "PNG to PDF Converter — Free Online | MyPDF4U",
    metaDescription:
      "Convert PNG images into a single PDF document in your browser. Reorder pages, keep full quality and download instantly.",
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
      { title: "Sharp screenshots", body: "PNG screenshots stay pixel-accurate inside the PDF." },
      { title: "Mix formats", body: "PNG and JPG images can share the same document." },
      { title: "Instant download", body: "The PDF is generated locally and ready in seconds." },
    ],
    faqs: [
      {
        q: "Can I combine PNG and JPG?",
        a: "Yes, both formats can be added to the same conversion.",
      },
      {
        q: "Does transparency survive?",
        a: "Transparent areas are rendered on a white page background.",
      },
      {
        q: "How many images can I add?",
        a: "There is no fixed limit — very large batches simply take longer.",
      },
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "image-to-pdf", "merge-pdf"],
    learn:
      "PNG is the default screenshot format on most operating systems, so a PNG-to-PDF step is often the last thing between a set of captures and a tidy report you can send to a colleague.",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    h1: "Image to PDF Converter",
    tagline: "Convert a mix of images into one tidy PDF document.",
    cardDescription: "Any supported image into a PDF.",
    metaTitle: "Image to PDF Converter — JPG & PNG to PDF | MyPDF4U",
    metaDescription:
      "Convert JPG and PNG images into a single PDF. Reorder the pages, keep the original quality and download in one click.",
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
      { title: "One document", body: "Every image becomes a page in a single, shareable PDF." },
      { title: "No quality loss", body: "Images are embedded at their original resolution." },
      {
        title: "Works offline-ish",
        body: "After the page loads, conversion needs no network round trip.",
      },
    ],
    faqs: [
      {
        q: "Which formats are supported?",
        a: "JPG, JPEG and PNG today. HEIC support is on the roadmap.",
      },
      {
        q: "Can I remove an image after adding it?",
        a: "Yes, each file in the list has a remove button.",
      },
      { q: "Do I need an account?", a: "No. All MyPDF4U tools work without signing up." },
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "compress-pdf", "merge-pdf"],
    learn:
      "Grouping images into a PDF preserves their order and orientation, which matters when a reviewer needs to read pages in sequence rather than guess from filenames.",
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    h1: "Rotate PDF",
    tagline: "Fix sideways or upside-down pages in seconds.",
    cardDescription: "Turn pages the right way up.",
    metaTitle: "Rotate PDF Pages Online — Free | MyPDF4U",
    metaDescription:
      "Rotate every page of a PDF by 90, 180 or 270 degrees and save the result permanently. Runs in your browser.",
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
      "Choose the angle and which pages to turn.",
      "Save and download the corrected file.",
    ],
    features: [
      {
        title: "Permanent fix",
        body: "The rotation is stored in the document, not just in the viewer.",
      },
      {
        title: "Whole file or single pages",
        body: "Rotate everything, or list only the pages that came in sideways.",
      },
      {
        title: "Instant and lossless",
        body: "No re-encoding, so even long documents finish immediately.",
      },
    ],
    faqs: [
      {
        q: "Can I rotate a single page?",
        a: "Yes. Type its page number in “Pages to rotate”, for example 3, or a mix such as 1, 4-6.",
      },
      { q: "Does rotating reduce quality?", a: "No, page content is untouched." },
      { q: "Will other apps see the rotation?", a: "Yes, it is written into the PDF itself." },
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "Scanners record a page orientation flag rather than physically turning the image. Saving a rotation writes that flag correctly so the document prints the way it looks on screen.",
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    h1: "Organize PDF Pages",
    tagline: "Reorder or remove pages by listing the order you want.",
    cardDescription: "Reorder and delete pages.",
    metaTitle: "Organize PDF — Reorder & Delete Pages | MyPDF4U",
    metaDescription:
      "Rebuild a PDF with the pages you want, in the order you want. Type a page order such as 3,1,2 and download the result.",
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
      "Upload the PDF.",
      "Type the page order you want to keep.",
      "Rebuild and download the new file.",
    ],
    features: [
      {
        title: "Reorder and delete at once",
        body: "One page list controls both order and removal.",
      },
      { title: "Range support", body: "Combine single pages and ranges, like 3, 1, 5-8." },
      { title: "Lossless", body: "Pages are copied without re-compression." },
    ],
    faqs: [
      { q: "How do I delete page 2?", a: "List every page except 2, for example 1, 3-10." },
      { q: "Can I duplicate a page?", a: "Yes — list the same page number twice." },
      {
        q: "What if I leave the field empty?",
        a: "You get a copy of the document with its original page order.",
      },
    ],
    related: ["merge-pdf", "split-pdf", "rotate-pdf", "compress-pdf"],
    learn:
      "Rebuilding page order is safer than editing in place: the original file stays untouched on your device while you download a fresh copy arranged the way you need.",
  },
  {
    slug: "watermark-pdf",
    name: "Watermark PDF",
    h1: "Add a Watermark to a PDF",
    tagline: "Stamp text like DRAFT or CONFIDENTIAL across every page.",
    cardDescription: "Stamp text across every page.",
    metaTitle: "Watermark PDF — Add Text Watermarks Online | MyPDF4U",
    metaDescription:
      "Add a diagonal text watermark such as DRAFT or CONFIDENTIAL to every page of a PDF, directly in your browser.",
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
      "Upload the PDF.",
      "Type the text and choose a position and opacity.",
      "Apply it and download the stamped file.",
    ],
    features: [
      {
        title: "Position control",
        body: "Place the stamp diagonally across the centre or in any corner.",
      },
      { title: "Adjustable opacity", body: "From a barely-there tint to a bold, unmissable mark." },
      { title: "Custom text", body: "Use DRAFT, COPY, a client name or anything else." },
    ],
    faqs: [
      { q: "Can I use an image watermark?", a: "Not yet. Text watermarks are supported today." },
      {
        q: "Can the watermark be removed?",
        a: "It is drawn into the page content, so it is not a simple toggle — but a watermark is not a security control.",
      },
      {
        q: "Does it change the text layer?",
        a: "No, existing text remains selectable underneath.",
      },
    ],
    related: ["protect-pdf", "compress-pdf", "merge-pdf", "rotate-pdf"],
    learn:
      "Watermarks communicate intent — that a document is a draft, a sample or an internal copy. They deter casual misuse but should never replace real access controls on sensitive files.",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    h1: "PDF to Word Converter",
    tagline: "Convert PDF files into editable documents.",
    cardDescription: "Convert PDF files into editable documents.",
    metaTitle: "PDF to Word Converter — Free & In-Browser | MyPDF4U",
    metaDescription:
      "Convert a PDF into an editable Word (.docx) document in your browser. Text is extracted locally — nothing is uploaded to a server.",
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
      "Upload the PDF you want to edit in Word.",
      "Press Convert to Word — the text layer is read in your browser.",
      "Download the .docx file and open it in Word, Pages or Google Docs.",
    ],
    features: [
      {
        title: "Fully editable text",
        body: "Paragraphs arrive as real Word text you can rewrite immediately.",
      },
      {
        title: "Private by design",
        body: "Extraction happens on your device — the PDF is never uploaded.",
      },
      {
        title: "Opens everywhere",
        body: "The output is a standard .docx that Word, Pages and Docs all read.",
      },
    ],
    faqs: [
      {
        q: "Is the original layout preserved?",
        a: "Text, paragraphs and reading order are preserved. Complex columns, images and tables are simplified into plain paragraphs, so treat the result as an editable draft rather than a pixel copy.",
      },
      {
        q: "Why does my converted file look empty?",
        a: "Your PDF is probably a scan with no text layer. Run it through our OCR PDF tool first, then convert the searchable PDF to Word.",
      },
      {
        q: "Do you keep a copy of my document?",
        a: "No. The conversion runs entirely inside this browser tab.",
      },
    ],
    related: ["word-to-pdf", "ocr-pdf", "pdf-to-jpg", "merge-pdf"],
    learn:
      "A PDF stores positioned text runs rather than paragraphs, so any converter has to infer where lines and paragraphs begin. We group runs by their position on the page, which reconstructs readable, editable text reliably while leaving heavy layout work to you.",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    h1: "Word to PDF Converter",
    tagline: "Turn DOC and DOCX files into shareable PDFs.",
    cardDescription: "Turn DOC and DOCX files into PDFs.",
    metaTitle: "Word to PDF Converter — Free & In-Browser | MyPDF4U",
    metaDescription:
      "Convert a Word (.docx) document into a PDF in your browser. Clean A4 pages, instant download, no upload and no account.",
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
      "Choose the .docx file you want as a PDF.",
      "Press Convert to PDF — the document is rendered locally.",
      "Download the finished PDF.",
    ],
    features: [
      {
        title: "No upload required",
        body: "The document is read and rendered inside your browser tab.",
      },
      {
        title: "Clean A4 output",
        body: "Paragraphs are wrapped with sensible margins and line spacing.",
      },
      { title: "Instant result", body: "Typical documents convert in a second or two." },
    ],
    faqs: [
      {
        q: "Are fonts, images and tables kept?",
        a: "The text and paragraph order are kept. Images, tables and custom fonts are simplified, so use this for text documents such as letters, notes and CV drafts.",
      },
      {
        q: "Can I convert an old .doc file?",
        a: "Save it as .docx in Word first — the legacy binary .doc format isn't supported.",
      },
      { q: "Is my document uploaded?", a: "No. Everything happens locally in your browser." },
    ],
    related: ["pdf-to-word", "merge-pdf", "compress-pdf", "image-to-pdf"],
    learn:
      "Word documents reflow depending on the fonts installed on a machine. PDF freezes that layout, which is why job applications and contracts are almost always requested as PDF.",
  },
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    h1: "Protect a PDF with a Password",
    tagline: "Add password protection to a document.",
    cardDescription: "Add a password to a PDF.",
    metaTitle: "Protect PDF with Password — Coming Soon | MyPDF4U",
    metaDescription:
      "Password protection for PDFs is in development at MyPDF4U. Meanwhile you can watermark, merge, split and compress documents.",
    category: "Security",
    status: "soon",
    accept: "application/pdf,.pdf",
    acceptLabel: "PDF documents",
    multiple: false,
    ctaLabel: "Select PDF file",
    actionLabel: "Protect PDF",
    outputHint: "",
    steps: [],
    features: [],
    faqs: [
      {
        q: "Why is password protection not available yet?",
        a: "Encryption has to be implemented correctly or it gives false confidence, so we are taking the time to get it right.",
      },
    ],
    related: ["unlock-pdf", "watermark-pdf", "merge-pdf", "compress-pdf"],
    learn:
      "PDF passwords come in two kinds: one to open the file and one to restrict printing or copying. Only the first genuinely protects content, because permission flags rely on the reader honouring them.",
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    h1: "Unlock a PDF",
    tagline: "Remove a password you own from a PDF.",
    cardDescription: "Remove a known password.",
    metaTitle: "Unlock PDF — Remove a Known Password | MyPDF4U",
    metaDescription:
      "Remove a password you already know from a PDF, entirely in your browser. The unlocked copy opens without any prompt.",
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
      "Type the password you normally use to open it.",
      "Unlock and download a copy that opens without a password.",
    ],
    features: [
      {
        title: "Password never leaves your device",
        body: "The file is decrypted locally in your browser.",
      },
      {
        title: "Identical pages",
        body: "Each page keeps its exact appearance in the unlocked copy.",
      },
      {
        title: "No account needed",
        body: "Unlock and download in one go, with nothing to sign up for.",
      },
    ],
    faqs: [
      {
        q: "Will this crack an unknown password?",
        a: "No. You must know the password. This tool only removes protection from documents you are entitled to open.",
      },
      {
        q: "Is the text still selectable afterwards?",
        a: "No. Pages are rebuilt as high-resolution images, so the unlocked copy looks the same but is not searchable. Run OCR PDF afterwards if you need a text layer.",
      },
      {
        q: "Do you store the password?",
        a: "Never. It is used once, in memory, inside your browser tab.",
      },
    ],
    related: ["protect-pdf", "ocr-pdf", "split-pdf", "compress-pdf"],
    learn:
      "Removing a password is only legitimate for documents you own or are authorised to handle. Any tool that promises to break unknown passwords should be treated with suspicion.",
  },
  {
    slug: "heic-to-pdf",
    name: "HEIC to PDF",
    h1: "HEIC to PDF Converter",
    tagline: "Convert iPhone HEIC photos into a PDF.",
    cardDescription: "Convert iPhone photos to PDF.",
    metaTitle: "HEIC to PDF Converter — Coming Soon | MyPDF4U",
    metaDescription:
      "HEIC to PDF conversion is in development at MyPDF4U. For now, export your photos as JPG and use our JPG to PDF tool.",
    category: "Images to PDF",
    status: "soon",
    accept: ".heic,.heif",
    acceptLabel: "HEIC and HEIF photos",
    multiple: true,
    ctaLabel: "Select HEIC photos",
    actionLabel: "Convert to PDF",
    outputHint: "",
    steps: [],
    features: [],
    faqs: [
      {
        q: "What can I do today?",
        a: "Share or export the photo as JPG from your phone, then use the JPG to PDF tool — it works right now.",
      },
    ],
    related: ["jpg-to-pdf", "image-to-pdf", "png-to-pdf", "compress-pdf"],
    learn:
      "HEIC stores photos at roughly half the size of JPG, but browsers still decode it inconsistently. Converting to PDF makes a photo readable on any device, which is why the format matters for document workflows.",
  },
  {
    slug: "ocr-pdf",
    name: "OCR PDF",
    h1: "OCR PDF — Make Scans Searchable",
    tagline: "Recognise text inside scanned documents.",
    cardDescription: "Make scanned PDFs searchable.",
    metaTitle: "OCR PDF — Make Scanned PDFs Searchable | MyPDF4U",
    metaDescription:
      "Recognise the text in a scanned PDF and download a searchable copy. Recognition runs in your browser, so scans stay private.",
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
      "Pick the language of the document.",
      "Run OCR and download the searchable PDF.",
    ],
    features: [
      {
        title: "Searchable output",
        body: "Recognised words are placed invisibly over the original page image.",
      },
      {
        title: "Scans stay private",
        body: "Recognition runs in your browser, not on our servers.",
      },
      {
        title: "Seven languages",
        body: "English, Spanish, French, German, Portuguese, Italian and Dutch.",
      },
    ],
    faqs: [
      {
        q: "How long does OCR take?",
        a: "Roughly a few seconds per page, plus a one-off download of the language data. Long documents take a while because all the work happens on your own device.",
      },
      {
        q: "How accurate is it?",
        a: "Clean scans at 300 DPI are usually recognised very accurately. Photos of pages, low contrast and handwriting are much less reliable.",
      },
      {
        q: "Can I then convert it to Word?",
        a: "Yes — run OCR first, then use PDF to Word on the searchable file.",
      },
    ],
    related: ["pdf-to-word", "compress-pdf", "pdf-to-jpg", "split-pdf"],
    learn:
      "OCR turns a picture of text into real characters, which makes a scan searchable and copyable. Quality depends heavily on scan resolution — 300 DPI is the usual sweet spot.",
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
