/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function convertDocxToHtml(buffer: Buffer) {
  const mammoth = (await import("mammoth")).default;
  const result = await mammoth.convertToHtml(
    { buffer },
    {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
      ],
      convertImage: mammoth.images.imgElement((image) =>
        image.read("base64").then((imageBuffer) => ({
          src: `data:${image.contentType};base64,${imageBuffer}`,
        }))
      ),
      transformDocument: (element: any) => {
        const traverse = (node: any) => {
          if (node.children) node.children.forEach(traverse);
          if (node.type === "run" && node.text)
            node.text = node.text.replace(/ {2,}/g, (spaces: string) =>
              "&nbsp;".repeat(spaces.length)
            );
        };
        traverse(element);
        return element;
      },
    }
  );
  return `<div style="white-space: pre-wrap;">${result.value}</div>`;
}

async function convertPdfToHtml(buffer: Buffer) {
  // Use the correct import path for pdfjs-dist in modern setups
  const pdfjsLib = await import("pdfjs-dist");
  // Set up workerSrc if necessary (for some environments)
  if (pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
  const data = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let html = "<div style='font-family: Arial, sans-serif;'>";
  const numPages = Math.min(pdf.numPages, 50);
  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    html += `<div style='margin-bottom:24px; text-align:left;'>`;
    textContent.items.forEach((item: any) => {
      html += `<span style="position:relative;">${item.str.replace(/ /g, "&nbsp;")}</span>`;
    });
    html += "</div>";
  }
  html += "</div>";
  return html;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name.toLowerCase();
    let htmlContent = "";

    if (fileName.endsWith(".docx")) {
      htmlContent = await convertDocxToHtml(buffer);
    } else if (fileName.endsWith(".pdf")) {
      htmlContent = await convertPdfToHtml(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ html: htmlContent });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Conversion failed", details: err.message },
      { status: 500 }
    );
  }
}
