import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { useFormik } from "formik";
import { CustomCheckbox } from "components/CustomCheckbox";
import { orderStatusList } from "constants/constants";
import { CustomOption, Pageable } from "models/baseModels";
import { CustomButton } from "components/CustomButton";
import { useEffect, useMemo, useState } from "react";
import { FormDTO, FormResponseDTO } from "models/form";
import { CellProps, Column, useRowSelect, useTable } from "react-table";
import DateUtils from "utils/dateUtils";
import CustomTable from "components/CustomTable";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomChip } from "components/CustomChip";
import { useTranslation } from "react-i18next";
import DialogOrderDetails from "./dialogs/dialogDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { TemplateService } from "apis/template/templateService";
import { OrderService } from "apis/orderService/orderService";
import CommonUtils from "utils/commonUtils";
import { FormService } from "apis/formService/formService";
import { useDispatch } from "react-redux";
import { openNotification } from "redux/actions/notification";
import { CustomIcon } from "components/CustomIcon";
import { CustomSwitch } from "components/CustomSwitch";

function OrdersPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["commons", "buttons"]);

  const [form, setForm] = useState<FormDTO>({} as FormDTO);
  const [responses, setResponses] = useState<FormResponseDTO[]>([]);
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
    // {
    //   label: "Order status",
    //   name: "status",
    //   type: "checkbox",
    //   options: orderStatusList,
    //   Component: () => {
    //     return (
    //       <CustomCheckbox
    //         size={20}
    //         options={orderStatusList}
    //         chosenValues={formik.values.status}
    //         handleOnChange={e => {
    //           if (formik.values.status.every(item => item !== e.target.value)) {
    //             formik.setFieldValue("status", [...formik.values.status, e.target.value]);
    //           } else {
    //             formik.setFieldValue(
    //               "status",
    //               formik.values.status.filter(item => item !== e.target.value),
    //             );
    //           }
    //         }}
    //       />
    //     );
    //   },
    // },
    // {
    //   label: "Created date",
    //   name: "createdDate",
    //   type: "picker",
    //   Component: () => {
    //     return (
    //       <CustomTextField
    //         type="date"
    //         handleOnChange={e => {
    //           formik.setFieldValue("createdDate", e.target.value);
    //         }}
    //       />
    //     );
    //   },
    // },
  ];

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
      Header: "Order Name",
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
    ...getColumns(),
    {
      Header: "Created Date",
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
    // {
    //   Header: "Order ID",
    //   accessor: "uuid",
    //   maxWidth: 10,
    //   Cell: ({ row }: CellProps<FormResponseDTO, {}>) => {
    //     return (
    //       <Box display="flex" justifyContent="left">
    //         {CommonUtils.encodeUUID(row.original.uuid)}
    //       </Box>
    //     );
    //   },
    // },
    {
      Header: "Actions",
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
                  dispatch(openNotification({ open: true, content: "Order link copied", severity: "success" }));
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

  const columns = useMemo(() => tableContent, [form]);

  const table = useTable(
    {
      columns,
      data: responses,
    },
    useRowSelect,
  );

  async function handleSubmitForm(values: any) {
    console.log("values", values);
  }

  const handleOpenDetailDialog = (items: FormResponseDTO) => {
    setItem(item);
    setOpenDetailDialog(true);
  };

  const handleUpdatePermission = async () => {
    if (location.state) {
      let state: any = location.state;
      let formId: string = String(state.formId);
      await new FormService().updatePermission(formId).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          setForm(prev => {
            return { ...prev, responsePermission: prev.responsePermission === "AllowAll" ? "OwnerOnly" : "AllowAll" };
          });
        }
      });
    }
  };

  // console.log("form", form);

  const getForm = async (formId: string) => {
    await new FormService().getFormById(formId).then(response => {
      if (response.result) {
        setForm(response.result);
        // formik.setFieldValue("formId", response.result.uuid);
      }
    });
  };

  const getOrders = async (formId: string) => {
    await new OrderService().getOrdersByFormId(formId).then(response => {
      if (response.result) {
        setResponses(
          response.result.map(item => {
            return { ...item, response: JSON.parse(item.response) };
          }),
        );
        setPageParams({ ...pageParams, total: response.result.length });
      }
    });
  };

  // console.log("responses", responses);

  useEffect(() => {
    setResponses(
      responses.slice(pageParams.pageNumber * pageParams.pageSize, (pageParams.pageNumber + 1) * pageParams.pageSize),
    );
  }, [pageParams]);

  useEffect(() => {
    if (location.state) {
      let state: any = location.state;
      let formId: string = String(state.formId);
      getForm(formId).then(() => {
        getOrders(formId);
      });
    }
  }, []);

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
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                // cursor: "pointer",
              }}
            >
              <CustomTitle
                text={[
                  { text: form.name, highlight: false },
                  { text: "/", highlight: true },
                  { text: t("header_orders"), highlight: true },
                ]}
              />
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <CustomSwitch
                  tooltipText="Cho phép khách hàng chỉnh sửa đơn hàng"
                  handleOnChange={handleUpdatePermission}
                  value={form.responsePermission === "AllowAll"}
                  defaultChecked={form.responsePermission === "AllowAll"}
                />
                <CustomButton
                  text="Xuất danh sách"
                  type="rounded-outlined"
                  startIcon="export"
                  color={COLORS.lightText}
                  handleOnClickMenu={handleOpenMenu}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto" padding={-2}>
              <CustomTable
                showCheckbox={false}
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
                onClickRow={(row: any) => {
                  // navigator.clipboard.writeText(`localhost:3000/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`);
                  // navigator.clipboard.writeText(
                  //   `https://formee.website/tracking/${CommonUtils.encodeUUID(row.original.uuid)}`,
                  // );
                  // dispatch(openNotification({ open: true, content: "Order link copied", severity: "success" }));
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
