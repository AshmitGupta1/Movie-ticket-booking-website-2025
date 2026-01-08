import express from 'express';
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
router.get('/now-playing', getNowPlaying);
router.get('/search', searchMovies);
router.get('/movie/:id', getMovieDetails);

// Show routes
router.post('/', createShow);
router.get('/', getAllShows);
router.get('/:id', getShowById);
router.get('/movie/:movieId', getShowsByMovie);
router.delete('/:id', deleteShow);

export default router;
