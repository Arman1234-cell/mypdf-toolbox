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
      "Sometimes a PDF is just the wrong format. If you need a single page for a presentation, a quick diagram for a chat message, or a preview thumbnail for a website, you need an image — not a document.",
      "Our free [PDF to JPG converter](/pdf-to-jpg) does exactly that. It renders each page of your PDF as a crisp JPG at whatever resolution you choose. A single-page file downloads instantly as one image, while a longer document neatly packages into a ZIP file with one JPG per page. Everything is processed directly inside your browser, meaning your PDF is never uploaded to any server.",
      "The only real choice you need to make is the resolution. 'Screen' quality keeps files small for email previews, 'High' is the perfect default for everyday use, and 'Print' gives you the absolute largest, sharpest image for zooming or physical printing.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-jpg",
        toolName: "PDF to JPG Converter",
        text: "Convert your PDF pages into high-quality JPG images now — free, fast, and no account required.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to JPG tool](/pdf-to-jpg) and upload your PDF.",
          "Pick your preferred image quality: Screen, High, or Print.",
          "Click Convert to JPG and download your image (or ZIP file for multi-page documents).",
        ],
      },
      { type: "h2", text: "How the conversion actually works" },
      {
        type: "p",
        text: "A PDF page is essentially a set of drawing instructions — text runs, vector shapes, and embedded graphics. To create a JPG, each page is drawn onto a digital canvas at your chosen scale, then encoded into a standard photograph. That's why you choose a 'quality level' instead of a fixed pixel size: the scale multiplies the page's natural dimensions, ensuring an A4 document and a widescreen slide both look perfectly proportioned.",
      },
      {
        type: "p",
        text: "Because JPG is a photographic format, the final result is a flat picture. Text in the image will look identical to the original page, but you won't be able to select or search it anymore. If you need editable text, convert it to [Word](/pdf-to-word) instead. If your PDF is a scanned document, you'll want to run it through [OCR](/ocr-pdf) first.",
      },
      { type: "h2", text: "Choosing the right quality setting" },
      {
        type: "list",
        items: [
          "Screen: Yields the smallest file sizes. Perfect for email previews, thumbnails, and quick sharing where reading the fine print doesn't matter.",
          "High (Recommended): The sensible default. Text stays crisp on standard displays and file sizes remain completely reasonable.",
          "Print: The largest output. Use this when the image will be physically printed, projected onto a big screen, or heavily cropped and zoomed.",
        ],
      },
      {
        type: "note",
        text: "Working with diagrams, charts, or screenshots with thin lines? [PDF to PNG](/pdf-to-png) is actually the better choice. PNG is a lossless format, meaning edges stay perfectly sharp instead of picking up blurry JPG artifacts.",
      },
      { type: "h2", text: "Converting only the pages you need" },
      {
        type: "p",
        text: "Converting a 60-page report to images when you only need page 12 will leave you sifting through a massive ZIP file. Save time by extracting that single page first with the [Split PDF](/split-pdf) tool. Just type '12', download the one-page PDF, and then convert that file to JPG. You'll get exactly one image, named predictably, in half the time.",
      },
      { type: "h2", text: "Practical uses for PDF to JPG" },
      {
        type: "list",
        items: [
          "Dropping a certificate, invoice, or ticket directly into a slide deck.",
          "Sharing a specific page in a chat app that normally compresses PDFs but displays images beautifully.",
          "Creating quick preview thumbnails of a brochure or menu for a website.",
          "Attaching a document page to an online form that only accepts JPG or PNG uploads.",
        ],
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Using 'Screen' quality for a file you plan to print — the text will look soft and blurry on paper.",
          "Trying to convert a password-protected PDF. You'll need to remove the password first using [Unlock PDF](/unlock-pdf).",
          "Expecting to edit the text afterward. Remember, a JPG is just a picture, not a document.",
          "Converting a huge 100-page document at 'Print' quality on an older phone. It works, but it's slow and consumes a lot of memory.",
        ],
      },
      { type: "h2", text: "Going the other way (Images to PDF)" },
      {
        type: "p",
        text: "If your goal is the exact opposite — bundling a bunch of images back into a single document — use [JPG to PDF](/jpg-to-pdf) or the general [Image to PDF](/image-to-pdf) tool. A common workflow is exporting a PDF as JPGs, deleting the pages you don't need, and rebuilding a shorter PDF from the remaining images.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Converting a PDF to JPG is mostly just a decision about resolution. Pick High for everyday use, Print when the image will be enlarged, and remember to split out single pages first if you only need one. Everything else takes just two clicks.",
      },
    ],
    faqs: [
      {
        q: "How do I convert a PDF to JPG for free?",
        a: "Just open the [PDF to JPG tool](/pdf-to-jpg), upload your file, choose a quality level, and click Convert. There's no account required and it's completely free.",
      },
      {
        q: "What happens if I upload a multi-page PDF?",
        a: "You will get one JPG image per page, all neatly bundled into a single ZIP file so you only have to make one download.",
      },
      {
        q: "Can I convert just one specific page?",
        a: "Yes! Extract that page with the [Split PDF](/split-pdf) tool first, and then run that resulting one-page PDF through the JPG converter.",
      },
      {
        q: "Will the text in the JPG still be selectable?",
        a: "No. JPG is an image format, so the page essentially becomes a photograph. If you need editable text, use [PDF to Word](/pdf-to-word) instead.",
      },
      {
        q: "Is my PDF uploaded to a server?",
        a: "No. The pages are rendered locally inside your browser tab, so your original file never leaves your device.",
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
      "PNG is the format to reach for when a PDF page contains diagrams, tables, screenshots, or fine print. Unlike JPG, PNG compresses without throwing any detail away, ensuring thin lines and small letters stay exactly as sharp as they were in the original document.",
      "The [PDF to PNG converter](/pdf-to-png) renders every page of your PDF as a crisp PNG at whatever scale you choose. A single page downloads instantly as one image, while multiple pages arrive neatly bundled in a ZIP file. Everything happens locally in your browser, meaning your document is never uploaded anywhere.",
      "You should expect slightly larger files than JPG. That's the standard trade-off for lossless quality, and it is usually worth it for any technical or detailed document.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-png",
        toolName: "PDF to PNG Converter",
        text: "Export your PDF pages as sharp PNG images — free, fast, and entirely in your browser.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to PNG tool](/pdf-to-png) and select your PDF.",
          "Choose a rendering quality — 'High' suits most work, while 'Print' is best for enlargements.",
          "Click Convert, then download your PNG or the ZIP file of page images.",
        ],
      },
      { type: "h2", text: "PNG or JPG: which should you pick?" },
      {
        type: "list",
        items: [
          "Choose PNG for charts, tables, CAD-style drawings, code screenshots, and any page with small text.",
          "Choose [JPG](/pdf-to-jpg) for photo-heavy pages, or when keeping the file size small is your top priority.",
          "PNG is a lossless format, so you can crop and re-save the image later without it degrading in quality.",
          "JPG re-compresses every time it is saved, which gradually softens edges and blurs text.",
        ],
      },
      { type: "h2", text: "Why lossless matters for documents" },
      {
        type: "p",
        text: "JPG compression works by discarding detail that the human eye is unlikely to miss in a photograph. Documents break that assumption entirely: a page is mostly flat white with high-contrast black edges — exactly the visual pattern JPG handles worst. The result is often faint grey halos around letters and blurred hairlines in tables. PNG stores the pixels exactly as they were rendered, ensuring a screenshot of a spreadsheet still reads cleanly even at 100% zoom.",
      },
      {
        type: "note",
        text: "Pages are rendered on a solid white background so they look like standard printed pages. If you need genuine transparency, you will have to remove the background in an image editor afterwards.",
      },
      { type: "h2", text: "Getting the resolution right" },
      {
        type: "p",
        text: "The quality setting directly multiplies the page's natural size. 'Screen' is fine for a quick look, 'High' doubles it and is the sensible default, and 'Print' triples it for pages that will be enlarged or printed. If a chart's axis labels look soft, step up one quality level rather than scaling the image up afterwards — upscaling cannot recover detail that was never rendered in the first place.",
      },
      { type: "h2", text: "Typical uses for PDF to PNG" },
      {
        type: "list",
        items: [
          "Putting a diagram from a report into a slide without a single fuzzy edge in sight.",
          "Capturing a signed page as a clean image for an internal record.",
          "Publishing a document page perfectly on a website or knowledge base.",
          "Preparing figures from an academic paper for a poster or handout.",
        ],
      },
      { type: "h2", text: "Working with lots of pages" },
      {
        type: "p",
        text: "Whole-document exports are easy, but rarely what you actually want. Pull the pages you need out first with the [Split PDF](/split-pdf) tool, then convert them. If you do export everything, the ZIP file preserves the page order in the filenames, making it easy to find page 14 later.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "PNG is the safest default whenever a PDF page contains lines, tables, or small text. Pick High quality, export only the pages you actually need, and the resulting images will look exactly like the pristine document they came from.",
      },
    ],
    faqs: [
      {
        q: "Is PNG better than JPG for PDF pages?",
        a: "For text, tables, and diagrams, yes — PNG is lossless, so edges stay crisp. For photographic pages, JPG provides much smaller files at a similar visual quality.",
      },
      {
        q: "Why is my PNG file so large?",
        a: "Lossless compression keeps every single pixel. Lower the quality setting, or use JPG if file size matters more to you than absolute sharpness.",
      },
      {
        q: "Does the PNG keep transparency?",
        a: "No. Pages are rendered on a crisp white background so they exactly match how the document would print.",
      },
      {
        q: "How do I turn PNG images back into a PDF?",
        a: "Use our free [PNG to PDF tool](/png-to-pdf) — it places one image per page and lets you visually set the order.",
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
      "Most real-world uploads are a mixture: two phone photos of a signed form, a screenshot of a confirmation email, and a scan someone sent you. Sending them as separate attachments makes the recipient piece the story together themselves. One combined PDF solves that entirely.",
      "The [Image to PDF converter](/image-to-pdf) accepts JPG, JPEG, and PNG files in the exact same batch. It places one image per page and lets you visually set the order before converting. Everything runs in your browser, so absolutely nothing is uploaded to our servers.",
      "If all your images are just one format, the dedicated [JPG to PDF](/jpg-to-pdf) and [PNG to PDF](/png-to-pdf) tools do the exact same job — just pick whichever you find first.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "image-to-pdf",
        toolName: "Image to PDF Converter",
        text: "Turn your photos, screenshots, and scans into a single PDF — free, with no sign-up required.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [Image to PDF tool](/image-to-pdf) and add all your images at once.",
          "Drag the thumbnails until the page order is right, and rotate any sideways images.",
          "Remove images you don't need, click Convert to PDF, and download.",
        ],
      },
      { type: "h2", text: "Why one PDF beats a folder of images" },
      {
        type: "list",
        items: [
          "Forms and online portals usually only accept a single document, not fifteen separate files.",
          "Page order is fixed, meaning the reader sees your pages in the exact sequence you intended.",
          "Orientation is baked in — no more tilting a laptop sideways just to read a photo.",
          "A PDF opens identically across Windows, macOS, Android, and iOS.",
        ],
      },
      { type: "h2", text: "Order and orientation come first" },
      {
        type: "p",
        text: "Filenames rarely match reading order — 'IMG_4821' tells you nothing about which page is actually the front of the form. That's why the tool shows you thumbnails: you arrange pages by looking at them, not by renaming files. You should also fix orientation in this same pass, because a rotated page is much harder to correct once it's locked inside a PDF.",
      },
      {
        type: "note",
        text: "Only need to fix the orientation of an existing document? The [Rotate PDF](/rotate-pdf) tool turns chosen pages and securely writes the change back into the file.",
      },
      { type: "h2", text: "Keeping quality while controlling size" },
      {
        type: "p",
        text: "Images are embedded at their original resolution, meaning a 12-megapixel photo keeps all its detail — and all its weight. Ten phone photos can easily produce a PDF of 30 MB or more, which many email servers will simply reject. You should convert first, then shrink the finished document with the [Compress PDF](/compress-pdf) tool; compressing once at the end beats trying to compress each image individually beforehand.",
      },
      { type: "h2", text: "Tips for photographing documents" },
      {
        type: "list",
        items: [
          "Shoot straight down, with the page filling the entire frame, in even light.",
          "Keep every page in the exact same orientation so the finished PDF reads consistently.",
          "Always use the original file, not a version that was re-sent through a chat app — those get heavily re-compressed.",
          "Crop out desks and hands before converting; it looks much tidier and reduces the file size.",
        ],
      },
      { type: "h2", text: "Which formats are supported" },
      {
        type: "p",
        text: "JPG, JPEG, and PNG work perfectly, and they can be mixed freely in one document. Transparent areas in a PNG are simply drawn on a clean white background. Note that HEIC photos from an iPhone aren't natively supported yet — you'll need to share or export them as a JPG from your phone first, then run the conversion.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Just add every image in one go, arrange the pages while you can still see them visually, and compress at the very end if the file needs to travel by email. That's the entire workflow.",
      },
    ],
    faqs: [
      {
        q: "Can I mix JPG and PNG images in the same PDF?",
        a: "Yes. Just add both formats in one batch and each image will become a perfectly sized page in the same document.",
      },
      {
        q: "How do I change the page order?",
        a: "Simply drag the thumbnails around in the grid before clicking convert. The final PDF will follow the exact order you see on your screen.",
      },
      {
        q: "Is there a limit on the number of images?",
        a: "There is no fixed limit. Very large batches might just take a bit longer, because all the heavy lifting happens locally on your own device.",
      },
      {
        q: "My PDF is too big to email. What now?",
        a: "Run your finished PDF through the [Compress PDF](/compress-pdf) tool and choose a stronger compression level.",
      },
      {
        q: "Can I convert HEIC photos from my iPhone?",
        a: "Not yet. You'll need to export or share them as JPGs first, and then convert those files.",
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
      "You need to change two sentences in a PDF, but the original document is long gone. Retyping it from scratch is the usual frustrating fallback — but converting it to Word is much faster.",
      "The [PDF to Word converter](/pdf-to-word) reads the text layer of your PDF directly inside your browser and writes it into a standard .docx file that Microsoft Word, Apple Pages, and Google Docs can all open. Nothing is uploaded; the entire extraction happens safely on your own device.",
      "Be clear about what you'll get: the raw text, paragraphs, and general reading order are preserved, while complex columns, tables, and images are simplified into plain paragraphs. Treat the result as an editable draft rather than a pixel-perfect clone — which is exactly what you need when the main goal is simply rewriting.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "pdf-to-word",
        toolName: "PDF to Word Converter",
        text: "Convert your PDF into a fully editable .docx file right now — free, fast, and no account needed.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [PDF to Word tool](/pdf-to-word) and upload your PDF.",
          "Click Convert to Word — the tool reads the text layer locally.",
          "Download the resulting .docx file and open it in Word, Pages, or Google Docs to start editing.",
        ],
      },
      { type: "h2", text: "Why PDF to Word is harder than it looks" },
      {
        type: "p",
        text: "A PDF doesn't actually store paragraphs. It stores isolated text runs with coordinates: this word here, that word 12 points to the right. Any converter has to guess the structure from that geometry — deciding which runs share a line, where a line break is intentional, and where a paragraph actually ends. We group these runs by their position on the page, which reconstructs readable, editable text very reliably.",
      },
      {
        type: "p",
        text: "What geometry simply cannot tell you is the original design intent. A two-column newsletter, a table of figures, and a boxed sidebar all just look like scattered text coordinates to a computer. That is exactly why heavy layouts arrive flattened into standard paragraphs, and why the most honest workflow is: convert the file to get the raw words, then apply your own formatting in Word.",
      },
      { type: "h2", text: "When the output looks empty" },
      {
        type: "p",
        text: "If your .docx comes out completely blank or mostly empty, the PDF is almost certainly a scan — essentially just a photograph of a page with no underlying text layer. Run it through [OCR PDF](/ocr-pdf) first to recognize the words and add a text layer, then convert that newly searchable PDF to Word.",
      },
      {
        type: "note",
        text: "A quick way to check if your PDF is a scan: open it and try to highlight a sentence with your cursor. If nothing highlights, there is no text layer, and OCR is your missing step.",
      },
      { type: "h2", text: "Getting the absolute best result" },
      {
        type: "list",
        items: [
          "Convert the entire document first, then delete what you do not need — it is much faster than converting it twice.",
          "If you only need a single chapter, extract those pages with [Split PDF](/split-pdf) first so the resulting .docx file stays manageable.",
          "Expect to reapply headings, bold text, and lists manually; the words are all there, but the styling is now up to you.",
          "Remove any document passwords with [Unlock PDF](/unlock-pdf) before converting, since encrypted files simply cannot be read.",
        ],
      },
      { type: "h2", text: "Good and bad candidates" },
      {
        type: "list",
        items: [
          "Works wonderfully: letters, reports, contracts, CVs, policies — anything that is mostly linear text.",
          "Works fairly well: documents with just a few tables or captions that you are happy to rebuild manually.",
          "Works poorly: complex magazine layouts, forms with specific boxed fields, and brochures built heavily around graphics.",
          "Needs OCR first: scans, phone photos of physical pages, and old faxes.",
        ],
      },
      { type: "h2", text: "Going the other way" },
      {
        type: "p",
        text: "Once your edits are finished, turn the document back into a clean, fixed-layout file with [Word to PDF](/word-to-pdf). That entire round trip — PDF to Word, edit the text, Word back to PDF — is the standard way to update any document when you no longer have the original source file.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Use PDF to Word when you need the actual words, not a perfect facsimile of the layout. Check for a text layer, run OCR if one is missing, and plan to reapply some formatting yourself — it is still infinitely quicker than retyping it all from scratch.",
      },
    ],
    faqs: [
      {
        q: "Is the original layout preserved?",
        a: "The text, paragraphs, and general reading order are preserved. However, complex columns, tables, and images are simplified into plain paragraphs, so you should treat the result as an editable draft.",
      },
      {
        q: "Why is my converted document totally empty?",
        a: "Your PDF is probably just a scan with no readable text layer. Run [OCR PDF](/ocr-pdf) on it first, then convert the resulting searchable PDF.",
      },
      {
        q: "Which apps can open the result?",
        a: "It is a standard .docx file, so Microsoft Word, Apple Pages, LibreOffice, and Google Docs can all open it perfectly.",
      },
      {
        q: "Is my PDF uploaded anywhere during this?",
        a: "No. The text is extracted securely inside your browser tab and the .docx file is built directly on your device.",
      },
      {
        q: "Can I convert a password-protected PDF?",
        a: "You'll need to remove the password first with the [Unlock PDF](/unlock-pdf) tool, and then convert that unlocked copy.",
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
      "Word documents always reflow. If you open the same .docx file on a computer missing your custom fonts, the margins shift, the page breaks move, and suddenly a one-page CV turns into a page and a half. PDF freezes your layout completely, which is exactly why job applications and legal contracts are almost always requested as PDFs.",
      "The [Word to PDF converter](/word-to-pdf) reads your .docx file right in your web browser and neatly lays its text out on clean A4 pages with sensible margins and perfect line spacing. Your document is never uploaded anywhere, and a typical file converts in just a second or two.",
      "Just set your expectations before you start: the raw text and paragraph order are perfectly preserved, but images, complex tables, and custom fonts are simplified. This tool is purpose-built for text documents — things like cover letters, notes, CV drafts, and straightforward reports.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "word-to-pdf",
        toolName: "Word to PDF Converter",
        text: "Convert your .docx into a perfectly shareable PDF — completely free and right in your browser.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [Word to PDF tool](/word-to-pdf) and choose your .docx file.",
          "Click Convert to PDF — the document will be beautifully rendered locally on A4 pages.",
          "Download the PDF and quickly check the page breaks before you send it off.",
        ],
      },
      { type: "h2", text: "Why send a PDF instead of a .docx?" },
      {
        type: "list",
        items: [
          "The recipient sees the exact same pagination you saw, regardless of their fonts or their version of Word.",
          "A single PDF file cannot be accidentally edited or tweaked in transit.",
          "Recruitment portals, universities, and government forms almost always strictly require PDF files.",
          "It opens flawlessly on any mobile phone, even without a heavy word processor installed.",
        ],
      },
      { type: "h2", text: "What actually survives the conversion" },
      {
        type: "p",
        text: "The raw text and the correct order of your paragraphs will come through completely intact, neatly wrapped onto standard A4 pages. Because the layout is actively rebuilt rather than just replayed from Word's own complex rendering engine, decorative elements are simplified: images, heavy tables, complex columns, headers and footers, and custom typefaces won't carry over. For a cover letter or a draft CV, that's rarely a problem; but if you need to convert a highly designed brochure, you should export the PDF directly from Microsoft Word itself.",
      },
      {
        type: "note",
        text: "Only modern .docx files are supported. If you have an old, legacy binary .doc file, just open it in Word or LibreOffice and save it as a .docx first.",
      },
      { type: "h2", text: "A tidy workflow for applications" },
      {
        type: "steps",
        items: [
          "Convert your CV or cover letter using [Word to PDF](/word-to-pdf).",
          "Add your scanned certificates as extra pages by combining them all with [Merge PDF](/merge-pdf).",
          "If the job portal caps the upload size, shrink the entire packet using [Compress PDF](/compress-pdf).",
          "Double-check the final page order — [Organize PDF](/organize-pdf) can easily reorder or drop unwanted pages.",
        ],
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Sending the file without opening the PDF first — always double-check where the page breaks landed.",
          "Assuming a heavily designed, graphic-rich layout will be perfectly reproduced; use this tool specifically for text documents.",
          "Uploading an ancient .doc file and wondering why nothing happens; make sure to save it as .docx first.",
          "Merging a PDF into a larger packet before verifying that the pages read in a logical, sensible order.",
        ],
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "For standard letters, notes, and CV drafts, converting your .docx to PDF takes just seconds and entirely removes the risk of your careful layout shifting on someone else's screen. Check the final result once, then hit send with absolute confidence.",
      },
    ],
    faqs: [
      {
        q: "Are my images and tables kept intact?",
        a: "Your text and paragraph order are kept perfectly intact, but images, complex tables, and custom fonts are simplified. You should use this tool for text documents like letters, notes, and CV drafts.",
      },
      {
        q: "Can I convert an old .doc file?",
        a: "You'll need to save it as a .docx file in Word or LibreOffice first — the legacy binary .doc format is not supported.",
      },
      {
        q: "Is my document uploaded to a server?",
        a: "No. Your .docx file is read and completely rendered locally inside your browser tab.",
      },
      {
        q: "What page size does the final PDF use?",
        a: "The text is automatically laid out on clean A4 pages with standard margins and comfortable line spacing.",
      },
      {
        q: "How do I add a scanned certificate to my PDF?",
        a: "Just convert the scan or photo with the [Image to PDF](/image-to-pdf) tool first, then combine both files using [Merge PDF](/merge-pdf).",
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
      "A scanned PDF looks like a real document, but it actually behaves like a photograph. Pressing Ctrl+F finds nothing, you cannot copy a single sentence, and text converters will just output completely empty files. The missing piece is a hidden text layer.",
      "[OCR PDF](/ocr-pdf) fixes this by reading the words in your scan using optical character recognition (OCR). It saves a new copy that looks visually identical, but is fully searchable and copyable. The recognition runs entirely in your web browser, meaning your private scan stays on your device. The required language data is downloaded just once, the very first time you use the tool.",
      "Just be sure to pick the document's language before you start — English, Spanish, French, German, Portuguese, Italian, and Dutch are all available. The language model is what helps the engine accurately turn blurry shapes into the correct letters.",
    ],
    blocks: [
      {
        type: "cta",
        toolSlug: "ocr-pdf",
        toolName: "OCR PDF",
        text: "Make your scanned PDF fully searchable right now — powerful recognition that runs securely in your browser, for free.",
      },
      { type: "h2", text: "The quick answer" },
      {
        type: "steps",
        items: [
          "Open the [OCR PDF tool](/ocr-pdf) and upload your scanned document.",
          "Choose the language the original document is written in.",
          "Run the OCR, wait a moment while each page is actively recognized, and download your newly searchable PDF.",
        ],
      },
      { type: "h2", text: "How to tell if you actually need OCR" },
      {
        type: "p",
        text: "Just open your PDF and try to select a line of text with your mouse cursor. If the words highlight normally, your file already has a text layer and running OCR will add absolutely nothing. If your cursor draws a blue rectangle over the whole page instead, that page is just an image, and OCR is the exact step you're missing. This simple test explains the vast majority of complaints about empty [PDF to Word](/pdf-to-word) conversions.",
      },
      { type: "h2", text: "What OCR actually does behind the scenes" },
      {
        type: "p",
        text: "Recognition happens page by page. Each page is rendered as a digital image, and then the OCR engine scans it to find lines and word shapes. It compares those shapes against a heavily trained model for your specific language, producing actual text characters and their exact positions on the page. Those words are then written back into the PDF as a completely invisible layer, aligned perfectly over the original picture of the page. That is why the final result looks totally unchanged: you are still seeing the original scan, but with fully searchable text sitting invisibly behind it.",
      },
      {
        type: "note",
        text: "Keep in mind that OCR is very computation-heavy. A long 50-page document will take noticeably longer than other simple PDF tools, because every single page has to be visually analyzed rather than just copied. Just leave the browser tab open while it runs.",
      },
      { type: "h2", text: "Input quality decides the accuracy" },
      {
        type: "list",
        items: [
          "Always scan or photograph at a decent resolution — small, blurry, or pixelated letters are the main cause of OCR errors.",
          "Keep your pages as straight as possible. Skewed, slanted, and curved lines heavily confuse the line detection.",
          "Use even lighting and try to avoid casting dark shadows across the page when photographing with your phone.",
          "Straighten any sideways pages with [Rotate PDF](/rotate-pdf) before running OCR; upside-down text recognizes very poorly.",
          "Avoid heavily compressed scans, where the letters have already lost their sharp edges to compression artifacts.",
        ],
      },
      { type: "h2", text: "Choosing the right language" },
      {
        type: "p",
        text: "The language setting is definitely not cosmetic. A model trained on English will aggressively misread accented characters, and a Spanish model will stumble heavily over long German compound words. Always pick the language the main body text is written in — that matters far more than an occasional foreign name or localized heading. For genuinely mixed-language documents, you should consider splitting the file by language section with [Split PDF](/split-pdf) and running the OCR tool separately on each part.",
      },
      { type: "h2", text: "What OCR is best used for" },
      {
        type: "list",
        items: [
          "Finding a specific contract clause or invoice number buried inside a massive folder of old scans.",
          "Quickly copying a large paragraph out of a scanned book or report instead of painstakingly retyping it.",
          "Preparing a raw scan for [PDF to Word](/pdf-to-word), ensuring the resulting .docx actually contains editable text.",
          "Making dusty, archived paperwork truly usable years later, when nobody remembers exactly what is inside which file.",
        ],
      },
      { type: "h2", text: "Setting realistic expectations" },
      {
        type: "p",
        text: "OCR is incredibly good, but it is not perfect. Clean, modern printed text usually recognizes perfectly with very few errors; however, messy handwriting, highly decorative fonts, faded stamps, and faint carbon copies are much harder for the engine to read. Always carefully proofread important numbers before relying on them — a slightly misread '8' in a massive invoice total causes much more trouble than a missing full stop. Also, remember that complex layout is not actively reconstructed: the invisible text layer simply follows the standard reading order, meaning complex tables will often become linear sequences of words rather than perfect grids.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Always check for an existing text layer first. If you need one, straighten your pages, choose the correct language, and then let the OCR engine run. What you get back is the exact same visual document you scanned, only now it can be instantly searched, highlighted, copied, and converted — which is exactly what makes a digital archive genuinely useful.",
      },
    ],
    faqs: [
      {
        q: "What exactly is OCR in a PDF?",
        a: "Optical Character Recognition (OCR) visually reads the words in a flat page image and adds them to the PDF as an invisible text layer, making the entire document searchable and copyable.",
      },
      {
        q: "Which languages are currently supported?",
        a: "English, Spanish, French, German, Portuguese, Italian, and Dutch are fully supported. The matching language data downloads automatically the first time you run OCR in your browser.",
      },
      {
        q: "Why does OCR take so much longer than other tools?",
        a: "Every single page has to be individually rendered and visually analyzed by the AI engine rather than simply being copied over. All of that heavy computational work happens securely right on your own device.",
      },
      {
        q: "Will my document look any different afterwards?",
        a: "No. The visible page image remains completely unchanged; the recognized text simply sits invisibly behind it so it can be searched and selected by your mouse.",
      },
      {
        q: "Can OCR read my handwriting?",
        a: "Not very reliably. The engine is specifically trained and designed for standard printed text; cursive handwriting and highly decorative fonts will produce significantly more errors.",
      },
    ],
    related: ["how-to-convert-pdf-to-word", "how-to-rotate-pdf-pages", "how-to-split-pdf-pages"],
  },
];
