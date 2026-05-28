import { useState, type SubmitEvent } from 'react';
import type { CreateTaskPayload } from '../types/tasksTypes';
import './TaskForm.css';

type TaskFormProps = {
  isSubmitting: boolean;
  onSubmit: (payload: CreateTaskPayload) => void;
};

export function TaskForm({ isSubmitting, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    onSubmit({
      title,
      description,
    });

    setTitle('');
    setDescription('');
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

      <textarea
        className="task-form__textarea"
        placeholder="Add description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit" className="task-form__button" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add task'}
      </button>
    </form>
  );
}