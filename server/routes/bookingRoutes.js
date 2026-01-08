import express from 'express';
import { bookingLimiter, apiLimiter } from '../middleware/rateLimiter.js';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingById,
  getStats,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/create', bookingLimiter, createBooking);
router.get('/user/:userId', apiLimiter, getUserBookings);
router.get('/', apiLimiter, getAllBookings);
router.get('/stats', apiLimiter, getStats);
router.get('/:id', apiLimiter, getBookingById);

export default router;
