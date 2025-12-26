# 📚 Learning Management System (LMS) – Backend

This repository contains the **backend implementation** of a Learning Management System (LMS) built using **Node.js**, **Express.js**, and **MongoDB**.
It provides secure APIs for user authentication, course and lecture management, and payment handling.

---

## 🚀 Features

* 🔐 User Authentication & Authorization (JWT)
* 👥 Role-based access control (Admin / User)
* 📘 Course management (Create, Read, Update, Delete)
* 🎥 Lecture upload, retrieval, and deletion
* ☁️ Secure media storage with Cloudinary
* 💳 Payment integration using Razorpay
* 🧾 Subscription-based access control
* 🛡 Centralized error handling
* 🧩 Modular and scalable architecture
* 📡 RESTful REST APIs

---

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB, Mongoose
* **Authentication**: JWT, bcrypt
* **File Uploads**: Multer, Cloudinary
* **Payments**: Razorpay
* **Logging**: Morgan
* **Environment Management**: Dotenv

---

## 📂 Project Structure

```
server/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── utils/
│── config/
│── app.js
│── server.js
│── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
```

---

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/lms-backend.git
cd lms-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the server**

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔑 API Overview

### Auth

* `POST /api/v1/user/register`
* `POST /api/v1/user/login`
* `GET /api/v1/user/profile`

### Courses

* `GET /api/v1/courses`
* `POST /api/v1/courses` (Admin)
* `DELETE /api/v1/courses/:id` (Admin)

### Lectures

* `GET /api/v1/courses/:id`
* `POST /api/v1/courses/:id` (Admin)
* `DELETE /api/v1/courses?courseId=&lectureId=` (Admin)

### Payments

* `POST /api/v1/payment/checkout`
* `POST /api/v1/payment/verify`

---

## 🧪 Error Handling

* Centralized error handler using custom `AppError`
* Async error handling middleware
* Proper HTTP status codes and messages

---

## 🔐 Security Practices

* Password hashing with bcrypt
* JWT-based authentication
* Protected routes using middleware
* Environment variables for secrets

---

## 📌 Future Improvements

* Pagination & filtering
* Admin analytics dashboard
* Rate limiting
* API documentation with Swagger

---

## 👤 Author

**Shubham Bharti**
Backend / Full Stack Developer
