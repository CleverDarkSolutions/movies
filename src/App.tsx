import React from 'react';
import './App.css';
import './index.css';
import AppRouter from './utils/AppRouter';
import BaseWrapper from './utils/base-wrapper';

const App = () => {
  return (
    <div className="App">
      <BaseWrapper>
        <AppRouter/>
      </BaseWrapper>
    </div>
  );
};

export default App;
