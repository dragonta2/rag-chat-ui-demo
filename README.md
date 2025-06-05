# RAG Chat UI Demo

🧠 AIチャットに "出典表示" を追加したシンプルな RAG（Retrieval-Augmented Generation）風UIのデモプロジェクトです。
Next.js（App Router） + OpenAI API + Jest で構成されています。

---

## 🚀 機能概要

- OpenAI API（gpt-3.5-turbo）と連携したチャットUI
- ユーザーとAIの会話履歴を表示
- 会話内容から出典（sources）を簡易ロジックで判定・表示
- プレーンなRAG体験のデモとして利用可能
- Jestでのユニットテスト実装済み

---

## 🔧 技術構成

| 項目 | 内容 |
|------|------|
| フレームワーク | [Next.js 15（App Router）](https://nextjs.org/docs/app) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| テスト | Jest + @testing-library/react |
| AI連携 | OpenAI API（gpt-3.5-turbo） |

---

## ✅ 技術選定の理由

- **Next.js**: App Router対応で最新構成。将来的なSSG/SSRの使い分けが柔軟。Reactベースで学習コストも低い。
- **TypeScript**: 型安全かつ保守性の高い開発が可能。
- **Jest**: フロントエンドのユニットテストで実績豊富。
- **Tailwind CSS**: スタイリングを高速かつ直感的に行える。
- **OpenAI API**: シンプルなREST APIで生成AIをすぐに活用可能。


<br>
📘 補足

過去にNext.jsやJestを利用した経験があり、短期間で構築できる見込みが立っていたため。

また、将来的な拡張（ベクトルDBやRAG本格実装）にもスムーズに移行しやすい構成を選定。

---
