import { Box, Card, CardActionArea, Grid, IconButton, Menu, MenuItem, Tooltip, Typography, Zoom } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomChip } from "components/CustomChip";
import { CustomFormCard } from "components/CustomFormCard";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import { editStatusListEng, editStatusListVi, orderStatusListEng, orderStatusListVi } from "constants/constants";
import { FormDTO, FormResponseDTO } from "models/form";
import DialogFinishOrder from "pages/createOrder/dialogFinish";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellProps, Column, useTable } from "react-table";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import DateUtils from "utils/dateUtils";
import DialogAddForm from "./dialogNewForm";

function HomePage() {
  const { t } = useTranslation(["home", "table"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [item, setItem] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [recentForms, setRecentForms] = useState<FormDTO[]>([]);
  const [openAddFormDialog, setOpenAddFormDialog] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<FormResponseDTO[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);

  const getRecentForms = async () => {
    await new FormService().getRecentForms().then(response => {
      setRecentForms(response.result);
    });
  };

  const openMenuStatus = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<any>, response: FormResponseDTO) => {
    setAnchorEl(event.currentTarget);
    setItem(response);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const tableContentVi: Column<FormResponseDTO>[] = [
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
      Header: "Trạng thái",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box
            display="flex"
            justifyContent="left"
            onClick={e => {
              e.stopPropagation();
              row.original.status !== "CANCELLED" && handleOpenMenu(e, row.original);
            }}
          >
            <CustomChip
              isSelect={row.original.status !== "CANCELLED"}
              clickable={row.original.status !== "CANCELLED"}
              text={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.title
              }
              backgroundColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.backgroundColor
              }
              textColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.color
              }
            />
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
            <Tooltip title={"Chỉnh sửa đơn hàng"}>
              <IconButton
                disabled={row.original.status === "CANCELLED"}
                onClick={e => {
                  e.stopPropagation();
                  row.original.status !== "CANCELLED" &&
                    navigate("/order/edit", {
                      state: {
                        orderId: row.original.uuid,
                      },
                    });
                }}
              >
                <CustomIcon name={row.original.status !== "CANCELLED" ? "edit" : "disableEdit"} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Sao chép liên kết"}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${URL_PROFILE.WEB}/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`,
                  );
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

  const tableContentEng: Column<FormResponseDTO>[] = [
    {
      Header: "Order name",
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
      Header: "Customer name",
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
      Header: "Status",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box
            display="flex"
            justifyContent="left"
            onClick={e => {
              e.stopPropagation();
              row.original.status !== "CANCELLED" && handleOpenMenu(e, row.original);
            }}
          >
            <CustomChip
              isSelect={row.original.status !== "CANCELLED"}
              clickable={row.original.status !== "CANCELLED"}
              text={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.title
              }
              backgroundColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.backgroundColor
              }
              textColor={
                (currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).find(
                  item => item.value === row.original.status,
                )?.color
              }
            />
          </Box>
        );
      },
    },
    {
      Header: "Created date",
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
      Header: "Actions",
      accessor: undefined,
      maxWidth: 5,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" sx={{}}>
            <Tooltip title={"Edit order"}>
              <IconButton
                disabled={row.original.status === "CANCELLED"}
                onClick={e => {
                  e.stopPropagation();
                  row.original.status !== "CANCELLED" &&
                    navigate("/order/edit", {
                      state: {
                        orderId: row.original.uuid,
                      },
                    });
                }}
              >
                <CustomIcon name={row.original.status !== "CANCELLED" ? "edit" : "disableEdit"} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Copy link"}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${URL_PROFILE.WEB}/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`,
                  );
                  dispatch(
                    openNotification({
                      open: true,
                      content: "Link to order has been copied to clipboard",
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

  const columns = useMemo(() => (currentLanguage === "en" ? tableContentEng : tableContentVi), []);

  const table = useTable({
    columns,
    data: recentOrders,
  });

  const handleOpenDialog = () => {
    setOpenAddFormDialog(true);
  };

  const handleChangeStatus = async (status: string) => {
    await new OrderService().updateOrderStatus({ uuid: item.uuid, status: status }).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        getRecentOrders();
      }
    });
  };

  const getRecentOrders = async () => {
    await new OrderService().getRecentOrders().then(response => {
      if (response.result) {
        setRecentOrders(response.result);
      }
    });
  };

  useEffect(() => {
    getRecentOrders();
    getRecentForms();
    console.log(currentLanguage);
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
        <Grid container sx={{ paddingBottom: 3 }}>
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
              <Typography
                sx={{ marginY: "2%", fontSize: "25px", fontWeight: 600, color: COLORS.primary, alignItems: "center" }}
              >
                {t("home_order_new")}
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
              <Grid item xs={4} sx={{ paddingX: 2, paddingY: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 5,
                      border: "2.5px solid " + COLORS.primary,
                      height: "150px",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        handleOpenDialog();
                      }}
                      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
                    >
                      <CustomIcon name="lightAdd" size={100} color={COLORS.primary} />
                    </CardActionArea>
                  </Card>
                  <Box>
                    <Typography fontSize={20} sx={{ marginTop: 2, color: COLORS.primary }}>
                      {t("home_order_create")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingX: 4,
              }}
            >
              <Typography
                sx={{
                  paddingX: "2%",
                  marginY: "2%",
                  fontSize: "25px",
                  fontWeight: 600,
                  color: COLORS.primary,
                }}
              >
                {t("home_order_recent")}
              </Typography>
              <Box
                onClick={() => {
                  navigate("/orders");
                }}
                sx={{ marginY: "2%", display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: COLORS.lightText,
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  {t("home_order_view_all")}
                </Typography>
                <IconButton>
                  <CustomIcon name={"rightArrow"} />
                </IconButton>
              </Box>
            </Box>

            <Grid
              container
              sx={{
                paddingX: "4%",
                paddingTop: "1%",
              }}
            >
              <CustomTable
                highlightOnHover
                pointerOnHover
                showCheckbox={false}
                data={recentOrders}
                table={table}
                columns={columns}
                onClickRow={(row: any) => {
                  setItem(row.original);
                  setOpenDetailDialog(true);
                }}
              />

              <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={openMenuStatus}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {(currentLanguage === "en" ? editStatusListEng : editStatusListVi).map(status => {
                  return (
                    <MenuItem
                      onClick={e => {
                        handleChangeStatus(status.value);
                      }}
                    >
                      {status.title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </CustomBackgroundCard>
      {openAddFormDialog && (
        <DialogAddForm
          openDialog={openAddFormDialog}
          handleCloseDialog={() => {
            setOpenAddFormDialog(false);
          }}
        />
      )}
      {openDetailDialog && (
        <DialogFinishOrder
          orderName={item.orderName}
          responseId={item.uuid}
          openDialog={openDetailDialog}
          handleCloseDialog={() => {
            setOpenDetailDialog(false);
          }}
        />
      )}
    </Box>
  );
}
export default HomePage;
