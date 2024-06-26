export interface Card {
  id: string;
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

export type CardType = "visa" | "master" | "jcb";

export interface CreditCardInfo {
  type: string;
  formatted: string;
  original: string;
}
