import { Card, CardActionArea, CardMedia } from "@mui/material";
import { defaultColorList } from "constants/constants";
import { COLORS } from "styles";

interface FormCardPreviewProps {
  image: string;
  color: string;
  chosen: boolean;
  handleOnClick: () => void;
}

export const CustomFormCardPreview = ({ image, color, chosen, handleOnClick }: FormCardPreviewProps) => {
  const cardstyle = {
    borderRadius: 5,
    border: "2.5px solid " + (chosen ? defaultColorList.find(item => item.title === color)?.value : COLORS.white),
    width: 120,
    height: 120,
  };

  return (
    <Card elevation={0} sx={cardstyle}>
      <CardActionArea
        onClick={() => {
          handleOnClick();
        }}
      >
        <CardMedia component="img" width="100%" image={`/images/default/${color}/${image}.svg`} alt="form image" />
      </CardActionArea>
    </Card>
  );
};
