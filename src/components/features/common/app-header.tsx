import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const AppHeader = () => {
  return (
    <div className="mb-3 w-full h-12 mx-auto">
      <div className="mr-4 pt-1">
        <Link to="/" className="text-xl font-bold">
          <Home/> MOVIE HUB
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;