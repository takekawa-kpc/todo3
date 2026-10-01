import TaskItem from './TaskItem.jsx'

// 作成日時の新しい順に並んだタスクリスト
export default function TaskList({ tasks, deletingIds, onToggle, onDelete }) {
  return (
    <ul className="space-y-2" aria-label="タスクリスト">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleting={deletingIds.has(task.id)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
