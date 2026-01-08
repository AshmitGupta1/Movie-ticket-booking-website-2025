import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { serve } from 'inngest/express';
import { inngest } from './inngest/client.js';
import { releaseSeats, sendConfirmationEmail, sendReminder } from './inngest/functions.js';

// Import routes
import showRoutes from './routes/showRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import clerkRoutes from './routes/clerkRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Webhook routes need raw body
app.use('/api/webhook', webhookRoutes);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/show', showRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/webhook/clerk', clerkRoutes);

// Inngest endpoint
app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions: [releaseSeats, sendConfirmationEmail, sendReminder],
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to QUICKSHOW API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
