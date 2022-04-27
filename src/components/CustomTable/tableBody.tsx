import { TableBody, TableRow, LinearProgress, TableCell, Box, Checkbox } from "@mui/material";
import React from "react";
import { Column, Row, TableBodyPropGetter, TableBodyProps } from "react-table";
import { COLORS } from "styles";
import { StyledTableCell } from ".";

export interface CustomTableBodyProps<D extends object> {
  columns: Array<Column<D>>;
  rows: Array<Row<D>>;
  getTableBodyProps: (propGetter?: TableBodyPropGetter<D>) => TableBodyProps;
  prepareRow: (row: Row<D>) => void;
  loading: boolean;
  startIndex: () => number;
  data?: Array<D>;
}

const CustomTableBody = <D extends object>({
  rows,
  columns,
  getTableBodyProps,
  prepareRow,
  loading,
  startIndex,
  data,
}: CustomTableBodyProps<D>) => {
  return (
    <TableBody {...getTableBodyProps()}>
      {!loading &&
        rows.map((row, i) => {
          let dataRow: any = row.original;
          let style: React.CSSProperties = dataRow["style"]
            ? ({ ...dataRow["style"], ":hover": { backgroundColor: COLORS.primaryBackground } } as React.CSSProperties)
            : ({ ":hover": { backgroundColor: COLORS.primaryBackground } } as React.CSSProperties);
          prepareRow(row);
          return (
            <TableRow sx={style} {...row.getRowProps()}>
              <StyledTableCell component="th" scope="row" align="center" width="3%" sx={{}}>
                <Box>
                  <Checkbox disableRipple size="small" />
                </Box>
              </StyledTableCell>
              <StyledTableCell scope="row" align="center" sx={{}}>
                {i + 1 + startIndex()}
              </StyledTableCell>
              {row.cells.map((cell, index) => {
                return (
                  <StyledTableCell
                    scope="row"
                    align="left"
                    sx={{}}
                    {...cell.getCellProps()}
                    style={{
                      ...style,
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    onClick={() => {}}
                  >
                    {cell.render("Cell")}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          );
        })}
      {loading && (
        <TableRow>
          <StyledTableCell scope="row" colSpan={columns.length + 2} sx={{ textAlign: "center" }}>
            <LinearProgress />
          </StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default CustomTableBody;
