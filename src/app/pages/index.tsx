// pages/index.tsx


import React, { useState } from "react";
import PokerTableBackground from '@/components/PokerTableBackground'


export default function Home() {
   const [cycleIndex, setCycleIndex] = useState(0);
  
    
  return (
    <div className="relative min-h-screen">
      {/* Reusable poker table background */}
      <PokerTableBackground cycleIndex={cycleIndex} />
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <h1 className="text-white text-5xl font-bold">Poker Drills</h1>
        {/* Future homepage content can be added here */}
      </div>
    </div>
  )
}
