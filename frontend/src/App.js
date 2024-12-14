import React from 'react';
import GridGenerator from './components/GridGenerator';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <GridGenerator n={16} />
      </div>
    </div>
  );
}

export default App;
