import { Box, Typography } from "@mui/material";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomFormCard } from "components/CustomFormCard";
import { COLORS } from "styles";

function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingX: 5, 
        paddingY: 5
        // width: "100vw",
        // height: "100vh",
      }}
    >
      <CustomBackgroundCard sizeX={"100%"} sizeY={"auto"} padding={-3}>
        <Typography sx={{ marginLeft: "4%", marginTop: "2%", fontSize: "25px", fontWeight: 600, color: COLORS.primary }}>Start a new order</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            //justifyContent: "center",
            gap: "3%",
            paddingX: "4%",
            paddingTop: "2%",
          }}
        >
          <CustomFormCard name={"Food"} />
          <CustomFormCard name={"Clothes"} />
          <CustomFormCard name={"Chicken"} />
          <CustomFormCard name={"Fish"} />
          <CustomFormCard name={"Apple"} />
        </Box>
        <Typography sx={{ marginLeft: "4%", marginTop: "2%", fontSize: "25px", fontWeight: 600, color: COLORS.primary }}>Recent</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            alignItems: "center",
            //justifyContent: "center",
            gap: "3%",
            paddingX: "4%",
            paddingY: "2%",
          }}
        >
          <CustomFormCard name={"Food"} />
          <CustomFormCard name={"Clothes"} />
          <CustomFormCard name={"Chicken"} />
          <CustomFormCard name={"Fish"} />
          <CustomFormCard name={"Apple"} />
        </Box>
      </CustomBackgroundCard>
    </Box>
  );
}
export default HomePage;
