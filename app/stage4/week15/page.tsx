import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage4Week15Page() {
  const content = getContent("stage4-week15");
  return (
    <main className="prose prose-slate max-w-none px-4 py-6">
      <MarkdownRenderer content={content} />
    </main>
  );
}
