import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, Ticket, Users } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    paidBookings: 0,
    revenue: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes, showsRes] = await Promise.all([
        api.get('/booking/stats'),
        api.get('/booking'),
        api.get('/show'),
      ]);

      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setShows(showsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
              </div>
              <Ticket className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Paid Bookings</p>
                <p className="text-3xl font-bold">{stats.paidBookings}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">${stats.revenue}</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Movie</th>
                  <th className="text-left py-3 px-4">Show Time</th>
                  <th className="text-left py-3 px-4">Seats</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{booking.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4">{booking.show?.movie?.title || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {booking.show?.showDateTime 
                        ? new Date(booking.show.showDateTime).toLocaleString()
                        : 'N/A'
                      }
                    </td>
                    <td className="py-3 px-4">{booking.bookedSeats.join(', ')}</td>
                    <td className="py-3 px-4">${booking.amount}</td>
                    <td className="py-3 px-4">
                      {booking.isPaid ? (
                        <span className="px-2 py-1 bg-green-500 rounded-full text-xs">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Shows */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Active Shows</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shows.slice(0, 6).map((show) => (
              <div key={show._id} className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-bold mb-2">{show.movie?.title || 'N/A'}</h3>
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(show.showDateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  Price: ${show.showPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
