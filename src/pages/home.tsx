import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { Container, Typography } from '@mui/material';
import { fetchPopularMovies } from '../endpoints/movie';
import MovieListContainer from '../components/features/movie-list/movie-list-container';
import SearchForm from '../components/features/search/search-form';
import BaseWrapper from '../utils/base-wrapper';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headerLabel, setHeaderLabel] = useState<string>('Popular movies');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchPopularMovies();
        setMovies(movieData);
        setHeaderLabel('Popular movies');
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);
  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

  return (
    <BaseWrapper>
      <Container>
        <SearchForm movies={movies} setMovies={setMovies} setLoading={setLoading} setHeaderLabel={setHeaderLabel}/>
        <Typography variant="h4" textAlign="center" my={3}>
          {headerLabel}
        </Typography>
        <MovieListContainer movies={movies} loading={loading}/>
      </Container>
    </BaseWrapper>
  );
};

export default HomePage;
