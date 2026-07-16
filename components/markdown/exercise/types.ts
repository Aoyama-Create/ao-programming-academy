/*
 * ```exercise フェンスの中身（JSON）の型と、安全なパーサ。
 * kind は実行エンジンの振り分けキー。今回は "node-js" のみ実装し、
 * 未知の kind は「未対応」表示にフォールバックする（横展開の拡張点）。
 */
export type ExerciseKind = "node-js";

export type ExerciseSpec = {
  id: string;
  kind: ExerciseKind;
  title: string;
  prompt?: string;
  starter: string;
  /** 期待する標準出力（console.log を1行ずつ連結したもの）。 */
  expected: string;
  /** 仮想ターミナルのプロンプトに表示するコマンド。既定は "node main.js"。 */
  command?: string;
  /** 実行タイムアウト（ミリ秒）。既定 2000。 */
  timeoutMs?: number;
};

export type ParseResult =
  | { ok: true; spec: ExerciseSpec }
  | { ok: false; error: string };

const KNOWN_KINDS: ExerciseKind[] = ["node-js"];

export function parseExerciseSpec(raw: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return {
      ok: false,
      error: `演習定義の JSON を読み取れませんでした: ${
        e instanceof Error ? e.message : String(e)
      }`,
    };
  }

  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "演習定義がオブジェクトではありません。" };
  }

  const obj = data as Record<string, unknown>;
  const missing = ["id", "kind", "title", "starter", "expected"].filter(
    (key) => typeof obj[key] !== "string"
  );
  if (missing.length > 0) {
    return {
      ok: false,
      error: `必須フィールドが不足しています: ${missing.join(", ")}`,
    };
  }

  if (!KNOWN_KINDS.includes(obj.kind as ExerciseKind)) {
    return {
      ok: false,
      error: `未対応の演習タイプです: "${String(obj.kind)}"`,
    };
  }

  return {
    ok: true,
    spec: {
      id: obj.id as string,
      kind: obj.kind as ExerciseKind,
      title: obj.title as string,
      prompt: typeof obj.prompt === "string" ? obj.prompt : undefined,
      starter: obj.starter as string,
      expected: obj.expected as string,
      command: typeof obj.command === "string" ? obj.command : undefined,
      timeoutMs:
        typeof obj.timeoutMs === "number" ? obj.timeoutMs : undefined,
    },
  };
}

/** 出力比較用の正規化: CRLF→LF、行末空白除去、末尾空行除去。 */
export function normalizeOutput(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n+$/, "")
    .split("\n");
}

export type GradeResult =
  | { pass: true }
  | { pass: false; hint: string };

export function grade(expected: string, actual: string): GradeResult {
  const exp = normalizeOutput(expected);
  const act = normalizeOutput(actual);

  const max = Math.max(exp.length, act.length);
  for (let i = 0; i < max; i++) {
    const e = exp[i];
    const a = act[i];
    if (e !== a) {
      if (a === undefined) {
        return {
          pass: false,
          hint: `${i + 1} 行目が足りません。期待: 「${e}」`,
        };
      }
      if (e === undefined) {
        return {
          pass: false,
          hint: `余分な出力があります。${i + 1} 行目: 「${a}」`,
        };
      }
      return {
        pass: false,
        hint: `${i + 1} 行目が違います。期待「${e}」/ 実際「${a}」`,
      };
    }
  }
  return { pass: true };
}
