import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import TEXT_LABELS from '../../../utils/translations/EN';

const AppHeader = () => {
  return (
    <div className="mb-3 w-full h-12 mx-auto">
      <div className="mr-4 pt-1">
        <Link to="/" className="text-xl font-bold">
          <Home/> {TEXT_LABELS.general.appName}
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;