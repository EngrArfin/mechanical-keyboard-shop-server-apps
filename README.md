# mechanical-keyboard-shop-server-apps

# Mechanical Keyboard Shop Server App

This is the backend server for the **Mechanical Keyboard Shop** application, built using **Node.js**, **Express.js**, and **MongoDB**.

## Features

- **CRUD operations** for task management (create, read, update, delete)
- **RESTful API** endpoints for managing tasks
- **Task filtering** by priority
- **Database** powered by MongoDB
- **CORS** enabled for cross-origin resource sharing
- **Environment variables** support using `dotenv`

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database to store task data
- **Cors**: Middleware to enable CORS for all routes
- **Dotenv**: Manage environment variables

## API Endpoints

### GET `/tasks`

Fetch all tasks or filter by priority.

**Query Parameters:**

- `priority` (optional): Filter tasks by priority.

**Response:**

```json
{
  "status": true,
  "data": [
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task description",
      "priority": "high/medium/low",
      "isCompleted": false
    }
  ]
}
```
