import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import MovieCard from './movie-card';
import { Genre, Movie } from '../../../types/movie';
import { fetchGenres } from '../../../endpoints/movie';
import { useSnackbar } from '../common/snackbar-context';

interface MovieListProps {
    movies: Movie[];
    loading: boolean;
}

const MovieListContainer: React.FC<MovieListProps> = ({ movies, loading }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect( () => {
    const loadGenres = async () => {
      try {
        const genres = await fetchGenres();
        setGenres(genres);
      } catch (err) {
        showSnackbar(`Failed to load genres: ${err}`, 'error');
      }
    };
    loadGenres();
  }, []);
  
  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {movies?.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} allGenres={genres} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListContainer;
