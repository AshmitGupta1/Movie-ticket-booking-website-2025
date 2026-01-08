import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingById,
  getStats,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/create', createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/', getAllBookings);
router.get('/stats', getStats);
router.get('/:id', getBookingById);

export default router;
