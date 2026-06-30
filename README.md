<div align="center">

# ⚡ TrackKart

### Intelligent E-Commerce Price Tracking Platform

Track product prices across multiple online stores, monitor price changes automatically, and receive instant email alerts when your target price is reached.

---

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)

</div>

---

## 📖 About

TrackKart is a modern SaaS-based price monitoring platform that automatically tracks product prices across multiple e-commerce websites. Users can set a target price for any supported product and receive instant email notifications when the product reaches or falls below the desired price.

The application eliminates the need for manually checking product prices and provides users with an organized dashboard to manage tracked products, monitor price history, and analyze savings.

---

# ✨ Features

### 🔐 Authentication
- Secure JWT Authentication
- User Registration & Login
- Protected Routes
- Password Encryption

### 📦 Product Tracking
- Add products using product URLs
- Automatic product extraction
- Live price monitoring
- Target price configuration
- Product editing & deletion

### 📊 Dashboard
- Beautiful SaaS dashboard
- Real-time statistics
- Product management
- Search & filtering
- Activity feed

### 📈 Analytics
- Interactive price history charts
- Historical price tracking
- Savings calculations
- Price trend visualization

### 📧 Email Alerts
- Automatic email notifications
- Target price alerts
- Smart alert management
- Duplicate alert prevention

### ⚙ Background Tracking
- Scheduled background jobs
- Automatic price updates
- Price history recording
- Continuous monitoring

---

# 🛒 Supported Stores

| Store | Status |
|--------|--------|
| Amazon | ✅ Supported |
| Flipkart | ✅ Supported |
| Myntra | 🚧 Coming Soon |
| AJIO | 🚧 Coming Soon |
| Croma | 🚧 Coming Soon |
| Reliance Digital | 🚧 Coming Soon |

---

# 🏗 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Chart.js
- React ChartJS 2
- Axios
- Lucide React
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Node Cron
- Nodemailer
- Axios

---

## Database

- Supabase (PostgreSQL)

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Supabase

---

# 🏛 System Architecture

```
                User
                  │
                  ▼
          React + Vite Frontend
                  │
             REST API (Axios)
                  │
                  ▼
          Express.js Backend
                  │
     ┌────────────┼────────────┐
     ▼            ▼            ▼
 Product     Authentication   Email
 Scraper        (JWT)         Service
     │
     ▼
 Supabase Database
     │
     ▼
 Node Cron Scheduler
     │
     ▼
 Automatic Price Updates
```

---

# 📂 Project Structure

```
TrackKart
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── scraper
│   ├── services
│   ├── jobs
│   └── utils
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/TrackKart.git

cd TrackKart
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npm start
```

---

# 🔑 Environment Variables

## Client

```env
VITE_API_URL=YOUR_BACKEND_URL
```

---

## Server

```env
SUPABASE_URL=
SUPABASE_KEY=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASS=

CLIENT_URL=
```

---

# 📸 Screenshots

### Landing Page

```
![Landing](assets/screenshots/landingpage.png)
```

### Dashboard

```
![Dashboard](assets/screenshots/dashboard.png)
```

### Price Analytics

```
![Price Analytics](assets/screenshots/priceanalytics.png)
```

### Add Product

```
![Add Product](assets/screenshots/addproduct.png)
```

### Login Page

```
![Login Page](assets/screenshots/login.png)
```
---

# 💡 Future Improvements

- Browser Extension
- Telegram Alerts
- WhatsApp Notifications
- AI Price Prediction
- Wishlist
- Dark / Light Theme
- Mobile Application
- Multi-Currency Support
- More E-Commerce Stores

---

# 📈 Why TrackKart?

✔ Saves money automatically

✔ Eliminates manual price checking

✔ Clean SaaS interface

✔ Real-time monitoring

✔ Email notifications

✔ Interactive analytics

✔ Secure authentication

✔ Responsive design

---

# 👨‍💻 Author

**Abhishek Singh**

Computer Science Engineer

GitHub:
https://github.com/Abhishek2106-ai

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps the project reach more developers and motivates future improvements.

---

<div align="center">

### Built with ❤️ by Abhishek Singh

</div>
