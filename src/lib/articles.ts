import jpgHeroDesktop from "@/assets/blog/jpg-to-pdf-workflow-desktop-v2.jpg";
import jpgHeroMobile from "@/assets/blog/jpg-to-pdf-workflow-mobile.jpg";
import pngHeroDesktop from "@/assets/blog/png-to-pdf-workflow-desktop-v2.jpg";
import pngHeroMobile from "@/assets/blog/png-to-pdf-workflow-mobile.jpg";
import compressHeroDesktop from "@/assets/blog/compress-pdf-workflow-desktop-v2.jpg";
import compressHeroMobile from "@/assets/blog/compress-pdf-workflow-mobile.jpg";
import mergeHeroDesktop from "@/assets/blog/merge-pdf-workflow-desktop-v2.jpg";
import mergeHeroMobile from "@/assets/blog/merge-pdf-workflow-mobile.jpg";

/**
 * Blog content model.
 *
 * Paragraph text supports inline markdown-style links, e.g.
 * "convert [JPG to PDF](/jpg-to-pdf) in your browser". Internal paths are
 * rendered with the router's <Link>, external URLs as <a rel="noopener">.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string }
  | { type: "image"; image: ArticleImage }
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
    title: "How to Convert JPG Images to PDF Without Losing Quality",
    metaTitle: "How to Convert JPG to PDF (Free, No Quality Loss) | MyPDF4U",
    description:
      "Convert one or many JPG images into a single PDF without losing quality. A clear step-by-step guide plus a free browser tool that keeps your photos private.",
    date: "2025-01-15",
    updated: "2026-08-29",
    readTime: "5 min read",
    toolSlug: "jpg-to-pdf",
    toolName: "JPG to PDF Converter",
    hero: {
      desktop: jpgHeroDesktop,
      mobile: jpgHeroMobile,
      alt: "Several JPG photos and scans being combined into one PDF document",
      caption: "Photos, receipts and scans become ordered pages inside one PDF.",
      ...heroDims,
    },
    intro: [
      "If you have a folder of phone photos, scanned receipts or exam pages, sending them one by one is painful for whoever receives them. A PDF fixes that: the pages stay in order, the orientation is locked in, and the file opens the same way on every device.",
      "The fastest way to do it is the free [JPG to PDF converter](/jpg-to-pdf) on MyPDF4U. You add your images, drag them into the right order, rotate anything sideways, and download a single PDF. Everything runs inside your browser, so the photos never leave your device.",
      "Quality matters here. Each JPG is embedded at its original resolution rather than re-encoded, so a 12-megapixel photo stays as sharp in the PDF as it was in your gallery.",
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
      { type: "h2", text: "How to convert JPG to PDF: step by step" },
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
      { type: "h2", text: "How to convert multiple JPG images into one PDF" },
      {
        type: "p",
        text: "Multi-image conversion is the normal case, not a special mode. Select every photo in one go — the tool creates one PDF page per image, in the order shown in the grid. Because the order is set visually, you can fix a mis-sorted scan in a second instead of renaming files.",
      },
      {
        type: "p",
        text: "A practical tip for scanned documents: photograph every page in the same orientation and lighting before you convert. Consistent pages make the finished PDF far easier to read, and they also compress better if you later need to [reduce the PDF file size](/compress-pdf).",
      },
      { type: "h2", text: "Keeping image quality intact" },
      {
        type: "list",
        items: [
          "Start from the original files, not from a messaging app export — chat apps re-compress photos and soften fine text.",
          "Avoid converting the same file repeatedly; each JPG re-encode loses a little detail permanently.",
          "For text-heavy pages, capture at a higher resolution rather than zooming in afterwards.",
          "Only compress at the end, once the PDF is assembled, so you compress once instead of twice.",
        ],
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Uploading photos to an unknown online converter — MyPDF4U processes files in your browser, so there is nothing to upload.",
          "Forgetting to rotate a landscape scan, which forces the reader to tilt their screen.",
          "Mixing unrelated images into one PDF instead of splitting them into two clear documents.",
          "Emailing a 40 MB image PDF: run it through [Compress PDF](/compress-pdf) first so it clears the attachment limit.",
        ],
      },
      { type: "h2", text: "After the conversion" },
      {
        type: "p",
        text: "Once you have the PDF, the rest of the workflow is on MyPDF4U too: [merge it with other PDFs](/merge-pdf) to build a complete application packet, [split out a single page](/split-pdf) before sharing, or [convert the PDF back to JPG](/pdf-to-jpg) when someone asks for images again.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Converting JPG to PDF should take under a minute: add the images, order them, download. Doing it in the browser keeps private documents private, and starting from original files keeps the output sharp.",
      },
    ],
    faqs: [
      {
        q: "How do I convert JPG to PDF for free?",
        a: "Open the JPG to PDF tool on MyPDF4U, add your images, arrange them and click Convert to PDF. It is free, there is no sign-up and there is no watermark on the output.",
      },
      {
        q: "Can I convert multiple JPG images into one PDF?",
        a: "Yes. Select all your images at once and each one becomes a page, in the order you arrange the thumbnails.",
      },
      {
        q: "Does converting JPG to PDF reduce quality?",
        a: "No. Images are embedded at their original resolution rather than re-encoded, so the pages look exactly like the source photos.",
      },
      {
        q: "Are my photos uploaded to a server?",
        a: "No. Conversion runs locally in your browser, so the images stay on your device.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. The tool works in mobile browsers, and you can pick images straight from your camera roll.",
      },
    ],
    related: ["how-to-convert-png-to-pdf", "how-to-compress-pdf-for-email"],
  },
  {
    slug: "how-to-convert-png-to-pdf",
    title: "How to Convert PNG to PDF Online for Free",
    metaTitle: "How to Convert PNG to PDF Online Free (Step by Step) | MyPDF4U",
    description:
      "Turn one or several PNG images into a single PDF for free, right in your browser. Keep screenshots sharp, control page order and skip the software install.",
    date: "2026-08-29",
    readTime: "5 min read",
    toolSlug: "png-to-pdf",
    toolName: "PNG to PDF Converter",
    hero: {
      desktop: pngHeroDesktop,
      mobile: pngHeroMobile,
      alt: "PNG screenshots being converted into a single multi-page PDF file",
      caption: "PNG screenshots keep their crisp edges when they become PDF pages.",
      ...heroDims,
    },
    intro: [
      "PNG is the default screenshot format on Windows, macOS and Android, so most people end up with a pile of PNG files and a form that only accepts PDF. Converting them is the last step between your captures and a document you can actually send.",
      "The quickest route is the free [PNG to PDF converter](/png-to-pdf) on MyPDF4U: add your PNG images, put them in the right order, and download one PDF. It runs entirely in your browser — nothing is uploaded, and there is no account or install.",
      "Because PNG is lossless, screenshots, diagrams and line art stay razor sharp inside the PDF. That makes it the better source format whenever your images contain text.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "png-to-pdf",
        toolName: "PNG to PDF Converter",
        text: "Convert PNG to PDF online, free and in your browser — one page per image.",
      },
      { type: "h2", text: "When you need to convert PNG to PDF" },
      {
        type: "list",
        items: [
          "Bug reports and support tickets, where a sequence of screenshots explains the problem better than prose.",
          "Proof of payment or booking confirmations that were captured as screenshots.",
          "Design or UI reviews that need a single scrollable document instead of a zip of images.",
          "Any upload form that accepts PDF only — most portals do.",
        ],
      },
      { type: "h2", text: "How to convert PNG to PDF step by step" },
      {
        type: "steps",
        items: [
          "Open the [PNG to PDF tool](/png-to-pdf).",
          "Drop in your PNG files, or tap the upload area to select them from your device.",
          "Drag the thumbnails until the page order is right, and rotate anything captured sideways.",
          "Remove any image you do not want in the final document.",
          "Click Convert to PDF and download the result — usually a few seconds, even for a dozen screenshots.",
        ],
      },
      {
        type: "note",
        text: "Mixed folder? PNG and JPG can go into the same conversion. If most of your files are photos, the [JPG to PDF converter](/jpg-to-pdf) is the more natural starting point — both tools produce the same kind of PDF.",
      },
      { type: "h2", text: "How to convert multiple PNG images into one PDF" },
      {
        type: "p",
        text: "Select every PNG at once and each becomes a single PDF page in the order you arrange them. This is what people usually mean by a PNG image to PDF converter: not one file at a time, but a whole set stitched into one document with a predictable sequence.",
      },
      {
        type: "p",
        text: "If your screenshots are very tall — a long web page, for example — capture them in sections of similar height. Even sections make the PDF read like paginated document rather than a set of oddly cropped pages.",
      },
      { type: "h2", text: "PNG or JPG: which should you convert from?" },
      {
        type: "list",
          items: [
          "PNG is lossless and keeps text, borders and screenshots pixel-perfect, so it is the right choice for UI captures and diagrams.",
          "JPG is smaller for photographs, where slight compression is invisible.",
          "PNG files are usually larger, so a PNG-heavy PDF can get big — run it through [Compress PDF](/compress-pdf) if you need to email it.",
          "Transparent areas are drawn on a white page background, exactly as they would print.",
        ],
      },
      { type: "h2", text: "Tips for a clean result" },
      {
        type: "list",
        items: [
          "Rename files in the order you want them before selecting, then fine-tune visually in the grid.",
          "Crop out irrelevant desktop clutter before converting so each page shows only what matters.",
          "Keep the originals until you have checked the PDF, in case you need to redo a page.",
          "Check the finished PDF at 100% zoom to confirm small text is still readable.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Sending PNG files individually when the recipient asked for one document.",
          "Screenshotting a screenshot, which softens text unnecessarily.",
          "Uploading confidential captures to an unknown converter — browser-based conversion avoids that entirely.",
          "Forgetting page order, then re-doing the whole conversion instead of dragging thumbnails.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Converting PNG to PDF online is a two-minute job: open the tool, order your images, download the PDF. Since everything happens locally, it is also the private option — useful when your screenshots contain account details. Need the reverse direction later? Use [PDF to PNG](/pdf-to-png).",
      },
    ],
    faqs: [
      {
        q: "How do I convert PNG to PDF for free?",
        a: "Open the PNG to PDF converter on MyPDF4U, add your PNG images, arrange the order and click Convert to PDF. It is free, with no sign-up and no watermark.",
      },
      {
        q: "Can I convert several PNG images into one PDF?",
        a: "Yes. Add them all in one go and each PNG becomes a page in the order you set in the thumbnail grid.",
      },
      {
        q: "Is PNG to PDF conversion lossless?",
        a: "The PNG images are embedded at their original resolution, so screenshots and diagrams stay sharp in the PDF.",
      },
      {
        q: "What happens to transparent backgrounds?",
        a: "Transparent areas are rendered on a white page background, which is how they would appear when printed.",
      },
      {
        q: "Do I need to install software?",
        a: "No. The converter runs in your browser on desktop and mobile, and your files are never uploaded.",
      },
    ],
    related: ["how-to-convert-jpg-to-pdf", "how-to-compress-pdf-for-email"],
  },
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress Large PDF Files for Email Attachments",
    metaTitle: "How to Compress a PDF for Email (Under 25 MB) | MyPDF4U",
    description:
      "Reduce PDF file size so it fits Gmail and Outlook attachment limits, without turning text into mush. Practical settings and a free in-browser compressor.",
    date: "2025-01-20",
    updated: "2026-08-29",
    readTime: "5 min read",
    toolSlug: "compress-pdf",
    toolName: "Compress PDF Tool",
    hero: {
      desktop: compressHeroDesktop,
      mobile: compressHeroMobile,
      alt: "A large stack of PDF pages being compressed into a small file ready to email",
      caption: "Compression targets the heavy image data, not the words on the page.",
      ...heroDims,
    },
    intro: [
      "Attachment limits are the usual culprit: Gmail stops at 25 MB, Outlook often at 20 MB, and many company mail servers are stricter still. Scanned contracts and slide decks blow past that easily.",
      "You can fix it in a minute with the free [Compress PDF tool](/compress-pdf). Pick a compression level, run it locally in your browser, and see the before-and-after size before you download anything.",
      "The trick is knowing what compression actually shrinks. Almost all of the weight in a large PDF is embedded images, so how well it compresses depends on what the document contains.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "compress-pdf",
        toolName: "Compress PDF Tool",
        text: "Shrink your PDF in the browser and check the size saved before downloading.",
      },
      { type: "h2", text: "Why PDFs get so large" },
      {
        type: "list",
          items: [
          "Scans: every page is a full-resolution photograph, often 300 dpi or more.",
          "Presentation exports, which embed high-resolution charts and background images.",
          "Photos added straight from a phone at 12 megapixels per page.",
          "Duplicated assets, such as a logo re-embedded on every page.",
        ],
      },
      { type: "h2", text: "How to compress a PDF step by step" },
      {
        type: "steps",
        items: [
          "Open the [Compress PDF tool](/compress-pdf) and select your file.",
          "Choose a compression level: Light for text documents, Balanced for most files, Strong when you must get under a hard limit.",
          "Run the compression and compare the original and new file sizes shown in the result.",
          "Open the compressed PDF and check the pages you care about — small print and diagrams first.",
          "If it is still too large, try the next level up, or split the document instead.",
        ],
      },
      { type: "h2", text: "Choosing the right compression level" },
      {
        type: "list",
        items: [
          "Light — invoices, letters and mostly-text PDFs where nothing should visibly change.",
          "Balanced — the sensible default for scans and mixed documents; big savings, still readable.",
          "Strong — use when the file must fit a strict limit and the reader only needs to read, not print.",
        ],
      },
      {
        type: "note",
        text: "If a compressed scan becomes hard to read, an alternative is to [split the PDF](/split-pdf) into two smaller emails at Light compression rather than pushing one file through Strong.",
      },
      { type: "h2", text: "Other ways to get under the limit" },
      {
        type: "list",
        items: [
          "Remove pages you do not need to send — a cover page and appendix are often optional.",
          "Send a link from cloud storage when the file is genuinely huge, such as a print-ready design.",
          "Compress the source images before you [convert them to PDF](/jpg-to-pdf), so you compress once.",
          "Combine several small PDFs with [Merge PDF](/merge-pdf) so one email carries one tidy attachment.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Compressing a file repeatedly — each pass discards detail permanently, so start again from the original.",
          "Using Strong compression on a document that will be printed.",
          "Not opening the result before sending it, then discovering the signature page is illegible.",
          "Uploading confidential documents to a random web service; browser-side compression keeps the file local.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Start with Balanced, check the pages that matter, and only escalate if you must. If you are assembling a packet for one email, merge first and compress last — that way you optimise the finished document, not each fragment.",
      },
    ],
    faqs: [
      {
        q: "How do I reduce PDF file size for email?",
        a: "Open the Compress PDF tool, choose Balanced compression and download the result. Most image-heavy PDFs drop well under the 25 MB Gmail limit in one pass.",
      },
      {
        q: "What is the maximum email attachment size?",
        a: "Gmail allows about 25 MB, Outlook.com about 20 MB, and many corporate mail servers less. Aim for under 10 MB when you are unsure.",
      },
      {
        q: "Will compression make my PDF blurry?",
        a: "Light compression is visually near-identical. Strong compression reduces image detail noticeably, so check the pages with small print before sending.",
      },
      {
        q: "Can I compress a PDF without uploading it?",
        a: "Yes. MyPDF4U compresses the document inside your browser, so the file never leaves your device.",
      },
      {
        q: "Why did my PDF barely shrink?",
        a: "It is probably already text-only. Text takes very little space, so there is not much left to remove — removing pages is more effective in that case.",
      },
    ],
    related: ["how-to-merge-pdf-files", "how-to-convert-jpg-to-pdf"],
  },
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge Multiple PDF Documents into One",
    metaTitle: "How to Merge PDF Files into One (Free, In-Browser) | MyPDF4U",
    description:
      "Combine PDF files into a single document in the order you choose. A short guide to merging invoices, reports and application documents in your browser.",
    date: "2025-01-28",
    updated: "2026-08-29",
    readTime: "4 min read",
    toolSlug: "merge-pdf",
    toolName: "Merge PDF Tool",
    hero: {
      desktop: mergeHeroDesktop,
      mobile: mergeHeroMobile,
      alt: "Several separate PDF documents being combined into one merged PDF file",
      caption: "Reorder the files first, then merge them into a single document.",
      desktopWidth: 1536,
      desktopHeight: 768,
      mobileWidth: 944,
      mobileHeight: 704,
    },
    intro: [
      "Scattered PDFs are hard to review. A landlord wants one file, not five; a university wants a single application packet; a client wants the report and its appendix together.",
      "The free [Merge PDF tool](/merge-pdf) does it in your browser: add the files, drag them into the right sequence, and download one combined PDF. Nothing is uploaded, and the page content is copied across unchanged.",
      "Order is the part people get wrong, so the tool shows your files as a list you can reorder before merging — what you see is the sequence you get.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "merge-pdf",
        toolName: "Merge PDF Tool",
        text: "Combine PDF files into one document, in the exact order you choose.",
      },
      { type: "h2", text: "When merging helps" },
      {
        type: "list",
        items: [
          "Job and university applications: CV, cover letter and certificates as one attachment.",
          "Monthly bookkeeping, where dozens of invoices become a single reviewable file.",
          "Contracts plus signed annexes, kept together so nothing gets lost in a thread.",
          "Scans made in batches that should read as one continuous document.",
        ],
      },
      { type: "h2", text: "How to merge PDF files step by step" },
      {
        type: "steps",
        items: [
          "Open the [Merge PDF tool](/merge-pdf).",
          "Select two or more PDF files from your computer or phone.",
          "Drag the entries in the list until the order matches the document you want.",
          "Click Merge PDFs and download the combined file.",
          "Open it once to confirm the sections start where you expect.",
        ],
      },
      {
        type: "note",
        text: "Only need part of a document? [Split the PDF](/split-pdf) to pull out the pages you want, then merge those instead of the whole file.",
      },
      { type: "h2", text: "Tips for a professional merged document" },
      {
        type: "list",
        items: [
          "Merge in reading order: summary first, supporting evidence after.",
          "Give the output a descriptive filename such as application-packet-2026.pdf.",
          "Rotate any sideways scans with [Rotate PDF](/rotate-pdf) before merging, so the whole file reads consistently.",
          "Compress at the end with [Compress PDF](/compress-pdf) — merging several large scans easily exceeds email limits.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Merging before checking the order, then sending an appendix ahead of the report.",
          "Including duplicate copies of the same scan.",
          "Merging password-protected files — remove the password first with [Unlock PDF](/unlock-pdf).",
          "Forgetting the size: one merged file of ten scans is often 30 MB or more.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Merging is the fastest way to turn scattered documents into something a reader can actually work through. Reorder first, merge second, and compress last if the result has to travel by email.",
      },
    ],
    faqs: [
      {
        q: "How do I merge PDF files into one?",
        a: "Open the Merge PDF tool, add two or more PDFs, drag them into the order you want and click Merge PDFs to download the combined document.",
      },
      {
        q: "Is there a limit on how many PDFs I can combine?",
        a: "There is no fixed limit. Larger batches simply take a little longer because everything is processed on your own device.",
      },
      {
        q: "Does merging change the quality of the pages?",
        a: "No. Pages are copied into the new document as they are, so text stays selectable and images keep their resolution.",
      },
      {
        q: "Can I merge a password-protected PDF?",
        a: "Remove the protection first with the Unlock PDF tool, then merge the unlocked file.",
      },
      {
        q: "Can I reorder pages after merging?",
        a: "Yes. Use the Organize PDF tool to rearrange or delete individual pages in the merged document.",
      },
    ],
    related: ["how-to-compress-pdf-for-email", "how-to-convert-jpg-to-pdf"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
