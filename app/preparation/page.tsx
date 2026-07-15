import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function PreparationPage() {
  const content = getContent("preparation");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
