import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import MovieCard from './movie-card';
import { Movie } from '../../../types/movie';

interface MovieListProps {
    movies: Movie[];
}

const MovieListContainer: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {movies?.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListContainer;
