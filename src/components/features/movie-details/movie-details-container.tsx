import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, CircularProgress, Chip, Card, CardMedia, CardContent, Box } from '@mui/material';
import { fetchMovieById } from '../../../endpoints/movie';
import { Movie } from '../../../types/movie';

const MovieDetailsContainer: React.FC = () => {
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

    loadMovie();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

  if (!movie) return <Typography textAlign="center">Movie not found.</Typography>;

  return (
    <Container sx={{ py: 5 }}>
      {/* Backdrop Image */}
      <Box
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 200, md: 400 },
          borderRadius: 2,
          mb: 3,
        }}
      />

      {/* Movie Details */}
      <Grid container spacing={4}>
        {/* Left Column - Movie Poster */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/fallback-image.jpg'}
              alt={movie.title}
            />
          </Card>
        </Grid>

        {/* Right Column - Movie Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {movie.tagline}
          </Typography>

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          {/* Movie Details */}
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Typography variant="body2" fontWeight="bold">Release Date:</Typography>
              <Typography variant="body2">{movie.release_date}</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="body2" fontWeight="bold">Runtime:</Typography>
              <Typography variant="body2">{movie.runtime} min</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="body2" fontWeight="bold">Rating:</Typography>
              <Typography variant="body2">{movie.vote_average.toFixed(1)} / 10</Typography>
            </Grid>
          </Grid>

          {/* Genres */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">Genres:</Typography>
            {movie.genres && movie.genres.length > 0 ? (
              movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
              ))
            ) : (
              <Typography variant="body2">N/A</Typography>
            )}
          </Box>

          {/* Production Companies */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">Production Companies:</Typography>
            {movie.production_companies.length > 0 ? (
              movie.production_companies.map((company) => (
                <Chip key={company.id} label={company.name} sx={{ mr: 1, mb: 1 }} />
              ))
            ) : (
              <Typography variant="body2">N/A</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsContainer;
