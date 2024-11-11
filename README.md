# Chat Application

This project is a real-time chat application built with a React frontend and an Express backend. It uses Socket.IO for real-time communication and MongoDB for data storage.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication
- Real-time messaging
- Chat history
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/vikash-kushwah/Chat-server.git
    cd chat-app
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and other environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    CHAT_PASSWORD=your_chat_password
    ```

## Running the Application

1. Start the backend server:
    ```sh
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```sh
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173`.

## Project Structure
chat-app/ 
├── backend/ 
│ ├── controllers/ 
│ │ ├── messageController.js 
│ │ └── userController.js 
│ ├── models/ 
│ │ ├── Message.js 
│ │ └── User.js 
│ ├── routes/ 
│ │ └── messages.js 
│ ├── tests/ 
│ │ └── userController.test.js 
│ ├── .env 
│ ├── package.json 
│ └── server.js 
├── frontend/ 
│ ├── public/ 
│ ├── src/ 
│ │ ├── components/ 
│ │ │ ├── ChatInput.jsx 
│ │ │ ├── Login.jsx 
│ │ │ └── MessagesList.jsx 
│ │ ├── styles/ 
│ │ │ ├── global.css 
│ │ │ ├── responsive.css 
│ │ │ ├── Login.css 
│ │ │ └── Chat.css 
│ │ ├── App.jsx 
│ │ ├── main.jsx 
│ │ └── vite.config.js 
│ ├── .gitignore 
│ ├── index.html 
│ ├── package.json 
│ └── README.md

## API Endpoints

### Messages

- `POST /messages` - Create a new message
- `GET /messages` - Get all messages

## Socket Events

### Client-Side Events

- `login` - Sent by the client to log in
- `chat message` - Sent by the client to send a chat message
- `request chat history` - Sent by the client to request chat history

### Server-Side Events

- `login success` - Sent by the server on successful login
- `login error` - Sent by the server on login error
- `chat message` - Sent by the server to broadcast a chat message
- `chat history` - Sent by the server to provide chat history

## Testing

To run the tests, use the following command in the `backend` directory:
```sh
npm test
