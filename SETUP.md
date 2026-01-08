# QUICKSHOW - Quick Setup Guide

This guide will help you get QUICKSHOW running on your local machine quickly.

## Prerequisites Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB installed (local) or MongoDB Atlas account
- [ ] Git installed

## API Keys & Accounts Needed

1. **Clerk** (Authentication) - [https://clerk.dev](https://clerk.dev)
   - Sign up for a free account
   - Create a new application
   - Get your Publishable Key and Secret Key
   
2. **TMDB** (Movie Database) - [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Create a free account
   - Request an API key (v3 auth)
   
3. **Stripe** (Payments) - [https://stripe.com](https://stripe.com)
   - Sign up for a free account
   - Get your test Secret Key from Dashboard
   
4. **Inngest** (Background Jobs) - [https://www.inngest.com](https://www.inngest.com)
   - Sign up for free account
   - Get your Event Key and Signing Key
   
5. **Brevo/Sendinblue** (Email Service) - [https://www.brevo.com](https://www.brevo.com)
   - Sign up for free account (300 emails/day free)
   - Get SMTP credentials

## Quick Start (5 minutes)

### 1. Clone and Install

```bash
git clone https://github.com/AshmitGupta1/Movie-ticket-booking-website-2025.git
cd Movie-ticket-booking-website-2025

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Server

Create `server/.env`:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your credentials:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickshow

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# TMDB
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=signkey-...

# Email (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_brevo_email
EMAIL_PASS=your_brevo_password
EMAIL_FROM=noreply@quickshow.com

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 3. Configure Client

Create `client/.env`:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### 4. Start MongoDB

If using local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas and update MONGODB_URI in server/.env

### 5. Start the Application

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

Visit: **http://localhost:5173**

## Initial Setup Steps

1. **Sign Up**: Click "Login" and create an account with Clerk
2. **Add a Show** (Admin):
   - Go to `/admin/add-show`
   - Search for a movie (e.g., "Inception")
   - Select the movie and set date/time/price
   - Click "Create Show"
3. **Book Tickets**:
   - Go to "Movies" page
   - Select a show time
   - Choose seats
   - Complete payment with Stripe test card: `4242 4242 4242 4242`

## Stripe Test Mode

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## Webhook Setup (For Production)

### Clerk Webhooks
1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook/clerk`
3. Subscribe to: `user.created`, `user.updated`
4. Copy signing secret to `.env`

### Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook/stripe`
3. Subscribe to: `checkout.session.completed`
4. Copy signing secret to `.env`

### Inngest (For Background Jobs)
1. Connect your deployed app to Inngest
2. Set up the endpoint: `https://your-domain.com/api/inngest`
3. Background jobs will run automatically

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in `.env`
- Try: `mongodb://127.0.0.1:27017/quickshow` instead of localhost

### Port Already in Use
- Change PORT in server/.env to something else (e.g., 5001)
- Update VITE_API_URL in client/.env accordingly

### CORS Issues
- Make sure FRONTEND_URL in server/.env matches your client URL
- Restart the server after changing environment variables

### Clerk Issues
- Make sure you're using the correct Publishable Key
- Check that your Clerk app is in "Development" mode for testing

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities (API client)
│   │   └── App.jsx      # Main app component
│   └── package.json
│
├── server/              # Node.js backend
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Custom middleware
│   ├── inngest/        # Background jobs
│   └── package.json
│
└── README.md           # Full documentation
```

## Next Steps

1. Explore the admin dashboard at `/admin`
2. Try booking tickets with the test Stripe card
3. Check your email for booking confirmations
4. Read the full README.md for deployment instructions

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Check environment variables are correctly set

## Tips

- Use Stripe test mode for development
- Background jobs require Inngest setup
- Emails require Brevo/Sendinblue SMTP credentials
- MongoDB must be running before starting the server
- Clear browser cache if you see stale data

Happy coding! 🎬🍿
