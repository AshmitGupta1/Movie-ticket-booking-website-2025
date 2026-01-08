import React, { useEffect, useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/booking');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold mb-8">All Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6">User</th>
                    <th className="text-left py-4 px-6">Movie</th>
                    <th className="text-left py-4 px-6">Show Date</th>
                    <th className="text-left py-4 px-6">Show Time</th>
                    <th className="text-left py-4 px-6">Seats</th>
                    <th className="text-left py-4 px-6">Amount</th>
                    <th className="text-left py-4 px-6">Status</th>
                    <th className="text-left py-4 px-6">Booked On</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-t border-gray-700">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold">
                            {booking.user?.name || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {booking.user?.email || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {booking.show?.movie?.posterPath && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${booking.show.movie.posterPath}`}
                              alt={booking.show.movie.title}
                              className="w-10 h-14 object-cover rounded"
                            />
                          )}
                          <span className="font-semibold">
                            {booking.show?.movie?.title || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {booking.show?.showDateTime
                              ? new Date(booking.show.showDateTime).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {booking.show?.showDateTime
                              ? new Date(booking.show.showDateTime).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">
                          {booking.bookedSeats.join(', ')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-green-400">
                          ${booking.amount}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {booking.isPaid ? (
                          <div className="flex items-center space-x-2 text-green-500">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Paid</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-yellow-500">
                            <XCircle className="w-5 h-5" />
                            <span className="font-semibold">Pending</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-400 text-sm">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBookings;
