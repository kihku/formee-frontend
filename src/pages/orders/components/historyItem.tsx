import { Avatar, Box, Divider, Grid } from "@mui/material";
import { CommentDTO } from "models/comment";
import { COLORS } from "styles";
import DateUtils from "utils/dateUtils";

interface HistoryItemProps {
  item: CommentDTO;
  direction: "right" | "left";
}

export const HistoryItem = ({ item, direction }: HistoryItemProps) => {
  return (
    <Grid
      container
      sx={{
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        // flexDirection: direction === "left" ? "row" : "row-reverse",
      }}
    >
      <Grid item xs={2} sx={{ color: COLORS.lightText }}>
        {DateUtils.getTimeDifference(new Date(item.createdDate), new Date())}
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ color: direction === "left" ? COLORS.primary : COLORS.red, marginRight: 2 }}>
          {item.createdBy}
          {": "}
        </Box>
        <Box>{item.message}</Box>
      </Grid>
      {/* <Divider orientation="vertical" flexItem sx={{ borderBottomWidth: "2px", height: "10px" }} /> */}
      {/* <Avatar sx={{ backgroundColor: direction === "left" ? COLORS.primaryLight : COLORS.red }}>
        {String(item.createdBy[0]).toUpperCase()}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            paddingX: 2,
            paddingY: 1.5,
            marginX: 2,
            marginTop: 1,
            backgroundColor: COLORS.primaryBackground,
            borderRadius: direction === "left" ? "10px 10px 10px 0px" : "10px 10px 0px 10px",
          }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <Box sx={{}}>{item.message}</Box>
          </Box>
          <Box sx={{ fontSize: 12, color: COLORS.lightText, textAlign: direction === "left" ? "end" : "start" }}>
            {DateUtils.getTimeDifference(new Date(item.createdDate), new Date())}
          </Box>
        </Box>
      </Box> */}
    </Grid>
  );
};
