import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledInput } from "components/CustomTextField";
import { CustomSelect } from "components/CustomSelect";
import { phuongXaVN, quanHuyenVN, tinhThanhVN } from "constants/constants";
import StringUtils from "utils/stringUtils";

interface FormAddressProps {
  index: number;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  handleOnChange?: (event: any) => void;
}

export const FormAddress = ({ index, formik, required, disabled }: FormAddressProps) => {
  const [value, setValue] = useState<string>("");
  const [fullValue, setFullValue] = useState<string>("");

  const [tinhThanh, setTinhThanh] = useState<string>("");
  const [quanHuyen, setQuanHuyen] = useState<string>("");
  const [phuongXa, setPhuongXa] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = () => {
    setFullValue([value, phuongXa, quanHuyen, tinhThanh].join(", "));
  };

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSelect();
  }, [phuongXa, quanHuyen, tinhThanh, value]);

  useEffect(() => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        fullValue,
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
  }, [fullValue]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <StyledInput
            fullWidth
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

        {!disabled && (
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
        )}
      </Grid>
    </FormControl>
  );
};
