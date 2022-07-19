/* eslint-disable jsx-a11y/alt-text */
import { Box, Collapse, Grid, IconButton } from "@mui/material";
import { CustomTitle } from "components/CustomTitle";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonUtils from "utils/commonUtils";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { COLORS } from "styles";
import { helpListEng, helpListVi } from "constants/help";

function HelpPage() {
  const { t } = useTranslation(["help"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const [expanded, setExpanded] = useState<boolean[]>(Array.from({ length: helpListEng.length }, () => false));

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Frequently asked questions" : "Những câu hỏi thường gặp");
  }, []);

  return (
    <Grid container sx={{ paddingY: 5, paddingX: 3, display: "flex", justifyContent: "space-between" }}>
      <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "30px", marginBottom: 4, paddingX: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <CustomTitle text={[{ text: t("help_title"), highlight: true }]} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          paddingX: 30,
        }}
      >
        {(currentLanguage === "en" ? helpListEng : helpListVi).map((item, index) => {
          return (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  paddingBottom: 0.5,
                }}
                onClick={() => {
                  setExpanded(expanded.map((item, idx) => (idx === index ? !item : item)));
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                  <Box sx={{ fontWeight: 600, fontSize: "20px", color: COLORS.primary }}>
                    {index + 1} {". "} {item.question}
                  </Box>
                </Box>
                <IconButton>
                  <ExpandMoreRoundedIcon
                    sx={{ transform: expanded[index] ? "rotate(180deg)" : "rotate(0)", transition: "all 0.15s linear" }}
                  />
                </IconButton>
              </Box>
              <Collapse in={expanded[index]} timeout={400 * (item.imagePath.length / 2)}>
                {item.answer.map(ans => (
                  <Box sx={{ paddingY: 0.25 }}>{ans}</Box>
                ))}
                {item.imagePath.map(image => (
                  <Box sx={{ marginTop: 2 }}>
                    <img src={image} width={"100%"} height={"100%"} />
                  </Box>
                ))}
              </Collapse>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}
export default HelpPage;
