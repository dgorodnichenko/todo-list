import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasksApi";

export function TasksPage() {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
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