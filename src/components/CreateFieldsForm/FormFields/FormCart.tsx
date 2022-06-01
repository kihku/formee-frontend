import FormControl from "@mui/material/FormControl";
import { Autocomplete, Box, Checkbox, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ProductDTO } from "models/product";
import { CellProps, Column, useTable } from "react-table";
import CustomTable from "components/CustomTable";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { StyledInput } from "components/CustomTextField";
import { ProductService } from "apis/productService/productService";
import CustomCartFooter from "components/CustomTable/cartFooter";

interface FormCartProps {
  index: number;
  formik?: any;
  handleOnChange?: (event: any) => void;
}

export const FormCart = ({ index, formik }: FormCartProps) => {
  const [value, setValue] = useState<ProductDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const renderValue = () => {
    if (formik) {
      //   console.log("value", index, formik.values["response"].at(index));
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const updateFormikCart = () => {
    console.log("updating");
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...formik.values["response"].slice(0, index),
        value,
        ...formik.values["response"].slice(index + 1),
      ]);
    // setValue(prev => [...prev, e.target.value]);
  };

  const cartTable: Column<ProductDTO>[] = [
    {
      Header: "Product Name",
      accessor: "name",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="center">
              {row.original.name}
            </Box>
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
          <Box display="flex" justifyContent="center">
            {row.original.productPrice}
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
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
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
      Header: "Total",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
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
          <Box display="flex" justifyContent="center">
            <IconButton onClick={() => handleRemoveCart(row.original)}>
              <CustomIcon name={"delete"} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => cartTable, []);

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
      response.result && setValue(prev => [...prev, { ...response.result, quantity: item.quantity }]);
    });
  };

  const getProducts = async () => {
    await new ProductService().getProductsByFormId(formik.values["formId"]).then(response => {
      response.result &&
        setProducts(
          response.result.map(product => {
            return { ...product, quantity: 1 };
          }),
        );
    });
  };

  // useEffect(() => {
  //   renderValue();
  // }, [formik && formik.values]);

  useEffect(() => {
    renderValue();
    formik.values["formId"] && getProducts();
  }, []);

  useEffect(() => {
    updateFormikCart();
  }, [value]);

  // console.log("new values", value);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        multiple
        fullWidth
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
                  formik.values["formId"] &&
                    createProduct({
                      formId: formik.values["formId"],
                      name: e.currentTarget.value.split("/").at(0),
                      productPrice: Number(e.currentTarget.value.split("/").at(-2)),
                      quantity: Number(e.currentTarget.value.split("/").at(-1)),
                    } as ProductDTO);
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
                <Checkbox size="small" checked={selected} />
                {option.name}
              </Box>
              <Box>{option.productPrice}</Box>
            </Box>
          </li>
        )}
        onChange={(event: any, newValue: any) => {
          setValue(newValue);
        }}
      />
      {value.length > 0 && (
        <Box sx={{ marginY: 2 }}>
          <CustomTable
            isCart
            data={value}
            table={table}
            columns={columns}
            highlightOnHover={false}
            onAddCart={handleAddCart}
          />
          <CustomCartFooter formik={formik} index={index} />
        </Box>
      )}
    </FormControl>
  );
};
