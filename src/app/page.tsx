"use client";

import React, { useState, useEffect } from "react";
import PokerTableBackground from "@/components/PokerTableBackground";
import dynamic from "next/dynamic";
import StatisticsPanel from "@/components/StatisticsPanel";
import { handRanges } from "@/data/handRanges";

// Dynamically load PokerHand.
const PokerHandNoSSR = dynamic(() => import("@/components/PokerHand"), {
  ssr: false,
});

type Suit = "♠" | "♥" | "♦" | "♣";
type Value =
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

export interface CardTypeLocal {
  suit: Suit;
  value: Value;
}

type Position = keyof typeof handRanges;

const generateDeck = (): CardTypeLocal[] => {
  const suits: Suit[] = ["♠", "♥", "♦", "♣"];
  const values: Value[] = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const deck: CardTypeLocal[] = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });
  return deck;
};

const generateHand = (handSize: number): CardTypeLocal[] => {
  let deck = generateDeck();
  const hand: CardTypeLocal[] = [];
  for (let i = 0; i < handSize; i++) {
    const index = Math.floor(Math.random() * deck.length);
    hand.push(deck[index]);
    deck.splice(index, 1);
  }
  return hand;
};

const convertHandToRange = (hand: CardTypeLocal[]): string => {
  if (hand.length !== 2) return "";
  const rankOrder = "AKQJT98765432";
  let [card1, card2] = hand;
  if (rankOrder.indexOf(card1.value) > rankOrder.indexOf(card2.value)) {
    [card1, card2] = [card2, card1];
  }
  if (card1.value === card2.value) {
    return card1.value + card2.value;
  }
  const suited = card1.suit === card2.suit ? "s" : "o";
  return card1.value + card2.value + suited;
};

const evaluateHandForPosition = (
  hand: CardTypeLocal[],
  position: string
): boolean => {
  const handString = convertHandToRange(hand);
  console.log(`Evaluating hand for position ${position}:`, handString);
  return (handRanges[position] || []).includes(handString);
};

export default function PokerDrillPage() {
  const positions = ["BTN", "SB", "BB", "UTG", "MP", "CO"];
  const [cycleIndex, setCycleIndex] = useState(0);
  const [handVersion, setHandVersion] = useState(0);
  const [currentHand, setCurrentHand] = useState<CardTypeLocal[]>(generateHand(2));
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setCurrentHand(generateHand(2));
  }, [handVersion]);

  const handleDecision = (decision: "Raise" | "Fold") => {
    const userPosition = positions[cycleIndex];
    const isRaiseCorrect = evaluateHandForPosition(currentHand, userPosition);
    const isCorrect =
      (decision === "Raise" && isRaiseCorrect) ||
      (decision === "Fold" && !isRaiseCorrect);
    setTotalCount((prev) => prev + 1);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setCycleIndex((prev) => (prev + 1) % positions.length);
    setHandVersion((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section (5% height) */}
      <header
        className="w-full bg-gray-800 text-white flex items-center justify-between px-4"
        style={{ height: "5vh" }}
      >
        <div className="text-lg font-bold">Poker Drills</div>
        <div className="flex space-x-4">
          <div>Settings</div>
          <div>Profile</div>
        </div>
      </header>

      {/* Statistics Section (15% height) */}
      <section
        className="w-full flex items-center justify-center bg-gray-100"
        style={{ height: "15vh" }}
      >
        <StatisticsPanel correct={correctCount} total={totalCount} />
      </section>

      {/* Main Poker Table Section (60% height) */}
      <main className="relative flex items-center justify-center" style={{ height: "60vh" }}>
        <PokerTableBackground cycleIndex={cycleIndex} />
        <div className="absolute z-10">
          <PokerHandNoSSR
            key={handVersion}
            cardWidth="80px"
            cardHeight="120px"
            currentHand={currentHand}
          />
        </div>
      </main>

      {/* Action Button Section (15% height) */}
      <section
        className="w-full flex items-center justify-center"
        style={{ height: "15vh" }}
      >
        <div className="flex flex-row gap-4">
          <button
            onClick={() => handleDecision("Raise")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Raise
          </button>
          <button
            onClick={() => handleDecision("Fold")}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Fold
          </button>
        </div>
      </section>

      {/* Footer Section (5% height) */}
      <footer
        className="w-full bg-gray-800 text-white flex items-center justify-center"
        style={{ height: "5vh" }}
      >
        <span>Footer content</span>
      </footer>
    </div>
  );
}
