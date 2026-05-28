# Todo List Client

Frontend for the Todo List application.

Built with React, TypeScript and Vite.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- CSS

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` file in the `client` folder:

```env
VITE_TASKS_URL=http://localhost:3000/tasks
```

## Run

Start development server:

```bash
npm run dev
```

The client will be available at:

```text
http://localhost:5173
```

## Features

- View tasks
- Create tasks
- Edit tasks
- Delete tasks
- Client-side form validation
- Loading and error states
- API state management with TanStack Query

## Validation

The task form validates user input before sending requests to the API.

Main rules:

- `title` is required
- `title` max length is 160 characters
- `description` is required
- `description` max length is 2000 characters

## API Configuration

The API URL is configured through Vite environment variables:

```ts
const TASKS_URL = import.meta.env.VITE_TASKS_URL;
```

Example:

```env
VITE_TASKS_URL=http://localhost:3000/tasks
```

## Scripts

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  features/
    tasks/
      api/
        tasksApi.ts
      components/
        TaskForm.tsx
        TaskForm.css
        TaskEditForm.tsx
        TaskEditForm.css
        TaskItem.tsx
        TaskItem.css
      pages/
        TasksPage.tsx
        TasksPage.css
      types/
        taskTypes.ts
  App.tsx
  main.tsx
  index.css
```
