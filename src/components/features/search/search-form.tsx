import SearchBase from './search-base';
import { useState } from 'react';
import { Movie } from '../../../types/movie';
import { fetchPopularMovies, searchMovies } from '../../../endpoints/movie';
import { Link } from 'react-router-dom';

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
      const movieData = await searchMovies(search);
      setMovies(movieData);
      setHeaderLabel('Results for query ' + search + ' :');
    } catch (err: any) {
      console.error('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    setSearch('');
    try {
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
      setHeaderLabel('Popular movies');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light rounded-lg p-4 flex flex-row">
      <div className="mr-4 pt-1"><Link to='/' onClick={resetSearch}>MOVIE HUB</Link></div>
      <div className="flex-1 gap-2">
        <SearchBase search={search} onSearchChange={setSearch} onSubmit={handleSearchMovies} />
      </div>
    </div>
  );
};

export default SearchForm;
