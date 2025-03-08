import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Genre, Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';
import AppBadge from '../../common/app-badge';

interface MovieCardProps {
    movie: Movie;
    allGenres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, allGenres }: MovieCardProps) => {
  const [genreLabels, setGenreLabels] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie || !allGenres.length) return;

    const labels = allGenres.filter((genre) => movie.genre_ids?.includes(genre.id));
    //TODO requires a separate component because of mistakes in API structure
    setGenreLabels(labels);
  }, [movie, allGenres]);

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      >
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom color="text.primary">
            {movie.title}
          </Typography>
          <div className="flex flex-row my-1">
            {genreLabels.map((genre) => (<AppBadge text={genre.name}/>))}
          </div>
          <Typography variant="body2" color="text.secondary">
            {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
