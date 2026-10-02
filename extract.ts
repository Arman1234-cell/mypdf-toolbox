import { articles, ArticleBlock } from "./src/lib/articles";
import * as fs from "fs";

let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>All Articles</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
  h1 { text-align: center; color: #2E8B57; }
  h2 { color: #2E8B57; margin-top: 40px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
  h3 { color: #333; }
  hr { margin: 40px 0; border: none; border-top: 2px dashed #ccc; }
</style>
</head>
<body>
<h1>MyPDF4U - All Blog Articles</h1>
<p>Total Articles: ${articles.length}</p>
<hr/>
`;

for (const a of articles) {
  html += `<h2>${a.title}</h2>\n`;
  html += `<p><strong>Description:</strong> ${a.description}</p>\n`;
  html += `<p><strong>URL:</strong> https://www.mypdf4u.com/blog/${a.slug}</p>\n`;

  if (a.body) {
    for (const block of a.body) {
      if (block.type === "p") {
        html += `<p>${block.text}</p>\n`;
      } else if (block.type === "h2") {
        html += `<h3>${block.text}</h3>\n`;
      } else if (block.type === "h3") {
        html += `<h4>${block.text}</h4>\n`;
      } else if (block.type === "ul") {
        html += `<ul>\n${block.items.map((i: string) => `  <li>${i}</li>`).join("\n")}\n</ul>\n`;
      } else if (block.type === "ol") {
        html += `<ol>\n${block.items.map((i: string) => `  <li>${i}</li>`).join("\n")}\n</ol>\n`;
      } else if (block.type === "faq") {
        html += `<h4>FAQ: ${block.question}</h4>\n<p>${block.answer}</p>\n`;
      } else if (block.type === "alert") {
        html += `<div style="background: #f0f8ff; padding: 10px; border-left: 4px solid #2E8B57;">${block.text}</div>\n`;
      }
    }
  }

  if (a.faqs && a.faqs.length > 0) {
    html += `<h3>Frequently Asked Questions</h3>\n`;
    for (const f of a.faqs) {
      html += `<h4>${f.q}</h4>\n<p>${f.a}</p>\n`;
    }
  }

  html += `<hr/>\n`;
}

html += `</body></html>`;

fs.writeFileSync("MyPDF4U_All_Articles.doc", html);
console.log("Successfully generated MyPDF4U_All_Articles.doc");
