import type { Article } from "@/lib/articles";

const heroDims = {
  desktopWidth: 1536,
  desktopHeight: 768,
  mobileWidth: 768,
  mobileHeight: 576,
};

/** Guides for the page-level editing, organising and security tools. */
export const organizeGuides: Article[] = [
  {
    slug: "how-to-split-pdf-pages",
    title: "How to Split a PDF and Extract the Pages You Need",
    metaTitle: "How to Split a PDF Online (Extract Pages Free) | MyPDF4U",
    description:
      "Pull single pages or ranges like 1-3, 7 out of a PDF, or break a document into separate files. Page-range syntax explained with practical examples.",
    date: "2026-09-05",
    readTime: "6 min read",
    toolSlug: "split-pdf",
    toolName: "Split PDF",
    hero: {
      desktop: "/blog/split-pdf-workflow-desktop.jpg",
      mobile: "/blog/split-pdf-workflow-mobile.jpg",
      alt: "One PDF document being split into several smaller PDF files",
      caption: "One document in, the pages you asked for out.",
      ...heroDims,
    },
    intro: [
      "Most documents contain more than the recipient needs. A yearly statement holds twelve payslips; a 90-page report holds the one chapter your colleague asked for. Sending the whole file shares far more than intended.",
      "[Split PDF](/split-pdf) solves it two ways: type page ranges such as 1-3, 7 to extract exactly those pages, or leave the field empty to burst the document into one PDF per page. Pages are copied as they are — no re-compression — and everything happens in your browser, so the file is never uploaded.",
      "When a split produces more than one file, the results are bundled into a single ZIP so you only manage one download.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "split-pdf",
        toolName: "Split PDF",
        text: "Extract the pages you need from your PDF — free, and nothing leaves your device.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open [Split PDF](/split-pdf) and upload your document.",
          "Type the pages you want, for example 4 or 1-3, 5, 9-12. Leave it empty to split every page.",
          "Click Split PDF and download the file, or the ZIP if there is more than one.",
        ],
      },
      { type: "h2", text: "Page ranges, by example" },
      {
        type: "list",
        items: [
          "4 — just page four, downloaded as a single PDF.",
          "1-3 — a three-page extract, page order preserved.",
          "1-3, 7 — a range plus one loose page, combined into one output.",
          "2-5, 9-12 — two chapters pulled from a longer report.",
          "(empty) — every page becomes its own PDF, delivered as a ZIP.",
        ],
      },
      {
        type: "note",
        text: "Page numbers refer to the position in the file, not the number printed on the page. If a report has a cover and two blank pages, its printed 'page 1' is often file page 4.",
      },
      { type: "h2", text: "Why splitting is safer than sharing everything" },
      {
        type: "p",
        text: "Redaction is hard; extraction is easy. If a document contains salary details, other clients' names or personal addresses on pages you do not need to send, taking out only the relevant pages removes that information entirely rather than hiding it. It also keeps the file small enough to attach without a second thought.",
      },
      { type: "h2", text: "Quality is not affected" },
      {
        type: "p",
        text: "Splitting copies page content into a new document as-is: text stays selectable, images keep their resolution, and nothing is re-encoded. That is different from tools which rasterise pages, and it means you can split a file repeatedly without any cumulative loss.",
      },
      { type: "h2", text: "Common workflows" },
      {
        type: "steps",
        items: [
          "Extract the pages you need with [Split PDF](/split-pdf).",
          "Combine them with pages from another document using [Merge PDF](/merge-pdf).",
          "Reorder or drop pages in the result with [Organize PDF](/organize-pdf).",
          "If the finished file is still heavy, shrink it with [Compress PDF](/compress-pdf).",
        ],
      },
      { type: "h2", text: "Split, organise, or merge — which do you need?" },
      {
        type: "list",
        items: [
          "Split when you want separate files out of one document.",
          "[Organize PDF](/organize-pdf) when you want one document with pages reordered or removed.",
          "[Merge PDF](/merge-pdf) when you want several documents combined into one.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Counting printed page numbers instead of file positions, and extracting the wrong page.",
          "Splitting a password-protected file — remove the password first with [Unlock PDF](/unlock-pdf).",
          "Splitting a 500-page file into single pages when a range would have done.",
          "Forgetting to open the extract and check it before sending.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "One field does all the work here. Type the pages you need, or leave it blank to burst the file apart, and you get clean, lossless PDFs without uploading anything.",
      },
    ],
    faqs: [
      {
        q: "How do I extract a single page from a PDF?",
        a: "Type its page number in the page ranges field — for example 4 — and click Split PDF. You get a one-page document.",
      },
      {
        q: "Why did I receive a ZIP file?",
        a: "When a split produces more than one PDF, the files are bundled into one ZIP so it stays a single download.",
      },
      {
        q: "Does splitting reduce quality?",
        a: "No. Pages are copied into the new documents as they are, with no re-compression.",
      },
      {
        q: "Can I split a password-protected PDF?",
        a: "Not directly. Remove the password with the Unlock PDF tool first, then split the unlocked copy.",
      },
      {
        q: "How do I split every page into its own file?",
        a: "Leave the page ranges field empty. Each page is saved as a separate PDF inside the ZIP.",
      },
    ],
    related: ["how-to-merge-pdf-files", "how-to-organize-pdf-pages", "how-to-convert-pdf-to-jpg"],
  },
  {
    slug: "how-to-rotate-pdf-pages",
    title: "How to Rotate PDF Pages and Save the Change",
    metaTitle: "How to Rotate PDF Pages Online and Save It | MyPDF4U",
    description:
      "Fix sideways or upside-down scans permanently — rotate every page or only the ones that are wrong, and download a file that opens the right way up.",
    date: "2026-09-05",
    readTime: "5 min read",
    toolSlug: "rotate-pdf",
    toolName: "Rotate PDF",
    hero: {
      desktop: "/blog/rotate-pdf-workflow-desktop.jpg",
      mobile: "/blog/rotate-pdf-workflow-mobile.jpg",
      alt: "A sideways PDF page being rotated upright and saved",
      caption: "Rotation is written into the file, not just the viewer.",
      ...heroDims,
    },
    intro: [
      "Rotating a page in a PDF reader usually does nothing lasting: close the file, reopen it, and the scan is sideways again. The rotation was a view setting, not a change to the document.",
      "[Rotate PDF](/rotate-pdf) writes the rotation into the PDF itself. Choose 90° clockwise, 180° or 90° counter-clockwise, optionally list the pages to turn, and download a file that opens correctly everywhere — including when it is printed. It runs in your browser, and because nothing is re-encoded it finishes instantly even on long documents.",
      "Leave the page field empty to turn every page, or type something like 1, 4-6 when only part of the document came in sideways.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "rotate-pdf",
        toolName: "Rotate PDF",
        text: "Straighten your PDF pages and save the change — free, no upload.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open [Rotate PDF](/rotate-pdf) and upload the document.",
          "Pick the angle: 90° clockwise, 180°, or 90° counter-clockwise.",
          "List the pages to rotate, such as 3 or 1, 4-6 — or leave it empty for all pages.",
          "Click Rotate PDF and download the corrected file.",
        ],
      },
      { type: "h2", text: "Why the rotation in your reader does not stick" },
      {
        type: "p",
        text: "Every PDF page carries a rotation flag. Scanners set it inconsistently: the image is captured in one orientation and the flag says another, which is why a page can look fine in one app and sideways in the next. When you rotate inside a reader, most apps only change how they display the page. Saving the rotation into the document sets the flag properly, so every reader, printer and preview thumbnail agrees.",
      },
      {
        type: "note",
        text: "Rotating does not touch page content, so there is no quality loss and no risk of blurring text — the page is simply marked to display at a different angle.",
      },
      { type: "h2", text: "Choosing the angle" },
      {
        type: "list",
        items: [
          "90° clockwise — for a page whose top edge is currently on the left.",
          "90° counter-clockwise — for a page whose top edge is on the right.",
          "180° — for pages that were fed into the scanner upside down.",
        ],
      },
      { type: "h2", text: "Rotating only some pages" },
      {
        type: "p",
        text: "Mixed documents are the usual case: a portrait report with two landscape tables in the middle. Rotating everything would break the pages that were already correct. List just the offenders — 7, 8 — and the rest are left alone. If different pages need different angles, run the tool twice, once per angle.",
      },
      { type: "h2", text: "Where rotation fits in a larger clean-up" },
      {
        type: "steps",
        items: [
          "Straighten the pages with [Rotate PDF](/rotate-pdf).",
          "Reorder or delete pages with [Organize PDF](/organize-pdf), which can also rotate the pages it keeps.",
          "Run [OCR](/ocr-pdf) if the document is a scan — upright text recognises far more accurately.",
          "Compress with [Compress PDF](/compress-pdf) only at the end, once the document is final.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Rotating in a reader and assuming it saved — always download from the tool and reopen the file.",
          "Rotating the whole document when only two pages were wrong.",
          "Running OCR on sideways pages; recognition accuracy drops sharply.",
          "Guessing the direction — check whether the top of the page is on the left or the right first.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Rotation is the fastest fix in any PDF workflow and the one most often done wrong. Save it into the file once and the document reads correctly for everyone, on screen and on paper.",
      },
    ],
    faqs: [
      {
        q: "How do I rotate a PDF and save it permanently?",
        a: "Use the Rotate PDF tool, choose an angle and download the result — the rotation is written into the document rather than into your reader's view.",
      },
      {
        q: "Can I rotate only one page?",
        a: "Yes. Type its number in the pages field, for example 3, or a mix such as 1, 4-6.",
      },
      {
        q: "Does rotating reduce quality?",
        a: "No. The page content is untouched; only its orientation flag changes.",
      },
      {
        q: "Will other apps see the rotation?",
        a: "Yes, because it is stored in the PDF itself, so readers and printers both honour it.",
      },
      {
        q: "How do I rotate different pages by different amounts?",
        a: "Run the tool once per angle, listing the relevant pages each time.",
      },
    ],
    related: [
      "rotate-pdf-and-save-it-that-way",
      "how-to-organize-pdf-pages",
      "how-to-split-pdf-pages",
      "how-to-ocr-scanned-pdf",
    ],
  },
  {
    slug: "rotate-pdf-and-save-it-that-way",
    title: "Rotate PDF and Save It That Way: How to Permanently Rotate & Save Online Free",
    metaTitle: "Rotate PDF and Save It That Way Permanently | Free & Online",
    description:
      "Learn how to rotate PDF and save it that way permanently online for free. Fix sideways or upside-down scans in Chrome, Firefox, VS Code, and mobile without Adobe Acrobat.",
    date: "2026-10-14",
    readTime: "6 min read",
    toolSlug: "rotate-pdf",
    toolName: "Rotate PDF",
    hero: {
      desktop: "/blog/rotate-pdf-workflow-desktop.jpg",
      mobile: "/blog/rotate-pdf-workflow-mobile.jpg",
      alt: "Rotate PDF and save it that way permanently online free without losing quality",
      caption: "Write permanent rotation flags directly into your PDF document.",
      ...heroDims,
    },
    intro: [
      "Have you ever opened a scanned document in Google Chrome, Mozilla Firefox, or Microsoft Edge, clicked the Rotate button to straighten it out, and then saved the file — only to open it later and find it still sideways or upside down? When you rotate a PDF inside most web browsers and free PDF viewers, you are merely changing how the document looks on your screen during that single reading session. The viewer does not rewrite the internal orientation tags stored inside the PDF itself.",
      "To truly rotate PDF and save it that way permanently, the rotation metadata must be written directly into the file's low-level dictionary structure. Our free [Rotate PDF](/rotate-pdf) tool runs 100% locally in your web browser. You can rotate single pages, multiple selected pages, or entire documents by 90°, 180°, or 270°, and immediately download a file that opens upright everywhere — on Windows, Mac, iPhone, Android, and even when printed.",
      "Best of all, you don't need an expensive Adobe Acrobat Pro subscription or any third-party desktop software. Because all processing happens directly in your browser with client-side JavaScript, your confidential documents are never uploaded to any cloud server.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "rotate-pdf",
        toolName: "Rotate PDF",
        text: "Rotate PDF and save it that way online free — instant permanent saving in your browser.",
      },
      { type: "h2", text: "How to rotate PDF and save it that way online free (Quick Steps)" },
      {
        type: "p",
        text: "Permanently saving rotated PDF pages takes just a few clicks using our free online tool:",
      },
      {
        type: "steps",
        items: [
          "Open the free [Rotate PDF](/rotate-pdf) tool in any desktop or mobile browser.",
          "Drag and drop your PDF file into the upload zone, or click to choose a document from your device.",
          "Select your desired angle: 90° clockwise, 180° upside-down flip, or 90° counter-clockwise (270°).",
          "Specify the pages to rotate (e.g. 2, 4-6) or leave the field blank to rotate every page in the document.",
          "Click Rotate PDF and instantly download your permanently corrected PDF document.",
        ],
      },
      { type: "h2", text: "Why browser rotate buttons fail to save the rotation" },
      {
        type: "p",
        text: "In the official PDF specification, every individual page object contains an optional rotation attribute known as the /Rotate key. This key can only take four valid degree values: 0, 90, 180, or 270.",
      },
      {
        type: "p",
        text: "When you view a PDF in Mozilla Firefox, Google Chrome, or Microsoft Edge, pressing the toolbar rotate button only applies a temporary CSS canvas transformation to your browser window. When you hit Save or Download, the browser simply hands you back the original binary byte stream with the original /Rotate flag untouched. As a result, the next person who opens your file sees the exact same sideways orientation.",
      },
      {
        type: "note",
        text: "MyPDF4U edits the PDF dictionary directly in your device memory. When you save with our tool, the /Rotate tag is permanently embedded into the PDF syntax, ensuring every desktop reader, mobile app, and office printer renders the pages the right way up.",
      },
      { type: "h2", text: "How to rotate PDF permanently in Firefox, Chrome, and Edge" },
      {
        type: "p",
        text: "If you frequently read documents inside Firefox or Chrome, you can work around the browser limitation in two ways. The quickest and most reliable approach is to drag the file straight into our [Rotate PDF](/rotate-pdf) tool. Alternatively, if you must use the browser itself, open the PDF in Chrome or Edge, click Rotate until it looks correct, press Ctrl+P (or Cmd+P on Mac) to bring up the Print dialog, set the printer destination to 'Save as PDF', and print to a fresh file. While Print to PDF works in a pinch, it often flattens forms, strips bookmarks, and increases file size. Using [Rotate PDF](/rotate-pdf) preserves all vector text, hyperlinks, and bookmarks losslessly.",
      },
      { type: "h2", text: "Rotating selective pages vs. the whole document" },
      {
        type: "p",
        text: "Most multipage PDFs aren't 100% sideways. Typically, a 20-page business report or contract is mostly portrait, with just one or two horizontal spreadsheets or scanned receipts on pages 5 and 12. If you rotate the entire file, you will ruin the 18 pages that were already correct.",
      },
      {
        type: "list",
        items: [
          "Rotate all pages: Leave the page selection empty to turn every page in unison.",
          "Rotate single pages: Type individual numbers such as 3 or 7 to turn only those specific sheets.",
          "Rotate page ranges: Enter mixed intervals such as 1, 4-6, 9 to correct multiple groups in one pass.",
          "Different angles for different pages: Run the tool once for pages needing 90° clockwise, and run it a second time for pages needing 180°.",
        ],
      },
      { type: "h2", text: "How to rotate PDF and delete pages or reorder in one pass" },
      {
        type: "p",
        text: "Need to rotate sideways pages and remove blank separator sheets or cover pages at the same time? You don't need multiple separate programs. With our [Organize PDF](/organize-pdf) tool, you can provide an exact list of the pages you wish to keep — e.g. '1-3, 5, 8-12' (omitting page 4 and 6-7 to delete them) — and apply an orientation correction simultaneously. Learn more in our detailed [How to Organize PDF Pages guide](/blog/how-to-organize-pdf-pages).",
      },
      { type: "h2", text: "How to rotate PDF and combine multiple files" },
      {
        type: "p",
        text: "When compiling invoices, receipts, and legal exhibits from different coworkers, scanner orientations are often mismatched. Before stitching them together, pass each document through [Rotate PDF](/rotate-pdf) so each component reads cleanly. Once straightened, open the [Merge PDF tool](/merge-pdf) to combine them into one seamless, presentation-ready packet. See our [How to Merge PDF Files tutorial](/blog/how-to-merge-pdf-files) for complete instructions.",
      },
      { type: "h2", text: "How to rotate PDF in VS Code" },
      {
        type: "p",
        text: "Software developers, technical writers, and data engineers frequently open generated PDFs in VS Code using popular extensions like 'vscode-pdf'. While the extension allows you to rotate the preview tab, this display setting is not saved back to disk. When your build scripts publish the PDF to production, users still receive sideways pages. To permanently resolve this, run your generated PDF through MyPDF4U or automate your build pipeline to set the /Rotate dictionary flag before committing your documentation.",
      },
      { type: "h2", text: "Zero quality loss: Why client-side rotation is superior" },
      {
        type: "p",
        text: "Many online converter sites re-render PDF pages as raster JPEG pictures and repackage them, causing blurry fonts, enlarged file sizes, and unselectable text. MyPDF4U never converts your PDF to raster images during rotation. It modifies only the orientation property in the document tree. Your vector graphics stay crisp, embedded fonts remain selectable, and the process completes in milliseconds.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Fixing a crooked or upside-down PDF shouldn't require installing bulky desktop software or buying an expensive subscription. By using MyPDF4U's browser-based [Rotate PDF](/rotate-pdf) tool, you can rotate PDF and save it that way permanently in seconds — with total privacy, zero watermarks, and guaranteed compatibility across all devices.",
      },
    ],
    faqs: [
      {
        q: "How do I rotate a PDF and save it that way permanently?",
        a: "Upload your document to MyPDF4U's free Rotate PDF tool, choose 90°, 180°, or 270°, and click Rotate PDF. The tool writes the orientation flag directly into the PDF specification so it opens correctly forever in all apps, viewers, and printers.",
      },
      {
        q: "Can I rotate PDF and save online free without Adobe Acrobat?",
        a: "Yes. MyPDF4U is 100% free with no account signup, no subscription, and no watermark. It runs entirely inside your web browser using client-side JavaScript.",
      },
      {
        q: "Why doesn't Firefox, Chrome, or Edge save my rotated PDF?",
        a: "The rotate buttons inside Firefox and Chrome only rotate the temporary on-screen viewport for viewing. They do not alter the underlying PDF file header. When you close and reopen the file, it reverts to its original orientation unless processed by a tool that writes the rotation into the file.",
      },
      {
        q: "Can I rotate only one or two specific pages in a PDF document?",
        a: "Yes. In the Pages field, enter specific numbers or ranges (such as '2, 5-7'). Only the designated pages will be rotated, while all other pages remain in their original orientation.",
      },
      {
        q: "Can I rotate PDF and delete pages in the same session?",
        a: "Yes. Use our Organize PDF tool (/organize-pdf). It lets you specify exactly which pages to keep (dropping any unwanted pages) and apply rotation in a single fast pass.",
      },
      {
        q: "How do I rotate a PDF and combine it with other files?",
        a: "First, straighten any sideways documents with Rotate PDF. Next, open our Merge PDF tool (/merge-pdf), add all your files in the desired order, and combine them into one unified PDF.",
      },
      {
        q: "How do I rotate a PDF in VS Code and save it permanently?",
        a: "VS Code PDF preview extensions only rotate the editor view. To permanently save the rotation in your workspace, open the PDF in MyPDF4U's Rotate PDF tool, download the corrected file, and save it over your project copy.",
      },
      {
        q: "Does rotating a PDF reduce document resolution or image sharpness?",
        a: "No. Rotation does not re-compress images or re-rasterize text. It simply changes the document's orientation metadata flag, so visual quality remains 100% identical to the source.",
      },
    ],
    related: [
      "how-to-rotate-pdf-pages",
      "how-to-organize-pdf-pages",
      "how-to-split-pdf-pages",
      "how-to-merge-pdf-files",
    ],
  },
  {
    slug: "how-to-organize-pdf-pages",
    title: "How to Reorder and Delete Pages in a PDF",
    metaTitle: "How to Organize PDF Pages — Reorder & Delete | MyPDF4U",
    description:
      "Rebuild a PDF with the pages you want, in the right order. One simple page list handles reordering, deleting blank sheets, and duplicating pages.",
    date: "2026-10-14",
    readTime: "5 min read",
    toolSlug: "organize-pdf",
    toolName: "Organize PDF",
    hero: {
      desktop: "/blog/organize-pdf-workflow-desktop.jpg",
      mobile: "/blog/organize-pdf-workflow-mobile.jpg",
      alt: "PDF pages being rearranged and one page removed",
      caption: "One page list controls both order and removal.",
      ...heroDims,
    },
    intro: [
      "Scanned packets rarely arrive in the right order. A signature page ends up number 1, a duplicate sneaks in, and page 2 is a blank sheet from the feeder. Now, here's where it gets good: rather than rescanning, rebuild the document.",
      "Indeed, [Organize PDF](/organize-pdf) works from a single page list. Type 3, 1, 2, 5-8 and you get a new PDF containing exactly those pages, in that sequence — anything you leave out is simply dropped. At the end of the day, you can also rotate the pages you keep in the same pass.",
      "Your original file is never modified: the tool builds a fresh copy in your browser and hands it to you as an instant download.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "organize-pdf",
        toolName: "Organize PDF",
        text: "Rebuild your PDF with the right pages, in the right order — free and private.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open [Organize PDF](/organize-pdf) and upload the document.",
          "Type the page order you want to keep, for example 3, 1, 2, 5-8.",
          "Optionally rotate the kept pages, then click Rebuild PDF and download it.",
        ],
      },
      { type: "h2", text: "Basically, how the page list works" },
      {
        type: "list",
        items: [
          "1, 3-10 — deletes page 2 by simply not listing it.",
          "3, 1, 2 — moves page 3 to the front.",
          "1, 1, 2 — duplicates page 1, useful for a repeated cover or divider.",
          "(empty) — keeps the current order and returns a copy of the document.",
        ],
      },
      {
        type: "note",
        text: "Numbers refer to positions in the file as your reader shows them, ignoring any printed page numbers. Open the PDF alongside the tool and count pages.",
      },
      { type: "h2", text: "Deleting pages by leaving them out" },
      {
        type: "p",
        text: "There's no separate delete step, which is the point: one list describes the pages you want. To drop the blank page 4 from a ten-page scan you write 1-3, 5-10. What we're seeing is: because pages are copied rather than re-encoded, the surviving pages retain their exact quality and their text stays selectable.",
      },
      { type: "h2", text: "Why rebuilding is safer than editing in place" },
      {
        type: "p",
        text: "The original file stays untouched on your device while you download a new copy. Interestingly, if you get the order wrong, nothing is lost — adjust the list and rebuild. Look, that's particularly reassuring for signed or official documents where you cannot afford to damage the source.",
      },
      { type: "h2", text: "A typical clean-up pass" },
      {
        type: "steps",
        items: [
          "Straighten sideways pages with [Rotate PDF](/rotate-pdf), or rotate them as you rebuild.",
          "List the pages you want to keep and rebuild with [Organize PDF](/organize-pdf).",
          "Add pages from another file using [Merge PDF](/merge-pdf), then rebuild again if the order needs adjusting.",
          "Shrink the finished document with [Compress PDF](/compress-pdf) if it has to be emailed.",
        ],
      },
      { type: "h2", text: "Here's why this matters: organize or split?" },
      {
        type: "p",
        text: "On top of that, use [Organize PDF](/organize-pdf) when the outcome is one document. Use [Split PDF](/split-pdf) when you want the selected pages as separate files — for instance, a folder of individual payslips rather than a single trimmed statement.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Listing printed page numbers rather than file positions.",
          "Forgetting that unlisted pages disappear — check your list covers everything you need.",
          "Rebuilding a password-protected file; remove the password first with [Unlock PDF](/unlock-pdf).",
          "Sending the result without opening it once to confirm the order.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Describe the document you want as a page list. What's more, you get it — reordered, trimmed, and lossless, with your original still intact.",
      },
    ],
    faqs: [
      {
        q: "How do I erase a page from a PDF?",
        a: "List every page except the one you want gone. To remove page 2 of a ten-page file, type 1, 3-10 and rebuild.",
      },
      {
        q: "Can I duplicate a page?",
        a: "Honestly, yes — list the same page number twice, for instance 1, 1, 2.",
      },
      {
        q: "What happens if I leave the page order empty?",
        a: "You get a copy of the document with its original page order preserved.",
      },
      {
        q: "Is the original file changed?",
        a: "No doubt, a new PDF is built in your browser and downloaded; your original file is untouched.",
      },
      {
        q: "Can I rotate pages at the same time?",
        a: "Yes. The rotate option applies to all the pages you keep. Plus, a whole batch of sideways scans can be fixed in one pass.",
      },
    ],
    related: [
      "rotate-pdf-and-save-it-that-way",
      "how-to-split-pdf-pages",
      "how-to-merge-pdf-files",
      "how-to-rotate-pdf-pages",
    ],
  },
  {
    slug: "how-to-add-watermark-to-pdf",
    title: "How to Add a Watermark to a PDF",
    metaTitle: "How to Add a Watermark to a PDF (DRAFT, CONFIDENTIAL) | MyPDF4U",
    description:
      "Stamp DRAFT, CONFIDENTIAL or a client name across every page of a PDF, with control over position, opacity and size — free and in your browser.",
    date: "2026-10-14",
    readTime: "5 min read",
    toolSlug: "watermark-pdf",
    toolName: "Watermark PDF",
    hero: {
      desktop: "/blog/watermark-pdf-workflow-desktop.jpg",
      mobile: "/blog/watermark-pdf-workflow-mobile.jpg",
      alt: "A PDF page with a diagonal semi-transparent text watermark across it",
      caption: "A diagonal stamp is drawn onto every page of the document.",
      ...heroDims,
    },
    intro: [
      "A watermark sets expectations before anyone reads a word. Definitely, DRAFT stops a colleague quoting an unfinished figure; CONFIDENTIAL reminds a reader not to forward the file; a client name makes it obvious which copy of a proposal escaped into the wild.",
      "So, what does this mean? To be completely honest, [Watermark PDF](/watermark-pdf) draws a semi-transparent text stamp on every page. You pick the words, the position — diagonally across the centre or in any corner — the opacity, and the text size. Usually, the stamp becomes part of the page content, and the whole thing runs directly in your browser.",
      "Short text works best. Long phrases are scaled down to fit, which makes them harder to read at a glance.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "watermark-pdf",
        toolName: "Watermark PDF",
        text: "Stamp your PDF with DRAFT, CONFIDENTIAL or your own text — free, no sign-up.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open [Watermark PDF](/watermark-pdf) and upload the document.",
          "Type your watermark text, such as DRAFT or CONFIDENTIAL.",
          "On top of that, pick a position, an opacity and a text size.",
          "Apply the watermark and download the stamped PDF.",
        ],
      },
      { type: "h2", text: "Really, choosing position and opacity" },
      {
        type: "list",
        items: [
          "Centre (diagonal) — the classic status stamp. Clearly unmissable, and hardest to crop away.",
          "Corners — better when the page is dense and you don't want text obscured.",
          "Very light (10%) or Light (22%) — readable pages, visible mark. Light is the sensible default.",
          "Medium (40%) or Strong (65%) — for documents that must not be mistaken for a final version.",
        ],
      },
      {
        type: "p",
        text: "Opacity is the real trade-off to think about. Too faint and readers miss it entirely; too strong and the underlying text becomes tiring to read. If the document will be printed on a mono printer, test one page first — a light tint on screen can almost vanish in greyscale.",
      },
      {
        type: "note",
        text: "Text watermarks are supported today; image or logo watermarks aren't yet available.",
      },
      { type: "h2", text: "Good watermark text" },
      {
        type: "list",
        items: [
          "DRAFT — for anything still under review.",
          "CONFIDENTIAL or INTERNAL ONLY — for documents that shouldn't circulate.",
          "COPY or SAMPLE — for reference versions of a signed original.",
          "A client or project name — makes each recipient's copy identifiable.",
          "A date, such as DRAFT 2026-10 — useful when several versions are in flight.",
        ],
      },
      { type: "h2", text: "What a watermark can and cannot do" },
      {
        type: "p",
        text: "The stamp is drawn into the page content, so it is not a layer a reader can simply switch off, and it travels with the file when it is forwarded or printed. Usually, it's not, however, a security control: anyone determined enough can rebuild pages without it. Definitely, treat a watermark as clear labelling, and use [password protection](/protect-pdf) or careful distribution when you actually want to restrict access.",
      },
      { type: "h2", text: "Where it fits in a workflow" },
      {
        type: "steps",
        items: [
          "Assemble the final document first with [Merge PDF](/merge-pdf) or [Organize PDF](/organize-pdf).",
          "Apply the watermark once, so every page carries the same marker.",
          "Compress with [Compress PDF](/compress-pdf) last if the file needs to be emailed.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Watermarking before the document is final, then having to redo it after adding pages.",
          "Generally, choosing 65% opacity on a text-heavy report and making it hard to read.",
          "Writing a long sentence, which shrinks to near-illegibility.",
          "Interestingly, assuming a watermark prevents copying — it labels, it doesn't lock.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Keep the text short, start at Light opacity, and stamp the document only when it's final. Of course, that gives you a clear, professional mark on every page in a couple of clicks.",
      },
    ],
    faqs: [
      {
        q: "How do I add a DRAFT watermark to a PDF?",
        a: "Open Watermark PDF, type DRAFT, keep the centre diagonal position and Light opacity, then apply and download.",
      },
      {
        q: "Can I use an image or logo as the watermark?",
        a: "Not yet. Text watermarks are supported today.",
      },
      {
        q: "Can the watermark be removed later?",
        a: "Indeed, it is drawn into the page content, so it's not a simple toggle. Keep an unwatermarked copy of your original if you will need one.",
      },
      {
        q: "Does the watermark appear on every page?",
        a: "Here's the deal: yes, the same stamp is applied to all pages of the document.",
      },
      {
        q: "Which opacity should I choose?",
        a: "The truth is: Light (22%) suits most documents. Increase it if the mark must be impossible to overlook, and test a print if the file will be photocopied.",
      },
    ],
    related: [
      "how-to-organize-pdf-pages",
      "rotate-pdf-and-save-it-that-way",
      "how-to-merge-pdf-files",
      "how-to-remove-pdf-password",
    ],
  },
  {
    slug: "how-to-remove-pdf-password",
    title: "How to Remove a Password from a PDF You Own",
    metaTitle: "How to Remove a PDF Password You Know | MyPDF4U",
    description:
      "Save an unlocked copy of a PDF you can already open, so it stops asking for a password every time. What the tool does, and what it deliberately cannot do.",
    date: "2026-10-14",
    readTime: "5 min read",
    toolSlug: "unlock-pdf",
    toolName: "Unlock PDF",
    hero: {
      desktop: "/blog/unlock-pdf-workflow-desktop.jpg",
      mobile: "/blog/unlock-pdf-workflow-mobile.jpg",
      alt: "A password-protected PDF being saved as an unlocked copy",
      caption: "The unlocked copy opens without a password prompt.",
      ...heroDims,
    },
    intro: [
      "Bank statements and payslips often arrive encrypted, and typing the password every single time gets old — especially when the file has to be attached to a form or read on a phone.",
      "Indeed, [Unlock PDF](/unlock-pdf) removes protection from a document you can already open. You supply the password you normally type, and the tool decrypts the file in your browser and rebuilds it as a copy that opens with no prompt. The password is used once, in memory, and is never sent anywhere.",
      "One important trade-off: pages in the unlocked copy are rebuilt as high-resolution images. It looks identical, but the text is no longer selectable or searchable. Basically, run [OCR](/ocr-pdf) afterwards if you need a text layer back.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "unlock-pdf",
        toolName: "Unlock PDF",
        text: "Save a password-free copy of a PDF you can already open — free and local.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open [Unlock PDF](/unlock-pdf) and upload the protected document.",
          "Type the password you normally use to open it.",
          "Click Unlock PDF and download the copy, which opens without any prompt.",
        ],
      },
      { type: "h2", text: "What this tool won't do" },
      {
        type: "p",
        text: "It cannot crack an unknown password, and it is not designed to. Certainly, you need the password before you start; the tool only removes protection from documents you are entitled to open. Any service promising to break passwords it was never given should be treated with suspicion, and removing protection from someone else's document isn't something to attempt.",
      },
      { type: "h2", text: "Why the text stops being selectable" },
      {
        type: "p",
        text: "Rather than editing the encryption dictionary of a data file whose structure varies between producers, the tool renders each decrypted page at high resolution and assembles those pages into a fresh PDF. Usually, the effect is visually identical and reliably openable everywhere — but it is a picture of each page, so search and copy no longer work.",
      },
      {
        type: "note",
        text: "Need searchable text in the unlocked copy? Run it through [OCR PDF](/ocr-pdf) afterwards to add a text layer back.",
      },
      { type: "h2", text: "Consequences to plan for" },
      {
        type: "list",
        items: [
          "Search and copy stop working until you run OCR.",
          "[PDF to Word](/pdf-to-word) will produce an empty document from the unlocked copy unless OCR is run first.",
          "File size usually grows, because page images are heavier than text — [Compress PDF](/compress-pdf) brings it back down.",
          "Anyone with the file can now open it, so store the unlocked copy carefully.",
        ],
      },
      { type: "h2", text: "When removing the password is the right call" },
      {
        type: "list",
        items: [
          "Uploading a statement to a portal that cannot handle encrypted files.",
          "Archiving your own documents where the password is one more thing to lose.",
          "Preparing pages for [Split PDF](/split-pdf) or [Merge PDF](/merge-pdf), which cannot read encrypted files.",
          "Reading a document on a device where typing a long password is painful.",
        ],
      },
      { type: "h2", text: "Keeping the file protected instead" },
      {
        type: "p",
        text: "If the document genuinely needs to stay restricted, don't unlock it — or unlock a working copy and keep the encrypted master. Password protection for new documents isn't available on MyPDF4U yet; the [Protect PDF](/protect-pdf) tool is still in development.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Unlocking is speedy and stays on your device. Notably, just decide first whether you need searchable text — if you do, follow up with OCR, and compress the result if it has grown.",
      },
    ],
    faqs: [
      {
        q: "Can this open a PDF if I don't know the password?",
        a: "No. You must know the password. The tool only removes protection from documents you are entitled to open.",
      },
      {
        q: "Is my password sent to a server?",
        a: "No. It is used once, in memory, inside your browser tab, and the file is decrypted locally on your device.",
      },
      {
        q: "Why can I no longer select text in the unlocked file?",
        a: "Pages are rebuilt as high-resolution images, so the copy looks identical but isn't searchable. Run OCR PDF to add a text layer.",
      },
      {
        q: "Why is the unlocked file larger than the original?",
        a: "Page images take more space than text. Use Compress PDF to reduce the size.",
      },
      {
        q: "Can I add a password to a PDF here?",
        a: "Not yet — the Protect PDF tool is still in development.",
      },
    ],
    related: [
      "how-to-ocr-scanned-pdf",
      "how-to-compress-pdf-for-email",
      "how-to-organize-pdf-pages",
      "rotate-pdf-and-save-it-that-way",
    ],
  },
];
