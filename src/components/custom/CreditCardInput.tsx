import { memo, useCallback, useState } from "react";
import { JCBColor, MasterCardColor, VisaColor } from "../icons";
import { Box } from "./base";
import { Input, InputProps } from "./Input";
import { formatCreditCardNumber } from "@/utils";
import { CreditCardInfo } from "@/types/card";

export const CreditCardInput = memo(
  ({ defaultValue, value, onChangeText, ...rest }: InputProps) => {
    const [cardNumber, setCardNumber] = useState<string>(
      defaultValue || value || ""
    );
    const [cardInfo, setCardInfo] = useState<CreditCardInfo | null>(null);

    /* Handlers */
    const onChangeHandler = useCallback(
      (value: string) => {
        const info = formatCreditCardNumber(value);

        setCardNumber(info.formatted);
        onChangeText?.(info.original);
        setCardInfo(info);
      },
      [onChangeText]
    );
    return (
      <Box>
        <Input
          value={cardNumber}
          keyboardType="numeric"
          placeholder="0000 0000 0000 0000"
          maxLength={19} // total length + spaces
          {...rest}
          onChangeText={onChangeHandler}
        />
        <Box
          height="100%"
          position="absolute"
          right={16}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="xs"
        >
          <VisaColor
            fillOpacity={!cardInfo || cardInfo?.type === "visa" ? 1 : 0.3}
          />
          <MasterCardColor
            fillOpacity={!cardInfo || cardInfo?.type === "master" ? 1 : 0.3}
          />
          <JCBColor
            fillOpacity={!cardInfo || cardInfo?.type === "jcb" ? 1 : 0.3}
          />
        </Box>
      </Box>
    );
  }
);
