"use client";

import React from "react";

export type Suit = "♠" | "♥" | "♦" | "♣";
export type Value =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export interface CardType {
  suit: Suit;
  value: Value;
}

interface CardProps {
  suit: Suit;
  value: Value;
  width?: string;
  height?: string;
}

export const Card: React.FC<CardProps> = ({
  suit,
  value,
  width = "80px",
  height = "120px",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center border rounded shadow p-2 bg-white"
      style={{ width, height }}
    >
      <div className="text-xl font-bold">{value}</div>
      <div className="text-2xl">{suit}</div>
    </div>
  );
};

interface PokerHandProps {
  currentHand: CardType[];
  cardWidth?: string;
  cardHeight?: string;
}

const PokerHand: React.FC<PokerHandProps> = ({
  currentHand,
  cardWidth,
  cardHeight,
}) => {
  return (
    <div className="flex gap-4">
      {currentHand.map((card, idx) => (
        <Card
          key={`${card.value}-${card.suit}-${idx}`}
          suit={card.suit}
          value={card.value}
          width={cardWidth}
          height={cardHeight}
        />
      ))}
    </div>
  );
};

export default PokerHand;
