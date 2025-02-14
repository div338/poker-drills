"use client";
import React from "react";

interface Seat {
  id: number;
  baseAngle: number;
  role?: string;
}

interface PokerTableBackgroundProps {
  cycleIndex: number;
}

const PokerTableBackground: React.FC<PokerTableBackgroundProps> = ({ cycleIndex }) => {
  const baseSeats: Seat[] = [
    { id: 0, baseAngle: 90 },
    { id: 1, baseAngle: 30 },
    { id: 2, baseAngle: -30 },
    { id: 3, baseAngle: 150 },
    { id: 4, baseAngle: 210 },
    { id: 5, baseAngle: 270 },
  ];

  const orderedIndices = [0, 1, 2, 5, 4, 3];
  const orderedSeats: Seat[] = orderedIndices.map((i) => ({ ...baseSeats[i] }));

  const roles = ["BTN", "SB", "BB", "UTG", "MP", "CO"];
  const rotatedRoles = roles.slice(cycleIndex).concat(roles.slice(0, cycleIndex));
  orderedSeats.forEach((seat, index) => {
    seat.role = rotatedRoles[index];
  });

  const tableWidth = 300;
  const tableHeight = 400;
  const centerX = tableWidth / 2;
  const centerY = tableHeight / 2;
  const rx = tableWidth / 2;
  const ry = tableHeight / 2;

  const dealerChipSize = 20;
  const oppositeMapping: { [key: number]: number } = {
    0: 5,
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 0,
  };

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent">
      <div
        className="relative bg-transparent rounded-full shadow-2xl border-2 border-gray-300"
        style={{ width: `${tableWidth}px`, height: `${tableHeight}px` }}
      >
        {orderedSeats.map((seat, idx) => {
          const seatSize = seat.id === 0 ? 60 : 40;
          const rad = (seat.baseAngle * Math.PI) / 180;
          const seatCenterX = centerX + rx * Math.cos(rad);
          const seatCenterY = centerY + ry * Math.sin(rad);
          const seatX = seatCenterX - seatSize / 2;
          const seatY = seatCenterY - seatSize / 2;
          const bgColor = seat.id === 0 ? "bg-blue-500" : "bg-yellow-500";

          let dealerChipElement = null;
          if (seat.role === "BTN") {
            const oppositeSeatId = oppositeMapping[seat.id];
            const oppositeSeat = baseSeats.find((s) => s.id === oppositeSeatId);
            if (oppositeSeat) {
              const oppRad = (oppositeSeat.baseAngle * Math.PI) / 180;
              const oppCenterX = centerX + rx * Math.cos(oppRad);
              const oppCenterY = centerY + ry * Math.sin(oppRad);
              const dx = oppCenterX - seatCenterX;
              const dy = oppCenterY - seatCenterY;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const offset = seatSize + 10;
              const chipCenterX = seatCenterX + (dx / dist) * offset;
              const chipCenterY = seatCenterY + (dy / dist) * offset;
              const chipX = chipCenterX - dealerChipSize / 2;
              const chipY = chipCenterY - dealerChipSize / 2;
              dealerChipElement = (
                <div
                  className="absolute flex items-center justify-center bg-red-500 border-2 border-white rounded-full text-xs text-white"
                  style={{
                    width: `${dealerChipSize}px`,
                    height: `${dealerChipSize}px`,
                    left: `${chipX}px`,
                    top: `${chipY}px`,
                  }}
                >
                  D
                </div>
              );
            }
          }

          return (
            <React.Fragment key={idx}>
              <div
                className={`absolute flex flex-col items-center justify-center ${bgColor} border-2 border-gray-400 rounded-full text-xs text-white`}
                style={{
                  width: `${seatSize}px`,
                  height: `${seatSize}px`,
                  left: `${seatX}px`,
                  top: `${seatY}px`,
                }}
              >
                <div>{seat.role}</div>
              </div>
              {dealerChipElement}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PokerTableBackground;
