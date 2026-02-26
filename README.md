# 🚀 LeaveOrbit - Employee Leave Manager

LeaveOrbit is a modern, full-stack employee leave management system designed to streamline leave requests, approvals, and employee onboarding. Built with a robust **Node.js/Express** backend and a dynamic **React/Vite** frontend, it offers a seamless experience for both employees and administrators.

---

## ✨ Key Features

- **🔐 Secure Authentication**: Google OAuth and Email/Password login.
- **📅 Leave Management**: Comprehensive system for applying, tracking, and approving leaves.
- **📊 Real-time Dashboard**: Interactive analytics and leave status overviews.
- **👤 User Management**: Admin portal for managing employee roles and account requests.
- **💰 Reimbursements**: Integrated system for handling employee reimbursement claims.
- **🎨 Modern UI**: Responsive design with liquid animations and dark mode support.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Lottie](https://airbnb.design/lottie/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [JWT](https://jwt.io/)
- **Services**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

## 📂 Project Structure

```bash
LeaveOrbit-Employee-Leave-Manager/
├── 📁 Backend/          # Node.js/Express Server
│   ├── 📁 src/
│   │   ├── 📁 modules/  # API business logic
│   │   └── 📁 config/   # Environment & Security setup
│   └── server.js        # Main entry point
├── 📁 Frontend/         # React/Vite Client
│   ├── 📁 src/
│   │   ├── 📁 features/ # Component modules (Auth, Leaves, Dashboard)
│   │   └── 📁 context/  # State management (Auth, Theme)
│   └── index.html
└── README.md            # You are here!
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Firebase Service Account key (for Admin SDK)

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShivangChaurasia/LeaveOrbit-Employee-Leave-Manager.git
   cd LeaveOrbit-Employee-Leave-Manager
   ```

2. **Setup Backend**:
   ```bash
   cd Backend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../Frontend
   npm install
   # Create a .env file with VITE_API_URL
   npm run dev
   ```

---

## 🔧 Environment Variables

### Backend (`/Backend/.env`)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, etc.

### Frontend (`/Frontend/.env`)
- `VITE_API_URL`: Backend server address

---

## 📄 License
This project is licensed under the **ISC License**.

---

Developed with ❤️ by **Shivang Chaurasia**
