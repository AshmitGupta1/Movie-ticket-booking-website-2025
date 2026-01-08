import React, { useEffect, useState } from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await api.get('/show');
      setShows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
      toast.error('Failed to load shows');
      setLoading(false);
    }
  };

  const handleDelete = async (showId) => {
    if (!window.confirm('Are you sure you want to delete this show?')) {
      return;
    }

    try {
      await api.delete(`/show/${showId}`);
      toast.success('Show deleted successfully');
      setShows(shows.filter(show => show._id !== showId));
    } catch (error) {
      console.error('Error deleting show:', error);
      toast.error(error.response?.data?.message || 'Failed to delete show');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Shows</h1>
          <Link
            to="/admin/add-show"
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Add New Show
          </Link>
        </div>

        {shows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No shows available</p>
            <Link
              to="/admin/add-show"
              className="inline-block bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
            >
              Add Your First Show
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6">Movie</th>
                    <th className="text-left py-4 px-6">Show Date</th>
                    <th className="text-left py-4 px-6">Show Time</th>
                    <th className="text-left py-4 px-6">Price</th>
                    <th className="text-left py-4 px-6">Occupied Seats</th>
                    <th className="text-left py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shows.map((show) => {
                    const occupiedSeatsCount = show.occupiedSeats 
                      ? Object.keys(show.occupiedSeats).length 
                      : 0;

                    return (
                      <tr key={show._id} className="border-t border-gray-700">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`https://image.tmdb.org/t/p/w92${show.movie.posterPath}`}
                              alt={show.movie.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-semibold">{show.movie.title}</p>
                              {show.movie.genres && show.movie.genres.length > 0 && (
                                <p className="text-xs text-gray-400">
                                  {show.movie.genres.slice(0, 2).join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(show.showDateTime).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {new Date(show.showDateTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-green-400">
                            ${show.showPrice}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-300">
                            {occupiedSeatsCount} / 100
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleDelete(show._id)}
                            className="text-red-500 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListShows;
