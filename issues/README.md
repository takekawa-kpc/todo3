# Issues 一覧

`spec.md` から分解した issue 一覧です。番号は実装順に割り振られています。

## 進捗

**完了: 6 / 20(30%)**

| 状態 | 件数 |
| --- | --- |
| 未着手 | 14 |
| 実装中 | 0 |
| 完了 | 6 |

> 状態が変わったら、上の集計と一覧の「状態」列を同時に更新してください。
> issue 内のチェックボックス(要求・検収基準)がすべて `[x]` になったら「完了」にします。

## 実装の進め方

1. **Stage 1(基盤)**: 001–004 をまとめて実施
   - 001 タスクの追加 / 002 タスク一覧表示 / 003 タスクの削除 / 004 localStorage 永続化
2. **Stage 2**: 005 以降を番号順に 1 つずつ実施(1 件完了してから次へ)

## Issue 一覧

| # | タイトル | ファイル | スコープ | 状態 |
| --- | --- | --- | --- | --- |
| 001 | タスクの追加 | [001-add-task.md](./001-add-task.md) | 基盤 | 完了 |
| 002 | タスク一覧表示と空状態 | [002-task-list.md](./002-task-list.md) | 基盤 | 完了 |
| 003 | タスクの削除 | [003-delete-task.md](./003-delete-task.md) | 基盤 | 完了 |
| 004 | localStorage による永続化 | [004-localstorage.md](./004-localstorage.md) | 基盤 | 完了 |
| 005 | タスクの完了 / 完了解除 | [005-complete-toggle.md](./005-complete-toggle.md) | v1 | 完了 |
| 006 | タスクの編集(インライン) | [006-edit-task.md](./006-edit-task.md) | v1 | 未着手 |
| 007 | フィルタ(すべて / 未完了 / 完了済み) | [007-filter.md](./007-filter.md) | v1 | 完了 |
| 008 | 完了済みの一括削除 | [008-clear-completed.md](./008-clear-completed.md) | v1 | 未着手 |
| 009 | タスクの優先度と期限日 | [009-priority-due-date.md](./009-priority-due-date.md) | ロードマップ | 未着手 |
| 010 | ドラッグ&ドロップによる並び替え | [010-reorder-dnd.md](./010-reorder-dnd.md) | ロードマップ | 未着手 |
| 011 | サブタスク | [011-subtasks.md](./011-subtasks.md) | ロードマップ | 未着手 |
| 012 | タグと検索 | [012-tags-search.md](./012-tags-search.md) | ロードマップ | 未着手 |
| 013 | カテゴリ / プロジェクト | [013-categories.md](./013-categories.md) | ロードマップ | 未着手 |
| 014 | バックエンド API 同期 | [014-backend-sync.md](./014-backend-sync.md) | ロードマップ | 未着手 |
| 015 | ユーザー認証と共有 | [015-auth-sharing.md](./015-auth-sharing.md) | ロードマップ | 未着手 |
| 016 | 通知とリマインダー | [016-reminders.md](./016-reminders.md) | ロードマップ | 未着手 |
| 017 | 統計・振り返りビュー | [017-stats.md](./017-stats.md) | ロードマップ | 未着手 |
| 018 | キーボードショートカット・Markdown・画像添付 | [018-shortcuts-markdown-image.md](./018-shortcuts-markdown-image.md) | ロードマップ | 未着手 |
| 019 | データのエクスポート / インポート | [019-export-import.md](./019-export-import.md) | ロードマップ | 未着手 |
| 020 | 多言語対応(日本語 / 英語) | [020-i18n.md](./020-i18n.md) | ロードマップ | 未着手 |

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
