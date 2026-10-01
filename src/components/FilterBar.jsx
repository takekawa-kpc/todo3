const FILTERS = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
]

// すべて / 未完了 / 完了済み のフィルタ(選択中をハイライト)
export default function FilterBar({ filter, onChange }) {
  return (
    <div
      role="group"
      aria-label="ステータスで絞り込み"
      className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
    >
      {FILTERS.map(({ value, label }) => {
        const selected = filter === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={selected}
            className={`flex-1 rounded-md px-3 py-1.5 text-base transition-colors duration-200
              ${
                selected
                  ? 'bg-white font-semibold text-gray-900 shadow-sm dark:bg-gray-600 dark:text-gray-50'
                  : 'text-gray-600 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700/60'
              }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
