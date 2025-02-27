# DUHacks4.0
# Donation Platform : SocialConnect

## 📌 Project Overview
The **SocialConnect** is a MERN stack-based web application that connects NGOs with potential donors. NGOs can register on the platform and request necessary items, while users can browse NGOs, view their requests, and donate accordingly. Users also have the option to donate directly without selecting a specific request. Additionally, NGOs can organize events, while users can apply to volunteer in these events.

## 🛠 Tech Stack
- **Frontend:** React, React Router, Redux, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Integration:** OpenStreet Map API (for NGO geo-tagging)
- **Tools & IDEs:** IntelliJ IDEA, VS Code

## 🚀 Features
### 🔹 For NGOs:
- Register/Login
- Request needed items
- Manage requests
- View donations received
- Organize Events

### 🔹 For Users:
- Register/Login
- View list of registered NGOs
- View detailed information of an NGO
- Check the list of requests made by an NGO
- Donate to a specific request
- Directly donate without selecting a request
- Apply as a Volunteer for Events.

## ⚙️ Installation and Setup
### Prerequisites:
- Node.js & npm installed
- MongoDB installed and running
- Git installed

### Steps:
1. **Clone the Repository**
   ```sh
   git clone https://github.com/dhruvikmodi23/DUHacks4.0
      or
   git clone https://github.com/Pruthvi-Parmar/DUHacks4.0
   ```

2. **Setup Backend**
   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables (.env file)**
   Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=8000
   MONGODB_URI=""
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET=""
   ACCESS_TOKEN_EXPIRY=""
   REFRESH_TOKEN_SECRET=""
   REFRESH_TOKEN_EXPIRY=""
   ```

5. **Access the Application**
   - Open `http://localhost:5173` for the frontend (default Vite port)
   - Backend runs on `http://localhost:8000`

## 🗂 Folder Structure
```
│── backend/src
│   ├── models/
│   ├── routes/
|   ├── db/
|   ├── middlewares/
│   ├── controllers/
│   ├── utils/
│   ├── app.js
|   ├── constants.js
|   ├── index.js
│   ├── .env
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   ├── App.jsx
│   ├── main.jsx
|   ├── Layout.jsx
│
│── README.md
│── package.json
│── .gitignore
```

## 🎯 Future Enhancements
- Payment gateway integration for monetary donations
- User dashboard for tracking donations
- Admin panel for platform moderation
- Email notifications for NGOs and users

## 👨‍💻 Team
- Pruthvirajsinh Parmar
- Dhruvik Modi
- Parthrajsinh Kosamiya
- Dhruval Mehta
  
## 🤝 Contributing
We welcome contributions! Feel free to submit a pull request or raise an issue.

## 📜 License
This project is licensed under the MIT License.

## 📩 Contact
For any queries, reach out at ppruthviraj254@gmail.com or dhruvikmodi23@gmail.com or create an issue in the repository.
