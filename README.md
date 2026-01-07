🧩 Project Overview

This project is a monorepo-style setup with separate frontend and backend folders.

✨ Key Highlights

Dynamic labels editable from the UI and persisted in MongoDB

Shared labels reused across Dashboard and Analytics (update once, reflect everywhere)

Sidebar navigation fully driven by backend data

All charts and tables populated from backend APIs

Warning dialog when editing labels used in multiple places

Reusable chart, table, and summary card components

Clean separation of concerns between frontend and backend

🏗️ Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Shadcn UI

Axios

Zustand (label state management)

Location: Frontend/sales-dashboard

Backend

Node.js (ESM)

Express

MongoDB with Mongoose

dotenv, cors, nodemon

Location: Backend

📁 Project Structure

├── Backend
│   ├── server.js
│   ├── .env
│   └── src
│       ├── config
│       │   └── databaseConfig.js
│       ├── models
│       │   ├── labelModel.js
│       │   ├── tableDataModel.js
│       │   ├── navigationModel.js
│       │   └── ordersModel.js
│       ├── controllers
│       │   ├── labelController.js
│       │   ├── tableController.js
│       │   ├── navigationController.js
│       │   └── orderController.js
│       ├── routes
│       │   ├── labelRoute.js
│       │   ├── tableRoute.js
│       │   ├── navigationRoute.js
│       │   └── orderRoute.js
│       ├── common
│       │   ├── statusCode.js
│       │   ├── errorMessages.js
│       │   └── successMessage.js
│       └── scripts
│           └── seedDemoData.js
│
└── Frontend
    └── sales-dashboard
        └── src
            ├── app
            │   ├── layout.tsx
            │   ├── page.tsx
            │   └── analytics
            │       └── page.tsx
            ├── components
            │   ├── common
            │   │   ├── SummaryCard.tsx
            │   │   ├── BaseChart.tsx
            │   │   ├── BaseTable.tsx
            │   │   ├── LabelWithEdit.tsx
            │   │   └── EditLabelModal.tsx
            │   └── ui
            │       ├── button.tsx
            │       ├── card.tsx
            │       ├── dialog.tsx
            │       ├── input.tsx
            │       └── table.tsx
            ├── lib
            │   ├── axiosConfig.ts
            │   ├── labelStore.ts
            │   └── utils.ts
            ├── services
            │   ├── navigationService.ts
            │   ├── labelService.ts
            │   └── tableService.ts
            └── routes
                └── navRoutes.ts
🗄️ Backend Details
Environment Variables (Backend/.env)
MONGO_URL=mongodb://localhost:27017/sales-dashboard
PORT=5000
FRONTEND_URL=http://localhost:3000

🌱 Seed Data

npm run seed populates:

Navigation

/ → Dashboard

/analytics → Analytics

Labels

Dashboard summary (totalRevenue, totalOrders, totalCustomers)

Charts (revenueByMonth, ordersByCategory)

Tables (recentOrders, orderId, customer, amount, status)

Analytics summary (totalVisits, activeUsers, conversionRate)

Analytics table labels (topPages, pageName, views, avgTime, bounceRate)

Tables

dashboard_summary

analytics_summary

revenue_by_month

orders_by_category

orders

analytics_top_pages

Seeding is idempotent (upsert by key, tableName, nav).

🔌 API Endpoints

Base URL: http://localhost:5000/api

Labels

GET /labels

POST /labels/add

PUT /labels/update

Tables

GET /tables/:tableName

POST /tables/add

PUT /tables/update

Navigation

GET /navigation/nav

🎨 Frontend Details
Environment Variables (Frontend/sales-dashboard/.env.local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

State Management

Zustand for labels and edit modal state

Global label hydration on page load

Immediate UI updates after successful backend update

📄 Pages
Dashboard (/)

Sidebar navigation

Summary cards

Revenue line chart

Orders-by-category bar chart

Recent orders table

Analytics (/analytics)

Same sidebar

Analytics summary cards

Reused charts and tables

Shared labels with Dashboard

🚀 Installation & Run
1️⃣ Backend
cd Backend
npm install
npm run seed
npm start


Server runs on: http://localhost:5000

2️⃣ Frontend
cd Frontend/sales-dashboard
npm install
npm run dev


App runs on:

Dashboard → http://localhost:3000

Analytics → http://localhost:3000/analytics
