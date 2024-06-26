import { PropsWithChildren, ReactElement } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/config";
import { Box, Text } from "./base";

export interface IRowItemProps {
  leftElement?: ReactElement | undefined;
  rightElement?: ReactElement | undefined;
  onPress: () => void;
}

export const RowItem = ({
  children,
  leftElement,
  rightElement,
  onPress,
}: PropsWithChildren<IRowItemProps>) => {
  const theme = useTheme<Theme>();
  return (
    <Pressable onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        borderRadius="xl"
        borderColor="border"
        style={stylesheet.container}
      >
        {leftElement}
        <Box flex={1}>
          <Text variant="body" fontWeight="500">
            {children}
          </Text>
        </Box>
        {rightElement ?? (
          <Ionicons name="chevron-forward" size={18} color="black" />
        )}
      </Box>
    </Pressable>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    gap: 10,
    borderWidth: 1,
  },
});
