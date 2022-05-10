import { Box, Divider, SxProps } from "@mui/material";
import { COLORS } from "styles";

interface FormSectionProps {
  index?: number | string;
  title: string;
  style?: SxProps;
}

export const FormSection = ({ index, title, style }: FormSectionProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
      <Box sx={{ fontWeight: 600, fontSize: "18px", color: COLORS.primary, marginRight: 2, ...style }}>
        {/* {index ?? index + "."}  */}
        {title}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", flexGrow: 1 }}>
        <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
      </Box>
    </Box>
  );
};
