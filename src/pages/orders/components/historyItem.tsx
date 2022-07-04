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
        gap: 2,
      }}
    >
      <Grid item xs={2} sx={{ color: COLORS.lightText }}>
        {DateUtils.getTimeDifference(new Date(item.createdDate), new Date(), language)}
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ color: direction === "left" ? COLORS.primary : COLORS.red, marginRight: 2 }}>
          {item.createdBy === "anonymousUser" ? "Ẩn danh" : item.createdBy}
          {": "}
        </Box>
        <Box>{item.message}</Box>
      </Grid>
    </Grid>
  );
};
