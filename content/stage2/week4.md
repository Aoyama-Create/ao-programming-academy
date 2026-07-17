# 第 4 週：Git 基礎（clone, commit, push, branch, merge）

**目安時間**: 約 10 時間（解説を読む・手順を試す・実習に取り組む）

---

## 学習目標

この週が終わると、次のことができるようになります。

- リモートリポジトリを **clone** できる
- 変更を **add** ・**commit** ・**push** できる
- **ブランチ**を作成し、**merge** できる
- Stage 1 で作った CLI を GitHub などに push する一連の流れを体験する

---

## 1. Git とは何か

**Git** は、ファイルの変更履歴を記録する**バージョン管理**のためのソフトです。プログラミングでは、コードを「どの時点で何を変更したか」を残しておくことで、間違えたときに戻したり、複数人で同じプロジェクトを分担して開発したりするときに使います。

### 主な用語

| 用語 | 説明 |
|------|------|
| **リポジトリ** | プロジェクトのファイルと、その変更履歴をまとめて保管している「入れ物」です。自分の PC 上にあるものを**ローカルリポジトリ**、GitHub などネット上にあるものを**リモートリポジトリ**といいます。 |
| **commit（コミット）** | 変更を 1 つのまとまりとして記録すること。「この時点のスナップショットを保存した」という単位です。 |
| **ブランチ** | 履歴の「枝」です。本流（多くの場合 `main`）とは別に、新しい機能用のブランチを作って作業し、できたら本流に **merge（マージ）** して統合します。 |
| **リモート** | ネット上にあるリポジトリ（例：GitHub）のこと。**push** するとローカルの commit がリモートに送られ、**pull** するとリモートの変更をローカルに取り込めます。 |

---

## 2. 環境準備

### Git が入っているか確認する

ターミナルで次を実行します。

```bash
git --version
```

