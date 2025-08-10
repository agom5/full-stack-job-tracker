# Job Tracker - FastAPI Backend

This is the backend API for the Job Tracker application, built with Python and the powerful FastAPI framework. It provides a secure, fast, and reliable RESTful API to handle user authentication and all data operations for managing job applications.

---

## ✨ Features

- **Modern API Framework:** Built with **FastAPI** for high performance and automatic interactive documentation.
- **Secure Authentication:** Implements robust password hashing (`bcrypt`) and JWT (JSON Web Token) based authentication for protected routes.
- **Data Validation:** Uses **Pydantic** schemas to ensure all incoming and outgoing data is valid and correctly structured, preventing common bugs and security vulnerabilities.
- **Relational Database:** Powered by **SQLAlchemy ORM** to interact with a SQLite database, providing a solid foundation for data persistence.
- **Clean Architecture:** The code is logically separated into modules for routing, database operations (`crud`), database models, and data schemas, following professional best practices.
- **CORS Enabled:** Correctly configured Cross-Origin Resource Sharing (CORS) to allow communication with the React frontend.

---

## 🛠️ Tech Stack

- **Framework:** FastAPI
- **Database:** SQLAlchemy ORM with SQLite
- **Authentication:** `python-jose` for JWTs and `passlib` with `bcrypt` for password hashing.
- **Data Validation:** Pydantic
- **Server:** Uvicorn (ASGI server)

---

## 🚀 How to Run Locally

To get the backend server running on your local machine, follow these steps.

1.  **Navigate to the backend directory:**

    ```bash
    cd path/to/your-repo/backend
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    # Create the environment
    python3 -m venv .venv

    # Activate it (macOS/Linux)
    source .venv/bin/activate

    # Activate it (Windows)
    .venv\\Scripts\\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the development server:**

    ```bash
    uvicorn main:app --reload
    ```

5.  The API will now be running at `http://127.0.0.1:8000`. You can access the interactive API documentation (provided by Swagger UI) at `http://127.0.0.1:8000/docs`.

> **Note:** When you run the server for the first time, it will automatically create a `job_tracker.db` SQLite database file in the `backend` directory.
