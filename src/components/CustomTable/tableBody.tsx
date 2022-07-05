import { Box, Checkbox, LinearProgress, TableBody, TableRow } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
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
  showCheckbox?: boolean;
  highlightOnHover?: boolean;
  pointerOnHover?: boolean;
  isCart?: boolean;
  onAddCart?: () => void;
  onClickRow?: (row: any) => void;
}

const CustomTableBody = <D extends object>({
  rows,
  columns,
  getTableBodyProps,
  prepareRow,
  loading,
  startIndex,
  data,
  showCheckbox,
  highlightOnHover,
  pointerOnHover,
  isCart,
  onAddCart,
  onClickRow,
}: CustomTableBodyProps<D>) => {
  const { t } = useTranslation(["commons"]);

  return (
    <TableBody {...getTableBodyProps()}>
      {!loading &&
        rows.map((row, i) => {
          let dataRow: any = row.original;
          let style: React.CSSProperties = dataRow["style"]
            ? ({
                ...dataRow["style"],
                ":hover": highlightOnHover
                  ? { backgroundColor: COLORS.primaryBackground, cursor: pointerOnHover ? "pointer" : "auto" }
                  : {},
              } as React.CSSProperties)
            : ({
                ":hover": highlightOnHover
                  ? { backgroundColor: COLORS.primaryBackground, cursor: pointerOnHover ? "pointer" : "auto" }
                  : {},
              } as React.CSSProperties);
          prepareRow(row);
          return (
            <TableRow
              sx={style}
              {...row.getRowProps()}
              onClick={() => {
                onClickRow && onClickRow(row);
              }}
            >
              {Boolean(showCheckbox) && (
                <StyledTableCell component="th" scope="row" align="left" width="3%" sx={{}}>
                  <Box>
                    <Checkbox disableRipple size="small" />
                  </Box>
                </StyledTableCell>
              )}
              <StyledTableCell scope="row" align="left" sx={{}}>
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
          <StyledTableCell scope="row" colSpan={columns.length + 2} sx={{ textAlign: "left" }}>
            <LinearProgress />
          </StyledTableCell>
        </TableRow>
      )}
      {rows.length === 0 && (
        <TableRow>
          <StyledTableCell scope="row" colSpan={columns.length + 2} sx={{ textAlign: "center" }}>
            {t("table_empty")}
          </StyledTableCell>
        </TableRow>
      )}
      {/* {isCart && (
        <TableRow>
          <StyledTableCell scope="row" colSpan={columns.length + 2} sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: COLORS.lightText,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={onAddCart}
              >
                {"+  Thêm mới"}
              </Typography>
            </Box>
          </StyledTableCell>
        </TableRow>
      )} */}
    </TableBody>
  );
};

export default CustomTableBody;
