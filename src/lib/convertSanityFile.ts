// src/lib/convertSanityFile.ts
import { client } from "@/lib/sanity";
import mammoth from "mammoth";
import { fromBuffer } from "pdf2pic";

export async function convertSanityFile(fileDocId: string) {
  // Clean ID (remove drafts prefix if any)
  const cleanId = fileDocId.replace(/^drafts\./, "");

  // Fetch document and resolve file URL
  const doc = await client.fetch(
    `*[_type == "documentUpload" && (_id == $id || _id == "drafts." + $id)][0]{
      _id,
      title,
      "fileUrl": file.asset->url
    }`,
    { id: cleanId }
  );

  if (!doc?.fileUrl) throw new Error("No file found");

  const res = await fetch(doc.fileUrl);
  const buffer = Buffer.from(await res.arrayBuffer());
  let htmlContent = "";

  // -------------------- DOCX --------------------
  if (doc.fileUrl.endsWith(".docx")) {
    const mammothAny = mammoth as any;

    const result = await mammothAny.convertToHtml({
      buffer,
      // Preserve images inline
      convertImage: mammothAny.images.inline((element: any) =>
        element.read("base64").then((b64: string) => ({
          src: `data:${element.contentType};base64,${b64}`,
        }))
      ),
      // Preserve multiple spaces
      transformDocument: (element: any) => {
        const traverse = (node: any) => {
          if (node.children) node.children.forEach(traverse);
          if (node.type === "run" && node.text) {
            // Replace multiple consecutive spaces with &nbsp; for each space
            node.text = node.text.replace(/ +/g, (match: any) => {
              console.log("entered");
              return "&nbsp;".repeat(match.length);
            });

            // Replace line breaks inside the run with <br>
            node.text = node.text.replace(/\r\n|\n|\r/g, "<br>");
          }
        };
        traverse(element);
        return element;
      },
    });

    htmlContent = `
      <div class="converted-doc">
        ${result.value}
      </div>
      <style>
        .converted-doc, 
        .converted-doc p, 
        .converted-doc li, 
        .converted-doc h1, 
        .converted-doc h2, 
        .converted-doc h3 {
          white-space: pre-wrap;
        }

        .converted-doc p { margin: 0 0 1em 0; }
        .converted-doc h1, .converted-doc h2, .converted-doc h3 { margin: 1em 0 0.5em 0; }
        .converted-doc ul, .converted-doc ol { margin: 0 0 1em 0; padding-left: 2em; }
        .converted-doc img { max-width: 100%; margin: 1em 0; }
      </style>
    `;

    // -------------------- PDF --------------------
  } else if (doc.fileUrl.endsWith(".pdf")) {
    const pdf2picInstance = fromBuffer(buffer, {
      density: 150,
      format: "png",
      width: 800,
      height: 1120,
    });

    const pages: string[] = [];
    let pageNumber = 1;

    while (true) {
      try {
        const page = await (pdf2picInstance as any)(pageNumber, {
          savePath: false,
        });
        pages.push(
          `<img src="data:image/png;base64,${page.base64}" style="width:100%;margin-bottom:16px;" />`
        );
        pageNumber++;
      } catch {
        break;
      }
    }

    htmlContent = pages.join("");
  } else {
    throw new Error("Unsupported file type");
  }

  return htmlContent;
}
