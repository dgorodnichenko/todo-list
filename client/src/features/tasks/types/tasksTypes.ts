export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

export type CreateTaskPayload = {
  title: string;
  description: string;
};