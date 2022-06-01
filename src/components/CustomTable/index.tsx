import { styled, Table, TableCell, tableCellClasses, TableContainer } from "@mui/material";
import { Pageable } from "models/baseModels";
import React from "react";
import { Column, TableInstance } from "react-table";
import { COLORS } from "styles";
import CustomCartFooter from "./cartFooter";
import CustomTableBody from "./tableBody";
import CustomTableFooter from "./tableFooter";
import CustomTableHeader from "./tableHeader";

export interface CustomTableProps<D extends object> {
  columns: Array<Column<D>>;
  table: TableInstance<D>;
  data?: Array<D>;
  pageParams?: Pageable;
  onChangePageNumber?: (value: number) => void;
  onChangePageSize?: (value: number) => void;
  showCheckbox?: boolean;
  highlightOnHover?: boolean;
  isCart?: boolean;
  onAddCart?: () => void;
  onClickRow?: (row: any) => void;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLORS.white,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 600,
    paddingY: 2,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Inter",
  },
}));

const CustomTable = <D extends object>({
  table,
  columns,
  pageParams,
  onChangePageNumber,
  onChangePageSize,
  data,
  showCheckbox,
  highlightOnHover,
  isCart,
  onAddCart,
  onClickRow
}: CustomTableProps<D>) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const { rows, getTableBodyProps, headerGroups, getTableProps, prepareRow } = table;

  const getStartIndex = (): number => {
    if (pageParams) {
      return pageParams.pageNumber * pageParams.pageSize;
    }
    return 0;
  };

  React.useEffect(() => {
    const timeSet = setInterval(() => {
      if (rows.length > 0) {
        setLoading(false);
        clearInterval(timeSet);
      } else {
        setLoading(false);
        clearInterval(timeSet);
      }
    }, 300);
    return () => {
      clearInterval(timeSet);
    };
  }, [rows]);

  return (
    <TableContainer sx={{}}>
      <Table stickyHeader aria-label="sticky table" sx={{ overflowX: "hidden" }} {...getTableProps()}>
        <CustomTableHeader headerGroups={headerGroups} showCheckbox={Boolean(showCheckbox)} />
        <CustomTableBody
          startIndex={getStartIndex}
          data={data}
          rows={rows}
          columns={columns}
          loading={loading}
          prepareRow={prepareRow}
          getTableBodyProps={getTableBodyProps}
          showCheckbox={Boolean(showCheckbox)}
          highlightOnHover={Boolean(highlightOnHover)}
          isCart={isCart}
          onAddCart={onAddCart}
          onClickRow={onClickRow}
        />
      </Table>
      {!isCart && pageParams && onChangePageNumber && onChangePageSize && (
        <CustomTableFooter
          pageParams={pageParams}
          onChangePage={onChangePageNumber}
          onChangeRowsPerPage={onChangePageSize}
          loading={loading}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
