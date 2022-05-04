import { Box, Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { useFormik } from "formik";
import { CustomCheckbox } from "components/CustomCheckbox";
import { exampleForm, exampleResponses, orderStatusList } from "constants/constants";
import { CustomOption, Pageable } from "models/baseModels";
import { CustomButton } from "components/CustomButton";
import { useEffect, useMemo, useState } from "react";
import { FormDTO, FormResponseDTO } from "models/form";
import { CellProps, Column, useTable } from "react-table";
import DateUtils from "utils/dateUtils";
import CustomTable from "components/CustomTable";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomChip } from "components/CustomChip";
import { useTranslation } from "react-i18next";
import DialogOrderDetails from "./dialogs/dialogDetails";

function OrdersPage() {
  const formName = "Form ABC";
  const { t } = useTranslation(["commons", "buttons"]);

  const [form, setForm] = useState<FormDTO>(exampleForm);
  const [responses, setResponses] = useState<FormResponseDTO[]>(exampleResponses);
  const [item, setItem] = useState<FormResponseDTO>({} as FormResponseDTO);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
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
            size={20}
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

  const getColumns = (): Column<FormResponseDTO>[] => {
    let result: Column<FormResponseDTO>[] = [];
    form.layout.sections.forEach(section => {
      section.components.forEach((component, index) => {
        if (component.showOnTable) {
          result.push({
            Header: component.title,
            accessor: String(index),
            maxWidth: 10,
            Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
              switch (component.type) {
                case "TEXT":
                  return (
                    <Box display="flex" justifyContent="center">
                      {row.original.response[index]}
                    </Box>
                  );
                case "STATUS":
                  return (
                    <Box display="flex" justifyContent="center">
                      <CustomChip
                        text={orderStatusList.find(item => item.value === row.original.response[index])?.title}
                        backgroundColor={
                          orderStatusList.find(item => item.value === row.original.response[index])?.backgroundColor
                        }
                        textColor={orderStatusList.find(item => item.value === row.original.response[index])?.color}
                      />
                    </Box>
                  );
              }
            },
          } as Column<FormResponseDTO>);
        }
      });
    });
    // form.layout.components
    return result;
  };

  const tableContent: Column<FormResponseDTO>[] = [
    {
      Header: "Order ID",
      accessor: "id",
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Tooltip title={t("table_view_details")}>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                handleOpenDetailDialog(row.original);
              }}
            >
              {row.original.id}
            </Box>
          </Tooltip>
        );
      },
    },
    ...getColumns(),
    {
      Header: "Created Date",
      accessor: "createdDate",
      maxWidth: 10,
      Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {DateUtils.toDDMMYYYY(row.original.createdDate)}
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => tableContent, []);

  const table = useTable({
    columns,
    data: responses,
  });

  async function handleSubmitForm(values: any) {
    console.log("values", values);
  }

  const handleOpenDetailDialog = (item: FormResponseDTO) => {
    setItem(item);
    setOpenDetailDialog(true);
  };

  useEffect(() => {
    setResponses(exampleResponses);
    setPageParams({ ...pageParams, total: exampleResponses.length });
  }, []);

  useEffect(() => {
    setResponses(
      exampleResponses.slice(
        pageParams.pageNumber * pageParams.pageSize,
        (pageParams.pageNumber + 1) * pageParams.pageSize,
      ),
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
                  { text: formName, highlight: false },
                  { text: "/", highlight: true },
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
                showCheckbox
                highlightOnHover
                data={responses}
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
        {openDetailDialog && (
          <DialogOrderDetails
            form={form}
            response={item}
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
