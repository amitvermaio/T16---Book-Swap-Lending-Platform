import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black" 
    : "flex w-full items-center justify-center bg-black p-4";

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full border-4 border-white opacity-20"></div>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-orange-500 shadow-md shadow-orange-500/50"></div>
      </div>
    </div>
  );
};

export default Loader;