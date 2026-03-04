# Stage 7：AWS & IaC

**目安：第 25〜28 週（各週 約 10 時間）**

Stage 7 では、**AWS** と **Infrastructure as Code（IaC）** で、再現可能なクラウド環境を構築する力を身につけます。VPC・IAM・S3・RDS、Terraform、ECS（Fargate）、dev/stg/prod の環境分離を通じて、10 分で環境再現を目指すことが目標です。

- **入り口**: [Docker 基礎](/weekly#docker-基礎)（第 24 週）を修了していること。コンテナ・イメージ・Dockerfile を理解し、ローカルでコンテナ実行できるレベルを想定しています。まだの場合は、先に第 24 週の教材を完了させてから始めてください。

---

## 目次

| 週 | 内容 | リンク |
|----|------|--------|
| 第 25 週 | VPC 設計、IAM 最小権限、S3・RDS の基礎 | [第 25 週の教材](/stage7/week24) |
| 第 26 週 | Terraform 基礎、module 化、state 管理 | [第 26 週の教材](/stage7/week25) |
| 第 27 週 | ECS（Fargate）、dev/stg/prod 環境分離 | [第 27 週の教材](/stage7/week26) |
| 第 28 週 | CI で terraform plan、本番模擬デプロイ（提出物） | [第 28 週の教材](/stage7/week27) |

---

## 出口（修了時にできること）

- **10 分で環境再現を目指せる**（Terraform 等の IaC で dev/stg/prod を再現できる）
- **VPC・IAM・S3・RDS・ECS** の基礎を説明し、必要なリソースを定義できる
- **CI で terraform plan** を実行し、変更をレビューできる

---

## Stage 7 修了チェック

Stage 7 を修了したかどうかは、次のチェックリストで確認できます。すべて「はい」なら修了です。

- [ ] VPC・サブネット・IAM の最小権限を説明できる
- [ ] Terraform でリソースを定義し、state を管理できる
- [ ] ECS（Fargate）でコンテナを動かし、dev/stg/prod を分離できる
- [ ] CI で terraform plan を実行し、本番模擬デプロイの手順を説明できる

評価は [ルーブリック](/rubric) の「Stage 7：運用」に従います（IaC・環境分離・デプロイ手順）。

---

## 提出物の目安

- **第 28 週**: CI で terraform plan の実行、本番模擬デプロイの手順またはレポート

---

## Stage 8 への接続

Stage 7 を修了したら、次は **Stage 8：セキュリティ & 運用**（第 29〜31 週）に進みます。OWASP、RBAC、脅威モデリング、構造化ログ、アラート、ポストモーテムを学びます。週単位の流れは [週単位カリキュラム](/weekly) を参照してください。
