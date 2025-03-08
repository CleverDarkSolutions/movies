import { Button, Input } from '@mui/material';

interface SearchBaseProps {
    search: string;
    onSearchChange: (value: string) => void;
    onSubmit: () => void;
}

const SearchBase = ({ search, onSearchChange, onSubmit }: SearchBaseProps) => {
  return (
    <div className="flex flex-row">
      <Input
        color="primary"
        placeholder="Search for a movie..."
        value={search}
        fullWidth={true}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button onClick={onSubmit} variant="outlined" color="primary" sx={{ mx: 4 }}>Search</Button>
    </div>
  );
};

export default SearchBase;
