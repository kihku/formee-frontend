import { Box, Link, Paper, Typography } from "@mui/material";

function GeneralErrorPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
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
          backgroundPositionY: "45%",
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
        sx={{
          position: "70%",
        }}
      >
        Oops! Something went wrong
      </Typography>
      <Box>We couldn't find the page you were looking for</Box>
      <Box>
        Why not try back to the <Link>homepage</Link>
      </Box>
    </Box>
  );
}

export default GeneralErrorPage;
