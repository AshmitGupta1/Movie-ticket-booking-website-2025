# QUICKSHOW - Movie Ticket Booking Application

A full-stack movie ticket booking application built with the MERN stack (MongoDB, Express, React, Node.js), featuring seat reservation, online payments via Stripe, and automated email notifications.

## 🎬 Features

- **User Authentication**: Secure authentication using Clerk
- **Movie Browsing**: Browse movies fetched from TMDB API
- **Seat Selection**: Interactive seat selection with real-time availability
- **Payment Processing**: Secure payment integration with Stripe
- **Booking Management**: View and manage your bookings
- **Admin Dashboard**: Comprehensive admin panel with statistics and management tools
- **Background Jobs**: Automated email notifications and seat release using Inngest
- **Email Notifications**: Booking confirmations and show reminders via Nodemailer

## 🛠️ Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Clerk React** for authentication
- **Axios** for API calls
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Stripe** for payment processing
- **Clerk Express** for authentication
- **Inngest** for background jobs
- **Nodemailer** for email notifications
- **TMDB API** for movie data

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

You'll also need accounts and API keys for:
- [Clerk](https://clerk.dev/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [TMDB](https://www.themoviedb.org/settings/api) - Movie database
- [Inngest](https://www.inngest.com/) - Background jobs
- [Brevo/Sendinblue](https://www.brevo.com/) - Email service

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/AshmitGupta1/Movie-ticket-booking-website-2025.git
cd Movie-ticket-booking-website-2025
```

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

# Clerk
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# TMDB
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Nodemailer (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_brevo_email
EMAIL_PASS=your_brevo_password
EMAIL_FROM=noreply@quickshow.com

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 3. Client Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🏃 Running the Application

### Start the Server
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

### Start the Client
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`

## 📁 Project Structure

```
Movie-ticket-booking-website-2025/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── lib/           # Utility functions
│   │   └── assets/        # Static assets
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── inngest/           # Background jobs
│   └── package.json
│
└── README.md
```

## 🔑 Key Features Explained

### Seat Reservation System
- Seats are temporarily reserved for 10 minutes when a booking is created
- If payment is not completed within 10 minutes, seats are automatically released
- Real-time seat availability checking

### Payment Flow
1. User selects seats and proceeds to checkout
2. Stripe checkout session is created
3. User completes payment on Stripe
4. Webhook confirms payment and updates booking status
5. Confirmation email is sent automatically

### Background Jobs (Inngest)
- **Release Seats**: Automatically releases unpaid bookings after 10 minutes
- **Send Confirmation**: Sends booking confirmation emails after successful payment
- **Send Reminder**: Sends show reminders 8 hours before showtime (cron job)

### Admin Features
- View booking statistics and revenue
- Add new shows by searching TMDB movies
- Manage shows and bookings
- View user bookings

## 🔧 API Endpoints

### Shows
- `GET /api/show/now-playing` - Get now playing movies from TMDB
- `GET /api/show/search?query=` - Search movies
- `GET /api/show/movie/:id` - Get movie details
- `POST /api/show` - Create a new show (Admin)
- `GET /api/show` - Get all shows
- `GET /api/show/:id` - Get show by ID
- `DELETE /api/show/:id` - Delete show (Admin)

### Bookings
- `POST /api/booking/create` - Create a new booking
- `GET /api/booking/user/:userId` - Get user bookings
- `GET /api/booking` - Get all bookings (Admin)
- `GET /api/booking/stats` - Get booking statistics (Admin)
- `GET /api/booking/:id` - Get booking by ID

### Webhooks
- `POST /api/webhook/stripe` - Stripe payment webhook
- `POST /api/webhook/clerk` - Clerk authentication webhook

## 🎨 UI Components

- **Navbar**: Logo, search bar, navigation links, and authentication
- **MovieCard**: Movie poster with hover effects showing details
- **Homepage**: Hero banner with trending movie and grid of now showing movies
- **MovieDetails**: Full movie information with cast and show times
- **SeatSelection**: Interactive seat grid (A-J rows, 10 seats per row)
- **MyBookings**: List of user bookings with payment status
- **AdminDashboard**: Statistics cards and data tables

## 🔒 Security Features

- Environment variables for sensitive data
- Webhook signature verification (Stripe & Clerk)
- Authentication middleware using Clerk
- Input validation and sanitization

## 🚀 Deployment

### Server Deployment (e.g., Railway, Render, Heroku)
1. Set up environment variables
2. Update MongoDB connection string
3. Configure webhook URLs for Stripe and Clerk
4. Deploy the server

### Client Deployment (e.g., Vercel, Netlify)
1. Set up environment variables
2. Update API URL to point to deployed server
3. Build and deploy

## 📝 Environment Variables Summary

### Server
- `MONGODB_URI`: MongoDB connection string
- `CLERK_*`: Clerk authentication keys
- `TMDB_API_KEY`: TMDB API key
- `STRIPE_*`: Stripe payment keys
- `INNGEST_*`: Inngest background job keys
- `EMAIL_*`: Email service credentials
- `FRONTEND_URL`: Client application URL

### Client
- `VITE_API_URL`: Backend API URL
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- College Project by AshmitGupta1

## 🙏 Acknowledgments

- TMDB for movie data and posters
- Clerk for authentication
- Stripe for payment processing
- Inngest for background jobs
- Tailwind CSS for styling

