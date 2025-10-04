Expense Management System API
A RESTful API for an Expense Management System built with Flask and MongoDB. This project was developed for an 8-hour hackathon to demonstrate a streamlined process for expense submission and approval within a company.
✨ Core Features
JWT Authentication: Secure endpoints using JSON Web Tokens for user authentication and authorization.
Dynamic Company Creation: Automatically creates a new company and an admin user on the first signup, fetching the appropriate currency based on the selected country.
Role-Based Access Control: Pre-defined roles for Admin, Manager, and Employee with distinct permissions.
User Management: Admins can create new employees and managers within their company.
Expense Submission: Employees can submit expense claims.
Approval Workflow: Managers can view, approve, or reject pending expense claims submitted by their team members.
💻 Tech Stack
Backend: Python
Framework: Flask
Database: MongoDB
ODM: PyMongo
Authentication: Flask-JWT-Extended
Password Hashing: Flask-Bcrypt
External APIs: REST Countries API for currency data.
🚀 Getting Started
Follow these instructions to get the project up and running on your local machine.
Prerequisites
Python 3.8+
MongoDB installed and running on your local machine.
A virtual environment tool (like venv).
Installation & Setup
Clone the repository:
git clone <your-repository-url>
cd <repository-folder>
