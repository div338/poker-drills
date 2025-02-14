// components/PokerTableBackground.tsx
import React from 'react';

const PokerTableBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gray-300">
      {/* Centered poker table oval with fixed aspect ratio */}
      <div className="w-3/4 md:w-1/2 max-w-xl aspect-[0.7] bg-green-800 rounded-full shadow-2xl border-2 border-yellow-400" />
    </div>
  );
};

export default PokerTableBackground;
