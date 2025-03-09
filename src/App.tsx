import React from 'react';
import './App.css';
import './index.css';
import AppRouter from './utils/app-router';

const App = () => {
  return (
    <div className="App p-4 border rounded-md shadow-md text-center text-text">
      <AppRouter/>
    </div>
  );
};

export default App;
