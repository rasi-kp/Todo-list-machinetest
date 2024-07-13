# Project Management Application

This Project Management Application allows users to create and manage projects and tasks. Each project can have multiple tasks with different statuses (e.g., To-Do, In Progress, Completed). The application supports three types of users: Admin, Team Lead, and Team Members.

## Features

### User Authentication
- User registration, login, and logout functionality using Node.js.
- Differentiates between Admin, Team Lead, and Team Member roles.

### Project Management (Admin Role)
- Admin can create, edit, and delete projects.
- Admin can assign projects to Team Leads.
- Each project has a title and description.

### Task Management (Team Lead Role)
- Team Leads can add, edit, and delete tasks within their assigned projects.
- Team Leads can assign tasks to Team Members.
- Each task has a title, description, and status (To-Do, In Progress, Completed).
- Team Leads can update the status of projects to the Admin.

### Task Progress (Team Member Role)
- Team Members can view tasks assigned to them.
- Team Members can update the status of their tasks.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/project-management-app.git
    cd project-management-app
    ```

2. Install dependencies for the backend:

    ```bash
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:

    ```bash
    cd frontend
    npm install
    ```

4. Create a `.env` file in the backend directory and add the following:

    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-connection-string
    JWT_SECRET_ADMIN=your-admin-secret
    JWT_SECRET_TEAMLEADER=your-teamleader-secret
    JWT_SECRET_USER=your-user-secret
    ```

5. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

6. Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

## Backend API

### Routes

#### User Routes
- `POST /login`: User login.
- `POST /signup`: User registration.

#### Admin Routes
- `POST /admin/projects`: Create a new project.
- `PUT /admin/projects/:id`: Edit an existing project.
- `DELETE /admin/projects/:id`: Delete a project.
- `GET /admin/projects`: Get all projects.

#### Team Lead Routes
- `POST /teamleader/tasks`: Create a new task.
- `PUT /teamleader/tasks/:id`: Edit an existing task.
- `DELETE /teamleader/tasks/:id`: Delete a task.
- `GET /teamleader/tasks`: Get all tasks assigned to the team lead.

#### User (Team Member) Routes
- `GET /user/tasks`: Get tasks assigned to the team member.
- `PUT /user/tasks/:id/status`: Update the status of a task.

## Frontend

### Components
- **Login**: Handles user login.
- **Register**: Handles user registration.
- **SidePanel**: Displays navigation options based on user role.
- **AddProject**: Modal for adding a new project.
- **TaskList**: Displays tasks for team leads and team members.

### Services
- **services.js**: Contains API calls for user authentication, project management, and task management.

### Example API Call in services.js

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000';

