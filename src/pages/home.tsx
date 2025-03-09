import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { Container, Typography } from '@mui/material';
import { fetchPopularMovies } from '../endpoints/movie';
import MovieListContainer from '../components/features/movie-list/movie-list-container';
import SearchForm from '../components/features/search/search-form';
import BaseWrapper from '../utils/base-wrapper';
import { useSnackbar } from '../components/features/common/snackbar-context';
import TEXT_LABELS from '../utils/translations/EN';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [headerLabel, setHeaderLabel] = useState<string>(TEXT_LABELS.general.headerLabels.popularMovies);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchPopularMovies();
        setMovies(movieData);
        setHeaderLabel(TEXT_LABELS.general.headerLabels.popularMovies);
      } catch (err) {
        showSnackbar(TEXT_LABELS.notifications.failure.movies, 'error');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <BaseWrapper>
      <Container>
        <SearchForm movies={movies} setMovies={setMovies} setLoading={setLoading} setHeaderLabel={setHeaderLabel}/>
        <Typography variant="h4" textAlign="center" my={3}>
          {headerLabel}
        </Typography>
        <MovieListContainer movies={movies} loading={loading}/>
      </Container>
    </BaseWrapper>
  );
};

export default HomePage;
