# Chatbot Project

Welcome to the Chatbot widget project! This is a full-stack web application that implements a chatbot feature, where users can send, edit, and delete messages. The chatbot provides responses to each user message.

## Features

- **Send Message**: Users can send a message to the chatbot, which then responds with a generated message.
- **Edit Message**: Users can edit any previously sent message, and the chatbot updates its response accordingly.
- **Delete Message**: Users can delete any message they've sent.
- **Scroll to Latest Message**: When a new message is sent, the chat automatically scrolls to the most recent message.
- **Responsive UI**: The application has a user-friendly UI, responsive on different screen sizes.

## Tech Stack

- **Frontend**: React, TypeScript, Axios, TailwindCSS
- **Backend**: FastAPI, Python, Transformers (NLP model)
- **Database**: SQLite (for message storage)

## Prerequisites

Before running the project, ensure that you have the following installed:

1. **Node.js** (v16+)
2. **Python** (v3.10+)
3. **Pipenv** or **virtualenv** for managing Python virtual environments

## Installation

Follow the steps below to clone and set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatbot-widget.git
cd chatbot-widget
```

### 2. Set up the backend

#### 1. Navigate to backend
```bash
cd backend
```

#### 2. Create virtual environment & activate it

```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

#### 4. Run FastAPI backend server

```bash
uvicorn main:app --reload
```

#### Note

Backend will be available at http://127.0.0.1:8000


### 3. Set up the frontend

#### 1. Navigate to frontend
```bash
cd frontend
```

#### 2. Install frontend dependencies

```bash
npm install
```

#### 3. Run react development server

```bash
npm start
```

#### Note

Frontend will be available at http://127.0.0.1:3000


### 4. Run backend unit tests

```bash
pytest test_main.py
```

## Demo