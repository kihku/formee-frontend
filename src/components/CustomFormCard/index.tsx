import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { COLORS } from "styles";

interface FormCardProps {
  image?: string;
  name: string;
}

export const CustomFormCard = ({ name, image }: FormCardProps) => {
  const cardstyle = {
    borderRadius: 5,
    border:"2.5px solid "+COLORS.primary,
   
  };
  const namestyle ={
      margin: "15px",
  }
  return (
    <Box sx={{
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        maxWidth: 400,
        maxHeight: 250,
    }}>
      <Card elevation={0} sx={cardstyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300px"
            image={image ? image : "/images/ImageNotFound.svg"}
            alt="form image"
          />
        </CardActionArea>
      </Card>
      <Typography fontSize={20} sx={namestyle}>{name}</Typography>
    </Box>
  );
};
