import { FormControlLabel, Grid, IconButton, NativeSelect, Radio, RadioGroup, Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomIcon } from "components/CustomIcon";
import { StyledInput } from "components/CustomTextField";
import { shippingServicesEng, shippingServicesVi } from "constants/constants";
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
  const { t } = useTranslation(["forms", "orders"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const [service, setService] = useState<string>("");
  const [shippingId, setShippingId] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<string>("");
  const [shippingLink, setShippingLink] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("SHIPPING");

  const [pickupTime, setPickupTime] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");

  const renderValue = () => {
    if (formik) {
      let values = formik.values["response"].at(index);
      let type = values[0] ? values[0] : "SHIPPING";
      switch (type) {
        case "SHIPPING":
          setService(values[1] ? values[1].value : "");
          setShippingId(values[2] ? values[2] : "");
          break;
        case "SELF_PICKUP":
          setPickupDate(values[1] ? values[1] : "");
          setPickupTime(values[2] ? values[2] : "");
          break;
      }
      setDeliveryType(type);
      setShippingFee(formik.values["shippingFee"] ? formik.values["shippingFee"] : "");
    }
  };

  const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setService(e.target.value);
    setShippingLink("");
    setShippingId("");
    setShippingFee("");
  };

  const handleChangeShippingId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingId(e.target.value);
  };

  const handleChangeShippingFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingFee(e.target.value);
    formik.setFieldValue("shippingFee", e.target.value);
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

  const resetInput = () => {
    setService("");
    setShippingLink("");
    setShippingId("");
    setShippingFee("");
    setPickupDate("");
    setPickupTime("");
  };

  const getShippingInfo = () => {
    switch (deliveryType) {
      case "SHIPPING":
        return [
          deliveryType,
          (currentLanguage === "en" ? shippingServicesEng : shippingServicesVi).find(item => item.value === service),
          shippingId,
        ];
      case "SELF_PICKUP":
        return [deliveryType, pickupDate, pickupTime];
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
        getShippingInfo(),
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
  }, [service, shippingId, pickupDate, pickupTime]);

  return (
    <FormControl variant="standard" sx={{ width: "100%", marginBottom: { xs: 2, lg: 1 } }}>
      <Grid container sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: { xs: 0, lg: 2 } }}>
        <Grid item xs={12} sx={{ marginBottom: { md: 2, lg: 0 } }}>
          <RadioGroup
            row
            value={deliveryType}
            onChange={e => {
              setDeliveryType(e.target.value);
              resetInput();
            }}
          >
            <FormControlLabel
              value="SHIPPING"
              control={<Radio size="small" disabled={disabled || disabledForm} />}
              label={t("orders:order_delivery_shipping")}
            />
            <FormControlLabel
              value="SELF_PICKUP"
              control={<Radio size="small" disabled={disabled || disabledForm} />}
              label={t("orders:order_delivery_self_pickup")}
            />
          </RadioGroup>
        </Grid>

        {/* shipping */}
        {deliveryType === "SHIPPING" && (
          <Grid item xs={12} md={6} lg={3} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <NativeSelect
              fullWidth
              value={service}
              onChange={handleChangeService}
              input={<StyledInput disabled={disabled || disabledForm} />}
            >
              {(currentLanguage === "en" ? shippingServicesEng : shippingServicesVi).map((option, key) => {
                return (
                  <option value={option.value} key={key}>
                    {option.title}
                  </option>
                );
              })}
            </NativeSelect>
          </Grid>
        )}

        {deliveryType === "SHIPPING" && !(disabled || disabledForm) && (
          <Grid item xs={11} md={5} lg={3} sx={{ paddingLeft: { xs: 0, md: 2, lg: 0 } }}>
            <StyledInput
              fullWidth
              type="number"
              value={shippingFee}
              disabled={disabled || disabledForm || StringUtils.isNullOrEmty(service)}
              placeholder={t("form_shipping_fee")}
              onChange={handleChangeShippingFee}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
        )}

        {deliveryType === "SHIPPING" && (
          <Grid item xs={11} md={5} lg={3} sx={{ paddingLeft: { xs: 0, md: 2, lg: 0 } }}>
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
        )}
        {deliveryType === "SHIPPING" && (
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
        )}

        {/* self pickup */}
        {deliveryType === "SELF_PICKUP" && (
          <Grid item xs={12} md={6} lg={3} sx={{ marginTop: { xs: 2, md: 0 } }}>
            <StyledInput
              fullWidth
              type="date"
              name="pickupDate"
              disabled={disabled || disabledForm}
              value={pickupDate}
              onChange={e => {
                console.log(e.target.value);
                setPickupDate(e.target.value);
              }}
            />
          </Grid>
        )}
        {deliveryType === "SELF_PICKUP" && (
          <Grid item xs={12} md={6} lg={3} sx={{ marginTop: { xs: 2, md: 0 }, paddingLeft: { xs: 0, md: 2, lg: 0 } }}>
            <StyledInput
              fullWidth
              type="time"
              name="pickupTime"
              disabled={disabled || disabledForm}
              value={pickupTime}
              onChange={e => {
                console.log(e.target.value);
                setPickupTime(e.target.value);
              }}
            />
          </Grid>
        )}
      </Grid>
    </FormControl>
  );
};
