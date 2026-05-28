# Todo List Server

Backend API for a Todo List application.

Built with NestJS, TypeORM and Neon (PostgreSQL).

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL / Neon
- Jest

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` file in the `server` folder:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=your_neon_database_url
CLIENT_URL=http://localhost:5173
```

## Run

Start development server:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Get tasks

```http
GET /tasks
```

Returns a list of tasks.

### Create task

```http
POST /tasks
```

Request body:

```json
{
  "title": "Learn NestJS",
  "description": "Create a simple Todo List API"
}
```

### Update task

```http
PATCH /tasks/:id
```

Request body:

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

### Delete task

```http
DELETE /tasks/:id
```

Deletes a task by id.

## Validation

The API validates request bodies with DTOs and `ValidationPipe`.

Main rules:

- `title` is required
- `title` max length is 160 characters
- `description` is required
- `description` max length is 2000 characters
- unknown fields are rejected

## Rate Limiting

The server uses request throttling to protect the API from too many requests.

## Tests

Run unit tests:

```bash
npm test
```

## Project Structure

```text
src/
  config/
    typeorm.config.ts
  tasks/
    dto/
    entities/
    tasks.controller.ts
    tasks.module.ts
    tasks.service.ts
    tasks.service.spec.ts
  app.module.ts
  main.ts
```
