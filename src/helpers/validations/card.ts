import { getCardType } from "@/utils";
import dayjs from "dayjs";
import { z } from "zod";

export const addCardSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    number: z
      .string()
      .min(16, { message: "Card number is too short" })
      .max(16, { message: "Card number is too long" }),
    expiry: z
      .string()
      .min(5, { message: "Expiry date is too short" })
      .max(5, { message: "Expiry date is too long" }),
    cvv: z
      .string()
      .min(3, { message: "CVV is too short" })
      .max(3, { message: "CVV is too long" }),
  })
  .refine(
    (data) => {
      const value = data.expiry;
      // Check if the value matches the MM/YY format
      const [month, year] = value.split("/");
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        return false;
      }

      // Check if the month is between 01 and 12
      const monthNum = parseInt(month, 10);
      if (monthNum < 1 || monthNum > 12) {
        return false;
      }

      // Check if the expiry date is in the future
      const expiryDate = dayjs(`20${year}-${month}-01`).endOf("month");
      if (expiryDate.isBefore(dayjs())) {
        return false;
      }

      return true;
    },
    {
      message: "Invalid expiration date.",
      path: ["expiry"],
    }
  )
  .refine((data) => getCardType(data.number, true) !== "unknown", {
    message: "Invalid card number.",
    path: ["number"],
  });

export type AddCardFormData = z.infer<typeof addCardSchema>;
