import axios from 'axios';
import Show from '../models/Show.js';
import Movie from '../models/Movie.js';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Get now playing movies from TMDB
export const getNowPlaying = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

// Search movies from TMDB
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        query: query,
        page: 1,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Error searching movies', error: error.message });
  }
};

// Get movie details from TMDB
export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const [movieResponse, creditsResponse] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: { api_key: TMDB_API_KEY, language: 'en-US' },
      }),
      axios.get(`${TMDB_BASE_URL}/movie/${id}/credits`, {
        params: { api_key: TMDB_API_KEY, language: 'en-US' },
      }),
    ]);

    const movieData = movieResponse.data;
    const cast = creditsResponse.data.cast.slice(0, 10).map(actor => ({
      name: actor.name,
      character: actor.character,
      profilePath: actor.profile_path,
    }));

    res.json({
      ...movieData,
      cast,
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Error fetching movie details', error: error.message });
  }
};

// Create a new show
export const createShow = async (req, res) => {
  try {
    const { movieId, showDateTime, showPrice } = req.body;

    // Fetch movie details from TMDB
    const movieResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' },
    });

    const creditsResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' },
    });

    const movieData = movieResponse.data;
    const cast = creditsResponse.data.cast.slice(0, 10).map(actor => ({
      name: actor.name,
      character: actor.character,
      profilePath: actor.profile_path,
    }));

    // Create or update movie in database
    let movie = await Movie.findOne({ title: movieData.title });
    
    if (!movie) {
      movie = await Movie.create({
        title: movieData.title,
        overview: movieData.overview,
        posterPath: movieData.poster_path,
        backdropPath: movieData.backdrop_path,
        releaseDate: movieData.release_date,
        genres: movieData.genres.map(g => g.name),
        cast: cast,
        voteAverage: movieData.vote_average,
        runtime: movieData.runtime,
      });
    }

    // Create show
    const show = await Show.create({
      movie: movie._id,
      showDateTime: new Date(showDateTime),
      showPrice: showPrice,
      occupiedSeats: {},
    });

    const populatedShow = await Show.findById(show._id).populate('movie');

    res.status(201).json(populatedShow);
  } catch (error) {
    console.error('Error creating show:', error);
    res.status(500).json({ message: 'Error creating show', error: error.message });
  }
};

// Get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().populate('movie').sort({ showDateTime: 1 });
    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ message: 'Error fetching shows', error: error.message });
  }
};

// Get show by ID
export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findById(id).populate('movie');
    
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.json(show);
  } catch (error) {
    console.error('Error fetching show:', error);
    res.status(500).json({ message: 'Error fetching show', error: error.message });
  }
};

// Get shows by movie
export const getShowsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({ movie: movieId }).populate('movie').sort({ showDateTime: 1 });
    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ message: 'Error fetching shows', error: error.message });
  }
};

// Delete show
export const deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByIdAndDelete(id);
    
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error('Error deleting show:', error);
    res.status(500).json({ message: 'Error deleting show', error: error.message });
  }
};
