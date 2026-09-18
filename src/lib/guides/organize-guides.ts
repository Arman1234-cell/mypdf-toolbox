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
    related: ["how-to-organize-pdf-pages", "how-to-split-pdf-pages", "how-to-ocr-scanned-pdf"],
  },
  {
    slug: "how-to-organize-pdf-pages",
    title: "How to Reorder and Delete Pages in a PDF",
    metaTitle: "How to Organize PDF Pages — Reorder & Delete | MyPDF4U",
    description:
      "Rebuild a PDF with the pages you want, in the order you want. One page list handles reordering, deleting and even duplicating pages.",
    date: "2026-09-05",
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
      "Scanned packets rarely arrive in the right order. A signature page ends up first, a duplicate sneaks in, and page 2 is a blank sheet from the feeder. Rather than rescanning, rebuild the document.",
      "[Organize PDF](/organize-pdf) works from a single page list. Type 3, 1, 2, 5-8 and you get a new PDF containing exactly those pages, in that sequence — anything you leave out is simply dropped. You can also rotate the pages you keep in the same pass.",
      "Your original file is never modified: the tool builds a fresh copy in your browser and hands it to you as a download.",
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
      { type: "h2", text: "How the page list works" },
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
        text: "Numbers refer to positions in the file. Open the PDF alongside the tool and count pages as your reader shows them, ignoring any printed page numbers.",
      },
      { type: "h2", text: "Deleting pages by leaving them out" },
      {
        type: "p",
        text: "There is no separate delete step, which is the point: one list describes the document you want. To drop the blank page 4 from a ten-page scan you write 1-3, 5-10. Because pages are copied rather than re-encoded, the surviving pages keep their exact quality and their text stays selectable.",
      },
      { type: "h2", text: "Why rebuilding is safer than editing in place" },
      {
        type: "p",
        text: "The original file stays untouched on your device while you download a new copy. If you get the order wrong, nothing is lost — adjust the list and rebuild. That is particularly reassuring for signed or official documents where you cannot afford to damage the source.",
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
      { type: "h2", text: "Organize or split?" },
      {
        type: "p",
        text: "Use Organize PDF when the outcome is one document. Use [Split PDF](/split-pdf) when you want the selected pages as separate files — for instance a folder of individual payslips rather than a single trimmed statement.",
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
        text: "Describe the document you want as a page list, and you get it — reordered, trimmed, and lossless, with your original still intact.",
      },
    ],
    faqs: [
      {
        q: "How do I delete a page from a PDF?",
        a: "List every page except the one you want gone. To remove page 2 of a ten-page file, type 1, 3-10 and rebuild.",
      },
      {
        q: "Can I duplicate a page?",
        a: "Yes — list the same page number twice, for example 1, 1, 2.",
      },
      {
        q: "What happens if I leave the page order empty?",
        a: "You get a copy of the document with its original page order preserved.",
      },
      {
        q: "Is the original file changed?",
        a: "No. A new PDF is built in your browser and downloaded; your source file is untouched.",
      },
      {
        q: "Can I rotate pages at the same time?",
        a: "Yes. The rotate option applies to all the pages you keep, so a whole batch of sideways scans can be fixed in one pass.",
      },
    ],
    related: ["how-to-split-pdf-pages", "how-to-merge-pdf-files", "how-to-rotate-pdf-pages"],
  },
  {
    slug: "how-to-add-watermark-to-pdf",
    title: "How to Add a Watermark to a PDF",
    metaTitle: "How to Add a Watermark to a PDF (DRAFT, CONFIDENTIAL) | MyPDF4U",
    description:
      "Stamp DRAFT, CONFIDENTIAL or a client name across every page of a PDF, with control over position, opacity and size — free and in your browser.",
    date: "2026-09-05",
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
      "A watermark sets expectations before anyone reads a word. DRAFT stops a colleague quoting an unfinished figure; CONFIDENTIAL reminds a reader not to forward the file; a client name makes it obvious which copy of a proposal escaped into the wild.",
      "[Watermark PDF](/watermark-pdf) draws a semi-transparent text stamp on every page. You choose the words, the position — diagonally across the centre or in any corner — the opacity, and the text size. The stamp becomes part of the page content, and the whole thing runs in your browser.",
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
          "Pick a position, an opacity and a text size.",
          "Apply the watermark and download the stamped PDF.",
        ],
      },
      { type: "h2", text: "Choosing position and opacity" },
      {
        type: "list",
        items: [
          "Centre (diagonal) — the classic status stamp. Unmissable, and hardest to crop away.",
          "Corners — better when the page is dense and you do not want text obscured.",
          "Very light (10%) or Light (22%) — readable pages, visible mark. Light is the sensible default.",
          "Medium (40%) or Strong (65%) — for documents that must not be mistaken for a final version.",
        ],
      },
      {
        type: "p",
        text: "Opacity is the trade-off to think about. Too faint and readers miss it entirely; too strong and the underlying text becomes tiring to read. If the document will be printed on a mono printer, test one page first — a light green tint on screen can almost vanish in greyscale.",
      },
      {
        type: "note",
        text: "Text watermarks are supported today; image or logo watermarks are not yet available.",
      },
      { type: "h2", text: "Good watermark text" },
      {
        type: "list",
        items: [
          "DRAFT — for anything still under review.",
          "CONFIDENTIAL or INTERNAL ONLY — for documents that should not circulate.",
          "COPY or SAMPLE — for reference versions of a signed original.",
          "A client or project name — makes each recipient's copy identifiable.",
          "A date, such as DRAFT 2026-09 — useful when several versions are in flight.",
        ],
      },
      { type: "h2", text: "What a watermark can and cannot do" },
      {
        type: "p",
        text: "The stamp is drawn into the page content, so it is not a layer a reader can simply switch off, and it travels with the file when it is forwarded or printed. It is not, however, a security control: anyone determined enough can rebuild pages without it. Treat a watermark as clear labelling, and use [password protection](/protect-pdf) or careful distribution when you actually need to restrict access.",
      },
      { type: "h2", text: "Where it fits in a workflow" },
      {
        type: "steps",
        items: [
          "Assemble the final document first with [Merge PDF](/merge-pdf) or [Organize PDF](/organize-pdf).",
          "Apply the watermark once, so every page carries the same mark.",
          "Compress with [Compress PDF](/compress-pdf) last if the file needs to be emailed.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Watermarking before the document is final, then having to redo it after adding pages.",
          "Choosing 65% opacity on a text-heavy report and making it hard to read.",
          "Writing a long sentence, which shrinks to near-illegibility.",
          "Assuming a watermark prevents copying — it labels, it does not lock.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Keep the text short, start at Light opacity, and stamp the document only when it is final. That gives you a clear, professional mark on every page in a couple of clicks.",
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
        a: "It is drawn into the page content, so it is not a simple toggle. Keep an unwatermarked copy of your original if you will need one.",
      },
      {
        q: "Does the watermark appear on every page?",
        a: "Yes, the same stamp is applied to all pages of the document.",
      },
      {
        q: "Which opacity should I choose?",
        a: "Light (22%) suits most documents. Increase it if the mark must be impossible to overlook, and test a print if the file will be photocopied.",
      },
    ],
    related: ["how-to-organize-pdf-pages", "how-to-merge-pdf-files", "how-to-remove-pdf-password"],
  },
  {
    slug: "how-to-remove-pdf-password",
    title: "How to Remove a Password from a PDF You Own",
    metaTitle: "How to Remove a PDF Password You Know | MyPDF4U",
    description:
      "Save an unlocked copy of a PDF you can already open, so it stops asking for a password every time. What the tool does, and what it deliberately cannot do.",
    date: "2026-09-05",
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
      "[Unlock PDF](/unlock-pdf) removes protection from a document you can already open. You supply the password you normally type, and the tool decrypts the file in your browser and rebuilds it as a copy that opens with no prompt. The password is used once, in memory, and is never sent anywhere.",
      "One important trade-off: pages in the unlocked copy are rebuilt as high-resolution images. It looks the same, but the text is no longer selectable or searchable. Run [OCR](/ocr-pdf) afterwards if you need a text layer back.",
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
      { type: "h2", text: "What this tool will not do" },
      {
        type: "p",
        text: "It cannot crack an unknown password, and it is not designed to. You need the password before you start; the tool only removes protection from documents you are entitled to open. Any service promising to break passwords it was never given should be treated with suspicion, and removing protection from someone else's document is not something to attempt.",
      },
      { type: "h2", text: "Why the text stops being selectable" },
      {
        type: "p",
        text: "Rather than editing the encryption dictionary of a file whose structure varies between producers, the tool renders each decrypted page at high resolution and assembles those pages into a fresh PDF. The result is visually identical and reliably openable everywhere — but it is a picture of each page, so search and copy no longer work.",
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
        text: "If the document genuinely needs to stay restricted, do not unlock it — or unlock a working copy and keep the encrypted original. Password protection for new documents is not available on MyPDF4U yet; the [Protect PDF](/protect-pdf) tool is still in development.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Unlocking is quick and stays on your device. Just decide first whether you need searchable text — if you do, follow up with OCR, and compress the result if it has grown.",
      },
    ],
    faqs: [
      {
        q: "Can this open a PDF if I do not know the password?",
        a: "No. You must know the password. The tool only removes protection from documents you are entitled to open.",
      },
      {
        q: "Is my password sent to a server?",
        a: "No. It is used once, in memory, inside your browser tab, and the file is decrypted on your device.",
      },
      {
        q: "Why can I no longer select text in the unlocked file?",
        a: "Pages are rebuilt as high-resolution images, so the copy looks identical but is not searchable. Run OCR PDF to add a text layer.",
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
    related: ["how-to-ocr-scanned-pdf", "how-to-compress-pdf-for-email", "how-to-split-pdf-pages"],
  },
];
