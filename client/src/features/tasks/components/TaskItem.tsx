import type { Task } from "../types/tasksTypes";

type TaskItemProps = {
  task: Task;
  isDeleting: boolean;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, isDeleting, onDelete }: TaskItemProps) {
  return (
    <li>
      <strong>{task.title}</strong>
      {task.description}

      <button
        type="button"
        disabled={isDeleting}
        onClick={() => onDelete(task.id)}
      >
        {isDeleting ? 'Deleting...' : 'Done'}
      </button>
    </li>
  );
}