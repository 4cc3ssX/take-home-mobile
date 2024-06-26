import { Card } from "@/types/card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardState {
  cards: Card[];
}

const initialState: CardState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card) => card.number !== action.payload
      );
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;
