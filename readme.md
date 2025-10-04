# **Expense Management System API**

A RESTful API for an Expense Management System built with Flask and MongoDB. This project was developed for an 8-hour hackathon to demonstrate a streamlined process for expense submission and approval within a company.

## **✨ Core Features**

* **JWT Authentication**: Secure endpoints using JSON Web Tokens for user authentication and authorization.  
* **Dynamic Company Creation**: Automatically creates a new company and an admin user on the first signup, fetching the appropriate currency based on the selected country.  
* **Role-Based Access Control**: Pre-defined roles for **Admin**, **Manager**, and **Employee** with distinct permissions.  
* **User Management**: Admins can create new employees and managers within their company.  
* **Expense Submission**: Employees can submit expense claims.  
* **Approval Workflow**: Managers can view, approve, or reject pending expense claims submitted by their team members.

## **💻 Tech Stack**

* **Backend**: Python  
* **Framework**: Flask  
* **Database**: MongoDB  
* **ODM**: PyMongo  
* **Authentication**: Flask-JWT-Extended  
* **Password Hashing**: Flask-Bcrypt  
* **External APIs**: [REST Countries API](https://restcountries.com/) for currency data.

## **🚀 Getting Started**

Follow these instructions to get the project up and running on your local machine.

### **Prerequisites**

* Python 3.8+  
* MongoDB installed and running on your local machine.  
* A virtual environment tool (like venv).

### **Installation & Setup**

1. **Clone the repository:**  
   git clone \<your-repository-url\>  
   cd \<repository-folder\>

2. **Create and activate a virtual environment:**  
   \# For macOS/Linux  
   python3 \-m venv venv  
   source venv/bin/activate

   \# For Windows  
   python \-m venv venv  
   venv\\Scripts\\activate

3. **Install the dependencies:**  
   pip install \-r requirements.txt

4. Set up environment variables:  
   Create a file named .env in the root of your project and add the following, replacing the placeholder values:  
   MONGO\_URI="mongodb://localhost:27017/expense\_db"  
   JWT\_SECRET\_KEY="your-super-secret-key-that-is-long-and-random"

5. **Run the application:**  
   python app.py

   The server will start on http://127.0.0.1:5000.

## **API Endpoints**

You can use a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API.

### **Authentication (/api/auth)**

| Method | Endpoint | Description | Body (JSON) |
| :---- | :---- | :---- | :---- |
| POST | /signup | Creates a new Company and an Admin user. | {"email", "password", "name", "company\_name", "country"} |
| POST | /login | Logs in a user and returns a JWT access token. | {"email", "password"} |
| GET | /me | **(Protected)** Gets the details of the current logged-in user. | *None* |

### **Admin (/api/admin)**

*Note: These endpoints require an **Admin** user's JWT.*

| Method | Endpoint | Description | Body (JSON) |
| :---- | :---- | :---- | :---- |
| POST | /users | Creates a new Employee or Manager in the company. | {"email", "password", "name", "role", "manager\_email" (optional)} |
| GET | /users | Gets a list of all users within the admin's company. | *None* |

### **Expenses (/api)**

| Method | Endpoint | Description | Body (JSON) |
| :---- | :---- | :---- | :---- |
| POST | /expenses | **(Employee)** Submits a new expense claim. | {"amount", "currency", "category", "description"} |
| GET | /expenses | **(Employee)** Retrieves the expense history for the logged-in user. | *None* |
| GET | /manager/pending-expenses | **(Manager)** Gets all expenses pending the manager's approval. | *None* |
| POST | /manager/expenses/\<expense\_id\>/action | **(Manager)** Approves or rejects a specific expense claim. | {"action": "approve" or "reject", "comment"} |

## **Demo Workflow**

To test the end-to-end functionality:

1. **Sign Up:** Create the first user (Admin) and the Company via the /api/auth/signup endpoint. Save the returned access\_token.  
2. **Create Users:** Using the Admin's token, create a Manager and an Employee via the /api/admin/users endpoint. Remember to link the Employee to the Manager via the manager\_email field.  
3. **Submit Expense:** Log in as the Employee to get their token. Use this token to submit a new expense via /api/expenses.  
4. **Approve Expense:** Log in as the Manager to get their token. Use this token to first view pending expenses at /api/manager/pending-expenses and then approve or reject one using its ID at /api/manager/expenses/\<expense\_id\>/action.  
5. **Check Status:** Log in again as the Employee and view their expense history at /api/expenses to see the updated status.