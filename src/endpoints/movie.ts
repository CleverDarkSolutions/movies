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

interface SearchParamsAdvanced {
  query: string;
  selectedGenre: string;
  releaseYear: number[];
  rating: number;
  sortBy: string;
}

export const searchMoviesAdvanced = async (params: SearchParamsAdvanced) => {
  const { query, selectedGenre, releaseYear, rating, sortBy } = params;

  const response = await api.get('/discover/movie', {
    params: {
      language: 'en-US',
      sort_by: sortBy,
      include_adult: false,
      include_video: false,
      page: 1,
      'vote_average.gte': rating,
      'primary_release_date.gte': `${releaseYear[0]}-01-01`,
      'primary_release_date.lte': `${releaseYear[1]}-12-31`,
      ...(selectedGenre ? { with_genres: selectedGenre } : {}),
      ...(query ? { query } : {}),
    },
  });

  return response.data.results;
};