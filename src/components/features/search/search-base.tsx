import { Button, Input } from '@mui/material';
import { useState } from 'react';

interface SearchBaseProps {
    onSearch: (query: string) => void;
}

const SearchBase = ({ onSearch }: SearchBaseProps) => {
  const [value, setValue] = useState<string>('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="flex flex-row">
      <Input
        color="primary"
        placeholder="Search for a movie..."
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={() => onSearch(value)} variant="outlined" color="primary" sx={{ ml: 4 }}>
                Search
      </Button>
    </div>
  );
};

export default SearchBase;
