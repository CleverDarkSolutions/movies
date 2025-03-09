import { Button, Input } from '@mui/material';
import { useState } from 'react';
import TEXT_LABELS from '../../../utils/translations/EN';

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
        placeholder={TEXT_LABELS.general.searchPlaceholder}
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={() => onSearch(value)} variant="outlined" color="primary" sx={{ ml: 4 }}>
        {TEXT_LABELS.general.searchButton}
      </Button>
    </div>
  );
};

export default SearchBase;
