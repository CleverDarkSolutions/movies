import SearchBase from './search-base';
import { useState } from 'react';
import { Movie } from '../../../types/movie';
import { searchMovies } from '../../../endpoints/movie';
import { Link } from 'react-router-dom';

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
    <div className="fixed bg-amber-100 w-full rounded-lg p-4 flex flex-row">
      <div className="mr-4 pt-1"><Link to='/'>MOVIE HUB</Link></div>
      <div className="flex-1 gap-2">
        <SearchBase search={search} onSearchChange={setSearch} onSubmit={handleSearchMovies} />
      </div>
    </div>
  );
};

export default SearchForm;
