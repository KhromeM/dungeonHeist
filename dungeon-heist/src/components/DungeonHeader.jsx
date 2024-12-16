import React from 'react';

const DungeonHeader = () => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-400 py-2 px-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold">DUNGEON HEIST</h1>
        <button className="bg-white text-green-400 font-bold py-2 px-4 rounded">LOGIN</button>
      </div>
    </div>
  );
};

export default DungeonHeader;