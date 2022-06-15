import { Box, Grid, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import { TemplateService } from "apis/template/templateService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomChip } from "components/CustomChip";
import { CustomFormCard } from "components/CustomFormCard";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import { orderStatusList } from "constants/constants";
import { FormDTO, FormResponseDTO } from "models/form";
import DialogFormTemplate from "pages/formGallery/dialogTemplate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellProps, Column, useTable } from "react-table";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import { getCookie } from "utils/cookieUtils";
import DateUtils from "utils/dateUtils";

function HomePage() {
  const userId = getCookie("USER_ID");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [templates, setTemplates] = useState<FormDTO[]>([]);
  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [recentForms, setRecentForms] = useState<FormDTO[]>([]);
  const [chosenItem, setChosenItem] = useState<FormDTO>({} as FormDTO);
  const [openTemplateDialog, setOpenTemplateDialog] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<FormResponseDTO[]>([]);

  // const getFormTemplates = async () => {
  //   await new TemplateService().getTemplateGallery().then(response => {
  //     setTemplates(response.result);
  //   });
  // };

  const getRecentForms = async () => {
    await new FormService().getRecentForms(userId).then(response => {
      setRecentForms(response.result);
    });
  };

  // const handleOpenDialog = (item: FormDTO) => {
  //   setChosenItem(item);
  //   setOpenTemplateDialog(true);
  // };

  const getColumns = (): Column<FormResponseDTO>[] => {
    let result: Column<FormResponseDTO>[] = [];
    let index = 0;
    if (form.layoutJson) {
      let layout: any = JSON.parse(String(form.layoutJson));
      layout.sections.forEach((section: any) => {
        section.components.forEach((component: any) => {
          if (component.showOnTable) {
            let idx = index;
            result.push({
              Header: component.title,
              accessor: String(idx),
              maxWidth: 10,
              Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
                switch (component.type) {
                  case "ADDRESS":
                  case "TEXT":
                    return (
                      <Box display="flex" justifyContent="left">
                        {row.original.response[idx]}
                      </Box>
                    );
                  case "STATUS":
                    return (
                      <Box display="flex" justifyContent="left">
                        <CustomChip
                          text={orderStatusList.find(item => item.value === row.original.response[idx])?.title}
                          backgroundColor={
                            orderStatusList.find(item => item.value === row.original.response[idx])?.backgroundColor
                          }
                          textColor={orderStatusList.find(item => item.value === row.original.response[idx])?.color}
                        />
                      </Box>
                    );
                }
              },
            } as Column<FormResponseDTO>);
          }
          ++index;
        });
      });
    }
    return result;
  };

  const tableContent: Column<FormResponseDTO>[] = [
    {
      Header: "Tên đơn hàng",
      accessor: "orderName",
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.orderName}
          </Box>
        );
      },
    },
    {
      Header: "Tên người mua",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {JSON.parse(row.original.response).at(1)}
          </Box>
        );
      },
    },
    {
      Header: "Địa chỉ",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {JSON.parse(row.original.response).at(2)}
          </Box>
        );
      },
    },
    {
      Header: "Ngày tạo",
      accessor: "createdDate",
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {DateUtils.toDDMMYYYY(row.original.createdDate)}
          </Box>
        );
      },
    },
    {
      Header: "Thao tác",
      accessor: undefined,
      maxWidth: 5,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" sx={{}}>
            <Tooltip title={"Edit order"}>
              <IconButton
                onClick={() => {
                  navigate("/order/edit", {
                    state: {
                      // formId: form.uuid,
                      orderId: row.original.uuid,
                    },
                  });
                }}
              >
                <CustomIcon name="edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Copy order link"}>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(`localhost:3000/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`);
                  dispatch(
                    openNotification({
                      open: true,
                      content: "Đường dẫn liên kết đã được sao chép",
                      severity: "success",
                    }),
                  );
                }}
              >
                <CustomIcon name="copyLink" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  // console.log(tableContent);

  const columns = useMemo(() => tableContent, []);

  const table = useTable({
    columns,
    data: recentOrders,
  });

  // const getForm = async (formId: string) => {
  //   await new FormService().getFormById(formId).then(response => {
  //     if (response.result) {
  //       setForm(response.result);
  //       // formik.setFieldValue("formId", response.result.uuid);
  //     }
  //   });
  // };

  const getRecentOrders = async () => {
    await new OrderService().getRecentOrders().then(response => {
      if (response.result) {
        setRecentOrders(response.result);
      }
    });
  };

  useEffect(() => {
    // getFormTemplates();
    getRecentOrders();
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
        <Grid container>
          <Grid item xs={5}>
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
                Tạo đơn hàng mới
              </Typography>
            </Box>
            <Grid
              container
              sx={{
                paddingX: "4%",
                paddingTop: "2%",
              }}
            >
              {recentForms.map((form, key) => {
                return (
                  <Zoom key={key} in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                    <Grid item xs={4} sx={{ paddingX: 2, paddingY: 1 }}>
                      <CustomFormCard item={form} />
                    </Grid>
                  </Zoom>
                );
              })}
              <Zoom in style={{ transformOrigin: "50% 50% 0" }} {...{ timeout: 500 }}>
                <Grid item xs={4} sx={{ paddingX: 2, paddingY: 1 }}>
                  <CustomFormCard item={{ name: "Tạo mới" } as FormDTO} />
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Typography
              sx={{
                paddingX: "2%",
                paddingTop: "2%",
                fontSize: "25px",
                fontWeight: 600,
                color: COLORS.primary,
              }}
            >
              Đơn hàng gần đây
            </Typography>
            <Grid
              container
              sx={{
                paddingX: "4%",
                paddingTop: "1%",
              }}
            >
              <CustomTable
                showCheckbox={false}
                highlightOnHover
                data={recentOrders}
                table={table}
                columns={columns}
                onClickRow={(row: any) => {
                  // navigator.clipboard.writeText(`localhost:3000/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`);
                  // dispatch(openNotification({ open: true, content: "Order link copied", severity: "success" }));
                }}
              />
            </Grid>
          </Grid>
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
