import { Avatar, Box } from "@mui/material";
import { CommentDTO } from "models/form";
import { COLORS } from "styles";
import DateUtils from "utils/dateUtils";

interface FormCartProps {
  comments: CommentDTO[];
  direction: "right" | "left";
}

export const HistoryItem = ({ comments, direction }: FormCartProps) => {
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
        {comments[0].createdBy}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {comments.map((comment, key) => {
          return (
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
                {!comment.isDefault && <Box>{"Commented: "}</Box>}
                <Box
                  sx={{
                    color: comment.isDefault ? COLORS.text : COLORS.primary,
                  }}
                >
                  {comment.content}
                </Box>
              </Box>
              <Box sx={{ fontSize: 12, color: COLORS.lightText, textAlign: direction === "left" ? "end" : "start" }}>
                {DateUtils.getTimeDifference(comment.createDate, new Date())}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
