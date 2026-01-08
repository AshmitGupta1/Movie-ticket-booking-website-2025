import React, { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

const Movies = () => {
  const navigate = useNavigate();
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

  const groupShowsByMovie = () => {
    const grouped = {};
    shows.forEach(show => {
      const movieId = show.movie._id;
      if (!grouped[movieId]) {
        grouped[movieId] = {
          movie: show.movie,
          shows: []
        };
      }
      grouped[movieId].shows.push(show);
    });
    return Object.values(grouped);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const groupedShows = groupShowsByMovie();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Now Showing</h1>

        {groupedShows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No shows available at the moment</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedShows.map(({ movie, shows }) => (
              <div key={movie._id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="md:flex">
                  {/* Movie Poster */}
                  <div className="md:w-48 h-64 md:h-auto flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Movie Info & Shows */}
                  <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">{movie.overview}</p>

                    {movie.genres && movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Show Times */}
                    <div>
                      <h3 className="font-semibold mb-3">Available Shows:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {shows
                          .sort((a, b) => new Date(a.showDateTime) - new Date(b.showDateTime))
                          .map((show) => (
                            <button
                              key={show._id}
                              onClick={() => navigate(`/seat-selection/${show._id}`)}
                              className="bg-gray-700 hover:bg-red-500 rounded-lg p-3 text-left transition"
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">
                                  {new Date(show.showDateTime).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">
                                  {new Date(show.showDateTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="text-lg font-bold text-red-400">
                                ${show.showPrice}
                              </p>
                            </button>
                          ))}
                      </div>
                    </div>
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

export default Movies;
