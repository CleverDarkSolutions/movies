import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Genre, Movie } from '../types/movie';
import { fetchGenres, fetchMovieById } from '../endpoints/movie';
import MovieCard from '../components/features/movie-list/movie-card';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid movie ID');

      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const [movieData, genreData] = await Promise.all([
          fetchMovieById(id),
          fetchGenres(),
        ]);

        setMovie(movieData);
        setGenres(genreData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return <>{movie && genres && <MovieCard movie={movie} allGenres={genres} />}</>;
};

export default MoviePage;
