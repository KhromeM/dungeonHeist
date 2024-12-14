import React from 'react';
import dirtImage from '../images/dirt.png';

const GridGenerator = ({ n }) => {
  const gridSize = Math.max(1, Math.floor(Number(n)));

  const gridRows = Array.from({ length: gridSize }, (_, rowIndex) => (
    <div key={rowIndex} className="flex">
      {Array.from({ length: gridSize }, (_, colIndex) => (
        <img 
          key={colIndex} 
          src={dirtImage} 
          alt="Dirt tile" 
          width={48} 
          height={48} 
          className="block" 
        />
      ))}
    </div>
  ));

  return (
    <div className="inline-block border-2 border-gray-300">
      {gridRows}
    </div>
  );
};

export default GridGenerator;
