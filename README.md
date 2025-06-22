# 🐼 PandaFile Server

**PandaFile Server** is the backend API service for the [PandaFile](https://pandafiles.vercel.app/) platform. It powers secure file uploads, downloads, user authentication (Google OAuth), and integration with cloud storage systems like AWS S3.

---

## 🌐 Live API

> This backend powers the [PandaFile User frontend](https://pandafiles.vercel.app/)

---

## 🚀 Features

- 🔐 Google OAuth 2.0 authentication  
- 📁 Upload & manage user files via AWS S3  
- 📤 Secure file downloads  
- 🗂️ Folder-based file organization  
- 📊 User-based analytics endpoints  
- 🧾 RESTful JSON API structure  
- 🌍 CORS support and secure headers  
- 🧪 Unit & integration testing

---

## 🧰 Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Runtime      | Node.js              |
| Framework    | Express.js           |
| Auth         | Google OAuth 2.0 + JWT |
| Database     | MongoDB + Mongoose   |
| File Storage | AWS S3               |
| Environment  | dotenv               |
| Security     | Helmet, CORS         |
| Testing      | Jest + Supertest     |

---

## 📦 Installation

### 1. Clone the Repository
----
bash
git clone https://github.com/subramanyamchoda/pandafile-server.git
cd pandafile-server

---
2. Install Dependencies
npm install

--- 

3. Configure Environment Variables
Create a .env file in the root with the following keys:
PORT=5000
MONGODB_URI=mongodb+srv://your-db-uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

---

🔒 Security Practices
HTTP headers protected with helmet
CORS enabled for cross-origin requests
JWT used for session validation
OAuth scopes limited to email/profile

---

📄 License
MIT License

© 2025 PandaFile
This project is open-source under the MIT license.
Feel free to use, fork, and improve it!

----


✅ Want help writing:
- Swagger/OpenAPI documentation?
- Dockerfile for deployment?
- Environment variable validator?

Let me know — and I can also rate this backend repo like I did for the frontend!

