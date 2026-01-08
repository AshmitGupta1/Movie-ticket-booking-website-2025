import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

const AddShow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDateTime, setShowDateTime] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setSearching(true);
    try {
      const response = await api.get(`/show/search?query=${searchQuery}`);
      setSearchResults(response.data.results || []);
      setSearching(false);
    } catch (error) {
      console.error('Error searching movies:', error);
      toast.error('Failed to search movies');
      setSearching(false);
    }
  };

  const handleCreateShow = async (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      toast.error('Please select a movie');
      return;
    }

    if (!showDateTime || !showPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    setCreating(true);
    try {
      await api.post('/show', {
        movieId: selectedMovie.id,
        showDateTime,
        showPrice: parseFloat(showPrice),
      });

      toast.success('Show created successfully');
      
      // Reset form
      setSelectedMovie(null);
      setShowDateTime('');
      setShowPrice('');
      setSearchQuery('');
      setSearchResults([]);
      
      setCreating(false);
    } catch (error) {
      console.error('Error creating show:', error);
      toast.error(error.response?.data?.message || 'Failed to create show');
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Add New Show</h1>

        {/* Movie Search */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Movie</h2>
          
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter movie name..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{searching ? 'Searching...' : 'Search'}</span>
            </button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`cursor-pointer rounded-lg overflow-hidden transition ${
                    selectedMovie?.id === movie.id
                      ? 'ring-2 ring-red-500'
                      : 'hover:ring-2 hover:ring-gray-600'
                  }`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="bg-gray-700 p-2">
                    <p className="text-sm font-semibold truncate">{movie.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show Details Form */}
        {selectedMovie && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Show Details</h2>
            
            <div className="mb-4 p-4 bg-gray-700 rounded-lg">
              <p className="font-semibold">Selected Movie:</p>
              <p className="text-gray-300">{selectedMovie.title}</p>
            </div>

            <form onSubmit={handleCreateShow} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Show Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={showDateTime}
                  onChange={(e) => setShowDateTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Ticket Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>{creating ? 'Creating...' : 'Create Show'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddShow;
