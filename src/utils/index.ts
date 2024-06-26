import { CardType, CreditCardInfo } from "@/types/card";

export const getCardType = (
  cardNumber: string,
  fullcheck: boolean = false
): CardType | "unknown" => {
  const patterns: Record<CardType, RegExp> = {
    visa: fullcheck ? /^4[0-9]{12}(?:[0-9]{3})?$/ : /^4/,
    master: fullcheck ? /^5[1-5][0-9]{14}$/ : /^5[1-5]/,
    jcb: fullcheck ? /^(?:2131|1800|35\d{3})\d{11}$/ : /^(?:2131|1800|35)/,
  };

  for (const card in patterns) {
    if (patterns[card as CardType].test(cardNumber)) {
      return card as CardType;
    }
  }

  return "unknown";
};

export const formatCreditCardNumber = (number: string): CreditCardInfo => {
  const sanitized = number.replace(/\D/g, "");
  const type = getCardType(sanitized);
  const formatted = sanitized.replace(/(\d{4})/g, "$1 ").trim();

  return {
    type,
    original: sanitized,
    formatted,
  };
};

export const formatExpiryDate = (input: string): string => {
  // Remove any non-digit characters
  const sanitized = input.replace(/\D/g, "");

  // Format the input as MM/YY
  let formatted = sanitized;
  if (sanitized.length >= 3) {
    formatted = `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`;
  } else if (sanitized.length >= 1) {
    formatted = sanitized;
  }

  return formatted;
};
