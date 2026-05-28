import type { CreateTaskPayload, Task } from "../types/tasksTypes";

const TASKS_URL = import.meta.env.VITE_TASKS_URL;

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(TASKS_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const response = await fetch(TASKS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`TASKS_URL/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}