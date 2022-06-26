import { Box, IconButton, SxProps } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { TextItem } from "models/textItem";
import { COLORS } from "styles";
interface CustomTitleProps {
  text: TextItem[];
  style?: SxProps;
}

export const CustomTitle = (props: CustomTitleProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {props.text.map((item, key) => {
        return (
          <Box
            key={key}
            sx={{
              fontWeight: item.highlight ? 700 : 400,
              color: COLORS.text,
              paddingRight: 0.75,
              ...props.style,
            }}
          >
            {item.text}
            {key === 0 && item.editable && (
              <IconButton sx={{ marginLeft: 0.75 }}>
                <CustomIcon name="edit" />
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
