/* eslint-disable jsx-a11y/alt-text */
import { Autocomplete, Box, Checkbox, FormHelperText, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { URL_PROFILE } from "apis/axiosClient";
import { ProductService } from "apis/productService/productService";
import { CustomButton } from "components/CustomButton";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import CustomCartFooter from "components/CustomTable/cartFooter";
import { StyledInput } from "components/CustomTextField";
import { ProductDTO } from "models/product";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellProps, Column, useTable } from "react-table";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import StringUtils from "utils/stringUtils";

interface FormCartProps {
  index: number;
  formik?: any;
  handleOnChange?: (event: any) => void;
  disabled?: boolean;
  disabledForm?: boolean;
}

export const FormCart = ({ index, formik, disabled, disabledForm }: FormCartProps) => {
  const { t } = useTranslation(["forms", "messages"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState<ProductDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [item, setItem] = useState<ProductDTO>({} as ProductDTO);
  // const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);

  const renderValue = () => {
    if (formik) {
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const updateFormikCart = () => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...formik.values["response"].slice(0, index),
        value,
        ...formik.values["response"].slice(index + 1),
      ]);
  };

  const cartTableVi: Column<ProductDTO>[] = [
    {
      Header: "Sản phẩm",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.imageName) && (
              <img
                src={`${URL_PROFILE.PRO}/images/${row.original.imageName}`}
                width="80"
                height="auto"
                style={{
                  backgroundColor: COLORS.grayBackground,
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      Header: "Tên sản phẩm",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Giá thành",
      accessor: "productPrice",
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.productPrice.toLocaleString()}
          </Box>
        );
      },
    },
    {
      Header: "Số lượng",
      accessor: "quantity",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" alignItems="center" gap={1}>
            <IconButton
              onClick={() => {
                setValue(prev =>
                  prev.map(item => {
                    if (item.uuid === row.original.uuid) {
                      if (item.quantity === 1) {
                        handleRemoveCart(row.original);
                      } else return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                  }),
                );
              }}
            >
              <CustomIcon name="remove" color={COLORS.primaryLight} />
            </IconButton>
            {row.original.quantity}
            <IconButton
              onClick={() => {
                setValue(prev =>
                  prev.map(item => {
                    if (item.uuid === row.original.uuid) {
                      if (item.quantity < row.original.inventory) {
                        return { ...item, quantity: item.quantity + 1 };
                      } else {
                        dispatch(
                          openNotification({
                            open: true,
                            content: t("messages:messages_inventory_exceed"),
                            severity: "error",
                          }),
                        );
                        return item;
                      }
                    }
                    return item;
                  }),
                );
              }}
            >
              <CustomIcon name="add" color={COLORS.primaryLight} />
            </IconButton>
          </Box>
        );
      },
    },
    {
      Header: "Tổng cộng",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {(row.original.productPrice * row.original.quantity).toLocaleString()}
          </Box>
        );
      },
    },
    {
      Header: "Thao tác",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            <IconButton onClick={() => handleRemoveCart(row.original)}>
              <CustomIcon name={"delete"} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const cartTableEng: Column<ProductDTO>[] = [
    {
      Header: "Product",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.imageName) && (
              <img
                src={`${URL_PROFILE.PRO}/images/${row.original.imageName}`}
                width="80"
                height="auto"
                style={{
                  backgroundColor: COLORS.grayBackground,
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      Header: "Name",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Price",
      accessor: "productPrice",
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.productPrice.toLocaleString()}
          </Box>
        );
      },
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" alignItems="center" gap={1}>
            <IconButton
              onClick={() => {
                setValue(prev =>
                  prev.map(item => {
                    if (item.uuid === row.original.uuid) {
                      if (item.quantity === 1) {
                        handleRemoveCart(row.original);
                      } else return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                  }),
                );
              }}
            >
              <CustomIcon name="remove" color={COLORS.primaryLight} />
            </IconButton>
            {row.original.quantity}
            <IconButton
              onClick={() => {
                setValue(prev =>
                  prev.map(item => {
                    if (item.uuid === row.original.uuid) {
                      if (item.quantity < row.original.inventory) {
                        return { ...item, quantity: item.quantity + 1 };
                      } else {
                        dispatch(
                          openNotification({
                            open: true,
                            content: t("messages:messages_inventory_exceed"),
                            severity: "error",
                          }),
                        );
                        return item;
                      }
                    }
                    return item;
                  }),
                );
              }}
            >
              <CustomIcon name="add" color={COLORS.primaryLight} />
            </IconButton>
          </Box>
        );
      },
    },
    {
      Header: "Total",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.productPrice * row.original.quantity}
          </Box>
        );
      },
    },
    {
      Header: "Actions",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            <IconButton onClick={() => handleRemoveCart(row.original)}>
              <CustomIcon name={"delete"} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const cartTableDisabledVi: Column<ProductDTO>[] = [
    {
      Header: "Sản phẩm",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.imageName) && (
              <img
                src={`${URL_PROFILE.PRO}/images/${row.original.imageName}`}
                width="80"
                height="auto"
                style={{
                  backgroundColor: COLORS.grayBackground,
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      Header: "Tên sản phẩm",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Giá thành",
      accessor: "productPrice",
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.productPrice.toLocaleString()}
            {/* {" đ"} */}
          </Box>
        );
      },
    },
    {
      Header: "Số lượng",
      accessor: "quantity",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" alignItems="center" gap={1}>
            {row.original.quantity}
          </Box>
        );
      },
    },
    {
      Header: "Tổng cộng",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {(row.original.productPrice * row.original.quantity).toLocaleString()}
            {/* {" đ"} */}
          </Box>
        );
      },
    },
  ];

  const cartTableDisabledEng: Column<ProductDTO>[] = [
    {
      Header: "Product",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.imageName) && (
              <img
                src={`${URL_PROFILE.PRO}/images/${row.original.imageName}`}
                width="80"
                height="auto"
                style={{
                  backgroundColor: COLORS.grayBackground,
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      Header: "Name",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.name}
          </Box>
        );
      },
    },
    {
      Header: "Price",
      accessor: "productPrice",
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.productPrice.toLocaleString()}
            {/* {" đ"} */}
          </Box>
        );
      },
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" alignItems="center" gap={1}>
            {row.original.quantity}
          </Box>
        );
      },
    },
    {
      Header: "Total",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {(row.original.productPrice * row.original.quantity).toLocaleString()}
            {/* {" đ"} */}
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(
    () =>
      disabled
        ? currentLanguage === "en"
          ? cartTableDisabledEng
          : cartTableDisabledVi
        : currentLanguage === "en"
        ? cartTableEng
        : cartTableVi,
    [],
  );

  const table = useTable({
    columns,
    data: value,
  });

  const handleAddCart = () => {
    setValue(prev => [...prev, { uuid: "", name: "", productPrice: 0, quantity: 1 } as ProductDTO]);
  };

  const handleRemoveCart = (item: any) => {
    setValue(prev => prev.filter(row => row.uuid !== item.uuid));
  };

  const getProducts = async () => {
    await new ProductService().getProductsByUser().then(response => {
      response.result &&
        setProducts(
          response.result.map(product => {
            return { ...product, quantity: 1 };
          }),
        );
    });
  };

  useEffect(() => {
    renderValue();
    formik.values["formId"] && getProducts();
  }, []);

  useEffect(() => {
    updateFormikCart();
  }, [value]);

  return (
    <Box>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        {!disabled && !disabledForm && (
          <Box>
            <Box display="flex">
              <Autocomplete
                freeSolo
                multiple
                fullWidth
                disableClearable
                disableCloseOnSelect
                options={products}
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
                    />
                  );
                }}
                getOptionLabel={option => option.name}
                getOptionDisabled={option => option.inventory === 0}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox size="small" checked={selected || value.some(value => value.uuid === option.uuid)} />
                        {option.name}
                      </Box>
                      <Box>
                        {option.productPrice.toLocaleString()}
                        {" "}
                        {`(${currentLanguage === "en" ? "Inventory" : "Kho"}: ${option.inventory})`}
                      </Box>
                    </Box>
                  </li>
                )}
                onChange={(event: any, newValue: any) => {
                  setValue(newValue);
                }}
                sx={{ marginRight: 2 }}
              />
              <CustomButton
                text={t("form_cart_button")}
                type={"outlined"}
                startIcon="lightAdd"
                handleOnClick={() => {
                  navigate("/products", {
                    state: {
                      openAddDialog: true,
                    },
                  });
                }}
              />
            </Box>
            <FormHelperText
              sx={{
                color: COLORS.lightText,
                fontSize: 13,
                cursor: "auto",
                paddingTop: 0.75,
              }}
            >
              {t("form_cart_helper")}
            </FormHelperText>
          </Box>
        )}

        {(value.length > 0 || disabledForm) && (
          <Box sx={{ marginY: 2 }}>
            <CustomTable
              isCart
              pointerOnHover={disabledForm}
              highlightOnHover={disabledForm}
              data={value}
              table={table}
              columns={columns}
              onAddCart={handleAddCart}
              onClickRow={(row: any) => {
                if (disabledForm) {
                  setItem(row.original);
                  // setOpenProductDialog(true);
                }
              }}
            />
            {/* <CustomCartFooter formik={formik} index={index} disabled={disabled} disabledForm={disabledForm} /> */}
          </Box>
        )}
      </FormControl>
      {/* {openProductDialog && (
        <DialogViewProduct
          itemEdit={item}
          openDialog={openProductDialog}
          handleCloseDialog={() => {
            setOpenProductDialog(false);
          }}
        />
      )} */}
    </Box>
  );
};
