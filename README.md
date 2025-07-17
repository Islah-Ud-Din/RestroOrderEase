# Restaurant Management System

This project is a custom software solution designed to help restaurants manage and grow their business efficiently. It provides tools for handling orders, managing inventory, tracking sales, and more.

## Features

- Order management
- Inventory tracking
- Sales analytics
- User authentication (Admin, Staff)
- Responsive client interface

## File Structure

```
restaurant-management-system/
├── client/         # Frontend React application
├── server/         # Backend Node.js/Express API
├── README.md
├── package.json
└── ...
```

## Setup Instructions

### Prerequisites

- Node.js & npm installed
- (Optional) MongoDB for database

### Server Setup

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables (see `.env.example`).
4. Start the server:
    ```bash
    npm start
    ```

### Client Setup

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the client:
    ```bash
    npm start
    ```

The client will run on `localhost:3000` and the server on `localhost:5000` by default.

## Contributing

Feel free to open issues or submit pull requests to improve the project!
