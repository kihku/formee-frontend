import { Box, Grid } from "@mui/material";
import { CommentDTO } from "models/comment";
import { COLORS } from "styles";
import DateUtils from "utils/dateUtils";

interface HistoryItemProps {
  item: CommentDTO;
  direction: "right" | "left";
  language: string;
}

export const HistoryItem = ({ item, direction, language }: HistoryItemProps) => {
  return (
    <Grid
      container
      sx={{
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, md: 0 },
      }}
    >
      <Grid item xs={12} md={2} sx={{ color: COLORS.lightText }}>
        {DateUtils.getTimeDifference(new Date(item.createdDate), new Date(), language)}
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            color: direction === "left" ? COLORS.primary : COLORS.red,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item.createdBy === "anonymousUser" ? "Ẩn danh" : item.createdBy}
          {": "}
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
        {item.message}
      </Grid>
    </Grid>
  );
};
