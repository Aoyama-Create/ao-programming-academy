import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

const contentFiles: Record<string, string> = {
  index: "index.md",
  "weekly-curriculum": "weekly-curriculum.md",
  "prerequisite-map": "prerequisite-map.md",
  "capstone-spec": "capstone-spec.md",
  rubric: "rubric.md",
  preparation: "preparation/README.md",
  stage1: "stage1/README.md",
  "stage1-week1": "stage1/week1.md",
  "stage1-week2": "stage1/week2.md",
  "stage1-week3": "stage1/week3.md",
  stage2: "stage2/README.md",
  "stage2-week4": "stage2/week4.md",
  "stage2-week5": "stage2/week5.md",
  "stage2-week6": "stage2/week6.md",
  stage3: "stage3/README.md",
  "stage3-week9": "stage3/week9.md",
  "stage3-week10": "stage3/week10.md",
  "stage3-week11": "stage3/week11.md",
  "stage3-week12": "stage3/week12.md",
};

export type ContentKey = keyof typeof contentFiles;

export function getContent(key: ContentKey): string {
  const filename = contentFiles[key];
  if (!filename) {
    throw new Error(`Unknown content key: ${key}`);
  }
  const filePath = path.join(CONTENT_DIR, filename);
  return fs.readFileSync(filePath, "utf-8");
}

export function getContentKeys(): ContentKey[] {
  return Object.keys(contentFiles) as ContentKey[];
}

const INSTRUCTOR_DIR = path.join(CONTENT_DIR, "instructor");

/**
 * 講師用コンテンツ（解答など）を取得する。id は英数字とハイフンのみ許可。
 * ファイルが存在しない場合は null。
 */
export function getInstructorContent(id: string): string | null {
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return null;
  }
  const filePath = path.join(INSTRUCTOR_DIR, `${id}.md`);
  const resolved = path.resolve(filePath);
  const instructorResolved = path.resolve(INSTRUCTOR_DIR);
  if (!resolved.startsWith(instructorResolved) || path.relative(instructorResolved, resolved).startsWith("..")) {
    return null;
  }
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}
