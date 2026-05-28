import { useState, type SubmitEvent } from 'react';
import type { CreateTaskPayload } from '../types/tasksTypes';
import './TaskForm.css';

type TaskFormProps = {
  isSubmitting: boolean;
  onSubmit: (payload: CreateTaskPayload) => void;
};

type FormErrors = {
  title?: string;
  description?: string;
};

const TITLE_MAX_LENGTH = 160;
const DESCRIPTION_MAX_LENGTH = 2000;

export function TaskForm({ isSubmitting, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      title,
      description,
    });

    setTitle('');
    setDescription('');
    setErrors({});
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        placeholder="Add title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {errors.title && <p className="task-form__error">{errors.title}</p>}

      <textarea
        className="task-form__textarea"
        placeholder="Add description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      {errors.description && <p className="task-form__error">{errors.description}</p>}

      <button type="submit" className="task-form__button" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add task'}
      </button>
    </form>
  );
}