import type { Article } from "@/lib/articles";


const heroDims = {
  desktopWidth: 1536,
  desktopHeight: 768,
  mobileWidth: 768,
  mobileHeight: 576,
};

/** Guides for the conversion tools (PDF ↔ images, PDF ↔ Word, OCR). */
export const convertGuides: Article[] = [
  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF Pages to JPG Images",
    metaTitle: "How to Convert PDF to JPG (Free, In Your Browser) | MyPDF4U",
    description:
      "Turn any PDF page into a JPG image you can drop into a slide, a chat or a web page — with the right resolution and no software to install.",
    date: "2026-09-05",
    readTime: "6 min read",
    toolSlug: "pdf-to-jpg",
    toolName: "PDF to JPG Converter",
    hero: {
      desktop: "/blog/pdf-to-jpg-workflow-desktop.jpg",
      mobile: "/blog/pdf-to-jpg-workflow-mobile.jpg",
      alt: "A PDF document being converted into a stack of JPG page images",
      caption: "Each PDF page is rendered as its own JPG image.",
      ...heroDims,
    },
    intro: [
      "Sometimes a PDF is the wrong container. You need one page inside a presentation, a diagram in a chat message, or a preview thumbnail for a website — and all of those want an image, not a document.",
      "The [PDF to JPG converter](/pdf-to-jpg) does exactly that: it renders each page of your PDF as a JPG at the resolution you pick. A single-page file downloads as one image; a longer document arrives as a ZIP with one JPG per page. Everything is rendered inside your browser tab, so the PDF is never uploaded.",
      "The only decision that really matters is resolution. Screen quality keeps files small for previews, High is the sensible default for most uses, and Print gives you the largest, sharpest images for anything that will be printed or zoomed into.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-jpg",
        toolName: "PDF to JPG Converter",
        text: "Convert your PDF pages to JPG images now — free, no account, nothing to install.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to JPG tool](/pdf-to-jpg) and add your PDF.",
          "Pick an image quality: Screen, High or Print.",
          "Click Convert to JPG and download the image, or the ZIP if your PDF has several pages.",
        ],
      },
      { type: "h2", text: "How the conversion actually works" },
      {
        type: "p",
        text: "A PDF page is a set of drawing instructions — text runs, vector shapes and embedded images. To make a JPG, each page has to be drawn onto a canvas at a chosen scale and then encoded as a photo-style image. That is why you choose a quality level rather than a fixed pixel size: the scale multiplies the page's natural dimensions, so an A4 page and a wide slide both come out proportionally correct.",
      },
      {
        type: "p",
        text: "Because JPG is a photographic format, the result is a flat picture. Text in the image looks identical to the original page but is no longer selectable or searchable. If you need editable text instead, convert to [Word](/pdf-to-word), and if the PDF is a scan, run [OCR](/ocr-pdf) first.",
      },
      { type: "h2", text: "Choosing the right quality setting" },
      {
        type: "list",
        items: [
          "Screen — smallest files, good for email previews, thumbnails and quick sharing where fine print does not matter.",
          "High — the recommended default. Text stays crisp on a normal display and file sizes stay reasonable.",
          "Print — the largest output. Use it when the image will be printed, projected, or cropped and zoomed.",
        ],
      },
      {
        type: "note",
        text: "Working with diagrams, charts or screenshots with thin lines? [PDF to PNG](/pdf-to-png) is the better choice — PNG is lossless, so edges stay perfectly sharp instead of picking up JPG artefacts.",
      },
      { type: "h2", text: "Converting only the pages you need" },
      {
        type: "p",
        text: "Converting a 60-page report to images when you only want page 12 leaves you sifting through a ZIP. Extract the page first with [Split PDF](/split-pdf) — type 12, download the single-page PDF, then convert that. You get one image, named predictably, in half the time.",
      },
      { type: "h2", text: "Practical uses" },
      {
        type: "list",
        items: [
          "Dropping a certificate, invoice or ticket into a slide deck or document.",
          "Sharing a page in a chat app that compresses PDFs but shows images inline.",
          "Creating preview thumbnails of a brochure for a website or listing.",
          "Attaching a page to a form that only accepts JPG or PNG uploads.",
        ],
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Using Screen quality for something that will be printed — the text will look soft on paper.",
          "Converting a password-protected PDF; remove the password first with [Unlock PDF](/unlock-pdf).",
          "Expecting to edit the text afterwards. A JPG is a picture, not a document.",
          "Converting a huge document at Print quality on a phone — it works, but it is slow and memory-hungry.",
        ],
      },
      { type: "h2", text: "Going the other way" },
      {
        type: "p",
        text: "If your goal is the reverse — collecting images back into a document — use [JPG to PDF](/jpg-to-pdf) or the general [Image to PDF](/image-to-pdf) tool. A common round trip is: export pages as JPG, drop the ones you do not need, then rebuild a shorter PDF from the images that remain.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Converting PDF to JPG is mostly a resolution decision. Pick High for everyday use, Print when the image will be enlarged, and split out single pages first when you only need one. Everything else takes two clicks.",
      },
    ],
    faqs: [
      {
        q: "How do I convert a PDF to JPG for free?",
        a: "Open the PDF to JPG tool, add your file, choose a quality level and click Convert to JPG. There is no account and no cost.",
      },
      {
        q: "What happens with a multi-page PDF?",
        a: "You get one JPG per page, bundled into a single ZIP file so it is one download.",
      },
      {
        q: "Can I convert just one page?",
        a: "Extract that page with the Split PDF tool first, then convert the resulting one-page PDF.",
      },
      {
        q: "Will the text still be selectable?",
        a: "No. JPG is an image format, so the page becomes a picture. Use PDF to Word if you need editable text.",
      },
      {
        q: "Is my PDF uploaded to a server?",
        a: "No. The pages are rendered inside your browser tab, so the file stays on your device.",
      },
    ],
    related: ["how-to-convert-pdf-to-png", "how-to-convert-jpg-to-pdf", "how-to-split-pdf-pages"],
  },
  {
    slug: "how-to-convert-pdf-to-png",
    title: "How to Convert PDF to PNG Without Losing Sharpness",
    metaTitle: "How to Convert PDF to PNG (Lossless Page Images) | MyPDF4U",
    description:
      "Export PDF pages as lossless PNG images that keep diagrams, charts and small text perfectly crisp — free, and without uploading your file.",
    date: "2026-09-05",
    readTime: "5 min read",
    toolSlug: "pdf-to-png",
    toolName: "PDF to PNG Converter",
    hero: {
      desktop: "/blog/pdf-to-png-workflow-desktop.jpg",
      mobile: "/blog/pdf-to-png-workflow-mobile.jpg",
      alt: "A PDF page being exported as a lossless PNG image",
      caption: "PNG output keeps lines and small text perfectly sharp.",
      ...heroDims,
    },
    intro: [
      "PNG is the format to reach for when a PDF page contains diagrams, tables, screenshots or fine print. Unlike JPG, PNG compresses without throwing detail away, so thin lines and small letters stay exactly as sharp as they were in the document.",
      "The [PDF to PNG converter](/pdf-to-png) renders every page of your PDF as a PNG at the scale you choose. One page downloads as a single image; multiple pages arrive together in a ZIP. Rendering happens locally in your browser, so the document is not uploaded anywhere.",
      "Expect larger files than JPG. That is the trade-off for lossless quality, and it is usually worth it for anything technical.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-png",
        toolName: "PDF to PNG Converter",
        text: "Export your PDF pages as sharp PNG images — free and in your browser.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to PNG tool](/pdf-to-png) and select your PDF.",
          "Choose a rendering quality — High suits most work, Print for enlargements.",
          "Convert, then download the PNG or the ZIP of page images.",
        ],
      },
      { type: "h2", text: "PNG or JPG: which should you pick?" },
      {
        type: "list",
        items: [
          "Choose PNG for charts, tables, CAD-style drawings, code screenshots and any page with small text.",
          "Choose [JPG](/pdf-to-jpg) for photo-heavy pages, or when the file size has to stay small.",
          "PNG is lossless, so you can crop and re-save the image later without it degrading.",
          "JPG re-compresses every time it is saved, which gradually softens edges and text.",
        ],
      },
      { type: "h2", text: "Why lossless matters for documents" },
      {
        type: "p",
        text: "JPG compression works by discarding detail the eye is unlikely to miss in a photograph. Documents break that assumption: a page is mostly flat white with high-contrast black edges, exactly the pattern JPG handles worst. The result is faint grey halos around letters and blurred hairlines in tables. PNG stores the pixels as they were rendered, so a screenshot of a spreadsheet still reads cleanly at 100%.",
      },
      {
        type: "note",
        text: "Pages are rendered on a white background so they look like printed pages. If you need genuine transparency, you will have to remove the background in an image editor afterwards.",
      },
      { type: "h2", text: "Getting the resolution right" },
      {
        type: "p",
        text: "The quality setting multiplies the page's natural size. Screen is fine for a quick look, High doubles it and is the sensible default, and Print triples it for pages that will be enlarged or printed. If a chart's axis labels look soft, step up one level rather than scaling the image up afterwards — upscaling cannot recover detail that was never rendered.",
      },
      { type: "h2", text: "Typical uses" },
      {
        type: "list",
        items: [
          "Putting a diagram from a report into a slide without a fuzzy edge in sight.",
          "Capturing a signed page as an image for an internal record.",
          "Publishing a document page on a website or knowledge base.",
          "Preparing figures from a paper for a poster or handout.",
        ],
      },
      { type: "h2", text: "Working with lots of pages" },
      {
        type: "p",
        text: "Whole-document exports are easy but rarely what you want. Pull the pages you need out first with [Split PDF](/split-pdf), then convert. If you do export everything, the ZIP keeps page order in the filenames, so it stays easy to find page 14 later.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "PNG is the safe default whenever a PDF page contains lines, tables or small text. Pick High quality, export the pages you actually need, and the images will look exactly like the document they came from.",
      },
    ],
    faqs: [
      {
        q: "Is PNG better than JPG for PDF pages?",
        a: "For text, tables and diagrams, yes — PNG is lossless so edges stay crisp. For photographic pages, JPG gives much smaller files at similar visual quality.",
      },
      {
        q: "Why is my PNG file so large?",
        a: "Lossless compression keeps every pixel. Lower the quality setting, or use JPG if size matters more than sharpness.",
      },
      {
        q: "Does the PNG keep transparency?",
        a: "No. Pages are rendered on a white background so they match how the document prints.",
      },
      {
        q: "How do I turn PNG images back into a PDF?",
        a: "Use the PNG to PDF tool — it places one image per page and lets you set the order.",
      },
    ],
    related: ["how-to-convert-pdf-to-jpg", "how-to-convert-png-to-pdf", "how-to-split-pdf-pages"],
  },
  {
    slug: "how-to-convert-images-to-pdf",
    title: "How to Convert Images to PDF in One Document",
    metaTitle: "How to Convert Images to PDF (JPG & PNG, Free) | MyPDF4U",
    description:
      "Combine photos, screenshots and scans of mixed formats into one ordered PDF. A short guide to page order, orientation and file size.",
    date: "2026-09-05",
    readTime: "5 min read",
    toolSlug: "image-to-pdf",
    toolName: "Image to PDF Converter",
    hero: {
      desktop: "/blog/image-to-pdf-workflow-desktop.jpg",
      mobile: "/blog/image-to-pdf-workflow-mobile.jpg",
      alt: "Several image thumbnails being combined into one multi-page PDF document",
      caption: "Mixed JPG and PNG images become ordered pages in one PDF.",
      ...heroDims,
    },
    intro: [
      "Most real-world uploads are a mixture: two phone photos of a signed form, a screenshot of a confirmation email, and a scan someone sent you. Sending them as separate attachments makes the recipient reassemble your story. One PDF solves it.",
      "The [Image to PDF converter](/image-to-pdf) accepts JPG, JPEG and PNG files in the same batch, places one image per page, and lets you set the order visually before converting. It runs in your browser, so nothing is uploaded.",
      "If everything you have is one format, the dedicated [JPG to PDF](/jpg-to-pdf) and [PNG to PDF](/png-to-pdf) tools do the same job with wording tuned to that format — pick whichever you find first.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "image-to-pdf",
        toolName: "Image to PDF Converter",
        text: "Turn your photos, screenshots and scans into one PDF — free, no sign-up.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [Image to PDF tool](/image-to-pdf) and add all your images at once.",
          "Drag the thumbnails until the page order is right, and rotate anything sideways.",
          "Remove images you do not need, then click Convert to PDF and download.",
        ],
      },
      { type: "h2", text: "Why one PDF beats a folder of images" },
      {
        type: "list",
        items: [
          "Forms and portals usually accept a single document, not fifteen separate files.",
          "Page order is fixed, so the reader sees your pages in the sequence you intended.",
          "Orientation is baked in — no more tilting a laptop to read a sideways photo.",
          "A PDF opens identically on Windows, macOS, Android and iOS.",
        ],
      },
      { type: "h2", text: "Order and orientation come first" },
      {
        type: "p",
        text: "Filenames rarely match reading order — IMG_4821 tells you nothing about which page is the front of the form. That is why the tool shows thumbnails: you arrange pages by looking at them, not by renaming files. Fix orientation in the same pass, because a rotated page is much harder to correct once it is inside a PDF.",
      },
      {
        type: "note",
        text: "Only need to fix orientation in an existing document? [Rotate PDF](/rotate-pdf) turns chosen pages and writes the change into the file.",
      },
      { type: "h2", text: "Keeping quality while controlling size" },
      {
        type: "p",
        text: "Images are embedded at their original resolution, so a 12-megapixel photo keeps its detail — and its weight. Ten phone photos can easily produce a PDF of 30 MB or more, which many mail servers will reject. Convert first, then shrink the finished document with [Compress PDF](/compress-pdf); compressing once at the end beats compressing each image beforehand.",
      },
      { type: "h2", text: "Tips for photographing documents" },
      {
        type: "list",
        items: [
          "Shoot straight down, with the page filling the frame, in even light.",
          "Keep every page in the same orientation so the finished PDF reads consistently.",
          "Use the original file, not a version re-sent through a chat app — those are re-compressed.",
          "Crop out desks and hands before converting; it looks tidier and reduces file size.",
        ],
      },
      { type: "h2", text: "Which formats are supported" },
      {
        type: "p",
        text: "JPG, JPEG and PNG work today, and they can be mixed freely in one document. Transparent areas in a PNG are drawn on a white page background. HEIC photos from an iPhone are not supported yet — share or export them as JPG from your phone first, then convert.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Add every image in one go, arrange the pages while you can still see them, and compress at the end if the file has to travel by email. That is the whole workflow.",
      },
    ],
    faqs: [
      {
        q: "Can I mix JPG and PNG images in the same PDF?",
        a: "Yes. Add both formats in one batch and each image becomes a page in the same document.",
      },
      {
        q: "How do I change the page order?",
        a: "Drag the thumbnails in the grid before converting. The PDF follows the order you see.",
      },
      {
        q: "Is there a limit on the number of images?",
        a: "There is no fixed limit. Very large batches just take longer, because the work happens on your own device.",
      },
      {
        q: "My PDF is too big to email. What now?",
        a: "Run the finished PDF through the Compress PDF tool and choose a stronger compression level.",
      },
      {
        q: "Can I convert HEIC photos from my iPhone?",
        a: "Not yet. Export or share them as JPG first, then convert those files.",
      },
    ],
    related: [
      "how-to-convert-jpg-to-pdf",
      "how-to-convert-png-to-pdf",
      "how-to-compress-pdf-for-email",
    ],
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert a PDF into an Editable Word Document",
    metaTitle: "How to Convert PDF to Word (Editable .docx, Free) | MyPDF4U",
    description:
      "Get the text out of a PDF and into an editable .docx you can rewrite — plus an honest look at what layout survives the conversion and what does not.",
    date: "2026-09-05",
    readTime: "6 min read",
    toolSlug: "pdf-to-word",
    toolName: "PDF to Word Converter",
    hero: {
      desktop: "/blog/pdf-to-word-workflow-desktop.jpg",
      mobile: "/blog/pdf-to-word-workflow-mobile.jpg",
      alt: "A PDF document turning into an editable word processor document",
      caption: "The PDF's text layer becomes editable paragraphs in a .docx file.",
      ...heroDims,
    },
    intro: [
      "You need to change two sentences in a PDF, and the original document is gone. Retyping is the usual fallback — converting to Word is faster.",
      "The [PDF to Word converter](/pdf-to-word) reads the text layer of your PDF inside your browser and writes it into a standard .docx file that Word, Pages and Google Docs all open. Nothing is uploaded; the extraction happens on your device.",
      "Be clear about what you get: text, paragraphs and reading order are preserved, while complex columns, tables and images are simplified into plain paragraphs. Treat the result as an editable draft rather than a pixel-perfect clone — which is exactly what you want when the goal is rewriting.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-word",
        toolName: "PDF to Word Converter",
        text: "Convert your PDF into an editable .docx file now — free, no account needed.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to Word tool](/pdf-to-word) and add your PDF.",
          "Click Convert to Word — the text layer is read locally.",
          "Download the .docx and open it in Word, Pages or Google Docs to edit.",
        ],
      },
      { type: "h2", text: "Why PDF to Word is harder than it looks" },
      {
        type: "p",
        text: "A PDF does not store paragraphs. It stores text runs with coordinates: this word here, that word 12 points to the right. Any converter has to infer structure from geometry — deciding which runs share a line, where a line break is a real break, and where a paragraph ends. We group runs by their position on the page, which reconstructs readable, editable text reliably.",
      },
      {
        type: "p",
        text: "What geometry cannot tell you is design intent. A two-column newsletter, a table of figures and a boxed sidebar all look like scattered text runs. That is why heavy layout arrives flattened into paragraphs, and why the honest workflow is: convert to get the words, then apply your own formatting in Word.",
      },
      { type: "h2", text: "When the output looks empty" },
      {
        type: "p",
        text: "If your .docx comes out blank or nearly so, the PDF is almost certainly a scan — a photograph of a page with no text layer at all. Run it through [OCR PDF](/ocr-pdf) first to recognise the words and add a text layer, then convert the searchable PDF to Word.",
      },
      {
        type: "note",
        text: "A quick way to check: open the PDF and try to select a sentence with your cursor. If nothing highlights, there is no text layer and OCR is the missing step.",
      },
      { type: "h2", text: "Getting the best result" },
      {
        type: "list",
        items: [
          "Convert the whole document, then delete what you do not need — it is faster than converting twice.",
          "For a single chapter, extract those pages with [Split PDF](/split-pdf) first so the .docx stays manageable.",
          "Expect to reapply headings, bold and lists; the words are there, the styling is up to you.",
          "Remove any password with [Unlock PDF](/unlock-pdf) before converting, since encrypted files cannot be read.",
        ],
      },
      { type: "h2", text: "Good and bad candidates" },
      {
        type: "list",
        items: [
          "Works well: letters, reports, contracts, CVs, policies — anything mostly linear text.",
          "Works partly: documents with a few tables or captions you are happy to rebuild.",
          "Works poorly: magazine layouts, forms with boxed fields, brochures built around graphics.",
          "Needs OCR first: scans, phone photos of pages, faxes.",
        ],
      },
      { type: "h2", text: "Going the other way" },
      {
        type: "p",
        text: "Once your edits are done, turn the document back into a fixed-layout file with [Word to PDF](/word-to-pdf). That round trip — PDF to Word, edit, Word to PDF — is the normal way to update a document you no longer have the source for.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Use PDF to Word when you need the words, not a facsimile. Check for a text layer, run OCR if there is not one, and plan to reapply the formatting yourself — it is still far quicker than retyping.",
      },
    ],
    faqs: [
      {
        q: "Is the original layout preserved?",
        a: "Text, paragraphs and reading order are preserved. Complex columns, tables and images are simplified into plain paragraphs, so treat the result as an editable draft.",
      },
      {
        q: "Why is my converted document empty?",
        a: "The PDF is probably a scan with no text layer. Run OCR PDF on it first, then convert the searchable PDF.",
      },
      {
        q: "Which apps open the result?",
        a: "It is a standard .docx file, so Microsoft Word, Apple Pages, LibreOffice and Google Docs all open it.",
      },
      {
        q: "Is my PDF uploaded anywhere?",
        a: "No. The text is extracted inside your browser tab and the .docx is built on your device.",
      },
      {
        q: "Can I convert a password-protected PDF?",
        a: "Remove the password first with the Unlock PDF tool, then convert the unlocked copy.",
      },
    ],
    related: ["how-to-convert-word-to-pdf", "how-to-ocr-scanned-pdf", "how-to-split-pdf-pages"],
  },
  {
    slug: "how-to-convert-word-to-pdf",
    title: "How to Convert a Word Document to PDF",
    metaTitle: "How to Convert Word to PDF Online (Free, No Upload) | MyPDF4U",
    description:
      "Turn a .docx letter, CV or report into a PDF that looks the same everywhere. What the conversion keeps, what it simplifies, and when to use it.",
    date: "2026-09-05",
    readTime: "5 min read",
    toolSlug: "word-to-pdf",
    toolName: "Word to PDF Converter",
    hero: {
      desktop: "/blog/word-to-pdf-workflow-desktop.jpg",
      mobile: "/blog/word-to-pdf-workflow-mobile.jpg",
      alt: "An editable Word document being converted into a finished PDF file",
      caption: "A .docx becomes a fixed-layout PDF on clean A4 pages.",
      ...heroDims,
    },
    intro: [
      "Word documents reflow. Open the same .docx on a machine without your fonts and margins shift, page breaks move, and a one-page CV becomes a page and a half. PDF freezes the layout, which is why applications and contracts are almost always requested as PDF.",
      "The [Word to PDF converter](/word-to-pdf) reads a .docx in your browser and lays its text out on clean A4 pages with sensible margins and line spacing. The document is not uploaded, and a typical file converts in a second or two.",
      "Set expectations before you start: text and paragraph order are kept, while images, tables and custom fonts are simplified. It is built for text documents — letters, notes, CV drafts and reports.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "word-to-pdf",
        toolName: "Word to PDF Converter",
        text: "Convert your .docx into a shareable PDF — free and entirely in your browser.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [Word to PDF tool](/word-to-pdf) and choose your .docx file.",
          "Click Convert to PDF — the document is rendered locally on A4 pages.",
          "Download the PDF and check the page breaks before you send it.",
        ],
      },
      { type: "h2", text: "Why send a PDF instead of a .docx?" },
      {
        type: "list",
        items: [
          "The recipient sees the pagination you saw, regardless of their fonts or Word version.",
          "The file cannot be edited accidentally in transit.",
          "Recruitment portals, universities and government forms usually require PDF.",
          "It opens on a phone without a word processor installed.",
        ],
      },
      { type: "h2", text: "What survives the conversion" },
      {
        type: "p",
        text: "The text and the order of your paragraphs come through intact, wrapped onto A4 pages. Because the layout is rebuilt rather than replayed from Word's own rendering engine, decorative elements are simplified: images, tables, columns, headers and footers, and custom typefaces are not carried over. For a letter or a draft CV that is rarely a problem; for a designed brochure, export the PDF from Word itself.",
      },
      {
        type: "note",
        text: "Only .docx is supported. If you have a legacy binary .doc file, open it in Word or LibreOffice and save it as .docx first.",
      },
      { type: "h2", text: "A tidy workflow for applications" },
      {
        type: "steps",
        items: [
          "Convert your CV or cover letter with [Word to PDF](/word-to-pdf).",
          "Add certificates or scans as extra pages by combining them with [Merge PDF](/merge-pdf).",
          "If a portal caps the upload size, shrink the packet with [Compress PDF](/compress-pdf).",
          "Check the final page order — [Organize PDF](/organize-pdf) can reorder or drop pages.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Sending without opening the PDF first — always read the page breaks once.",
          "Assuming a designed layout will be reproduced; use it for text documents.",
          "Uploading a .doc and wondering why nothing happens; convert it to .docx first.",
          "Merging a PDF into a packet before checking that the pages read in a sensible order.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "For letters, notes and CV drafts, converting .docx to PDF takes seconds and removes the risk of your layout shifting on someone else's screen. Check the result once, then send it with confidence.",
      },
    ],
    faqs: [
      {
        q: "Are images and tables kept?",
        a: "Text and paragraph order are kept; images, tables and custom fonts are simplified. Use it for text documents such as letters, notes and CV drafts.",
      },
      {
        q: "Can I convert an old .doc file?",
        a: "Save it as .docx in Word or LibreOffice first — the legacy binary .doc format is not supported.",
      },
      {
        q: "Is my document uploaded to a server?",
        a: "No. The .docx is read and rendered inside your browser tab.",
      },
      {
        q: "What page size does the PDF use?",
        a: "Text is laid out on A4 pages with standard margins and line spacing.",
      },
      {
        q: "How do I add a scanned certificate to the PDF?",
        a: "Convert the scan or photo with Image to PDF, then combine both files using Merge PDF.",
      },
    ],
    related: [
      "how-to-convert-pdf-to-word",
      "how-to-merge-pdf-files",
      "how-to-compress-pdf-for-email",
    ],
  },
  {
    slug: "how-to-ocr-scanned-pdf",
    title: "How to Make a Scanned PDF Searchable with OCR",
    metaTitle: "How to OCR a Scanned PDF (Searchable Text, Free) | MyPDF4U",
    description:
      "Turn a scan or photographed document into a PDF you can search and copy from. How OCR works, how to feed it good input, and what to expect.",
    date: "2026-09-05",
    readTime: "7 min read",
    toolSlug: "ocr-pdf",
    toolName: "OCR PDF",
    hero: {
      desktop: "/blog/ocr-pdf-workflow-desktop.jpg",
      mobile: "/blog/ocr-pdf-workflow-mobile.jpg",
      alt: "A scanned page being recognised and turned into searchable text",
      caption: "OCR adds a text layer, so the scan becomes searchable.",
      ...heroDims,
    },
    intro: [
      "A scanned PDF looks like a document but behaves like a photograph. Ctrl+F finds nothing, you cannot copy a sentence, and converters produce empty files. The missing piece is a text layer.",
      "[OCR PDF](/ocr-pdf) reads the words in your scan using optical character recognition and saves a copy that looks identical but is searchable and copyable. Recognition runs in your browser, so the scan stays on your device; the language data for your chosen language is downloaded once, the first time you use it.",
      "Pick the document's language before you start — English, Spanish, French, German, Portuguese, Italian and Dutch are available — because the language model is what turns shapes into the right letters.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "ocr-pdf",
        toolName: "OCR PDF",
        text: "Make your scanned PDF searchable — recognition runs in your browser, free.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [OCR PDF tool](/ocr-pdf) and upload the scanned document.",
          "Choose the language the document is written in.",
          "Run OCR, wait while each page is recognised, and download the searchable PDF.",
        ],
      },
      { type: "h2", text: "How to tell whether you need OCR" },
      {
        type: "p",
        text: "Open the PDF and try to select a line of text with your cursor. If words highlight, there is already a text layer and OCR would add nothing. If your cursor draws a rectangle over the page instead, the page is an image and OCR is the step you are missing. The same test explains most complaints about empty [PDF to Word](/pdf-to-word) conversions.",
      },
      { type: "h2", text: "What OCR actually does" },
      {
        type: "p",
        text: "Recognition happens page by page. Each page is rendered as an image, the engine finds lines and word shapes, compares them against a trained model for your language, and produces text with positions. Those words are then written into the PDF as an invisible layer aligned with the picture of the page. That is why the result looks unchanged: you are still seeing the scan, with searchable text sitting behind it.",
      },
      {
        type: "note",
        text: "OCR is computation-heavy. A long document takes noticeably longer than other tools here, because every page is analysed rather than copied. Leave the tab open while it runs.",
      },
      { type: "h2", text: "Input quality decides accuracy" },
      {
        type: "list",
        items: [
          "Scan or photograph at a decent resolution — small, blurry letters are the main cause of errors.",
          "Keep pages straight. Skewed and curved lines confuse line detection.",
          "Use even lighting and avoid shadows across the page when photographing.",
          "Straighten sideways pages with [Rotate PDF](/rotate-pdf) before running OCR; upside-down text recognises poorly.",
          "Avoid heavily compressed scans, where letters have already lost their edges.",
        ],
      },
      { type: "h2", text: "Choosing the right language" },
      {
        type: "p",
        text: "The language setting is not cosmetic. A model trained on English will misread accented characters, and a Spanish model will stumble over German compounds. Pick the language the body text is written in — that matters more than the odd foreign name or heading. For genuinely mixed documents, consider splitting the file by language section with [Split PDF](/split-pdf) and running OCR on each part.",
      },
      { type: "h2", text: "What OCR is good for" },
      {
        type: "list",
        items: [
          "Finding a contract clause or invoice number inside a folder of old scans.",
          "Copying a paragraph out of a scanned book or report instead of retyping it.",
          "Preparing a scan for [PDF to Word](/pdf-to-word), so the .docx contains real text.",
          "Making archived paperwork usable years later, when nobody remembers what is in which file.",
        ],
      },
      { type: "h2", text: "Realistic expectations" },
      {
        type: "p",
        text: "OCR is very good, not perfect. Clean printed text usually recognises with few errors; handwriting, decorative fonts, stamps and faint carbon copies are much harder. Always proofread numbers before relying on them — a misread 8 in an invoice total causes more trouble than a missing full stop. Layout is not reconstructed either: the text layer follows reading order, so tables become sequences of words rather than grids.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Check for a text layer, straighten and choose the right language, then let OCR run. What you get back is the same document you scanned, only now it can be searched, copied and converted — which is what makes an archive genuinely useful.",
      },
    ],
    faqs: [
      {
        q: "What is OCR in a PDF?",
        a: "Optical character recognition reads the words in a page image and adds them to the PDF as a text layer, so the document becomes searchable and copyable.",
      },
      {
        q: "Which languages are supported?",
        a: "English, Spanish, French, German, Portuguese, Italian and Dutch. The matching language data downloads once, the first time you run OCR.",
      },
      {
        q: "Why does OCR take longer than other tools?",
        a: "Every page has to be rendered and analysed rather than simply copied, and all of that work happens on your own device.",
      },
      {
        q: "Will the document look different afterwards?",
        a: "No. The page image is unchanged; the recognised text sits behind it so it can be searched and selected.",
      },
      {
        q: "Can OCR read handwriting?",
        a: "Not reliably. It is designed for printed text; handwriting and decorative fonts produce many more errors.",
      },
    ],
    related: ["how-to-convert-pdf-to-word", "how-to-rotate-pdf-pages", "how-to-split-pdf-pages"],
  },
];
