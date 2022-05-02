import { Box, Checkbox, TableHead, TableRow } from "@mui/material";
import { HeaderGroup } from "react-table";
import { StyledTableCell } from ".";

export interface CustomTableHeaderProps<D extends object> {
  headerGroups: Array<HeaderGroup<D>>;
  showCheckbox?: boolean;
}

const CustomTableHeader = <D extends object>({ headerGroups, showCheckbox }: CustomTableHeaderProps<D>) => {
  return (
    <TableHead>
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ borderRadius: "5px 10px 15px 20px" }}>
          {Boolean(showCheckbox) && (
            <StyledTableCell
              component="th"
              scope="row"
              align="center"
              width="3%"
              sx={{
                borderRadius: "10px 0px 0px 0px",
              }}
            >
              <Box>
                <Checkbox disableRipple size="small" />
              </Box>
            </StyledTableCell>
          )}
          <StyledTableCell component="th" scope="row" align="center" width="3%" sx={{}}>
            <Box component="span" textAlign="center">
              #
            </Box>
          </StyledTableCell>
          {headerGroup.headers.map((column, index) => {
            return (
              <StyledTableCell
                component="th"
                scope="row"
                align="center"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  borderRadius: index === headerGroup.headers.length - 1 ? "0px 10px 0px 0px" : "0px",
                }}
                width={`${column.maxWidth}%`}
              >
                <Box component="span" textAlign="center">
                  {column.render("Header")}
                </Box>
              </StyledTableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default CustomTableHeader;
