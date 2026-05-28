import { useState, type SubmitEvent } from 'react';
import type { Task, UpdateTaskPayload } from '../types/tasksTypes';
import './TaskEditForm.css'

type TaskEditFormProps = {
  task: Task;
  isUpdating: boolean;
  onCancel: () => void;
  onSubmit: (payload: UpdateTaskPayload) => void;
};

type FormErrors = {
  title?: string;
  description?: string;
};

export function TaskEditForm({
  task,
  isUpdating,
  onCancel,
  onSubmit,
}: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const formErrors: FormErrors = {};

    if (!trimmedTitle) {
      formErrors.title = 'Title is required';
    }

    if (!trimmedDescription) {
      formErrors.description = 'Description is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: trimmedDescription,
    });
  }

  return (
    <form className="task-item__edit-form" onSubmit={handleSubmit}>
      <input
        className="task-item__input"
        type="text"
        value={title}
        maxLength={160}
        onChange={(event) => setTitle(event.target.value)}
      />
      {errors.title && <p className="task-item__error">{errors.title}</p>}

      <textarea
        className="task-item__textarea"
        value={description}
        maxLength={2000}
        onChange={(event) => setDescription(event.target.value)}
      />
      {errors.description && (
        <p className="task-item__error">{errors.description}</p>
      )}

      <div className="task-item__actions">
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save'}
        </button>

        <button type="button" disabled={isUpdating} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}