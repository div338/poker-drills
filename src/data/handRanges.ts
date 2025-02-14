type Position = "BTN" | "SB" | "BB" | "UTG" | "MP" | "CO";

export const handRanges: Record<Position, string[]> = {
    BTN: ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "QQ", "QJs", "QTs",
    "AJo", "JJ", "JTs", "ATo", "TT", "99", "88", "77", "66", "55", "44", "33", "22"],
    SB: ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "QQ", "QJs", "QTs",
        "AJo", "JJ", "JTs", "ATo", "TT", "99", "88", "77", "66", "55", "44", "33", "22"],
    UTG: ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "QQ", "QJs", "QTs",
        "AJo", "JJ", "JTs", "ATo", "TT", "99", "88", "77", "66", "55", "44", "33", "22"],
    MP: ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "QQ", "QJs", "QTs",
        "AJo", "JJ", "JTs", "ATo", "TT", "99", "88", "77", "66", "55", "44", "33", "22"],
    CO: ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "QQ", "QJs", "QTs",
        "AJo", "JJ", "JTs", "ATo", "TT", "99", "88", "77", "66", "55", "44", "33", "22"],
  };
  