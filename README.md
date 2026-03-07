# MERN Food Ordering Application – Setup Steps

This project is a **MERN Stack Food Ordering Web Application** that includes a **Frontend (User Website), Admin Panel, and Backend Server**. Follow the steps below to run the project locally.

### Step 1: Clone the Repository

First, clone the project from GitHub and navigate into the project folder.

```
git clone <repository-link>
cd project-folder
```

### Step 2: Install Dependencies

Install the required packages for **frontend, backend, and admin**.

```
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

### Step 3: Run Backend Server

Navigate to the backend folder and start the Node.js server.

```
cd backend
node server.js
```

The backend server will run on:

```
http://localhost:4000
```

### Step 4: Run Frontend (User Website)

Open another terminal and run the frontend application.

```
cd frontend
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

### Step 5: Run Admin Panel

Open another terminal and run the admin panel.

```
cd admin
npm run dev
```

The admin panel will run on:

```
http://localhost:5174
```

### Step 6: Access the Application

* Users can browse foods, add items to cart, checkout, and track orders through the **frontend website**.
* Admin can login to the **admin panel** to upload foods, view orders, and update order status.

### Step 7: Application Features

* JWT Authentication (Login & Logout)
* Food listing with category filtering
* Add to cart and checkout system
* Stripe sandbox payment integration
* Order tracking for users
* Admin dashboard for managing foods and orders

This project demonstrates a **complete MERN stack food ordering system with authentication, payment integration, and admin management features**.
