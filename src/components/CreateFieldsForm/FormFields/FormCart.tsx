/* eslint-disable jsx-a11y/alt-text */
import FormControl from "@mui/material/FormControl";
import { Autocomplete, Box, Checkbox, FormHelperText, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ProductDTO } from "models/product";
import { CellProps, Column, useTable } from "react-table";
import CustomTable from "components/CustomTable";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { StyledInput } from "components/CustomTextField";
import { ProductService } from "apis/productService/productService";
import CustomCartFooter from "components/CustomTable/cartFooter";
import { getCookie } from "utils/cookieUtils";
import { CustomButton } from "components/CustomButton";
import StringUtils from "utils/stringUtils";

interface FormCartProps {
  index: number;
  formik?: any;
  handleOnChange?: (event: any) => void;
  disabled?: boolean;
}

export const FormCart = ({ index, formik, disabled }: FormCartProps) => {
  const [value, setValue] = useState<ProductDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [rawValue, setRawValue] = useState<string>("");

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

  const cartTable: Column<ProductDTO>[] = [
    {
      Header: "Sản phẩm",
      accessor: "imageBase64",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            <img
              src={row.original.imageBase64}
              width="80"
              height="80"
              style={{
                backgroundColor: COLORS.grayBackground,
                display: "flex",
                alignItems: "center",
                placeContent: "center",
              }}
            />
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
            {row.original.productPrice}
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
                  prev.map(item => (item.uuid === row.original.uuid ? { ...item, quantity: item.quantity - 1 } : item)),
                );
              }}
            >
              <CustomIcon name="remove" color={COLORS.primaryLight} />
            </IconButton>
            {row.original.quantity}
            <IconButton
              onClick={() => {
                setValue(prev =>
                  prev.map(item => (item.uuid === row.original.uuid ? { ...item, quantity: item.quantity + 1 } : item)),
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
            {row.original.productPrice * row.original.quantity}
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

  const cartTableDisabled: Column<ProductDTO>[] = [
    {
      Header: "Sản phẩm",
      accessor: "imageBase64",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            <img
              src={row.original.imageBase64}
              width="80"
              height="80"
              style={{
                backgroundColor: COLORS.grayBackground,
                // borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                placeContent: "center",
              }}
            />
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
            {row.original.productPrice}
            {" đ"}
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
            {row.original.productPrice * row.original.quantity}
            {" đ"}
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => (disabled ? cartTableDisabled : cartTable), []);

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

  const createProduct = async (item: ProductDTO) => {
    await new ProductService().createProduct(item).then(response => {
      if (response.result) {
        setProducts(prev => [...prev, { ...response.result, quantity: 1 }]);
        setValue(prev => [...prev, { ...response.result, quantity: item.quantity }]);
      }
    });
  };

  const getProducts = async () => {
    let userId = getCookie("USER_ID");
    await new ProductService().getProductsByUserId(userId).then(response => {
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
    <FormControl variant="standard" sx={{ width: "100%" }}>
      {!disabled && (
        <Box>
          <Box display="flex">
            <Autocomplete
              freeSolo
              multiple
              fullWidth
              // disableClearable
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
                      // console.log(e.code);
                      if (e.code === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        !StringUtils.isNullOrEmty(e.currentTarget.value) &&
                          formik.values["formId"] &&
                          createProduct({
                            formId: formik.values["formId"],
                            name: e.currentTarget.value.split("/").at(0),
                            productPrice: Number(e.currentTarget.value.split("/").at(-2)),
                            quantity: Number(e.currentTarget.value.split("/").at(-1)),
                          } as ProductDTO);
                      } else if (e.code === "Backspace") {
                        e.stopPropagation();
                      } else {
                        setRawValue(e.currentTarget.value);
                      }
                    }}
                  />
                );
              }}
              getOptionLabel={option => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox size="small" checked={selected || value.some(value => value.uuid === option.uuid)} />
                      {option.name}
                    </Box>
                    <Box>
                      {option.productPrice}
                      {" đ"}
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
              text={"Tạo sản phẩm"}
              type={"outlined"}
              startIcon="lightAdd"
              handleOnClick={() => {
                // TODO: check valid input
                !StringUtils.isNullOrEmty(rawValue) &&
                  formik.values["formId"] &&
                  createProduct({
                    formId: formik.values["formId"],
                    name: rawValue.split("/").at(0),
                    productPrice: Number(rawValue.split("/").at(-2)),
                    quantity: Number(rawValue.split("/").at(-1)),
                  } as ProductDTO);
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
            {"Tạo sản phẩm mới với cú pháp {Tên sản phẩm/Giá thành/Số lượng} (ví dụ: Áo sơ mi/120000/1)"}
          </FormHelperText>
        </Box>
      )}

      {(value.length > 0 || disabled) && (
        <Box sx={{ marginY: 2 }}>
          <CustomTable
            isCart
            data={value}
            table={table}
            columns={columns}
            highlightOnHover={false}
            onAddCart={handleAddCart}
          />
          <CustomCartFooter formik={formik} index={index} disabled={disabled} />
        </Box>
      )}
    </FormControl>
  );
};
