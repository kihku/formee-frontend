import FormControl from "@mui/material/FormControl";
import { Box, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ProductDTO } from "models/product";
import { CellProps, Column, useTable } from "react-table";
import CustomTable from "components/CustomTable";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";

interface FormCartProps {
  index: number;
  formik?: any;
  handleOnChange?: (event: any) => void;
}

export const FormCart = ({ index, formik }: FormCartProps) => {
  const [value, setValue] = useState<ProductDTO[]>([]);

  const renderValue = () => {
    if (formik) {
      //   console.log("value", index, formik.values["response"].at(index));
      setValue(formik.values["response"] && formik.values["response"].at(index));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik &&
      formik.setFieldValue &&
      formik.setFieldValue("response", [
        ...formik.values["response"].slice(0, index),
        [...value, e.target.value],
        ...formik.values["response"].slice(index + 1),
      ]);
    // setValue(prev => [...prev, e.target.value]);
  };

  const cartTable: Column<ProductDTO>[] = [
    {
      Header: "Product Name",
      accessor: "productName",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              //   handleOpenDetailDialog(row.original);
            }}
          >
            {row.original.productName}
          </Box>
        );
      },
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="center">
            {row.original.unitPrice}
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
            <IconButton>
              <CustomIcon name="add" color={COLORS.primaryLight} />
            </IconButton>
            {row.original.quantity}
            <IconButton>
              <CustomIcon name="remove" color={COLORS.primaryLight} />
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
            {/* {row.original.unitPrice} */}0
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

  useEffect(() => {
    renderValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik && formik.values]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <CustomTable isCart data={value} table={table} columns={columns} highlightOnHover={false} />
    </FormControl>
  );
};
