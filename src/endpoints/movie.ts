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
