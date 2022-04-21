import { Box, Typography } from "@mui/material";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomFormCard } from "components/CustomFormCard";

function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CustomBackgroundCard sizeX={"88%"} sizeY={"auto"}>
        <Typography sx={{ marginLeft: "4%", marginTop: "2%" }}>Start a new order</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            //justifyContent: "center",
            gap: "3%",
            padding: "4%",
            paddingTop: "2%",
          }}
        >
          <CustomFormCard name={"food"} />
          <CustomFormCard name={"clothes"} />
          <CustomFormCard name={"chicken"} />
          <CustomFormCard name={"fish"} />
          <CustomFormCard name={"apple"} />
        </Box>
        <Typography sx={{ marginLeft: "4%", marginTop: "2%" }}>Recent</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            alignItems: "center",
            //justifyContent: "center",
            gap: "3%",
            padding: "4%",
            paddingTop: "2%",
          }}
        >
          <CustomFormCard name={"food"} />
          <CustomFormCard name={"clothes"} />
          <CustomFormCard name={"chicken"} />
          <CustomFormCard name={"fish"} />
          <CustomFormCard name={"apple"} />
        </Box>
      </CustomBackgroundCard>
    </Box>
  );
}
export default HomePage;
