import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Slider, Button, Box, Typography, Grid } from '@mui/material';
import { Genre, Movie } from '../../../types/movie';
import { fetchGenres, searchMoviesAdvanced } from '../../../endpoints/movie';
import { useSnackbar } from '../common/snackbar-context';
import TEXT_LABELS from '../../../utils/translations/EN';

interface AdvancedSearchProps {
    onSearchResults: (movies: Movie[]) => void;
}

const SearchAdvanced: React.FC<AdvancedSearchProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<number[]>([1980, 2024]);
  const [rating, setRating] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData);
      } catch (err) {
        showSnackbar(TEXT_LABELS.notifications.failure.genres, 'error');
      }
    };
    loadGenres();
  }, []);

  const handleSearch = async () => {
    try {
      const movies = await searchMoviesAdvanced({ query, selectedGenre, releaseYear, rating, sortBy });
      onSearchResults(movies);
    } catch (err) {
      showSnackbar(TEXT_LABELS.notifications.failure.movies, 'error');
    }
  };

  return (
    <Box className="p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
      <Typography variant="h5" gutterBottom>{TEXT_LABELS.search.advancedSearch}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={TEXT_LABELS.search.movieTitle}
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label={TEXT_LABELS.search.genre}
            variant="outlined"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="">{TEXT_LABELS.search.allGenres}</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>{TEXT_LABELS.search.releaseYear} {releaseYear[0]} - {releaseYear[1]}</Typography>
          <Slider
            value={releaseYear}
            onChange={(_, newValue) => setReleaseYear(newValue as number[])}
            valueLabelDisplay="auto"
            min={1950}
            max={2024}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom>{TEXT_LABELS.search.minimumRating}: {rating}</Typography>
          <Slider
            value={rating}
            onChange={(_, newValue) => setRating(newValue as number)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.5}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label={TEXT_LABELS.search.sortBy}
            variant="outlined"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="popularity.desc">{TEXT_LABELS.search.popularityDesc}</MenuItem>
            <MenuItem value="vote_average.desc">{TEXT_LABELS.search.voteAverageDesc}</MenuItem>
            <MenuItem value="release_date.desc">{TEXT_LABELS.search.releaseDateDesc}</MenuItem>
            <MenuItem value="release_date.asc">{TEXT_LABELS.search.releaseDateAsc}</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} className="flex justify-end">
          <Button variant="contained" color="primary" onClick={handleSearch}>
            {TEXT_LABELS.search.searchButton}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchAdvanced;
