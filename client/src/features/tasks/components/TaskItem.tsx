import { useState } from "react";
import type { Task, UpdateTaskPayload } from "../types/tasksTypes";
import "./TaskItem.css"
import { TaskEditForm } from "./TaskEditForm";

type TaskItemProps = {
  task: Task;
  isDeleting: boolean;
  isUpdating: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, payload: UpdateTaskPayload) => void;
};

export function TaskItem({
  task,
  isDeleting,
  isUpdating,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleUpdate(payload: UpdateTaskPayload) {
    onUpdate(task.id, payload);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item">
        <TaskEditForm
          task={task}
          isUpdating={isUpdating}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdate}
        />
      </li>
    );
  }

  return (
    <li className="task-item">
      <strong className="task-item__title">{task.title}</strong>
      <p className="task-item__description">{task.description}</p>

      <div className="task-item__actions">
        <button
          className="task-item__edit-button"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button
          className="task-item__button"
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(task.id)}
        >
          {isDeleting ? 'Deleting...' : 'Done'}
        </button>
      </div>
    </li>
  );
}