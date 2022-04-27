import { Box } from "@mui/material";
import { TextItem } from "models/textItem";
import { COLORS } from "styles";
interface CustomTitleProps {
  text: TextItem[];
}

export const CustomTitle = (props: CustomTitleProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {props.text.map((item, key) => {
        return (
          <Box
            key={key}
            sx={{
              ":hover": {
                color: item.highlight ? COLORS.text : COLORS.primary,
                textDecoration: item.highlight ? "" : "underline",
                cursor: item.highlight ? "auto" : "pointer",
              },
              fontWeight: item.highlight ? 700 : 400,
              color: COLORS.text,
              paddingRight: 0.75,
            }}
          >
            {item.text}
          </Box>
        );
      })}
    </Box>
  );
};
