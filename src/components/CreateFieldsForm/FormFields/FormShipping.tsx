import { Grid, IconButton, NativeSelect, Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomIcon } from "components/CustomIcon";
import { StyledInput } from "components/CustomTextField";
import { shippingServices } from "constants/constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StringUtils from "utils/stringUtils";

interface FormShippingProps {
  index: number;
  formik?: any;
  disabled?: boolean;
  disabledForm?: boolean;
  handleOnChange?: (event: any) => void;
}

export const FormShipping = ({ index, formik, disabled, disabledForm }: FormShippingProps) => {
  const { t } = useTranslation(["forms"]);

  const [service, setService] = useState<string>("");
  const [shippingId, setShippingId] = useState<string>("");
  const [shippingLink, setShippingLink] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      let values = formik.values["response"].at(index);
      setService(values[0] ? values[0].value : "");
      setShippingId(values[1] ? values[1] : "");
    }
  };

  const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setService(e.target.value);
    setShippingLink("");
    setShippingId("");
  };

  const handleChangeShippingId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingId(e.target.value);
  };

  const handleGetShippingLink = () => {
    if (!StringUtils.isNullOrEmty(shippingId)) {
      let result = "";
      switch (service) {
        case "GHN":
          result += "https://donhang.ghn.vn/?order_code=";
          break;
        case "GHTK":
          result += "https://i.ghtk.vn/";
          break;
        case "NJV":
          result += "https://www.ninjavan.co/vi-vn/tracking?id=";
          break;
        case "JT":
          result += "https://jtexpress.vn/vi/tracking?type=track&billcode=";
          break;
        case "BEST":
          result += "https://best-inc.vn/track?bills=";
          break;
        case "VNPOST":
          result += "http://www.vnpost.vn/en-us/dinh-vi/buu-pham?key=";
          break;
        case "VIETTEL":
          result += "https://viettelpost.com.vn/";
          break;
      }
      service !== "VIETTEL" && (result += shippingId);
      setShippingLink(result);
    }
  };

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetShippingLink();
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        [shippingServices.find(item => item.value === service), shippingId],
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
  }, [service, shippingId]);

  return (
    <FormControl variant="standard" sx={{ width: "100%", marginBottom: { xs: 2, lg: 0 } }}>
      <Grid container sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: { xs: 0, lg: 2 } }}>
        <Grid item xs={12} md={6} lg={3} sx={{ marginBottom: { xs: 2, md: 0 } }}>
          <NativeSelect
            fullWidth
            value={service}
            onChange={handleChangeService}
            input={<StyledInput disabled={disabled || disabledForm} />}
          >
            {shippingServices.map((option, key) => {
              return (
                <option value={option.value} key={key}>
                  {option.title}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        <Grid item xs={11} md={5} lg={3} sx={{ paddingLeft: { xs: 0, md: 2 } }}>
          <StyledInput
            fullWidth
            value={shippingId}
            disabled={disabled || disabledForm || StringUtils.isNullOrEmty(service)}
            placeholder={t("form_shipping_id")}
            onChange={handleChangeShippingId}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title={t("form_shipping_search")} placement="right">
            <IconButton
              sx={{ marginLeft: { xs: 1, lg: 0 } }}
              onClick={() => {
                !StringUtils.isNullOrEmty(shippingId) && window.open(shippingLink, "_blank");
              }}
            >
              <CustomIcon name="shipping" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </FormControl>
  );
};
