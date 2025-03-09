import { Movie } from '../types/movie';

export const filterMovies = (movies: Movie[]): Movie[] => {
  return movies.filter((movie) =>
    movie.vote_count !== 0 && movie.poster_path !== null && movie.vote_average !== 0,
  );
};
