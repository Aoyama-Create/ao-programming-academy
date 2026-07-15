import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function PrerequisitePage() {
  const content = getContent("prerequisite-map");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
