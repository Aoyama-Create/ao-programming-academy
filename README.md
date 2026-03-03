# AoyamaCreate 次世代エンジニア育成カリキュラム

カリキュラムの読み物として参照できる SPA（Phase 1）。週単位カリキュラム・前提知識の接続・Capstone 仕様・ルーブリックを Markdown で管理し、Next.js + Mantine で表示する。

## 前提

- **想定学習時間**: パートタイム（目安 週 10 時間）
- **総週数**: 個人差で終了時期が変わる（6〜8 ヶ月の幅）
- **Phase 1**: 読み物として使いやすい PJ（ログイン・提出・レビュー機能はなし）

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 でトップ、/weekly, /prerequisite, /capstone, /rubric にナビゲーションできる。

## ビルド

```bash
npm run build
npm start
```

## コンテンツの編集

- **テキスト**: `content/*.md` を編集する。ビルド時に読み込まれる。
- **画像・動画**: `public/images/`, `public/videos/` に置き、md から `/images/xxx.png`, `/videos/xxx.mp4` で参照する。

## 構成

- `app/` … ルーティング・ページ
- `content/` … カリキュラムの md
- `components/` … レイアウト・Markdown 表示
- `lib/` … content 読み込み
- `public/` … 静的アセット（画像・動画）
# ao-programming-academy
