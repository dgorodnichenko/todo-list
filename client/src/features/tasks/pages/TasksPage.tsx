import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks } from "../api/tasksApi";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import './TasksPage.css';

export function TasksPage() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Failed to load tasks</p>;
  }

  return (
    <section className="tasks-page">
      <h1 className="tasks-page__title">Todo List</h1>

      <TaskForm
        isSubmitting={createTaskMutation.isPending}
        onSubmit={createTaskMutation.mutate}
      />
      {createTaskMutation.isError && <p className="tasks-page__error">Failed to create task</p>}
      {deleteTaskMutation.isError && <p className="tasks-page__error">Failed to delete task</p>}

      {tasks.length === 0 ? (
        <p className="tasks-page__message">No tasks yet.</p>
      ) : (
        <ul className="tasks-page__list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isDeleting={
                deleteTaskMutation.isPending &&
                deleteTaskMutation.variables === task.id
              }
              onDelete={deleteTaskMutation.mutate}
            />
          ))}
        </ul>
      )}
    </section>
  );
}