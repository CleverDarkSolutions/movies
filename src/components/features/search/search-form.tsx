import SearchBase from './search-base';
import { useState } from 'react';
import { Movie } from '../../../types/movie';
import { searchMovies } from '../../../endpoints/movie';

interface SearchFormProps {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
}

const SearchForm = ({ movies, setMovies, setLoading }: SearchFormProps) => {
  const [search, setSearch] = useState('');

  const handleSearchMovies = async () => {
    try {
      const movieData = await searchMovies(search);
      setMovies(movieData);
    } catch (err: any) {
      console.error('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBase search={search} onSearchChange={setSearch} onSubmit={handleSearchMovies} />
    </div>
  );
};

export default SearchForm;
