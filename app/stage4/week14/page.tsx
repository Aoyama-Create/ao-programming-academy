import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage4Week14Page() {
  const content = getContent("stage4-week14");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
