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
