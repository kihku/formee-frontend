/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomerService } from "apis/customerService/customerService";
import { ProductService } from "apis/productService/productService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { Pageable } from "models/baseModels";
import { CustomerDTO, CustomerSearchRequest, initCustomerRequest } from "models/customer";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CellProps, Column, useRowSelect, useTable } from "react-table";
import { closeConfirmation, openConfirmation } from "redux/actions/confirmDialog";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";
import DialogAddCustomer from "./dialogs/addCustomerDialog";

function CustomersPage() {
  const { t } = useTranslation(["commons", "customers"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const dispatch = useDispatch();
  const location = useLocation();

  const [item, setItem] = useState<CustomerDTO>({} as CustomerDTO);
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 10,
  });

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: initCustomerRequest,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const tableContentEng: Column<CustomerDTO>[] = [
    {
      Header: "Customer name",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Phone number",
      accessor: "phone",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.phone}
          </Box>
        );
      },
    },
    {
      Header: "Address",
      accessor: "fullAddress",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.fullAddress}
          </Box>
        );
      },
    },
    {
      Header: "Total orders",
      accessor: "totalOrders",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.totalOrders}
          </Box>
        );
      },
    },
    {
      Header: "Actions",
      accessor: undefined,
      maxWidth: 5,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" sx={{}} onClick={() => {}}>
            <Tooltip title={t("customers:customers_edit")}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setItem(row.original);
                  setOpenEditDialog(true);
                }}
              >
                <CustomIcon name="edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("customers:customers_delete")}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  deleteProduct(row.original);
                }}
              >
                <CustomIcon name="delete" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const tableContentVi: Column<CustomerDTO>[] = [
    {
      Header: "Tên khách hàng",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Số điện thoại",
      accessor: "phone",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.phone}
          </Box>
        );
      },
    },
    {
      Header: "Địa chỉ",
      accessor: "fullAddress",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.fullAddress}
          </Box>
        );
      },
    },
    {
      Header: "Số đơn hàng",
      accessor: "totalOrders",
      maxWidth: 10,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.totalOrders}
          </Box>
        );
      },
    },
    {
      Header: "Thao tác",
      accessor: undefined,
      maxWidth: 5,
      Cell: ({ row }: CellProps<CustomerDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" sx={{}} onClick={() => {}}>
            <Tooltip title={t("customers:customers_edit")}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setItem(row.original);
                  setOpenEditDialog(true);
                }}
              >
                <CustomIcon name="edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("customers:customers_delete")}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  deleteProduct(row.original);
                }}
              >
                <CustomIcon name="delete" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => (currentLanguage === "en" ? tableContentEng : tableContentVi), []);

  const table = useTable(
    {
      columns,
      data: customers,
    },
    useRowSelect,
  );

  async function handleSubmitForm(values: CustomerSearchRequest) {
    await new CustomerService().filterCustomers(values).then(response => {
      if (response.result) {
        setCustomers(
          response.result.content.map((customer: any) => {
            if (!StringUtils.isNullOrEmty(customer.address)) {
              let rawAddress = JSON.parse(customer.address);
              let head = rawAddress[0];
              let tail = [...rawAddress]
                .filter((item, index) => index !== 0)
                .map(item => item.name_)
                .join(", ");
              customer["fullAddress"] = [head, tail].join(", ");
            }
            return customer;
          }),
        );
        setPageParams({ ...pageParams, total: response.result.totalElements });
      }
    });
  }

  const deleteProduct = async (product: CustomerDTO) => {
    dispatch(
      openConfirmation({
        id: "confirmDialog",
        open: true,
        title: "Xóa khách hàng",
        content: "Bạn có chắc chắn muốn xóa khách hàng " + product.name + "?",
        value: "",
        onClose: isOk => handleCloseDelete(Boolean(isOk), product.uuid),
      }),
    );
  };

  const handleCloseDelete = async (isOk: boolean, customerId: any) => {
    if (isOk) {
      await new CustomerService().deleteById(customerId).then(response => {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        formik.handleSubmit();
      });
    }
    dispatch(closeConfirmation());
  };

  useEffect(() => {
    formik.handleSubmit();
  }, [pageParams.pageNumber, pageParams.pageSize]);

  useEffect(() => {
    CommonUtils.setPageTitle(currentLanguage === "en" ? "Customers" : "Khách hàng");
  }, []);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box>{t("helper_filters")}</Box>
              <Tooltip title={t("helper_filters_clear")}>
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
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <StyledInput
              fullWidth
              type="text"
              name="keywords"
              placeholder={t("helper_search")}
              value={formik.values.keywords}
              onChange={e => formik.setFieldValue("keywords", e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              // marginTop: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <CustomButton
              text="commons:button_apply"
              type="rounded-outlined"
              startIcon="checkCircle"
              handleOnClick={() => {
                formik.handleSubmit();
              }}
            />
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
              <CustomTitle text={[{ text: t("customers:customers_title"), highlight: true }]} />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton
                  text={t("customers:customers_create")}
                  type="rounded-outlined"
                  startIcon="lightAdd"
                  color={COLORS.lightText}
                  handleOnClick={() => {
                    setItem({} as CustomerDTO);
                    setOpenEditDialog(true);
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto" padding={-2}>
              <CustomTable
                pointerOnHover
                highlightOnHover
                showCheckbox={false}
                data={customers}
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
                  setOpenEditDialog(true);
                }}
              />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
        {openEditDialog && (
          <DialogAddCustomer
            itemEdit={item}
            openDialog={openEditDialog}
            handleCloseDialog={() => {
              setOpenEditDialog(false);
              formik.handleSubmit();
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default CustomersPage;
