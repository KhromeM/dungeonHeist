import React from 'react';
import '../index.css';

const LoginHeader = () => {
  return (
    <div className="absolute top-4 left-0 right-0 flex justify-between items-center bg-green-500 py-3 px-12 w-[50%] mx-auto z-10 rounded-lg">
      <h1 className="text-4xl font-Digitalt text-white">DUNGEON HEIST</h1>
      <button className="text-4xl font-Digitalt text-white bg-transparent hover:bg-transparent hover:outline-none p-0">
        LOGIN
      </button>
    </div>
  );
};

export default LoginHeader;
