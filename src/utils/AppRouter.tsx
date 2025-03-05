import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/movie/:id" element={<div>Movie</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