バージョン番号が表示されれば OK です。入っていない場合は、[Git の公式サイト](https://git-scm.com/) から OS に合わせてインストールしてください。

### ユーザー名とメールの設定（初回のみ）

Git では、誰が commit したかを記録するために「ユーザー名」と「メールアドレス」を設定します。次の 2 行を、自分の名前とメールに変えて実行してください（GitHub を使う場合は、GitHub に登録したメールを指定するとよいです）。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "your_email@example.com"
```

---

## 3. 基本的な流れ：clone → 編集 → add → commit → push

### パターン A：既にあるリモートリポジトリを手元に持ってくる（clone）

GitHub などにすでにあるリポジトリを、自分の PC にコピーするときは **clone** を使います。

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
```

すると、カレントフォルダに「リポジトリ名」のフォルダができ、その中にファイルが入ります。そのフォルダに `cd` してから、以降の操作を行います。

### パターン B：手元のフォルダを新規リポジトリとして GitHub に上げる

Stage 1 で作った CLI のフォルダを、新しく GitHub のリポジトリとして push する流れです。

1. **GitHub で新規リポジトリを作る**  
   GitHub にログインし、「New repository」でリポジトリを作成します。名前を決め、「Create repository」まで進みます。README を最初から追加しないでおくと、手元の内容をそのまま push しやすいです。

2. **手元のフォルダで Git を初期化する**  
   CLI のコードが入っているフォルダで、ターミナルを開き、次を実行します。

   ```bash
   git init
   ```

3. **ファイルを add して commit する**

   ```bash
   git add .
   git commit -m "最初のコミット: 簡易計算機 CLI"
   ```

   - `git add .` は「このフォルダ内の変更をすべてステージングする」という意味です。
   - `git commit -m "..."` で、その変更を 1 つの commit として記録します。`-m` の後の文字列は **コミットメッセージ** で、「何をしたか」を短く書きます。

4. **リモートを追加して push する**  
   GitHub のリポジトリページに表示されている URL（`https://github.com/ユーザー名/リポジトリ名.git`）を使います。

   ```bash
   git remote add origin https://github.com/ユーザー名/リポジトリ名.git
   git branch -M main
   git push -u origin main
   ```

   これで、手元の commit が GitHub に送られました。

### すでに clone 済みのリポジトリで変更を push する場合

ファイルを編集したあと、次の流れで push します。

```bash
git add .
git status   # どのファイルがステージされたか確認（任意）
git commit -m "〇〇を変更した"
git push
```

- **add**: どの変更を次の commit に含めるか選びます。
- **commit**: その変更を 1 つの commit として記録します。
- **push**: リモート（GitHub など）に送ります。

---

## 4. ブランチの作成・切り替え・merge

本流（`main`）の履歴を汚さずに作業するために、**ブランチ**を作ってそこで変更し、できたら本流に **merge** します。

### ブランチを作成して切り替える

```bash
git checkout -b feature/my-feature
```

`feature/my-feature` はブランチの名前です。自分で分かりやすい名前にしてかまいません。このコマンドで「新しいブランチを作り、そのブランチに切り替える」ことができます。

### ブランチで commit して push する

```bash
git add .
git commit -m "機能を追加"
git push -u origin feature/my-feature
```

初めてこのブランチを push するときは `-u origin ブランチ名` を付けると、次から `git push` だけでこのブランチが送れます。

### ブランチを main に merge する

まず `main` に切り替え、pull してから merge します。

```bash
git checkout main
git pull
git merge feature/my-feature
git push
```

GitHub 上では、多くの場合「Pull Request（PR）」を作成して、画面から「Merge」ボタンでマージします。PR は第 5 週で扱います。

---

## 5. Cursor での操作

Cursor には「ソース管理」の機能があります。左のアイコンから「ソース管理」を開くと、変更したファイルの一覧が出て、チェックマーク（✓）でステージング、上部の「コミット」で commit ができます。ターミナルで `git push` するか、画面上の「同期」などで push できます。慣れてきたら、ターミナルと併用するとよいです。

なお Cursor は VS Code をベースにしたエディタなので、この画面まわりは VS Code とほぼ同じです。インターネット上にある「VS Code でのソース管理」の解説も、そのまま参考にできます。

---

## 6. 実習：Stage 1 の CLI を GitHub に push する

1. Stage 1 第 3 週で作った簡易計算機（`calc.js` など）が入っているフォルダを開く。
2. そのフォルダで `git init` を実行する。
3. `git add .` → `git commit -m "簡易計算機 CLI を追加"` で最初の commit を作る。
4. GitHub で新規リポジトリを作成し、表示される URL を `git remote add origin URL` で登録する。
5. `git branch -M main` → `git push -u origin main` で push する。
6. GitHub のページで、ファイルが反映されていることを確認する。

これができれば、第 4 週の「Git 基礎」の実習は完了です。第 5 週では、このリポジトリでブランチを切って PR を作る練習をします。

### ブラウザで手順をなぞる

下の仮想ターミナルで、この push の流れを 1 コマンドずつ再現できます（本物の GitHub には送信されません）。「次にやること」に従って入力し、詰まったら「ヒント」で入力例を確認しましょう。

```exercise
{
  "id": "stage2-week4-push",
  "kind": "git-sim",
  "title": "実習: ローカルリポジトリを GitHub に push する",
  "prompt": "Stage 1 で作った calc.js のフォルダを GitHub に push する流れを、ターミナルで再現します。1 コマンドずつ入力してください。",
  "intro": "~/study-js $   (calc.js が入ったフォルダを開いています。GitHub 側のリポジトリ作成は済んでいる前提です)",
  "steps": [
    { "command": "git init", "instruction": "このフォルダを Git リポジトリとして初期化します。", "display": "git init", "output": "Initialized empty Git repository in /home/you/study-js/.git/" },
    { "command": "git add .", "instruction": "変更をすべてステージングします（. は「このフォルダすべて」の意味）。", "display": "git add ." },
    { "command": "git commit -m <msg>", "instruction": "ステージした内容を 1 つの commit として記録します。メッセージは自由です。", "display": "git commit -m \"簡易計算機 CLI を追加\"", "output": "[master (root-commit) a1b2c3d] 簡易計算機 CLI を追加\n 1 file changed, 20 insertions(+)" },
    { "command": "git remote add origin <url>", "instruction": "GitHub で作ったリポジトリの URL を origin として登録します。", "display": "git remote add origin https://github.com/you/study-js.git" },
    { "command": "git branch -M main", "instruction": "今のブランチ名を main に変更します（初期状態は master）。", "display": "git branch -M main" },
    { "command": "git push -u origin main", "instruction": "commit を GitHub に送ります。初回なので -u を付けます。", "display": "git push -u origin main", "output": "Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 240 bytes | 240.00 KiB/s, done.\nTo https://github.com/you/study-js.git\n * [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'." }
  ]
}
```

---

## 目安時間の内訳（第 4 週）

| 内容 | 目安 |
|------|------|
| 本ページの解説を読む・用語を押さえる | 2 時間 |
| 環境準備・clone や push の手順を試す | 3〜4 時間 |
| Stage 1 の CLI を push する実習 | 2〜3 時間 |
| ブランチの作成・merge を試す | 2 時間程度 |

---

**次**: [第 5 週：rebase, squash、PR、ブランチ戦略](/stage2/week5)
