import { Theme } from "@/theme/config";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  color,
  ColorProps,
  createRestyleComponent,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";
import { TextInput as BaseTextInput, TextInputProps } from "react-native";

export type InputProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, "inputVariants"> &
  TextInputProps;

export const Input = createRestyleComponent<InputProps, Theme>(
  [
    spacing,
    color,
    backgroundColor,
    border,
    layout,
    createVariant({ themeKey: "inputVariants" }),
  ],
  BaseTextInput
);
