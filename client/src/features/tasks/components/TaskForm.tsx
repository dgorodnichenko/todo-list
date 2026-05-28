import { useState, type SubmitEvent } from 'react';
import type { CreateTaskPayload } from '../types/tasksTypes';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Add description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add task'}
      </button>
    </form>
  );
}