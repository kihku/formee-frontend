/* eslint-disable jsx-a11y/alt-text */
import FormControl from "@mui/material/FormControl";
import { Autocomplete, Box, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { COLORS } from "styles";
import { StyledInput } from "components/CustomTextField";
import { getCookie } from "utils/cookieUtils";
import { CustomerService } from "apis/customerService/customerService";
import { CustomerDTO } from "models/customer";

interface FormPhoneSearchProps {
  formik?: any;
  disabled?: boolean;
  handleOnChange?: (event: any) => void;
}

export const FormPhoneSearch = ({ formik, disabled }: FormPhoneSearchProps) => {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);

  const getCustomers = async () => {
    const userId = getCookie("USER_ID");
    await new CustomerService().getCustomersByUserId(userId).then(response => {
      if (response.result) {
        setCustomers(response.result);
      }
    });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      {!disabled && (
        <Box>
          <Autocomplete
            freeSolo
            fullWidth
            disableClearable
            disableCloseOnSelect
            options={customers}
            renderTags={() => null}
            renderInput={params => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return (
                <StyledInput
                  {...params.InputProps}
                  {...rest}
                  onKeyDown={e => {
                    if (e.code === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                    } else if (e.code === "Backspace") {
                      e.stopPropagation();
                    }
                  }}
                  onChange={e => {
                    formik &&
                      formik.setFieldValue &&
                      formik.setFieldValue("response", [e.target.value, ...formik.values["response"].slice(1)]);
                  }}
                />
              );
            }}
            getOptionLabel={option => option.phone}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {option.phone}{", "}
                    {option.name}
                  </Box>
                </Box>
              </li>
            )}
            onChange={(event: any, value: any) => {
              if (formik && formik.setFieldValue) {
                formik.setFieldValue("response", [
                  value.phone,
                  value.name,
                  JSON.parse(value.address),
                  ...formik.values["response"].slice(3),
                ]);
                formik.setFieldValue("loadAddress", true);
              }
            }}
          />
          <FormHelperText
            sx={{
              color: COLORS.lightText,
              fontSize: 13,
              cursor: "auto",
              paddingTop: 0.75,
            }}
          >
            {"Tìm kiếm khách hàng với số điện thoại"}
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  );
};
