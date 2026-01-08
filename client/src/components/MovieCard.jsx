import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path || movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link
      to={`/movie/${movie.id || movie._id}`}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            {(movie.vote_average || movie.voteAverage) && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{(movie.vote_average || movie.voteAverage).toFixed(1)}</span>
              </div>
            )}
            
            {(movie.release_date || movie.releaseDate) && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date || movie.releaseDate).getFullYear()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
