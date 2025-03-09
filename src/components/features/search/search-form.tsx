import SearchBase from './search-base';
import { useState } from 'react';
import { Movie } from '../../../types/movie';
import { fetchPopularMovies, searchMovies } from '../../../endpoints/movie';
import { Link } from 'react-router-dom';
import SearchAdvanced from './search-advanced';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface SearchFormProps {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setHeaderLabel: (label: string) => void;
}

const SearchForm = ({ movies, setMovies, setLoading, setHeaderLabel }: SearchFormProps) => {
  const [search, setSearch] = useState('');

  const handleSearchMovies = async () => {
    try {
      setLoading(true);
      const movieData = await searchMovies(search);
      setMovies(movieData);
      setHeaderLabel('Results for query ' + search + ' :');
    } catch (err) {
      console.error('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = (movies: Movie[]) => {
    if (!movies || movies.length === 0) {
      console.log('No movies found.');
    } else {
      console.log('Search results:', movies);
    }
    setMovies(movies);
  };

  const resetSearch = async () => {
    setSearch('');
    try {
      setLoading(true);
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
      setHeaderLabel('Popular movies');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light rounded-lg p-4 flex flex-col">
      <div className="flex items-center mb-3">
        <div className="mr-4 pt-1">
          <Link to="/" onClick={resetSearch} className="text-xl font-bold">
              MOVIE HUB
          </Link>
        </div>
        <div className="flex-1">
          <SearchBase search={search} onSearchChange={setSearch} onSubmit={handleSearchMovies} />
        </div>
      </div>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="advanced-search-content" id="advanced-search-header">
          <Typography>Advanced Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchAdvanced onSearchResults={handleAdvancedSearch} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SearchForm;
