import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { Container, CircularProgress, Typography } from '@mui/material';
import { fetchPopularMovies } from '../endpoints/movie';
import MovieListContainer from '../components/features/movie-list/movie-list-container';
import SearchForm from '../components/features/search/search-form';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchPopularMovies();
        setMovies(movieData);
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

  return (
    <Container>
      <SearchForm movies={movies} setMovies={setMovies} setLoading={setLoading}/>
      <Typography variant="h4" textAlign="center" my={3}>
                Popular Movies
      </Typography>
      <MovieListContainer movies={movies}/> : <div>No movies</div>
    </Container>
  );
};

export default HomePage;
