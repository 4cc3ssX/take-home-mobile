import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
} from "@shopify/restyle";

import { Box, Text } from "./base";
import { Theme } from "@/theme/config";

const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Box);

type Props = React.ComponentProps<typeof ButtonContainer> & {
  disabled?: boolean;
  children: string;
  onPress?: () => void;
};

export const Button = ({
  children,
  variant = "buttonPrimary",
  onPress,
  disabled,
  ...rest
}: Props) => (
  <TouchableOpacity activeOpacity={0.75} disabled={disabled} onPress={onPress}>
    <ButtonContainer variant={variant} {...rest}>
      <Text variant={variant}>{children}</Text>
    </ButtonContainer>
  </TouchableOpacity>
);
