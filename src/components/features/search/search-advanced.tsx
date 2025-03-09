import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Slider, Button, Box, Typography, Grid } from '@mui/material';
import { Genre, Movie } from '../../../types/movie';
import { fetchGenres, searchMoviesAdvanced } from '../../../endpoints/movie';

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

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData);
      } catch (err) {
        console.error('Failed to load genres.');
      }
    };
    loadGenres();
  }, []);

  const handleSearch = async () => {
    try {
      const movies = await searchMoviesAdvanced({ query, selectedGenre, releaseYear, rating, sortBy });
      onSearchResults(movies);
    } catch (err) {
      console.error('Error searching movies', err);
    }
  };

  return (
    <Box className="p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
      <Typography variant="h5" gutterBottom>Advanced Search</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Movie Title"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Genre"
            variant="outlined"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>Release Year: {releaseYear[0]} - {releaseYear[1]}</Typography>
          <Slider
            value={releaseYear}
            onChange={(_, newValue) => setReleaseYear(newValue as number[])}
            valueLabelDisplay="auto"
            min={1950}
            max={2024}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Minimum Rating: {rating}</Typography>
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
            label="Sort By"
            variant="outlined"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="popularity.desc">Popularity (High to Low)</MenuItem>
            <MenuItem value="vote_average.desc">Rating (High to Low)</MenuItem>
            <MenuItem value="release_date.desc">Newest First</MenuItem>
            <MenuItem value="release_date.asc">Oldest First</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} className="flex justify-end">
          <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search Movies
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchAdvanced;
