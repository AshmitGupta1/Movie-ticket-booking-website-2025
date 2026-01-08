import { inngest } from './client.js';
import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import nodemailer from 'nodemailer';

// Release seats for unpaid bookings after 10 minutes
export const releaseSeats = inngest.createFunction(
  { id: 'release-seats' },
  { event: 'booking/created' },
  async ({ event, step }) => {
    const bookingId = event.data.bookingId;

    // Wait for 10 minutes
    await step.sleep('wait-10-minutes', '10m');

    // Check if booking is still unpaid
    const booking = await step.run('check-booking-status', async () => {
      return await Booking.findById(bookingId).populate('show');
    });

    if (!booking || booking.isPaid) {
      return { message: 'Booking already paid or not found' };
    }

    // Delete booking and release seats
    await step.run('release-seats', async () => {
      const show = await Show.findById(booking.show._id);
      
      // Remove occupied seats
      booking.bookedSeats.forEach(seat => {
        show.occupiedSeats.delete(seat);
      });
      
      await show.save();
      await Booking.findByIdAndDelete(bookingId);
      
      return { message: 'Seats released and booking deleted' };
    });
  }
);

// Send confirmation email after successful payment
export const sendConfirmationEmail = inngest.createFunction(
  { id: 'send-confirmation-email' },
  { event: 'payment/success' },
  async ({ event, step }) => {
    const { booking, user } = event.data;

    await step.run('send-email', async () => {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'QUICKSHOW - Booking Confirmation',
        html: `
          <h1>Booking Confirmed!</h1>
          <p>Dear ${user.name},</p>
          <p>Your booking has been confirmed.</p>
          <p><strong>Booking Details:</strong></p>
          <ul>
            <li>Movie: ${booking.show.movie.title}</li>
            <li>Show Time: ${new Date(booking.show.showDateTime).toLocaleString()}</li>
            <li>Seats: ${booking.bookedSeats.join(', ')}</li>
            <li>Amount Paid: $${booking.amount}</li>
          </ul>
          <p>Thank you for choosing QUICKSHOW!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { message: 'Confirmation email sent' };
    });
  }
);

// Send reminder 8 hours before show
export const sendReminder = inngest.createFunction(
  { id: 'send-reminder' },
  { cron: '0 * * * *' }, // Run every hour
  async ({ step }) => {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 8 * 60 * 60 * 1000); // 8 hours from now

    // Find bookings with shows in 8 hours
    const bookings = await step.run('find-bookings', async () => {
      return await Booking.find({
        isPaid: true,
      })
        .populate({
          path: 'show',
          populate: { path: 'movie' },
        })
        .populate('user');
    });

    // Filter bookings that need reminders
    const bookingsToRemind = bookings.filter(booking => {
      const showTime = new Date(booking.show.showDateTime);
      const timeDiff = showTime - now;
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      return hoursDiff > 7.5 && hoursDiff <= 8.5;
    });

    // Send reminders
    for (const booking of bookingsToRemind) {
      await step.run(`send-reminder-${booking._id}`, async () => {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: booking.user.email,
          subject: 'QUICKSHOW - Show Reminder',
          html: `
            <h1>Show Reminder</h1>
            <p>Dear ${booking.user.name},</p>
            <p>This is a reminder that your show starts in approximately 8 hours.</p>
            <p><strong>Show Details:</strong></p>
            <ul>
              <li>Movie: ${booking.show.movie.title}</li>
              <li>Show Time: ${new Date(booking.show.showDateTime).toLocaleString()}</li>
              <li>Seats: ${booking.bookedSeats.join(', ')}</li>
            </ul>
            <p>See you at the cinema!</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      });
    }

    return { message: `Sent ${bookingsToRemind.length} reminders` };
  }
);
