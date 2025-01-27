import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export type Quote = {
  idx: string;
  quote: string;
  author: string;
  tags: string[];
};

export type UnlockedQuote = {
  quote: Quote;
  timer: number;
  checkAttempts: number;
  unlockedAt: Timestamp;
};
