import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import api from '../lib/api';
import toast from 'react-hot-toast';

const Homepage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // Fetch from TMDB API through backend
      const response = await api.get('/show/now-playing');
      setTrendingMovies(response.data.results.slice(0, 1)); // Hero banner
      setNowShowingMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to load movies');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Banner */}
      {trendingMovies.length > 0 && (
        <div className="relative h-[600px] w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}`}
            alt={trendingMovies[0].title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {trendingMovies[0].title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-300">
                {trendingMovies[0].overview}
              </p>
              <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-semibold transition">
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Now Showing Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Now Showing</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {nowShowingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
