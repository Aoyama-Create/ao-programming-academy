import { MantineProvider } from "@/components/providers/MantineProvider";
import { AppShellNav } from "@/components/layout/AppShellNav";

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
    <html lang="ja">
      <body>
        <MantineProvider>
          <AppShellNav>{children}</AppShellNav>
        </MantineProvider>
      </body>
    </html>
  );
}
