import SearchBase from './search-base';
import { Movie } from '../../../types/movie';
import { fetchPopularMovies, searchMovies } from '../../../endpoints/movie';
import { Link } from 'react-router-dom';
import SearchAdvanced from './search-advanced';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSnackbar } from '../common/snackbar-context';
import TEXT_LABELS from '../../../utils/translations/EN';

interface SearchFormProps {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setHeaderLabel: (label: string) => void;
}

const SearchForm = ({ movies, setMovies, setLoading, setHeaderLabel }: SearchFormProps) => {

  const { showSnackbar } = useSnackbar();

  const handleSearchMovies = async (query: string) => {
    if (query === undefined || query === null || query === '') {
      showSnackbar(TEXT_LABELS.notifications.failure.emptyQuery, 'error');
      
      return;
    }
    setLoading(true);
    setHeaderLabel(TEXT_LABELS.general.headerLabels.resultsHeader(query));
    try {
      const movieData = await searchMovies(query);
      setMovies(movieData);
    } catch (err) {
      showSnackbar(TEXT_LABELS.notifications.failure.movies);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = (movies: Movie[]) => {
    if (!movies || movies.length === 0) {
      showSnackbar(TEXT_LABELS.notifications.failure.movies);
    }
    setMovies(movies);
    setHeaderLabel(TEXT_LABELS.general.headerLabels.advancedSearch);
  };

  const resetSearch = async () => {
    try {
      setLoading(true);
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
      setHeaderLabel(TEXT_LABELS.general.headerLabels.popularMovies);
      showSnackbar(TEXT_LABELS.notifications.success.defaultResults);
    } catch (err) {
      showSnackbar(TEXT_LABELS.notifications.failure.movies);
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
          <Typography>{TEXT_LABELS.search.advancedSearch}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchAdvanced onSearchResults={handleAdvancedSearch} />
        </AccordionDetails>
      </Accordion>

      <div className="w-full mt-2 cursor-pointer">
        <Button onClick={resetSearch} variant="outlined" className="text-xl font-bold">
          {TEXT_LABELS.search.clearFilters}
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
