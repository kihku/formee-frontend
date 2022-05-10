import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { CustomChip } from "components/CustomChip";
import { FormDTO } from "models/form";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";

interface FormCardProps {
  item: FormDTO;
  handleOnClick?: () => void;
}

export const CustomFormCard = ({ item, handleOnClick }: FormCardProps) => {
  const navigate = useNavigate();

  const cardstyle = {
    borderRadius: 5,
    border: "2.5px solid " + COLORS.primary,
    maxWidth: 400,
    maxHeight: 200,
  };

  return (
    <Box
      sx={{
        display: "flex",
        //alignItems:"center",
        flexDirection: "column",
      }}
    >
      <Card elevation={0} sx={cardstyle}>
        <CardActionArea
          onClick={() => {
            handleOnClick ? handleOnClick() : navigate("/form/create");
          }}
        >
          <CardMedia
            component="img"
            height="250px"
            image={item.image ? item.image : "/images/Ramen-amico.svg"}
            alt="form image"
          />
        </CardActionArea>
      </Card>
      <Box>
        <Box sx={{ marginY: 2, gap: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
          {item.tags &&
            item.tags.map((tag, key) => {
              return (
                <CustomChip
                  key={key}
                  text={tag}
                  textColor={tag === "New" ? COLORS.orange : COLORS.green}
                  backgroundColor={tag === "New" ? COLORS.orangeBackground : COLORS.greenBackground}
                />
              );
            })}
        </Box>
        <Typography fontSize={20}>{item.name}</Typography>
      </Box>
    </Box>
  );
};
