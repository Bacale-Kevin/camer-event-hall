import { PaletteOptions, createTheme, css } from "@mui/material/styles";
import { lineHeight } from "@mui/system";

import typography from "./typography";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;

export const DEFAULT_THEME: AllowedTheme = "dark";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "rgb(255, 255, 255)",
      default: "rgb(255, 255, 255)",
    },
    text: {
      primary: "rgb(30, 32, 34)",
      secondary: "rgb(103, 119, 136)",
    },
    primary: {
      main: "rgb(0, 30, 60)",
      contrastText: "rgb(235, 234, 239)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: typography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(10, 25, 41)",
      paper: "rgb(35, 48, 68)",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
    primary: {
      main: "rgb(0, 123, 248)",
      contrastText: "rgb(235, 234, 239)",
    },
    divider: "rgb(85, 89, 110)",
  },
  typography: typography,
});

export const globalStyles = css`
  :root {
  [data-theme="dark"] 
`;
