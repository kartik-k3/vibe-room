import { useSelector } from "react-redux";
import {
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
} from "../constants/COLOR_SCHEME";
import { createTheme } from "@mui/material";

export const GET_COLOR_SCHEME = (color) => {
  if (color?.theme === "dark") {
    return COLOR_SCHEME_DARK;
  }
  return COLOR_SCHEME_LIGHT;
};

export const getDesignTokens = (themeMode) => {
  const THEME = GET_COLOR_SCHEME(themeMode);
  return createTheme({
    palette: {
      mode: THEME.THEME,
      primary: {
        main: THEME.PRIMARY,
      },
      background: {
        default: THEME.BACKGROUND,
        paper: THEME.SURFACE,
      },
      text: {
        primary: THEME.ON_SURFACE,
        secondary: THEME.ON_BACKGROUND,
      },
    },
  });
};
