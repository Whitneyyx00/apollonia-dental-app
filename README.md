# Apollonia Dental Practice Management App

## Description

The Apollonia Dental Practice Management App is a web application designed to streamline and manage various aspects of a dental practice. It allows administrators to manage employees and departments efficiently, providing a user-friendly interface for common tasks.

## Features

- **Employee Management**:
  - Add new employees with details such as first name, last name, birth date, position, and department.
  - View a list of all employees, including their position and department.
  - Update employee information.
  - Delete employees.
- **Department Management**:
  - Add new departments with a name and description.
  - View a list of all departments and their descriptions.
  - Update department information.
  - Delete departments.

## Technologies Used

- **Backend**:
  - Node.js: JavaScript runtime environment
  - Express: Web application framework for Node.js
  - Mongoose: MongoDB object modeling tool
  - MongoDB: NoSQL database
- **Frontend**:
  - HTML: Markup language for creating web pages
  - CSS: Stylesheet language for describing the presentation of web pages
  - JavaScript: Programming language for creating interactive web effects

## Installation

1.  **Clone the Repository**:

    ```bash
    git clone [repository URL]
    cd [repository directory]
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Set up MongoDB**:

    -   Ensure you have MongoDB installed and running. You can download it from the [official MongoDB website](https://www.mongodb.com/try/download/community).
    -   Update the connection string in your `.env` file (or directly in `app.js`) to point to your MongoDB database.

    ```javascript
    mongoose.connect('mongodb://localhost:27017/dental_practice', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Could not connect to MongoDB', err));
    ```

4.  **Run the Application**:

    ```bash
    npm start
    ```

    This will start the server, and you can access the application in your web browser at `http://localhost:3000`.

## Configuration

-   **Environment Variables**:
    -   The application uses environment variables for configuration. Create a `.env` file in the root directory to set these variables.
    -   Example `.env` file:

        ```plaintext
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/dental_practice
        ```

## Usage

1.  **Access the Application**:
    -   Open your web browser and navigate to `http://localhost:3000`.
2.  **Adding Employees**:
    -   Fill in the employee form with the required details and submit.
3.  **Adding Departments**:
    -   Fill in the department form with the name and description and submit.
4.  **Viewing Lists**:
    -   The employee and department lists are displayed on the main page.
5.  **Updating Information**:
    -   Click the "Update" button next to the item you want to modify.
    -   The form will be populated with the existing data.
    -   Modify the data and submit the form.
6.  **Deleting Items**:
    -   Click the "Delete" button next to the item you want to remove.

## Project Structure

```plaintext
.
├── controllers/          # Contains route handler logic
├── models/               # Defines data models
├── routes/               # Defines API routes
├── views/                # Contains static files (HTML, CSS, JavaScript)
│   ├── style.css         # CSS stylesheet
│   ├── script.js         # JavaScript file for frontend logic
│   └── index.html        # Main HTML file
├── app.js                # Main application file
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── .env                  # Environment variables
