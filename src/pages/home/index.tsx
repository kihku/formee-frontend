import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography, Zoom } from "@mui/material";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import { TemplateService } from "apis/template/templateService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomChip } from "components/CustomChip";
import { CustomFormCard } from "components/CustomFormCard";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import { editStatusList, orderStatusList } from "constants/constants";
import { FormDTO, FormResponseDTO } from "models/form";
import DialogFinishOrder from "pages/createOrder/dialogFinish";
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
  const [item, setItem] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [recentForms, setRecentForms] = useState<FormDTO[]>([]);
  const [chosenItem, setChosenItem] = useState<FormDTO>({} as FormDTO);
  const [openTemplateDialog, setOpenTemplateDialog] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<FormResponseDTO[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);

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

  const openMenuStatus = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<any>, response: FormResponseDTO) => {
    setAnchorEl(event.currentTarget);
    setItem(response);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // const handleOpenDialog = (item: FormDTO) => {
  //   setChosenItem(item);
  //   setOpenTemplateDialog(true);
  // };

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
    // {
    //   Header: "Địa chỉ",
    //   accessor: undefined,
    //   maxWidth: 10,
    //   Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
    //     return (
    //       <Box display="flex" justifyContent="left">
    //         {JSON.parse(row.original.response).at(2)}
    //       </Box>
    //     );
    //   },
    // },
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
              handleOpenMenu(e, row.original);
            }}
          >
            <CustomChip
              isSelect
              clickable
              text={orderStatusList.find(item => item.value === row.original.status)?.title}
              backgroundColor={orderStatusList.find(item => item.value === row.original.status)?.backgroundColor}
              textColor={orderStatusList.find(item => item.value === row.original.status)?.color}
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
            <Tooltip title={"Edit order"}>
              <IconButton
                disabled={row.original.status === "COMPLETED" || row.original.status === "CANCELLED"}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/order/edit", {
                    state: {
                      orderId: row.original.uuid,
                    },
                  });
                }}
              >
                <CustomIcon
                  name={
                    row.original.status === "COMPLETED" || row.original.status === "CANCELLED" ? "disableEdit" : "edit"
                  }
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Copy order link"}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
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

  const columns = useMemo(() => tableContent, []);

  const table = useTable({
    columns,
    data: recentOrders,
  });

  const handleOpenDialog = (item: FormDTO) => {
    setChosenItem(item);
    setOpenTemplateDialog(true);
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
                Tạo đơn hàng mới
              </Typography>
              <Box
                onClick={() => {
                  handleOpenDialog({
                    isDefault: true,
                    layoutJson: "",
                    userId: getCookie("USER_ID"),
                  } as FormDTO);
                }}
                sx={{ marginY: "2%", display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    marginTop: "2%",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: COLORS.lightText,
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  Tạo form mới
                </Typography>
                <IconButton>
                  <CustomIcon name={"lightAdd"} />
                </IconButton>
              </Box>
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
                Đơn hàng gần đây
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
                  {"Xem tất cả"}
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
                {editStatusList.map(status => {
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
      {openTemplateDialog && (
        <DialogFormTemplate
          item={chosenItem}
          openDialog={openTemplateDialog}
          handleCloseDialog={() => {
            setOpenTemplateDialog(false);
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
