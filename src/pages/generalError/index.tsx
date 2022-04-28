import { Box, Link, Paper, Typography } from "@mui/material";
import { COLORS } from "styles";

function GeneralErrorPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          paddingBottom: "150px",
          backgroundImage: "url(/images/robot404.svg)",
          backgroundSize: "25%",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "55%",
          // maxWidth: "230px",
          //maxHeight: "1000px",
          //   height: "200px",
          //   width: "400px",
          objectFit: "cover",
          width: "100%",
          height: "50%",
        }}
      ></Paper>

      <Typography
      fontSize={36}
      fontWeight={700}
        sx={{
          position: "70%",
        }}
      >
        Oops! Something went wrong
      </Typography>
      <Typography fontWeight={400} color={COLORS.lightText} sx={{marginTop:"10px"}}>We couldn't find the page you were looking for</Typography>
      <Typography fontWeight={400} color={COLORS.lightText}>
        Why not try going back to the <Link href="/home" sx={{textDecoration:"none" }}>homepage</Link>
      </Typography>
    </Box>
  );
}

export default GeneralErrorPage;
