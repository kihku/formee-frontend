import { createTheme } from "@mui/material/styles";
import { COLORS } from "styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}
export const mainTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: COLORS.primary,
      darker: COLORS.primaryDark,
    },
    secondary:{
      main: "#EFF0FF",
      contrastText: COLORS.primary,
    },
    neutral: {
      main: "#EFF0FF",
      contrastText: COLORS.primary,
    },
  },
});
export const lightTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: COLORS.lightText,
      darker: COLORS.primaryDark,
    },
    secondary:{
      main: "#EFF0FF",
      contrastText: COLORS.primary,
    },
    neutral: {
      main: "#EFF0FF",
      contrastText: COLORS.primary,
    },
  },
});
