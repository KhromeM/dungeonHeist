import React from 'react';
import '../index.css';

const LoginHeader = () => {
  return (
    <div className="flex justify-between items-center bg-green-500 py-3 px-6">
      <h1 className="text-lg font-Digitalt text-white">DUNGEON HEIST</h1>
      <button className="font-Digitalt text-white">LOGIN</button>
    </div>
  );
};

export default LoginHeader;