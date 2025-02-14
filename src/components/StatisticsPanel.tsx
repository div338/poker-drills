"use client";

import React from "react";

interface StatisticsPanelProps {
  correct: number;
  total: number;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ correct, total }) => {
  // Compute accuracy percentage.
  const accuracyPercent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="h-full w-full max-w-md mx-auto p-2 rounded-lg flex flex-col items-center justify-center">
      {/* Title */}
      <div className="text-sm font-bold text-gray-900 border-black">Performance</div>

      {/* Main counter */}
      <div className="text-3xl font-extrabold text-gray-900 mt-2 border-black">
        {accuracyPercent}%
      </div>

      {/* Subtext */}
      <div className="mt-2 text-lg text-gray-600">
        {correct} out of {total} hands correct
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${accuracyPercent}%` }}
        />
      </div>
    </div>
  );
};

export default StatisticsPanel;
