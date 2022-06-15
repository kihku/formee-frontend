import { Avatar, Box } from "@mui/material";
import { CommentDTO } from "models/comment";
import { COLORS } from "styles";
import DateUtils from "utils/dateUtils";

interface HistoryItemProps {
  item: CommentDTO;
  direction: "right" | "left";
}

export const HistoryItem = ({ item, direction }: HistoryItemProps) => {
  return (
    <Box
      sx={{
        paddingY: 1,
        display: "flex",
        alignItems: "flex-end",
        flexDirection: direction === "left" ? "row" : "row-reverse",
      }}
    >
      <Avatar sx={{ backgroundColor: direction === "left" ? COLORS.primaryLight : COLORS.red }}>
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
      </Box>
    </Box>
  );
};
