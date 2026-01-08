import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Calendar, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

const MyBookings = () => {
  const { user, isSignedIn } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchBookings();
    }
  }, [isSignedIn, user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/booking/user/${user.id}`);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your bookings</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">You haven't made any bookings yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="md:flex">
                  {/* Movie Poster */}
                  <div className="md:w-48 h-64 md:h-auto">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${booking.show.movie.posterPath}`}
                      alt={booking.show.movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {booking.show.movie.title}
                        </h2>
                        
                        <div className="flex items-center space-x-4 text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(booking.show.showDateTime).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-300">
                            <span className="font-semibold">Seats: </span>
                            {booking.bookedSeats.join(', ')}
                          </p>
                          <p className="text-gray-300">
                            <span className="font-semibold">Amount: </span>
                            ${booking.amount}
                          </p>
                        </div>
                      </div>

                      {/* Payment Status */}
                      <div className="text-right">
                        {booking.isPaid ? (
                          <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full font-semibold">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pay Now Button */}
                    {!booking.isPaid && booking.paymentLink && (
                      <div className="mt-4">
                        <a
                          href={booking.paymentLink}
                          className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Pay Now</span>
                        </a>
                        <p className="text-xs text-gray-400 mt-2">
                          Payment link expires in 10 minutes
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
