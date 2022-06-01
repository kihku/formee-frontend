import { Box, InputBase, Pagination, Select, MenuItem } from "@mui/material";
import { Pageable } from "models/baseModels";
import React from "react";
import { useTranslation } from "react-i18next";

export interface CustomTableFooterProps {
  pageParams: Pageable;
  loading: boolean;
  onChangePage: (value: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
}

const CustomTableFooter: React.FC<CustomTableFooterProps> = ({ pageParams, onChangePage, onChangeRowsPerPage }) => {
  const { t } = useTranslation(["commons"]);
  const total = Math.ceil(pageParams.total / pageParams.pageSize);
  const count = !isNaN(total) ? total : 0;

  return (
    <Box sx={{ paddingTop: 2, display: "flex", alignItems: "center", fontSize: 14 }}>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ marginX: 1.5 }}>{t("table_rows_per_page")}</Box>
        <Box sx={{ paddingTop: 0.25 }}>
          <Select
            input={<InputBase />}
            value={pageParams.pageSize}
            onChange={event => onChangeRowsPerPage(Number(event.target.value))}
          >
            <MenuItem value={10}>
              <Box sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 14 }}>10</Box>
            </MenuItem>
            <MenuItem value={20}>
              <Box sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 14 }}>20</Box>
            </MenuItem>
            <MenuItem value={50}>
              <Box sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 14 }}>50</Box>
            </MenuItem>
          </Select>
        </Box>
      </Box>

      <Pagination
        count={count}
        defaultPage={pageParams.pageNumber + 1}
        page={pageParams.pageNumber + 1}
        siblingCount={1}
        disabled={total === 1}
        size="medium"
        color="primary"
        shape="circular"
        showFirstButton
        showLastButton
        onChange={(event, page) => onChangePage(page - 1)}
      />

      <Box component="span" paddingX="10px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        {pageParams.total === 0 ? 0 : Math.ceil(pageParams.pageNumber * pageParams.pageSize + 1)} -{" "}
        {pageParams.total < (pageParams.pageNumber + 1) * pageParams.pageSize
          ? pageParams.total
          : (pageParams.pageNumber + 1) * pageParams.pageSize}
        {" / "}
        {pageParams.total}
      </Box>
    </Box>
  );
};

export default CustomTableFooter;
