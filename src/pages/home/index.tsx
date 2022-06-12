import { Box, Grid, Typography, Zoom } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { TemplateService } from "apis/template/templateService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomFormCard } from "components/CustomFormCard";
import { FormDTO } from "models/form";
import DialogFormTemplate from "pages/formGallery/dialogTemplate";
import { useEffect, useState } from "react";
import { COLORS } from "styles";
import { getCookie } from "utils/cookieUtils";

function HomePage() {
  const userId = getCookie("USER_ID");

  const [templates, setTemplates] = useState<FormDTO[]>([]);
  const [recentForms, setRecentForms] = useState<FormDTO[]>([]);
  const [chosenItem, setChosenItem] = useState<FormDTO>({} as FormDTO);
  const [openTemplateDialog, setOpenTemplateDialog] = useState<boolean>(false);

  const getFormTemplates = async () => {
    await new TemplateService().getTemplateGallery().then(response => {
      setTemplates(response.result);
    });
  };

  const getRecentForms = async () => {
    await new FormService().getRecentForms(userId).then(response => {
      setRecentForms(response.result);
    });
  };

  const handleOpenDialog = (item: FormDTO) => {
    setChosenItem(item);
    setOpenTemplateDialog(true);
  };

  useEffect(() => {
    getFormTemplates();
    getRecentForms();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingX: 5,
        paddingY: 5,
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
        </Box>
        <Grid
          container
          sx={{
            paddingX: "4%",
            paddingTop: "2%",
          }}
        >
          {templates.map((template, key) => {
            return (
              <Zoom key={key} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                <Grid item xs={2} sx={{ paddingX: 1.5 }}>
                  <CustomFormCard
                    item={template}
                    handleOnClick={() => {
                      handleOpenDialog(template);
                    }}
                  />
                </Grid>
              </Zoom>
            );
          })}
        </Grid>
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
        <Grid
          container
          sx={{
            paddingX: "4%",
            paddingY: "2%",
          }}
        >
          {recentForms.map((template, key) => {
            return (
              <Zoom key={key} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                <Grid item xs={2} sx={{ paddingX: 1.5 }}>
                  <CustomFormCard item={template} />
                </Grid>
              </Zoom>
            );
          })}
        </Grid>
      </CustomBackgroundCard>
      {openTemplateDialog && (
        <DialogFormTemplate
          item={chosenItem}
          openDialog={openTemplateDialog}
          handleCloseDialog={() => {
            setOpenTemplateDialog(false);
          }}
        />
      )}
    </Box>
  );
}
export default HomePage;
