// 空状態のメッセージ表示
export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-10 text-center text-base text-gray-400 dark:border-gray-700 dark:text-gray-500">
      <span aria-hidden="true" className="text-2xl">
        📝
      </span>
      <p>{message}</p>
    </div>
  )
}
