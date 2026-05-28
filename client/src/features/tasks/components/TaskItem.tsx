import type { Task } from "../types/tasksTypes";
import "./TaskItem.css"

type TaskItemProps = {
  task: Task;
  isDeleting: boolean;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, isDeleting, onDelete }: TaskItemProps) {
  return (
    <li className="task-item">
      <strong className="task-item__title">{task.title}</strong>
      <p className="task-item__description">{task.description}</p>

      <button
        className="task-item__button"
        type="button"
        disabled={isDeleting}
        onClick={() => onDelete(task.id)}
      >
        {isDeleting ? 'Deleting...' : 'Done'}
      </button>
    </li>
  );
}