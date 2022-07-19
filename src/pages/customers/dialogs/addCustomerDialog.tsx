import { Box, Dialog, DialogContent, DialogTitle, FormHelperText, Grid, InputLabel } from "@mui/material";
import { AddressDTO, AddressService } from "apis/addressService/addressService";
import { CustomerService } from "apis/customerService/customerService";
import { CustomButton } from "components/CustomButton";
import { CustomSelect } from "components/CustomSelect";
import { StyledInput } from "components/CustomTextField";
import { useFormik } from "formik";
import { CustomerDTO, initCustomer } from "models/customer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openNotification } from "redux/actions/notification";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";

export interface DialogAddCustomerProps {
  itemEdit: CustomerDTO;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const DialogAddCustomer = ({ openDialog, handleCloseDialog, itemEdit }: DialogAddCustomerProps) => {
  const dispatch = useDispatch();

  const { t } = useTranslation(["commons", "customers", "messages", "forms"]);

  const [diaChi, setDiaChi] = useState<string>("");
  const [tinhThanh, setTinhThanh] = useState<string>("");
  const [quanHuyen, setQuanHuyen] = useState<string>("");
  const [phuongXa, setPhuongXa] = useState<string>("");

  const [tinhThanhList, setTinhThanhList] = useState<AddressDTO[]>([]);
  const [quanHuyenList, setQuanHuyenList] = useState<AddressDTO[]>([]);
  const [phuongXaList, setPhuongXaList] = useState<AddressDTO[]>([]);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .trim()
      .nullable()
      .test("invalid-phone", t("messages:messages_invalid_phone"), phone => {
        if (phone) {
          let str = phone.toString();
          return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(str);
        }
        return true;
      }),
  });

  const formik = useFormik({
    initialValues: StringUtils.isNullOrEmty(itemEdit.uuid) ? initCustomer : itemEdit,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  function closeDialog() {
    formik.resetForm();
    handleCloseDialog();
  }

  async function handleSubmitForm(values: CustomerDTO) {
    if (StringUtils.isNullOrEmty(itemEdit.uuid)) {
      await new CustomerService()
        .createCustomer({
          ...values,
          address: JSON.stringify([
            diaChi,
            phuongXaList.find(item => item.code === phuongXa),
            quanHuyenList.find(item => item.code === quanHuyen),
            tinhThanhList.find(item => item.code === tinhThanh),
          ]),
        })
        .then(response => {
          if (Number(response.code) === 200) {
            dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
            closeDialog();
          } else {
            dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
          }
        });
    } else {
      await new CustomerService()
        .updateCustomer({
          ...values,
          address: JSON.stringify([
            diaChi,
            phuongXaList.find(item => item.code === phuongXa),
            quanHuyenList.find(item => item.code === quanHuyen),
            tinhThanhList.find(item => item.code === tinhThanh),
          ]),
        })
        .then(response => {
          if (Number(response.code) === 200) {
            dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
            closeDialog();
          } else {
            dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
          }
        });
    }
  }

  const getTinhThanh = async () => {
    await new AddressService().getAddressByParentCode("").then(response => {
      if (response.result) {
        setTinhThanhList(response.result);
      }
    });
  };

  const getQuanHuyen = async (parentCode: string) => {
    await new AddressService().getAddressByParentCode(parentCode).then(response => {
      if (response.result) {
        setQuanHuyenList(response.result);
      }
    });
  };

  const getPhuongXa = async (parentCode: string) => {
    await new AddressService().getAddressByParentCode(parentCode).then(response => {
      if (response.result) {
        setPhuongXaList(response.result);
      }
    });
  };

  const renderValue = () => {
    if (!StringUtils.isNullOrEmty(itemEdit.uuid)) {
      let values = JSON.parse(formik.values.address);
      let tinhThanhNew = values[3] ? values[3].code : "";
      let quanHuyenNew = values[2] ? values[2].code : "";
      let phuongXaNew = values[1] ? values[1].code : "";
      let diaChi = values[0] ? String(values[0]).trim() : "";

      setDiaChi(diaChi);
      setTinhThanh(tinhThanhNew);
      getQuanHuyen(tinhThanhNew)
        .then(() => {
          setQuanHuyen(quanHuyenNew);
        })
        .then(() => {
          getPhuongXa(quanHuyenNew).then(() => {
            setPhuongXa(phuongXaNew);
          });
        });
    }
  };

  useEffect(() => {
    getTinhThanh().then(() => {
      renderValue();
    });
  }, []);

  useEffect(() => {
    getQuanHuyen(tinhThanh);
  }, [tinhThanh]);

  useEffect(() => {
    getPhuongXa(quanHuyen);
  }, [quanHuyen]);

  return (
    <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={closeDialog}>
      <DialogTitle>
        <Box component="span">{t("customers:customers_create")}</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {/* {"Tên khách hàng *"} */}
                {t("customers:customers_name")}
              </InputLabel>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <StyledInput
                fullWidth
                value={formik.values.name}
                onChange={e => {
                  formik.setFieldValue("name", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {formik.errors["name"] && formik.errors["name"]}
              </FormHelperText>
            </Grid>

            {/* phone */}
            <Grid item xs={12}>
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {/* {"Mô tả"} */}
                {t("customers:customers_phone")}
              </InputLabel>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <StyledInput
                fullWidth
                value={formik.values.phone}
                onChange={e => {
                  formik.setFieldValue("phone", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {formik.errors["phone"] && formik.errors["phone"]}
              </FormHelperText>
            </Grid>

            {/* address */}
            <Grid item xs={12}>
              <InputLabel shrink sx={{ fontSize: "18px", fontWeight: 500 }}>
                {/* {"Địa chỉ"} */}
                {t("customers:customers_address")}
              </InputLabel>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: 1.5,
              }}
            >
              <StyledInput
                fullWidth
                multiline
                value={diaChi}
                placeholder={t("forms:form_address_placeholder")}
                onChange={e => {
                  setDiaChi(e.target.value);
                }}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
              }}
            >
              <CustomSelect
                options={tinhThanhList.map(item => {
                  return { title: item.name_, value: item.code };
                })}
                value={tinhThanh}
                handleOnChange={e => {
                  setTinhThanh(e.target.value);
                  getQuanHuyen(e.target.value);
                }}
              />
              <CustomSelect
                value={quanHuyen}
                options={quanHuyenList.map(item => {
                  return { title: item.name_, value: item.code };
                })}
                disabled={StringUtils.isNullOrEmty(tinhThanh)}
                handleOnChange={e => {
                  setQuanHuyen(e.target.value);
                  getPhuongXa(e.target.value);
                }}
              />
              <CustomSelect
                value={phuongXa}
                options={phuongXaList.map(item => {
                  return { title: item.name_, value: item.code };
                })}
                disabled={StringUtils.isNullOrEmty(quanHuyen)}
                handleOnChange={e => {
                  setPhuongXa(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5, paddingX: "10px", marginBottom: 1 }}>
                <CustomButton
                  text={t("commons:button_save")}
                  type="rounded"
                  startIcon="save"
                  handleOnClick={() => {
                    formik.handleSubmit();
                  }}
                />
                <CustomButton
                  text={t("commons:button_close")}
                  type="rounded-outlined"
                  handleOnClick={() => {
                    closeDialog();
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAddCustomer;
