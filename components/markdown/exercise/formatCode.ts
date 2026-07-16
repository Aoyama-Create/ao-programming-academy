/*
 * Prettier のブラウザ版（standalone）を「整形」ボタン押下時にだけ動的読込する。
 * これらの import は別チャンクに分割され、演習ページを開いた時点では落ちてこない。
 */
export type FormatResult =
  | { ok: true; code: string }
  | { ok: false; error: string };

export async function formatCode(code: string): Promise<FormatResult> {
  try {
    const [prettier, pluginBabel, pluginEstree] = await Promise.all([
      import("prettier/standalone"),
      import("prettier/plugins/babel"),
      import("prettier/plugins/estree"),
    ]);

    const formatted = await prettier.format(code, {
      parser: "babel",
      // 名前空間モジュールをそのままプラグインとして渡せる（Prettier 3）。
      plugins: [pluginBabel, pluginEstree],
      semi: true,
      singleQuote: false,
      tabWidth: 2,
    });

    return { ok: true, code: formatted };
  } catch (e) {
    // 文法エラーのコードは整形できない。初学者は頻繁にこの状態になるので、
    // クラッシュさせず穏やかに返す。
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
