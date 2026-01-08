import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import { inngest } from '../inngest/client.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Extract metadata
      const { userId, showId, bookedSeats } = session.metadata;

      // Find and update the booking
      const booking = await Booking.findOne({
        user: userId,
        show: showId,
        bookedSeats: JSON.parse(bookedSeats),
        isPaid: false,
      }).populate({
        path: 'show',
        populate: { path: 'movie' },
      }).populate('user');

      if (booking) {
        booking.isPaid = true;
        await booking.save();

        // Send confirmation email via Inngest
        await inngest.send({
          name: 'payment/success',
          data: {
            booking: {
              _id: booking._id.toString(),
              amount: booking.amount,
              bookedSeats: booking.bookedSeats,
              show: {
                showDateTime: booking.show.showDateTime,
                movie: {
                  title: booking.show.movie.title,
                },
              },
            },
            user: {
              email: booking.user.email,
              name: booking.user.name,
            },
          },
        });
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ error: 'Webhook handler failed' });
    }
  }

  res.json({ received: true });
};
