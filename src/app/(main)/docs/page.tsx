import PdfViewer from "./DocViewer";

export default function SupportDocPage() {
  return (
    <div className="min-h-screen">
      <PdfViewer fileUrl="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf" />
    </div>
  );
}
