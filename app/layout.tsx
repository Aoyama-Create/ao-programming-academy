import { ColorSchemeScript } from "@mantine/core";
import { MantineProvider } from "@/components/providers/MantineProvider";
import { AppShellNav } from "@/components/layout/AppShellNav";

// 順序が重要: 自前の globals.css を後に読ませて Mantine の既定を上書きする。
import "@mantine/core/styles.css";
import "./globals.css";

export const metadata = {
  title: "AoyamaCreate 次世代エンジニア育成カリキュラム",
  description: "週単位カリキュラム・前提知識・Capstone・ルーブリック",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* 初回ペイント前に data-mantine-color-scheme を書き込む。
            これが無いと --mantine-color-body が未定義のまま body が透明になり、
            OS がダークモードのとき黒い画面が一瞬見える。 */}
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider>
          <AppShellNav>{children}</AppShellNav>
        </MantineProvider>
      </body>
    </html>
  );
}
