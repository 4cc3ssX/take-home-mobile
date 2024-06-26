import { RootState } from "@/store/redux";
import { useSelector } from "react-redux";
import { CardState } from "./cardSlice";

export const useCardState = () =>
  useSelector<RootState, CardState>((state) => state.card);
