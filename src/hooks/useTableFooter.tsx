import { Pageable } from "models/baseModels";
import { useState } from "react";

const useTableFooter = () => {
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 5,
  });

  function handleOnChangePageNumber(value: number) {
    setPageParams(pageParams => ({ ...pageParams, pageNumber: value }));
  }

  function handleOnChangePageSize(value: number) {
    setPageParams(pageParams => ({ ...pageParams, pageNumber: 0, pageSize: value }));
  }

  function updateTotal(value: number) {
    setPageParams(pageParams => ({ ...pageParams, total: value }));
  }

  return { pageParams, handleOnChangePageNumber, handleOnChangePageSize, updateTotal, setPageParams };
};

export default useTableFooter;
