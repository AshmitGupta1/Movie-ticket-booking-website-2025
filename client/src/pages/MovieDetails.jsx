import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      // Fetch movie details from TMDB
      const movieResponse = await api.get(`/show/movie/${id}`);
      setMovie(movieResponse.data);
      
      // Fetch shows for this movie
      try {
        const showsResponse = await api.get(`/show/by-movie/${id}`);
        setShows(showsResponse.data);
      } catch (error) {
        console.log('No shows available for this movie yet');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      toast.error('Failed to load movie details');
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

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path || movie.backdropPath
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.backdropPath}`
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Banner */}
      {backdropUrl && (
        <div className="relative h-[400px] w-full">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.posterPath}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-6 mb-6 text-gray-300">
              {(movie.vote_average || movie.voteAverage) && (
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">
                    {(movie.vote_average || movie.voteAverage).toFixed(1)}
                  </span>
                </div>
              )}
              
              {movie.runtime && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              
              {(movie.release_date || movie.releaseDate) && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.release_date || movie.releaseDate).getFullYear()}</span>
                </div>
              )}
            </div>

            {(movie.genres && movie.genres.length > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {typeof genre === 'string' ? genre : genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="flex-shrink-0 text-center">
                      <img
                        src={
                          actor.profile_path || actor.profilePath
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path || actor.profilePath}`
                            : 'https://via.placeholder.com/185x278?text=No+Image'
                        }
                        alt={actor.name}
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm font-semibold">{actor.name}</p>
                      <p className="text-xs text-gray-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show Times */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Select Show Time</h2>
              {shows.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {shows.map((show) => (
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
              ) : (
                <p className="text-gray-400 mb-4">
                  Shows will be available once added by the admin
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
