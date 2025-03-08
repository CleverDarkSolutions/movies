import { Button, Input } from '@mui/material';

interface SearchBaseProps {
    search: string;
    onSearchChange: (value: string) => void;
    onSubmit: () => void;
}

const SearchBase = ({ search, onSearchChange, onSubmit }: SearchBaseProps) => {
  return (
    <div>
      <Input value={search} onChange={(e) => onSearchChange(e.target.value)} />
      <Button onClick={onSubmit}>Search</Button>
    </div>
  );
};

export default SearchBase;
