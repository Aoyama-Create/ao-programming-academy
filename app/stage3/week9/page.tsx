import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage3Week9Page() {
  const content = getContent("stage3-week9");
  return (
    <main className="prose prose-slate max-w-none px-4 py-6">
      <MarkdownRenderer content={content} />
    </main>
  );
}
