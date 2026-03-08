# 🤖 AI Test Generator

AI Test Generator is a web application that automatically generates test questions from a given topic using Artificial Intelligence.
It helps teachers, students, and developers quickly create quizzes or practice tests without manually writing questions.
This project demonstrates how **AI APIs can be integrated with a full-stack web application** to automate question generation.


# 🚀 Project Overview

Creating test papers manually can take a lot of time.
This project solves that problem by allowing users to enter a topic and instantly generate questions using AI.

The application sends the topic to the backend server, which communicates with the AI API and returns generated questions.


# ✨ Features

* AI-powered question generation
* Simple and user-friendly interface
* Fast automated test creation
* Topic-based question generation
* Full-stack web application


# 📸 Screenshots

## Application Interface

1. Homepage of the AI Test Generator.
<img width="1910" height="1089" alt="Image" src="https://github.com/user-attachments/assets/a565f9af-eb7f-4662-8253-0dcc5d6cbae3" />

2. User login interface.
<img width="1885" height="1089" alt="Image" src="https://github.com/user-attachments/assets/0043b9d1-1708-45ba-ba41-8d667b284c63" />

3. Configure test settings and topics.
<img width="1905" height="1035" alt="Image" src="https://github.com/user-attachments/assets/5eb04855-7b1c-4cc4-a878-c47554571821" />

4. Generating Test (Based on the selected test settings)
<img width="1905" height="1081" alt="Image" src="https://github.com/user-attachments/assets/2b3fd5c4-d2f9-452b-8d2d-da37963a6d5e" />

5. AI‑generated questions preview.
<img width="1905" height="1081" alt="Image" src="https://github.com/user-attachments/assets/2b3fd5c4-d2f9-452b-8d2d-da37963a6d5e" />

6. Export Options (Download, share, or print the test)
<img width="1891" height="1041" alt="Image" src="https://github.com/user-attachments/assets/7ff5f8d5-360a-4ab3-a2c6-52450a811a96" />


# 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### AI Integration

* OpenAI API

### Tools

* Git
* npm


# 📂 Project Structure

```
ai-test-generator

client/        # Frontend files
server/        # Backend logic
models/        # Database models
routes/        # API routes
.env           # Environment variables
package.json   # Dependencies
README.md      # Project documentation
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone [https://github.com/Jahanvi-07/ai-test-generator.git](https://github.com/Jahanvi-07/ai-test-generator.git)

### 2️⃣ Go to the project directory

cd ai-test-generator

### 3️⃣ Install dependencies

npm install

### 4️⃣ Setup environment variables

Create a `.env` file and add:

MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000

### 5️⃣ Run the project

npm start

### 6️⃣ Open in browser

[http://localhost:5000](http://localhost:5000)

---

# 📌 How It Works

1. User enters a topic.
2. Backend receives the request.
3. Server sends request to AI API.
4. AI generates questions.
5. Questions are displayed on the interface.


# 📚 Key Learnings

• Integrating AI APIs into web applications
• Building REST APIs with Node.js and Express
• Connecting MongoDB with backend services
• Managing environment variables using `.env`
• Structuring a full-stack web application


# 🎯 Future Improvements

• Multiple question types (MCQ, True/False, Fill in the blanks)
• Export tests as PDF
• User authentication system
• Save generated tests in database
• Difficulty level selection


# 👩‍💻 Author

**Jahanvi Saini**

GitHub
[https://github.com/Jahanvi-07](https://github.com/Jahanvi-07)

