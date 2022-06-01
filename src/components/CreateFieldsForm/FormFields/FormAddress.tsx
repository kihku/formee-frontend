import FormControl from "@mui/material/FormControl";
import { FormHelperText, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledInput } from "components/CustomTextField";
import { CustomSelect } from "components/CustomSelect";
import { phuongXaVN, quanHuyenVN, tinhThanhVN } from "constants/constants";
import StringUtils from "utils/stringUtils";

interface FormAddressProps {
  index: number;
  placeholder?: string;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "number" | "password" | "date";
  handleOnChange?: (event: any) => void;
}

export const FormAddress = ({ index, placeholder, formik, required, disabled, type }: FormAddressProps) => {
  const [value, setValue] = useState<string>("");

  const [tinhThanh, setTinhThanh] = useState<string>("");
  const [quanHuyen, setQuanHuyen] = useState<string>("");
  const [phuongXa, setPhuongXa] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      // console.log("value", index, formik.values["response"].at(index));
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        e.target.value,
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
    setValue(e.target.value);
  };

  const hasErrors = () => {
    return false;
    // return Boolean(getIn(formik && formik.errors, `${name}`)) && formik;
  };

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik && formik.values]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <StyledInput
            fullWidth
            type={type}
            value={value}
            required={required}
            disabled={disabled}
            placeholder={"Địa chỉ"}
            onChange={handleChange}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
          <CustomSelect
            options={tinhThanhVN}
            defaultValue="default"
            handleOnChange={e => {
              setTinhThanh(e.target.value);
            }}
          />
          <CustomSelect
            defaultValue="default"
            options={quanHuyenVN.filter(option => option.parentValue === tinhThanh || option.value === "default")}
            disabled={StringUtils.isNullOrEmty(tinhThanh)}
            handleOnChange={e => {
              setQuanHuyen(e.target.value);
            }}
          />
          <CustomSelect
            defaultValue="default"
            options={phuongXaVN.filter(option => option.parentValue === quanHuyen || option.value === "default")}
            disabled={StringUtils.isNullOrEmty(quanHuyen)}
            handleOnChange={e => {
              setPhuongXa(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
