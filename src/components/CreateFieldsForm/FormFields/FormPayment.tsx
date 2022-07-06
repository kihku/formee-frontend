import { Button, Checkbox, Grid, IconButton, NativeSelect, Tooltip, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomIcon } from "components/CustomIcon";
import { StyledInput } from "components/CustomTextField";
import { paymentMethodsEng, paymentMethodsVi } from "constants/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "styles";
import StringUtils from "utils/stringUtils";

interface FormPaymentProps {
  index: number;
  formik?: any;
  disabled?: boolean;
  disabledForm?: boolean;
  handleOnChange?: (event: any) => void;
}

export const FormPayment = ({ index, formik, disabled, disabledForm }: FormPaymentProps) => {
  const { t } = useTranslation(["forms"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const [type, setType] = useState<string>("");
  // const [codFee, setCodFee] = useState<string>("");
  // const [total, setTotal] = useState<number>(0);
  const [paid, setPaid] = useState<boolean>(false);

  const renderValue = () => {
    if (formik) {
      let values = formik.values["response"].at(index);
      if (!StringUtils.isNullOrEmty(values[0])) {
        let paymentType = values[0].value;
        setType(paymentType);
        paymentType === "PRE_PAID" && setPaid(values[1]);
      }
    }
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    // setCodFee("");
    setPaid(false);
  };

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      try {
        // let files: File[] = Array.from(e.target.files);
        // setFileList(files);
        // setImageList(
        //   files.map((file: any) => {
        //     return URL.createObjectURL(file);
        //   }),
        // );
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        [
          (currentLanguage === "en" ? paymentMethodsEng : paymentMethodsVi).find(item => item.value === type),
          type === "PRE_PAID" && paid,
        ],
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
  }, [type, paid]);

  // useEffect(() => {
  //   let newTotal: number = 0;
  //   let discountPercentage: number = (100 - Number(formik ? formik.values["discount"] : 0)) / 100;
  //   formik &&
  //     formik.values["response"].at(4).forEach((product: any) => {
  //       newTotal += product.productPrice * product.quantity;
  //     });
  //   setTotal(newTotal * discountPercentage);
  // }, [formik.values]);

  return (
    <FormControl variant="standard" sx={{ width: "100%", marginBottom: 2 }}>
      <Grid container sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <NativeSelect
            fullWidth
            value={type}
            onChange={handleChangeType}
            input={<StyledInput disabled={disabled || disabledForm} />}
          >
            {(currentLanguage === "en" ? paymentMethodsEng : paymentMethodsVi).map((option, key) => {
              return (
                <option value={option.value} key={key}>
                  {option.title}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        {/* {type === "PRE_PAID" && (
          <Grid item xs={12} md={6} lg={3} sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            <input
              accept="image/*"
              hidden={true}
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={handleImport}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="text"
                size="small"
                component="span"
                disableElevation
                sx={{ height: "45px", paddingX: 1, gap: 1 }}
              >
                <CustomIcon name="image" color={COLORS.primaryLight} />
                {t("forms:form_payment_paid")}
              </Button>
            </label>
          </Grid>
        )} */}

        {/* <Checkbox
              checked={paid}
              disabled={disabled || disabledForm}
              icon={<CustomIcon name={"squareCheckBox"} size={24} color={COLORS.lightText} />}
              checkedIcon={<CustomIcon name={"squareCheckBoxChecked"} size={24} color={COLORS.primary} />}
              onChange={e => {
                setPaid(e.target.checked);
              }}
            /> */}
        {/* <Typography>{t("form_payment_paid")}</Typography> */}

        {/* {type === "COD" && (
          <Grid item xs={12} md={6} lg={3} sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            <StyledInput
              fullWidth
              type="number"
              value={codFee}
              disabled={disabled || disabledForm || StringUtils.isNullOrEmty(type)}
              placeholder={t("form_shipping_cod")}
              onChange={e => {
                setCodFee(e.target.value);
              }}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
                min: 0,
              }}
            />
          </Grid>
        )} */}
        {/* {type === "COD" && (
          <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            <Typography sx={{ color: COLORS.primaryLight, fontWeight: 500 }}>
              {t("form_shipping_cod_total")}
              {total + Number(codFee)}
              {" đ"}
            </Typography>
          </Grid>
        )} */}
      </Grid>
    </FormControl>
  );
};
