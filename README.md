# cse341

🛒 E-Commerce API Server
This project is a RESTful API server built with Node.js, Express, and MongoDB. It includes user authentication via GitHub OAuth, auto-generated Swagger documentation, and separate route handlers for orders, products, reviews, and users.

🚀 Features
MongoDB integration using Mongoose
GitHub OAuth login with Passport.js
Swagger UI API documentation (/api-docs)
CORS enabled for all origins
Modular route structure
Session handling with express-session
.
├── routes/
│ ├── ecom_orders.js
│ ├── ecom_products.js
│ ├── ecom_reviews.js
│ ├── ecom_users.js
│ └── index.js
├── middlewares/
│ └── auth.js
├── .env
├── server.js
├── swagger.js
└── README.md

📦 Installation
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
npm install

▶️ Running the Server
🧪 Development mode (with auto-restart using nodemon):
bash
Copy
Edit
npx nodemon server.js

🔑 GitHub OAuth Login
Go to: GitHub Developer Settings

Create a new OAuth App with:

Authorization callback URL: http://localhost:3000/github/callback

Copy the Client ID and Client Secret into your .env.

To test:

Visit: http://localhost:3000/github

After login, you'll be redirected to /dashboard

📘 API Documentation
Once the server is running, open:
👉 http://localhost:3000/api-docs

📄 License
This project is licensed under the MIT License.
