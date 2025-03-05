import api from './http-service';
import { Movie } from '../types/movie';

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular');

    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (movieId: string): Promise<Movie> => {
  try {
    const response = await api.get('/movie/' + movieId);

    return response.data;
  }
  catch (error) {
    console.error('Error fetching movie by id', error);
    throw error;
  }
};
