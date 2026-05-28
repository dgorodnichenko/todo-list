import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTasks } from "../api/tasksApi";
import { TaskForm } from "../components/TaskForm";

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

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Failed to load tasks</p>;
  }

  return (
    <section>
      <h1>Todo List</h1>

      <TaskForm
        isSubmitting={createTaskMutation.isPending}
        onSubmit={createTaskMutation.mutate}
      />
      {createTaskMutation.isError ? <p>Failed to create task</p> : null}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              {task.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}