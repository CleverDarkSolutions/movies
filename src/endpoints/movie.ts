import api from './http-service';
import { Movie } from '../types/movie';
import { filterMovies } from '../utils/functions';

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular');

    return filterMovies(response.data.results);
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

export const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await api.get('/genre/movie/list');

    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);

    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await api.get('/search/movie', {
      params: { query: query },
    });

    return filterMovies(response.data.results);
  }
  catch (error) {
    console.error('Error fetching genres:', error);

    return [];
  }
};
