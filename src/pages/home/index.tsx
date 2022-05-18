import { Box, Typography, Zoom } from "@mui/material";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomFormCard } from "components/CustomFormCard";
import { exampleTemplates1, exampleTemplates2 } from "constants/constants";
import { FormDTO } from "models/form";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingX: 5,
        paddingY: 5,
        // width: "100vw",
        // height: "100vh",
      }}
    >
      <CustomBackgroundCard sizeX={"100%"} sizeY={"auto"} padding={-2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: 4,
          }}
        >
          <Typography sx={{ marginTop: "2%", fontSize: "25px", fontWeight: 600, color: COLORS.primary }}>
            Start a new order
          </Typography>
          <Typography
            sx={{
              marginTop: "2%",
              marginRight: "2%",
              fontSize: "18px",
              color: COLORS.lightText,
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate("/gallery");
            }}
          >
            View gallery
          </Typography>
        </Box>
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
          {exampleTemplates1.map((template, key) => {
            return (
              <Zoom key={key} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                <div>
                  <CustomFormCard item={template} />
                </div>
              </Zoom>
            );
          })}
        </Box>
        <Typography
          sx={{
            paddingX: "2%",
            paddingTop: "2%",
            fontSize: "25px",
            fontWeight: 600,
            color: COLORS.primary,
          }}
        >
          Recent
        </Typography>
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
          {exampleTemplates2.map((template, key) => {
            return (
              <Zoom key={key} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                <div>
                  <CustomFormCard  item={template} />
                </div>
              </Zoom>
            );
          })}
        </Box>
      </CustomBackgroundCard>
    </Box>
  );
}
export default HomePage;
