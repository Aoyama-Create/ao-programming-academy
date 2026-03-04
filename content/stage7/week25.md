# 第 25 週：Terraform 基礎、module 化、state 管理

**目安時間**: 約 10 時間（解説・手順・演習）

---

## 学習目標

この週が終わると、次のことができるようになります。

- **Terraform** で AWS リソースをコードで定義し、`plan` / `apply` で反映できる
- **module** でリソースをまとめ、再利用できる
- **state**（tfstate）の役割と、リモート state・ロックの考え方を理解できる

---

## 1. Terraform 基礎

Terraform は Infrastructure as Code（IaC）のツールです。HCL でリソースを定義し、`terraform plan` で変更内容を確認、`terraform apply` で適用します。provider で AWS を指定し、VPC・EC2・S3・RDS などを定義します。

（ここに provider 設定・resource の書き方・plan/apply の流れを追記できます。）

---

## 2. module 化と state 管理

共通するリソース群は **module** にまとめ、複数環境で再利用します。**state** は現在のインフラの状態を保持するファイルで、リモート（S3 + DynamoDB 等）に置き、ロックして同時実行を防ぎます。

（ここに module の作り方・state のバックエンド・ロックを追記できます。）

---

**前**: [第 24 週：VPC 設計、IAM 最小権限、S3・RDS の基礎](/stage7/week24)  
**次**: [第 26 週：ECS（Fargate）、dev/stg/prod 環境分離](/stage7/week26)  
**一覧**: [Stage 7 教材トップ](/stage7)
