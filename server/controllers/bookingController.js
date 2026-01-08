import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import Stripe from 'stripe';
import { inngest } from '../inngest/client.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId, showId, bookedSeats } = req.body;

    // Validate input
    if (!userId || !showId || !bookedSeats || bookedSeats.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get show details
    const show = await Show.findById(showId).populate('movie');
    
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Check if seats are available
    const unavailableSeats = bookedSeats.filter(seat => show.occupiedSeats.get(seat));
    
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: 'Some seats are already booked',
        unavailableSeats,
      });
    }

    // Calculate amount
    const amount = bookedSeats.length * show.showPrice;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${show.movie.title} - Movie Ticket`,
              description: `Show Time: ${new Date(show.showDateTime).toLocaleString()}`,
            },
            unit_amount: Math.round(show.showPrice * 100), // Convert to cents
          },
          quantity: bookedSeats.length,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
      metadata: {
        userId,
        showId,
        bookedSeats: JSON.stringify(bookedSeats),
      },
    });

    // Create booking with payment pending
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount,
      bookedSeats,
      isPaid: false,
      paymentLink: session.url,
    });

    // Reserve seats temporarily
    bookedSeats.forEach(seat => {
      show.occupiedSeats.set(seat, true);
    });
    await show.save();

    // Trigger Inngest function to release seats after 10 minutes if unpaid
    await inngest.send({
      name: 'booking/created',
      data: {
        bookingId: booking._id.toString(),
      },
    });

    res.status(201).json({
      booking,
      paymentUrl: session.url,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user')
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate('user')
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Get stats (Admin)
export const getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const paidBookings = await Booking.countDocuments({ isPaid: true });
    
    const revenueResult = await Booking.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    
    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalBookings,
      paidBookings,
      revenue,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
