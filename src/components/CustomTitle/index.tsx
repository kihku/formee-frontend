import { Box } from "@mui/material";
import { TextItem } from "models/textItem";
import { COLORS } from "styles";
interface CustomTitleProps {
  text: TextItem[];
}

export const CustomTitle = (props: CustomTitleProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {props.text.map(item => {
        return (
          <Box
            sx={{
              fontWeight: item.highlight ? 700 : 400,
              color: item.highlight ? COLORS.primary : COLORS.lightText,
              textDecoration: item.highlight ? "underline" : "",
            }}
          >
            {item.text}
          </Box>
        );
      })}
    </Box>
  );
};
