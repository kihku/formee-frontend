import { Box, Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { useFormik } from "formik";
import { CustomCheckbox } from "components/CustomCheckbox";
import { orderList, orderStatusList } from "constants/constants";
import { CustomOption, Pageable } from "models/baseModels";
import { CustomButton } from "components/CustomButton";
import { useEffect, useMemo, useState } from "react";
import { OrderDTO } from "models/orders";
import { CellProps, Column, useTable } from "react-table";
import DateUtils from "utils/dateUtils";
import CustomTable from "components/CustomTable";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomChip } from "components/CustomChip";
import { useTranslation } from "react-i18next";

function OrdersPage() {
  const { t } = useTranslation(["commons", "buttons"]);

  const [data, setData] = useState<OrderDTO[]>(orderList);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 10,
  });

  const openMenuExport = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: { status: [], createdDate: new Date() },
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsFilterProps<any, CustomOption>[] = [
    {
      label: "Order status",
      name: "status",
      type: "checkbox",
      options: orderStatusList,
      Component: () => {
        return (
          <CustomCheckbox
            options={orderStatusList}
            chosenValues={formik.values.status}
            handleOnChange={e => {
              if (formik.values.status.every(item => item !== e.target.value)) {
                formik.setFieldValue("status", [...formik.values.status, e.target.value]);
              } else {
                formik.setFieldValue(
                  "status",
                  formik.values.status.filter(item => item !== e.target.value),
                );
              }
            }}
          />
        );
      },
    },
    {
      label: "Created date",
      name: "createdDate",
      type: "picker",
      Component: () => {
        return (
          <CustomTextField
            type="date"
            handleOnChange={e => {
              formik.setFieldValue("createdDate", e.target.value);
            }}
          />
        );
      },
    },
  ];

  const tableContent: Array<Column<OrderDTO>> = [
    {
      Header: "Order ID",
      accessor: "id",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Tooltip title={t("table_view_details")}>
            <Box display="flex" justifyContent="center" sx={{ textDecoration: "underline", cursor: "pointer" }}>
              {row.original.id}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {row.original.customerName}
          </Box>
        );
      },
    },
    {
      Header: "Contact Number",
      accessor: "phoneNumber",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {row.original.phoneNumber}
          </Box>
        );
      },
    },
    {
      Header: "Total",
      accessor: "total",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {row.original.total}
          </Box>
        );
      },
    },
    {
      Header: "Created Date",
      accessor: "createdDate",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {DateUtils.toDDMMYYYY(row.original.createdDate)}
          </Box>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      maxWidth: 10,
      Cell: ({ row }: CellProps<OrderDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            <CustomChip
              text={row.original.status}
              backgroundColor={row.original.statusBackgroundColor}
              textColor={row.original.statusColor}
            />
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => tableContent, []);

  const table = useTable({
    columns,
    data,
  });

  async function handleSubmitForm(values: any) {
    console.log("values", values);
  }

  useEffect(() => {
    setData(orderList);
    setPageParams({ ...pageParams, total: orderList.length });
  }, []);

  useEffect(() => {
    setData(
      orderList.slice(pageParams.pageNumber * pageParams.pageSize, (pageParams.pageNumber + 1) * pageParams.pageSize),
    );
  }, [pageParams]);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            {t("helper_filters")}
          </Grid>
          <Grid item xs={12}>
            <CustomTextField placeholder={t("helper_search")} />
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
              justifyContent: "center",
            }}
          >
            <CustomButton
              text="button_clear"
              type="rounded-outlined"
              startIcon="cancelCircle"
              color={COLORS.lightText}
            />
            <CustomButton text="button_apply" type="rounded-outlined" startIcon="checkCircle" />
          </Grid>
        </Grid>
        <Grid item xs={9.5} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "30px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CustomTitle
                text={[
                  { text: "Form ABC", highlight: false },
                  { text: "/", highlight: false },
                  { text: t("header_orders"), highlight: true },
                ]}
              />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton
                  text="button_import"
                  type="rounded-outlined"
                  startIcon="import"
                  color={COLORS.lightText}
                />
                <CustomButton
                  text="button_export"
                  type="rounded-outlined"
                  startIcon="export"
                  color={COLORS.lightText}
                  handleOnClickMenu={handleOpenMenu}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={openMenuExport}
                  onClose={handleCloseMenu}
                  onClick={handleCloseMenu}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => {}}>Export to Excel</MenuItem>
                  <MenuItem onClick={() => {}}>Export to Word</MenuItem>
                  <MenuItem onClick={() => {}}>Export to PDF</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto" padding={-4}>
              <CustomTable
                data={data}
                table={table}
                columns={columns}
                pageParams={pageParams}
                onChangePageNumber={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: value }));
                }}
                onChangePageSize={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: 0, pageSize: value }));
                }}
              />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default OrdersPage;
