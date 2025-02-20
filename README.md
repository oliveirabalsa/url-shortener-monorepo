# URL Shortener

## 📌 Overview
This project is a **URL Shortener** built with **NestJS (backend) and Vite + React (frontend)**. It allows users to generate shortened URLs and track visits. Users can also register and log in to manage their created URLs.

---

## 📂 Folder Structure
```
/your-monorepo
├── /apps
│   ├── /api       # NestJS Backend
│   └── /web       # React Frontend
├── /prisma        # Prisma ORM configuration
├── docker-compose.yml
├── .env (ignored, needed per service)
└── README.md
```

---

## 🚀 Getting Started

### **1️⃣ Set Up `.env` Files (Required for API and Web)**
Before running the project, you **must create** `.env` files inside **both `apps/api` and `apps/web`**.

#### **📍 `.env` for Backend (`apps/api/.env`)**
```
DATABASE_URL=mongodb+srv://your-user:your-password@your-mongodb-url/database-name
JWT_SECRET=your_secret_key
PORT=3000
```
💡 **Note:** The backend requires a **valid MongoDB URI**. We are not running MongoDB through Docker, so you must **provide your own MongoDB connection**.

#### **📍 `.env` for Frontend (`apps/web/.env`)**
```
VITE_API_BASE_URL=http://localhost:3000/api
```
💡 **Note:** Ensure the frontend knows where to make API calls by setting `VITE_API_BASE_URL`.

---

### **2️⃣ Run the Project Using Docker**
To start the entire project with **one command**, use **Docker Compose**:
```sh
docker-compose up --build
```
This will:
✅ Start the **backend** (NestJS) at `http://localhost:3000/api`
✅ Start the **frontend** (React) at `http://localhost:8080`
✅ Ensure both services communicate correctly

💡 **Note:** MongoDB is NOT running in Docker. You must have a **valid MongoDB connection** in your `.env` file.

If you don't have a MongoDB connection you can use this one for testing.
```
DATABASE_URL="mongodb+srv://leonardobalsalobre:deeporigin@cluster0.4phez.mongodb.net/deeporigin?retryWrites=true&w=majority"
```

---

### **3️⃣ Run Without Docker (Manual Setup)**
If you prefer running the services manually:

#### **🛠 Start the Backend (API)**
```sh
cd apps/api
npm install
npm run start
```
Backend will be running on `http://localhost:3000/api`

#### **🖥️ Start the Frontend (React)**
```sh
cd apps/web
npm install
npm run dev
```
Frontend will be running on `http://localhost:8080`

---

## 🔍 Features & Validations
### ✅ URL Shortening
- Users can shorten URLs and get a unique short URL.
- The short URL redirects to the original long URL.

### ✅ User Authentication
- Users can **sign up**, **log in**, and **manage their URLs**.
- JWT-based authentication is used.
- Only authenticated users can view **their own created URLs**.

### ✅ Input Validations
- **URLs must be valid** (checked in frontend & backend).
- **Signup & Login enforce strong validation**.
- **Rate-limiting is applied** to prevent spam.

### ✅ Security
- **CORS is enabled** for secure API access.
- **Rate-limiting is applied** to protect from abuse.
- **JWT authentication** ensures users can only access their own URLs.

---

## 📸 Screenshots
Below, you can add screenshots of the **Home Page** and **My URLs Page**:

### **🏠 Home Page (Non-Logged User View)**
![image](https://github.com/user-attachments/assets/ccd9ed37-7d7f-423b-9cff-434db34a345f)


### **🔗 My URLs Page (Logged-In User View)**
![image](https://github.com/user-attachments/assets/c2b878ab-3223-46a6-9f0a-28b422903ebd)

---

## 🚀 Deployment & Future Improvements
- **Adding analytics & URL expiration** would be future enhancements.**
- **Adding visits on the front-end side, back-end is working and computing the visits but front-end is not done.**

---

## 📜 License
This project is licensed under the **MIT License**.

