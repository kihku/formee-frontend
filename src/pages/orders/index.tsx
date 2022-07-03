import { Box, Grid, IconButton, InputLabel, Menu, MenuItem, Tooltip } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { FormService } from "apis/formService/formService";
import { OrderService } from "apis/orderService/orderService";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomCheckbox } from "components/CustomCheckbox";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import { CustomSelect } from "components/CustomSelect";
import CustomTable from "components/CustomTable";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { editStatusListEng, editStatusListVi, orderStatusListEng, orderStatusListVi } from "constants/constants";
import { useFormik } from "formik";
import { CustomOption, Pageable } from "models/baseModels";
import { FormDTO, FormOrderSearchRequest, FormResponseDTO, initFilterRequest } from "models/form";
import DialogFinishOrder from "pages/createOrder/dialogFinish";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellProps, Column, useRowSelect, useTable } from "react-table";
import { closeConfirmation, openConfirmation } from "redux/actions/confirmDialog";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import DateUtils from "utils/dateUtils";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";

function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["commons", "buttons"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [formList, setFormList] = useState<FormDTO[]>([]);
  const [responses, setResponses] = useState<FormResponseDTO[]>([]);
  const [item, setItem] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 10,
  });

  const openMenuStatus = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<any>, response: FormResponseDTO) => {
    setAnchorEl(event.currentTarget);
    setItem(response);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: initFilterRequest,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsFilterProps<any, CustomOption>[] = [
    {
      label: "Form",
      name: "form",
      type: "select",
      Component: () => {
        return (
          <CustomSelect
            value={formik.values.formId}
            options={formList.map(form => {
              return { title: form.name, value: form.uuid };
            })}
            handleOnChange={e => {
              formik.setFieldValue("formId", e.target.value);
            }}
          />
        );
      },
    },
    {
      label: "Trạng thái",
      name: "orderStatus",
      type: "checkbox",
      Component: () => {
        return (
          <CustomCheckbox
            size={20}
            options={(currentLanguage === "en" ? orderStatusListEng : orderStatusListVi).filter(
              opt => opt.value !== "",
            )}
            chosenValues={formik.values.orderStatus}
            handleOnChange={e => {
              if (formik.values.orderStatus.every(item => item !== e.target.value)) {
                formik.setFieldValue("orderStatus", [...formik.values.orderStatus, e.target.value]);
              } else {
                formik.setFieldValue(
                  "orderStatus",
                  formik.values.orderStatus.filter(item => item !== e.target.value),
                );
              }
            }}
          />
        );
      },
    },
    {
      label: "Ngày tạo",
      name: "createdDate",
      type: "picker",
      Component: () => {
        return (
          <Box>
            <Box>
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {"Từ ngày"}
              </InputLabel>
              <StyledInput
                fullWidth
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={e => formik.setFieldValue("startDate", e.target.value)}
              />
            </Box>
            <Box sx={{ marginY: 2 }}>
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {"Đến ngày"}
              </InputLabel>
              <StyledInput
                fullWidth
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={e => formik.setFieldValue("endDate", e.target.value)}
              />
            </Box>
          </Box>
        );
      },
    },
  ];

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
      Header: "Số điện thoại",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.response[0]}
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
            {row.original.response[1]}
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
            <Tooltip title={"Sao chép đơn hàng"}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleDuplicate(row.original.uuid);
                }}
              >
                <CustomIcon name="duplicate" />
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
                      content: "Liên kết chia sẻ đơn hàng đã được sao chép",
                      severity: "success",
                    }),
                  );
                }}
              >
                <CustomIcon name="copyLink" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Huỷ đơn hàng"}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleCancelOrder(row.original);
                }}
              >
                <CustomIcon name="close" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => tableContent, [form]);

  const table = useTable(
    {
      columns,
      data: responses,
    },
    useRowSelect,
  );

  async function handleSubmitForm(values: FormOrderSearchRequest) {
    getOrders({
      ...values,
      pageNumber: pageParams.pageNumber,
      pageSize: pageParams.pageSize,
      startDate: StringUtils.isNullOrEmty(values.startDate) ? "" : values.startDate + " 00:00:01",
      endDate: StringUtils.isNullOrEmty(values.endDate) ? "" : values.endDate + " 23:59:59",
    });
  }

  const handleChangeStatus = async (status: string) => {
    await new OrderService().updateOrderStatus({ uuid: item.uuid, status: status }).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        formik.handleSubmit();
      }
    });
  };

  const handleDuplicate = async (orderId: string) => {
    await new OrderService().duplicateOrder(orderId).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        formik.handleSubmit();
      } else {
        dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
      }
    });
  };

  const handleExport = async () => {
    await new OrderService()
      .exportOrders({
        ...formik.values,
        startDate: StringUtils.isNullOrEmty(formik.values.startDate) ? "" : formik.values.startDate + " 00:00:01",
        endDate: StringUtils.isNullOrEmty(formik.values.endDate) ? "" : formik.values.endDate + " 23:59:59",
      })
      .then(response => {
        let type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        var blob = new Blob([response], { type: type });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "Danh sách đơn hàng - " + DateUtils.toDDMMYYYY_HH_MM_SS(new Date());
        link.click();
      });
  };

  const handleCancelOrder = async (order: FormResponseDTO) => {
    dispatch(
      openConfirmation({
        id: "confirmDialog",
        open: true,
        title: "Huỷ đơn hàng",
        content: "Bạn có chắc chắn muốn huỷ " + order.orderName + " ?",
        value: "",
        onClose: isOk => handleCloseCancelOrder(Boolean(isOk), order.uuid),
      }),
    );
  };

  const handleCloseCancelOrder = async (isOk: boolean, orderId: string) => {
    if (isOk) {
      await new OrderService().updateOrderStatus({ uuid: orderId, status: "CANCELLED" }).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          formik.handleSubmit();
        } else {
          dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
        }
      });
    }
    dispatch(closeConfirmation());
  };

  const getOrders = async (request: FormOrderSearchRequest) => {
    await new OrderService().filterOrders(request).then(response => {
      if (response.result) {
        setResponses(
          response.result.content.map((item: any) => {
            return { ...item, response: JSON.parse(item.response) };
          }),
        );
        setPageParams({ ...pageParams, total: response.result.totalElements });
      }
    });
  };

  const getFormList = async () => {
    await new FormService().getFormsByUser().then(response => {
      if (response.result) {
        setFormList(response.result);
      }
    });
  };

  useEffect(() => {
    formik.handleSubmit();
  }, [pageParams.pageNumber, pageParams.pageSize]);

  useEffect(() => {
    getFormList();
    formik.handleSubmit();
  }, []);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid container sx={{ position: "sticky", top: 20 }}>
            <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box> {t("helper_filters")}</Box>
                <Tooltip title="Xoá bộ lọc">
                  <IconButton
                    onClick={() => {
                      formik.resetForm();
                      formik.handleSubmit();
                    }}
                  >
                    <CustomIcon name="clearFilter" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <StyledInput
                fullWidth
                type="text"
                name="keywords"
                placeholder={t("helper_search")}
                value={formik.values.keywords}
                onChange={e => formik.setFieldValue("keywords", e.target.value)}
              />
            </Grid>
            <CreateFieldsFilter formik={formik} fields={fields} />
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                text="button_apply"
                type="rounded-outlined"
                startIcon="checkCircle"
                handleOnClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9.5} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <CustomTitle text={[{ text: t("header_orders"), highlight: true }]} />
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <CustomButton
                  text="Xuất danh sách"
                  type="rounded-outlined"
                  startIcon="import"
                  color={COLORS.lightText}
                  handleOnClick={handleExport}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto" padding={-2}>
              <CustomTable
                showCheckbox={false}
                highlightOnHover
                pointerOnHover
                data={responses.slice(
                  pageParams.pageNumber * pageParams.pageSize,
                  (pageParams.pageNumber + 1) * pageParams.pageSize,
                )}
                table={table}
                columns={columns}
                pageParams={pageParams}
                onChangePageNumber={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: value }));
                }}
                onChangePageSize={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: 0, pageSize: value }));
                }}
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
            </CustomBackgroundCard>
          </Grid>
        </Grid>
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
      </Grid>
    </Box>
  );
}
export default OrdersPage;
