Project Name

DevPulse

Live URL

Not deployed yet

Overview

DevPulse is a full-stack issue tracking system built for managing software bugs, feature requests, and development tasks with role-based access control. It supports contributors for reporting issues and maintainers for managing and updating them.

Features
User authentication and role-based access (contributor, maintainer)
Create, update, and manage issues
Issue status tracking (open, in-progress, closed)
Contributors can report issues
Maintainers can update any issue including status changes
Filter issues by type and status
Secure API structure with modular architecture
Clean separation of concerns using service, controller, and route layers
Tech Stack
Node.js
Express.js
TypeScript
PostgreSQL
JWT Authentication
bcrypt
dotenv
Project Structure
npm initialized using npm init -y
TypeScript configured with tsconfig
Source folder: src
Modular architecture inside modules
Modules
user module
user.route.ts
user.controller.ts
user.service.ts
user.model.ts
issue module
issue.route.ts
issue.controller.ts
issue.service.ts
issue.model.ts
Setup Steps



npm install
Setup environment variables:
DATABASE_URL
JWT_SECRET
PORT
Run database migrations / create tables manually

Start development server:

npm run dev
API Endpoints (Summary)
Auth / User
POST /api/user/register
POST /api/user/login
GET /api/user/profile
Issues
GET /api/issues
GET /api/issues/:id
POST /api/issues
PATCH /api/issues/:id
DELETE /api/issues/:id
Database Schema Summary
users
id (PK)
name
email
password
role (contributor | maintainer)
created_at
updated_at
issues
id (PK)
title
description
type
status (open | in-progress | closed)
reporter_id (FK → users.id)
created_at
updated_at

