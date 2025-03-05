import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Movie } from '../../../types/movie';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="400"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
