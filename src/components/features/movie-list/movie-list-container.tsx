import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import MovieCard from './movie-card';
import { Genre, Movie } from '../../../types/movie';
import { fetchGenres } from '../../../endpoints/movie';

interface MovieListProps {
    movies: Movie[];
}

const MovieListContainer: React.FC<MovieListProps> = ({ movies }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect( () => {
    const loadGenres = async () => {
      try {
        const genres = await fetchGenres();
        setGenres(genres);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
  }, []);

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
