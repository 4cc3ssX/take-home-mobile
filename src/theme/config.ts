import { createTheme } from "@shopify/restyle";
import { spacing } from "./spacing";
import { radii } from "./radii";

const palette = {
  primary: "#4AD8DA",

  gray: "#E6E3E6",
  gray2: "#8F8F8F",
  gray3: "#808080",
  error: "#FF0000",

  black: "#000000",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    ...palette,
    primary: palette.primary,
    background: palette.white,
    border: palette.gray,
    buttonPrimaryForeground: palette.white,
    error: palette.error,
    card: palette.white,
  },
  spacing,
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    link: {
      color: "primary",
    },
    label: {
      fontWeight: "500",
      fontSize: 16,
    },
    buttonPrimary: {
      color: "buttonPrimaryForeground",
      fontWeight: "bold",
      fontSize: 16,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
  inputVariants: {
    defaults: {
      fontSize: 16,
      fontWeight: "500",
      borderWidth: 1.5,
      borderColor: "border",
      borderRadius: "md",
      height: spacing["4xl"],
      py: "sm",
      px: "md",
    },
  },
  buttonVariants: {
    buttonPrimary: {
      backgroundColor: "primary",
      borderRadius: "full",
      height: spacing["2xl"] + 5, // 45px
      justifyContent: "center",
      alignItems: "center",
    },
  },
  borderRadii: radii,
});

export type Theme = typeof theme;
export default theme;
