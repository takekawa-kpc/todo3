# Issues 一覧

`spec.md` から分解した issue 一覧です。

## v1 実装(§2–§5 に対応)

| # | タイトル | ファイル |
| --- | --- | --- |
| 001 | タスクの追加 | [001-add-task.md](./001-add-task.md) |
| 002 | タスク一覧表示と空状態 | [002-task-list.md](./002-task-list.md) |
| 003 | タスクの完了 / 完了解除 | [003-complete-toggle.md](./003-complete-toggle.md) |
| 004 | タスクの削除 | [004-delete-task.md](./004-delete-task.md) |
| 005 | タスクの編集(インライン) | [005-edit-task.md](./005-edit-task.md) |
| 006 | フィルタ(すべて / 未完了 / 完了済み) | [006-filter.md](./006-filter.md) |
| 007 | 完了済みの一括削除 | [007-clear-completed.md](./007-clear-completed.md) |
| 008 | localStorage による永続化 | [008-localstorage.md](./008-localstorage.md) |
| 009 | UI / デザイン(ダークモード対応) | [009-ui-darkmode.md](./009-ui-darkmode.md) |
| 010 | アクセシビリティとキーボード操作 | [010-a11y.md](./010-a11y.md) |

## 将来の機能(§8 ロードマップに対応)

| # | タイトル | ファイル |
| --- | --- | --- |
| 011 | タスクの優先度と期限日 | [011-priority-due-date.md](./011-priority-due-date.md) |
| 012 | ドラッグ&ドロップによる並び替え | [012-reorder-dnd.md](./012-reorder-dnd.md) |
| 013 | サブタスク | [013-subtasks.md](./013-subtasks.md) |
| 014 | タグと検索 | [014-tags-search.md](./014-tags-search.md) |
| 015 | カテゴリ / プロジェクト | [015-categories.md](./015-categories.md) |
| 016 | バックエンド API 同期 | [016-backend-sync.md](./016-backend-sync.md) |
| 017 | ユーザー認証と共有 | [017-auth-sharing.md](./017-auth-sharing.md) |
| 018 | 通知とリマインダー | [018-reminders.md](./018-reminders.md) |
| 019 | 統計・振り返りビュー | [019-stats.md](./019-stats.md) |
| 020 | キーボードショートカット・Markdown・画像添付 | [020-shortcuts-markdown-image.md](./020-shortcuts-markdown-image.md) |
| 021 | データのエクスポート / インポート | [021-export-import.md](./021-export-import.md) |
| 022 | 多言語対応(日本語 / 英語) | [022-i18n.md](./022-i18n.md) |

## Issue の書式

```markdown
# <番号>: <タイトル>

**ラベル**: <ラベル>
**関連仕様**: spec.md §<章>

## 概要
<1-3 行で何をする issue か>

## 要求
- [ ] <チェック可能な要求項目>

## 検収基準
- [ ] <完了時に満たすべき検証項目>
```
