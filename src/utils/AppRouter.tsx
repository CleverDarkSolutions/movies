import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movie/:id" element={<div>Movie</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
