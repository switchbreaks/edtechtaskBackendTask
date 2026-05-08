


# my dot env file is 
# PORT=8000
# MONGO_URI=mongodb://localhost:27017/edtechProject
# JWT_SECRET=d2fbd35c0c5ca3a5c9bc9cd84ad118290c294128c5359a906e3931993dd1234e 

A secure Task Management REST API built with:

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token
* bcrypt

This API supports:

* User registration
* User login with JWT authentication
* Create tasks
* Get user tasks
* Update tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed/pending

---

# Project Folder Structure

```bash
backend/
│
├── config/
│   └── db.js
│
├── helpers/
│   ├── messages/
│   │   ├── errorMessages.js
│   │   └── successMessages.js
│   │
│   └── response/
│       └── allResponse.js
│
├── middleware/
│   └── authController.js
│
├── modules/
│   ├── auth/
│   │   └── auth.js
│   │
│   └── task/
│       └── taskCrude.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── schema/
│   ├── auth.schema.js
│   └── task.schema.js
│
├── utils/
│   └── jwt.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# Installation

Clone project:

```bash
git clone <your-repository-url>
```

Move into project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

BASE_URL=/api
```

---

# Run Project

### Development Mode

```bash
npx nodemon index.js
```

or add this in package.json:

```json
"scripts": {
   "dev": "nodemon index.js"
}
```

then run:

```bash
npm run dev
```

---

### Production Mode

```bash
node index.js
```

Server runs on:

```bash
http://localhost:5000
```

Your current server boot setup is defined in `index.js`. 

---

# API Endpoints

## Authentication APIs

### Register User

```http
POST /api/register
```

Body:

```json
{
   "name":"Adarsh",
   "email":"adarsh@gmail.com",
   "password":"123456"
}
```

---

### Login User

```http
POST /api/login
```

Body:

```json
{
   "email":"adarsh@gmail.com",
   "password":"123456"
}
```

Response:

```json
{
   "token":"jwt_token"
}
```

---

# Task APIs

## Create Task

```http
POST /api/tasks/create
```

Headers:

```bash
Authorization: Bearer your_token
```

Body:

```json
{
   "title":"Learn React",
   "description":"Practice hooks"
}
```

---

## Get All Tasks

```http
GET /api/tasks
```

Optional query:

```http
GET /api/tasks?status=pending
```

---

## Update Task

```http
PUT /api/tasks/update/:id
```

---

## Edit Task

```http
PUT /api/tasks/edit/:id
```

---

## Update Task Status

```http
PATCH /api/tasks/status/:id
```

Body:

```json
{
   "status":"completed"
}
```

---

## Delete Task

```http
DELETE /api/tasks/delete/:id
```

---

# Authentication Flow

1. Register user
2. Login user
3. Receive JWT token
4. Send token in headers:

```bash
Authorization: Bearer your_token
```

---

# Security Features

✔ Password hashing using bcrypt
✔ JWT authentication
✔ Route protection middleware
✔ Error handling
✔ Input validation

---

# Dependencies

Your current installed dependencies include: 

* Express
* Mongoose
* CORS
* Dotenv
* Nodemon

You also need to install:

```bash
npm install bcrypt jsonwebtoken
```

because your code uses them.

---

# Future Improvements

You can add:

* Pagination
* Search tasks
* Sorting
* Rate limiting
* Refresh tokens
* Email verification

---

# Author

Created by **Adarsh Mishra**

---

Your `package.json` currently does not have proper run scripts (`test: index`). You should update it for smoother development. 

Recommended:

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
"# edtechtaskBackendTask" 
