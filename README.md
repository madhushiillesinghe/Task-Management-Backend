# Task Management System - Backend

## Overview
The Task Management System backend is built using **Express.js, Node.js, and TypeScript**. It provides authentication and task management functionality while securely connecting to the frontend via **Axios**. 

The system ensures **user authentication** using **JWT (JSON Web Token)**. Users must **register** first if they do not have an account, and upon login, a token is generated and used to access protected endpoints. Tasks are stored in **MongoDB**, a non-relational database. The system handles **CORS errors** to ensure smooth communication between the frontend and backend.

## Features
- **User Authentication**: Uses JWT for secure authentication.
- **Task CRUD Operations**: Users can create, retrieve, update, and delete tasks.
- **User-Specific Tasks**: Displays tasks based on user ID.
- **New Users**: Do not see any tasks until they create one.
- **Secure API Access**: Protected endpoints require authorization.
- **CORS Handling**: Ensures smooth frontend-backend communication.
- **MongoDB Integration**: Stores tasks and user data efficiently.
- **Error Handling**: Provides meaningful error responses.

## Tech Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Token)
- **API Requests**: Axios (used in frontend)
- **Middleware**: CORS handling, Error handling, Request validation
  
###  Comprehensive API Documentation
- RESTful API design with CORS support.
- Detailed API documentation available at:  
  [API Documentation](https://documenter.getpostman.com/view/35385949/2sAYdfpqcB).
## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB database (local or cloud)
- Frontend for API communication

### Frontend implemented Github repo 
- Detailed API documentation available at:  
[Frontend github repo](https://github.com/madhushiillesinghe/Task-Management-Frontend.git).
## License

This project is licensed under the MIT License. See the LICENSE file for details.
