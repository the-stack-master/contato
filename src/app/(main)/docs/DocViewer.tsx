"use client";

type PdfViewerProps = {
  fileUrl: string;
};

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  return (
    <div className="w-full flex justify-center py-6">
      <iframe
        src={fileUrl}
        width="90%"
        height="1000px"
        style={{ border: "none" }}
        title="PDF Document"
      ></iframe>
    </div>
  );
}
