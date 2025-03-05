import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types/movie';
import { Container, Typography, CircularProgress,Card, CardMedia, CardContent } from '@mui/material';
import { fetchMovieById } from '../endpoints/movie';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieById(id!);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    loadMovie().then((movie) => console.log(movie));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;
  if (!movie) return <div>No movie</div>;

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ display: 'flex', boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{movie.tagline}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{movie.overview}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>⭐ {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>⏳ {movie.runtime} min</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>📅 Release Date: {movie.release_date}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MoviePage;
