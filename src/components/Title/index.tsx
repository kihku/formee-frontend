import { Box } from "@mui/material";
import { TextItem } from "../../models/textItem";
import { LightTextColor, PrimaryColor } from "../../styles";
interface TitleProps {
  text: TextItem[];
}

export const Title = (props: TitleProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {props.text.map(item => {
        return (
          <Box sx={{ fontWeight: item.highlight ? 700 : 400, color: item.highlight ? PrimaryColor : LightTextColor, textDecoration: item.highlight ? "underline": "" }}>
            {item.text}
          </Box>
        );
      })}
    </Box>
  );
};
