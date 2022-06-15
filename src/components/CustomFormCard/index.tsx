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
        flexDirection: "column",
      }}
    >
      <Card elevation={0} sx={cardstyle}>
        <CardActionArea
          onClick={() => {
            handleOnClick
              ? handleOnClick()
              : navigate("/order/create", {
                  state: {
                    formId: item.uuid,
                  },
                });
          }}
        >
          <CardMedia
            component="img"
            height="250px"
            image={item.image ? `data:image/png;base64,${item.image}` : "/images/Ramen-amico.svg"}
            alt="form image"
          />
        </CardActionArea>
      </Card>
      <Box>
        <Typography fontSize={20} sx={{ marginTop: 2 }}>
          {item.name}
        </Typography>
      </Box>
    </Box>
  );
};
