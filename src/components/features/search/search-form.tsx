import SearchBase from './search-base';
import { Movie } from '../../../types/movie';
import { fetchPopularMovies, searchMovies } from '../../../endpoints/movie';
import { Link } from 'react-router-dom';
import SearchAdvanced from './search-advanced';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface SearchFormProps {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setHeaderLabel: (label: string) => void;
}

const SearchForm = ({ movies, setMovies, setLoading, setHeaderLabel }: SearchFormProps) => {

  const handleSearchMovies = async (query: string) => {
    console.log(query);
    if (query === undefined || query === null || query === '') {
      return;
    }
    setLoading(true);
    setHeaderLabel(`Results for query "${query}"`);
    try {
      const movieData = await searchMovies(query);
      setMovies(movieData);
    } catch (err) {
      console.error('Failed to load movies:', err);
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
    setHeaderLabel('Results for the advanced criteria above');
  };

  const resetSearch = async () => {
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
    <div className="rounded-lg p-4 flex flex-col">
      <div className="flex items-center mb-3">
        <div className="flex-1">
          <SearchBase onSearch={handleSearchMovies} />
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

      <div className="w-full mt-2 cursor-pointer">
        <Button onClick={resetSearch} variant="outlined" className="text-xl font-bold">
              Clear filters
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
