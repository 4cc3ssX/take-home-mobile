import { Card, CardType } from "@/types/card";
import { getCardType } from "@/utils";
import { memo, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box, Text } from "./base";
import { JCBColor, MasterCardColor, VisaColor } from "../icons";

export interface ICreditCardProps {
  data: Card;
  onPress: () => void;
}

export const CreditCard = memo(({ data, onPress }: ICreditCardProps) => {
  const type = useMemo(
    () => getCardType(data.number) as CardType,
    [data.number]
  );

  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor="card"
        borderRadius="xl"
        padding="xl"
        gap="md"
        style={stylesheet.container}
      >
        {type === "visa" ? (
          <VisaColor width={66} height={23} />
        ) : type === "master" ? (
          <MasterCardColor width={66} height={23} />
        ) : (
          <JCBColor width={66} height={23} />
        )}
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Text key={index} fontSize={24} fontWeight="500" color="gray2">
                ••••
              </Text>
            ))}
          <Text fontSize={24} fontWeight="500" color="gray2">
            {data.number.slice(-4)}
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box flex={1} gap="sm">
            <Text color="gray3">Name on Card</Text>
            <Text style={stylesheet.name} numberOfLines={1}>{data.name}</Text>
          </Box>
          <Box gap="sm">
            <Text color="gray3">Expires</Text>
            <Text style={stylesheet.expiry}>{data.expiry}</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
});

const stylesheet = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  number: {
    fontSize: 16,
    fontWeight: "500",
  },
  expiry: {
    fontSize: 16,
    fontWeight: "500",
  },
  cvv: {
    fontSize: 16,
    fontWeight: "500",
  },
});
