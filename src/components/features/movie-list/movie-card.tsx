import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
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
        sx={{ maxWidth: 300, height: 600, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      >
        <CardMedia
          component="img"
          height="250"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography
            variant="h6"
            className="text-[calc(1.2rem-(0.02rem_*_length(var(--title-length),1)))] truncate w-full"
            style={{ '--title-length': movie.title.length } as React.CSSProperties}
          >
            {movie.title}
          </Typography>
          <div className="flex flex-row my-1">
            {genreLabels.map((genre) => (<AppBadge text={genre.name}/>))}
          </div>
          <div className="flex flex-row my-1 gap-2 mx-auto">
            {movie.vote_average}
            <Rating defaultValue={movie.vote_average / 2} readOnly precision={0.5}/>
              ({movie.vote_count})
          </div>
          <Typography variant="body2" color="text.secondary">
            {movie.overview.length > 80 ? `${movie.overview.slice(0, 80)}...` : movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
