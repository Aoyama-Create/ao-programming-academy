# 第 5 週：rebase, squash、PR、ブランチ戦略

**目安時間**: 約 10 時間（解説・手順・実習）

---

## 学習目標

この週が終わると、次のことができるようになります。

- **rebase** と **squash** の目的と基本的な使い方を説明できる
- **Pull Request（PR）** を作成し、レビュー観点を理解したうえで merge まで行える
- **ブランチ戦略**（main・develop の役割）を説明できる

---

## 1. rebase と squash の基本

### rebase とは

**rebase** は、自分のブランチの commit を「別のブランチの先端のうえに付け直す」操作です。例えば `main` が進んだあと、自分の `feature/xxx` を `main` の最新のうえに並べ直すと、履歴が一直線になり、後から見たときに分かりやすくなります。

```bash
git checkout feature/xxx
git fetch origin
git rebase origin/main
```

コンフリクト（同じ箇所を別々に変更した衝突）が出た場合は、表示されたファイルを編集して解消し、`git add` したあと `git rebase --continue` で続行します。rebase をやめたいときは `git rebase --abort` です。

### squash とは

**squash** は、複数の commit を 1 つにまとめることです。「 typo 修正」「微修正」など細かい commit が並んでいる場合、PR を merge するときに「1 つの commit にまとめて取り込む」と履歴がすっきりします。多くの場合、GitHub の PR 画面で「Squash and merge」を選ぶと、PR 内の commit が 1 つにまとまって main に入ります。

---

## 2. Pull Request（PR）の流れ

PR は「このブランチの変更を、main（または develop）に取り込んでください」と提案する仕組みです。

### 基本的な流れ

1. **feature ブランチで作業する**  
   `git checkout -b feature/〇〇` でブランチを切り、変更を commit する。

2. **リモートに push する**  
   `git push -u origin feature/〇〇`

3. **PR を作成する**  
   GitHub のリポジトリページで「Compare & pull request」が出たらそれをクリックするか、「Pull requests」タブから「New pull request」で、base を `main`（または `develop`）、compare を `feature/〇〇` にして作成する。

4. **説明を書く**  
   タイトルと本文で「何をしたか」「なぜか」を書く。次の「PR テンプレート」を参考にするとよい。

5. **レビュー**  
   担当者（または自分でセルフレビュー）がコードや説明を確認する。指摘があれば、同じブランチで修正して commit → push すると、PR に自動で反映される。

6. **merge**  
   問題なければ「Merge pull request」を実行。オプションで「Squash and merge」を選ぶと、PR 内の commit が 1 つにまとまって取り込まれる。

---

## 3. PR テンプレート・DoD の例

### PR の説明文の例（テンプレート）

```markdown
## 変更内容
- 〇〇機能を追加した

## 理由
- ユーザーが △△ できるようにするため

## 確認したこと
- [ ] ローカルで動作確認した
- [ ] 既存の挙動を壊していない
```

### Definition of Done（DoD）の例

PR を「完了」とみなすための基準の例です。チームで決めておくと、レビューや merge の判断がしやすくなります。

- コードの変更内容が PR の説明と一致している
- 自分で動作確認している
- 既存のテストや挙動を壊していない（テストがある場合は通っている）
- 必要に応じてドキュメントや README を更新している

---

## 4. ブランチ戦略：main と develop

小規模なうちは **main だけ**でも十分ですが、もう少し規模が大きくなると **main** と **develop** の 2 本を用意することがあります。

| ブランチ | 役割 |
|----------|------|
| **main** | 本番（リリース）に出すコードが入る。常に「いつでも出せる状態」にしておく。 |
| **develop** | 開発用の統合ブランチ。機能開発は `feature/〇〇` で行い、できたら develop に PR で merge。develop で十分固まったら main に反映する。 |

- 普段の機能追加は `feature/〇〇` → **develop** への PR で行う。
- リリースするときは **develop** → **main** への PR（または merge）で、main を更新する。

このように「本番用」と「開発統合用」を分けておくのが、簡略版のブランチ戦略です。

---

## 5. 実習：1 本の PR をマージまで行う

1. 第 4 週で push したリポジトリ（または教材用リポジトリ）を clone / pull する。
2. `git checkout -b feature/readme-update` のように、新しいブランチを作る。
3. README の 1 行を変える、または小さな修正を 1 つ commit する。
4. `git push -u origin feature/readme-update` で push する。
5. GitHub で「Compare & pull request」→ 説明を書いて PR を作成する。
6. （可能なら）自分でレビュー観点を確認し、「Squash and merge」で merge する。
7. ローカルで `git checkout main` → `git pull` し、merge 結果を確認する。

これができれば、第 5 週の「PR を 1 本マージする」実習は完了です。

---

## 提出物の目安

- **1 本の PR をマージまで行った**  
  または  
- **PR テンプレート・DoD を記載したドキュメント**（自分のリポジトリの README や Wiki に書いても可）

---

## 目安時間の内訳（第 5 週）

| 内容 | 目安 |
|------|------|
| rebase・squash・PR・ブランチ戦略の解説を読む | 2 時間 |
| PR の作成から merge まで手順を試す | 4〜5 時間 |
| PR テンプレート・DoD を書く | 1〜2 時間 |

---

**前**: [第 4 週：Git 基礎](/stage2/week4)  
**次**: [第 6 週：要件定義・受入基準・AI 利用ポリシー](/stage2/week6)
