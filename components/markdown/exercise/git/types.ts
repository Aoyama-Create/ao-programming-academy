/*
 * git-sim 用のスペックとマッチャ。
 *
 * これは「台本型」シミュレータで、本物の git は動かさない（push/PR は本物の
 * GitHub に触るため、ブラウザ内で実実行できない）。学習者が入力したコマンドを
 * その手順の期待パターンと照合し、用意した出力を返して次のステップへ進める。
 *
 * command は `<...>` を「自由入力の引数」とする簡易パターン。
 * 例: "git commit -m <msg>" は `git commit -m "..."` にマッチする。
 * JSON に生の正規表現を書くとエスケープが煩雑なので、この記法にしている。
 */
export type GitStep = {
  /** 期待コマンドのパターン。`<name>` は任意の引数（1 文字以上）にマッチ。 */
  command: string;
  /** そのステップで何をするか（常時表示する案内）。 */
  instruction: string;
  /** 「ヒント」で見せる、実際に打つコマンドの見本。省略時は command を使う。 */
  display?: string;
  /** 成功時にターミナルへ出す擬似出力（複数行は \n）。空なら出力なし。 */
  output?: string;
};

export type GitSimSpec = {
  id: string;
  kind: "git-sim";
  title: string;
  prompt?: string;
  /** ターミナル冒頭に出す状況説明。 */
  intro?: string;
  steps: GitStep[];
};

export type GitParseResult =
  | { ok: true; spec: GitSimSpec }
  | { ok: false; error: string };

export function parseGitSimSpec(raw: string): GitParseResult {
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
  for (const key of ["id", "title"] as const) {
    if (typeof obj[key] !== "string") {
      return { ok: false, error: `必須フィールドが不足しています: ${key}` };
    }
  }
  if (obj.kind !== "git-sim") {
    return { ok: false, error: `kind は "git-sim" である必要があります。` };
  }
  if (
    !Array.isArray(obj.steps) ||
    obj.steps.length === 0 ||
    !obj.steps.every(
      (s) =>
        typeof s === "object" &&
        s !== null &&
        typeof (s as GitStep).command === "string" &&
        typeof (s as GitStep).instruction === "string"
    )
  ) {
    return {
      ok: false,
      error: "steps は { command, instruction, output?, display? } の配列である必要があります。",
    };
  }
  const steps = (obj.steps as GitStep[]).map((s) => ({
    command: s.command,
    instruction: s.instruction,
    display: typeof s.display === "string" ? s.display : undefined,
    output: typeof s.output === "string" ? s.output : undefined,
  }));
  return {
    ok: true,
    spec: {
      id: obj.id as string,
      kind: "git-sim",
      title: obj.title as string,
      prompt: typeof obj.prompt === "string" ? obj.prompt : undefined,
      intro: typeof obj.intro === "string" ? obj.intro : undefined,
      steps,
    },
  };
}

/** 前後の空白を除去し、連続空白を 1 つに詰める。 */
export function normalizeCommand(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

/** `<...>` を任意引数（.+）に、それ以外はリテラルとして正規表現化する。 */
export function patternToRegex(pattern: string): RegExp {
  const norm = normalizeCommand(pattern);
  const body = norm
    .split(/(<[^>]+>)/g)
    .map((part) =>
      /^<[^>]+>$/.test(part)
        ? ".+"
        : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    )
    .join("");
  return new RegExp("^" + body + "$");
}

export function matchesStep(input: string, step: GitStep): boolean {
  return patternToRegex(step.command).test(normalizeCommand(input));
}

/** ヒント表示用の見本コマンド。display があればそれ、無ければ command。 */
export function stepDisplay(step: GitStep): string {
  return step.display ?? step.command;
}
