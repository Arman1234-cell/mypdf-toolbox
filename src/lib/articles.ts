export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  toolSlug: string;
  toolName: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG Images to PDF (Without Losing Quality)",
    description:
      "A step-by-step guide on turning phone photos, receipts, and scans into a single, clean PDF file directly in your browser.",
    date: "2025-01-15",
    readTime: "3 min read",
    toolSlug: "jpg-to-pdf",
    toolName: "JPG to PDF Converter",
    content: [
      "Whether you need to submit multiple scanned documents for a job application or compile receipt photos for an expense report, converting JPG images to PDF is the most reliable way to preserve order and formatting across devices.",
      "With MyPDF4U, the entire conversion happens right inside your browser. No files are uploaded to third-party servers, ensuring your documents remain 100% private.",
      "Step 1: Open the JPG to PDF tool on MyPDF4U.",
      "Step 2: Drag and drop your JPG or PNG image files into the workspace.",
      "Step 3: Arrange the order of your pages by dragging thumbnails, and rotate any sideways images.",
      "Step 4: Click 'Convert to PDF' and download your document instantly.",
    ],
  },
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress Large PDF Files for Email Attachments",
    description:
      "Learn how to reduce PDF file size under 10MB or 25MB email limits while keeping text and diagrams crisp.",
    date: "2025-01-20",
    readTime: "4 min read",
    toolSlug: "compress-pdf",
    toolName: "Compress PDF Tool",
    content: [
      "Most email providers limit attachment sizes to 20MB or 25MB. Image-heavy PDFs, high-resolution scans, and presentation slides can easily exceed these limits.",
      "PDF compression works by optimizing the embedded image assets and stripping redundant metadata. On MyPDF4U, you can choose between Light, Balanced, and Strong compression levels to find the perfect balance between file size and readability.",
      "Step 1: Open the Compress PDF tool.",
      "Step 2: Choose the PDF file from your device.",
      "Step 3: Select your desired compression level (Balanced is recommended for everyday documents).",
      "Step 4: Click Compress and download your optimized PDF.",
    ],
  },
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge Multiple PDF Documents into One",
    description:
      "Combine separate invoices, reports, and contracts into a unified PDF document in the exact sequence you choose.",
    date: "2025-01-28",
    readTime: "3 min read",
    toolSlug: "merge-pdf",
    toolName: "Merge PDF Tool",
    content: [
      "Handling multiple scattered PDF files can be frustrating when you need to send a complete document packet to a client, teacher, or authority.",
      "Merging PDFs on MyPDF4U lets you drag and reorder documents before stitching them into a single file.",
      "Step 1: Go to the Merge PDF tool.",
      "Step 2: Select two or more PDF files from your computer or phone.",
      "Step 3: Reorder the files in the list until they match your preferred document order.",
      "Step 4: Click 'Merge PDFs' and download the combined file.",
    ],
  },
];
