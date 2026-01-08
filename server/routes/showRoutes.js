import express from 'express';
import { apiLimiter } from '../middleware/rateLimiter.js';
import {
  getNowPlaying,
  searchMovies,
  getMovieDetails,
  createShow,
  getAllShows,
  getShowById,
  getShowsByMovie,
  deleteShow,
} from '../controllers/showController.js';

const router = express.Router();

// TMDB routes
router.get('/now-playing', apiLimiter, getNowPlaying);
router.get('/search', apiLimiter, searchMovies);
router.get('/movie/:id', apiLimiter, getMovieDetails);

// Show routes
router.post('/', createShow);
router.get('/', apiLimiter, getAllShows);
router.get('/by-movie/:movieId', apiLimiter, getShowsByMovie);
router.get('/:id', apiLimiter, getShowById);
router.delete('/:id', deleteShow);

export default router;
