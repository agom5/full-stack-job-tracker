# Full-Stack Job Tracker Application

A modern, full-stack web application designed to help users efficiently track and manage their job applications. Built with a powerful React/TypeScript frontend and
a high-performance FastAPI backend, this project showcases a complete and robust software development lifecycle from concept to a polished, functional product.

![Job Tracker Dashboard Screenshot](https://ik.imagekit.io/diqyaf67b/Screenshot%202025-08-10%20at%204.42.55%E2%80%AFPM.png?updatedAt=1754869383611)

---

## ✨ Key Features

- **Full User Authentication:** Secure user registration and login system with JWT-based session management.
- **Complete CRUD Functionality:** Users can Create, Read, Update, and Delete job applications through an intuitive interface.
- **Dynamic Filtering:** Instantly filter the job list by application status (Applied, Interviewing, Offer, Rejected).
- **Modern State Management:** The frontend uses **React Query (TanStack Query)** for efficient server state caching, background refetching, and automatic UI updates.
- **Adaptive Dark Mode:** A sleek dark theme that automatically syncs with the user's operating system preference and can be toggled manually.
- **Responsive Design:** The UI is fully responsive and provides a seamless experience on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack Overview

This project is built with a modern, decoupled architecture, with a clear separation between the frontend and backend.

### Frontend

- **Framework:** React 18 with TypeScript & Vite
- **State Management:** React Query & React Context
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend

- **Framework:** FastAPI
- **Database:** SQLAlchemy ORM with SQLite
- **Authentication:** Passlib (for hashing) & `python-jose` (for JWTs)
- **Data Validation:** Pydantic

---

## 📂 Project Structure

The repository is organized into two main parts. Each part contains its own detailed `README.md` with specific setup and technical information.


/
├── backend/     # The FastAPI backend API (see backend/README.md)
└── frontend/    # The React frontend application (see frontend/README.md)


---

## 🚀 Getting Started

To run this project locally, you will need to set up and run both the backend server and the frontend client.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/full-stack-job-tracker.git](https://github.com/your-username/full-stack-job-tracker.git)
    cd full-stack-job-tracker
    ```

2.  **Set up and run the backend:**
    - Navigate to the `backend` directory and follow the instructions in its `README.md` file.

3.  **Set up and run the frontend:**
    - In a new terminal, navigate to the `frontend` directory and follow the instructions in its `README.md` file.

Once both are running, you can access the application in your browser at `http://localhost:3000` (or the port specified by your frontend server).
