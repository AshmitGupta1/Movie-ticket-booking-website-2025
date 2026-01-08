import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  posterPath: {
    type: String,
  },
  backdropPath: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  genres: [{
    type: String,
  }],
  cast: [{
    name: String,
    character: String,
    profilePath: String,
  }],
  voteAverage: {
    type: Number,
  },
  runtime: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
