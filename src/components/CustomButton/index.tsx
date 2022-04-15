import { Button } from "@mui/material";
import { IconType } from "components/CustomIcon";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//export type ButtonType = "filled" | "outlineRounded" | "filledRounded";

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

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: COLORS.primary,
      darker: COLORS.primaryDark,
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

interface CustomButtonProps {
  text: string;
  link?: string;
  icon?: IconType;
  //type?: ButtonType;
}
export const CustomButton = ({ text, link, icon /*type*/ }: CustomButtonProps) => {
  // const ButtonType = type ?? "filled";
  // switch (ButtonType) {
  //   case "filled":
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        startIcon={<CustomIcon name={icon as IconType} color="white" size={20} />}
        onClick={() => {
          alert("clicked");
        }}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
  //}
};
