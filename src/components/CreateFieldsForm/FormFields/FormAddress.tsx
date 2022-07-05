import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledInput } from "components/CustomTextField";
import { CustomSelect } from "components/CustomSelect";
import StringUtils from "utils/stringUtils";
import { AddressDTO, AddressService } from "apis/addressService/addressService";
import { useTranslation } from "react-i18next";

interface FormAddressProps {
  index: number;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  isEditing?: boolean;
  handleOnChange?: (event: any) => void;
}

export const FormAddress = ({ index, formik, required, disabled, isEditing }: FormAddressProps) => {
  const { t } = useTranslation(["forms"]);
  const [value, setValue] = useState<string>("");
  const [fullValue, setFullValue] = useState<string>("");

  const [tinhThanh, setTinhThanh] = useState<string>("");
  const [quanHuyen, setQuanHuyen] = useState<string>("");
  const [phuongXa, setPhuongXa] = useState<string>("");

  const [tinhThanhList, setTinhThanhList] = useState<AddressDTO[]>([]);
  const [quanHuyenList, setQuanHuyenList] = useState<AddressDTO[]>([]);
  const [phuongXaList, setPhuongXaList] = useState<AddressDTO[]>([]);

  const renderValue = () => {
    if (formik) {
      if (disabled) {
        let head = formik.values["response"].at(index)[0];
        let tail = [...formik.values["response"].at(index)]
          .filter((item, index) => index !== 0)
          .map(item => item.name_)
          .join(", ");
        setFullValue([head, tail].join(", "));
      } else {
        let values = formik.values["response"].at(index);
        let tinhThanhNew = values[3] ? values[3].code : "";
        let quanHuyenNew = values[2] ? values[2].code : "";
        let phuongXaNew = values[1] ? values[1].code : "";
        let diaChi = values[0] ? String(values[0]).trim() : "";

        setValue(diaChi);
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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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

  useEffect(() => {
    getTinhThanh().then(() => {
      renderValue();
    });
  }, []);

  useEffect(() => {
    renderValue();
  }, [formik.values["loadAddress"], disabled]);

  // console.log("formik", formik.values["response"]);

  useEffect(() => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...(formik.values["response"] ? formik.values["response"].slice(0, index) : []),
        [
          value,
          phuongXaList.find(item => item.code === phuongXa),
          quanHuyenList.find(item => item.code === quanHuyen),
          tinhThanhList.find(item => item.code === tinhThanh),
        ],
        ...(formik.values["response"] ? formik.values["response"].slice(index + 1) : []),
      ]);
  }, [phuongXa, quanHuyen, tinhThanh, value]);

  return (
    <FormControl
      variant="standard"
      sx={{
        width: "100%",
        marginBottom: {
          xs: 1,
          lg: 0,
        },
      }}
    >
      <Grid container>
        {!disabled && (
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              marginBottom: {
                xs: 1.5,
                lg: 2,
              },
              paddingRight: { xs: 0, lg: 2 },
            }}
          >
            <StyledInput
              fullWidth
              multiline
              value={value}
              required={required}
              disabled={disabled}
              placeholder={t("form_address_placeholder")}
              onChange={handleChange}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
        )}

        {!disabled && (
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              display: "flex",
              gap: {
                xs: 1,
                lg: 2,
              },
              flexDirection: {
                xs: "column",
                lg: "row",
              },
            }}
          >
            <CustomSelect
              disabled={disabled}
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
        )}
      </Grid>
      {!isEditing && disabled && (
        <Grid container>
          <Grid item xs={12}>
            <StyledInput fullWidth disabled value={fullValue} />
          </Grid>
        </Grid>
      )}
    </FormControl>
  );
};
