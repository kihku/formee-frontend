/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomTextField } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { COLORS } from "styles";
import * as Yup from "yup";
import CreateFieldsFilter, { CreateFieldsFilterProps } from "components/CreateFieldsFilter";
import { useFormik } from "formik";
import { CustomOption, Pageable } from "models/baseModels";
import { CustomButton } from "components/CustomButton";
import { useEffect, useMemo, useState } from "react";
import { CellProps, Column, useRowSelect, useTable } from "react-table";
import DateUtils from "utils/dateUtils";
import CustomTable from "components/CustomTable";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { useTranslation } from "react-i18next";
import { CustomIcon } from "components/CustomIcon";
import { ProductDTO } from "models/product";
import { ProductService } from "apis/productService/productService";
import { getCookie } from "utils/cookieUtils";
import DialogEditProduct from "./dialogs/editProductDialog";
import { openNotification } from "redux/actions/notification";
import { useDispatch } from "react-redux";
import DialogAddProduct from "./dialogs/addProductDialog";
import { productTypeList } from "constants/constants";
import { CustomChip } from "components/CustomChip";

function ProductsPage() {
  const { t } = useTranslation(["commons", "buttons"]);
  const dispatch = useDispatch();

  const [item, setItem] = useState<ProductDTO>({} as ProductDTO);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 10,
  });

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: { status: [], createdDate: new Date() },
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const fields: CreateFieldsFilterProps<any, CustomOption>[] = [];

  const tableContent: Column<ProductDTO>[] = [
    {
      Header: "Hình ảnh",
      accessor: undefined,
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
      Header: "Loại sản phẩm",
      accessor: "type",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            <CustomChip
              text={productTypeList.find(item => item.value === row.original.type)?.title}
              backgroundColor={COLORS.redBackground}
              textColor={COLORS.red}
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
      Header: "Giá gốc",
      accessor: "costPrice",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.costPrice}
            {" đ"}
          </Box>
        );
      },
    },
    {
      Header: "Giá bán",
      accessor: "productPrice",
      maxWidth: 10,
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
      accessor: "inventory",
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {row.original.inventory}
          </Box>
        );
      },
    },
    {
      Header: "Thao tác",
      accessor: undefined,
      maxWidth: 5,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left" sx={{}} onClick={() => {}}>
            <IconButton
              onClick={() => {
                setItem(row.original);
                setOpenEditDialog(true);
              }}
            >
              <CustomIcon name="edit" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteProduct(row.original.uuid);
              }}
            >
              <CustomIcon name="delete" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => tableContent, []);

  const table = useTable(
    {
      columns,
      data: products,
    },
    useRowSelect,
  );

  async function handleSubmitForm(values: any) {
    console.log("values", values);
  }

  const getProducts = async () => {
    let userId = getCookie("USER_ID");
    await new ProductService().getProductsByUserId(userId).then(response => {
      if (response.result) {
        setProducts(response.result);
        setPageParams({ ...pageParams, total: response.result.length });
      }
    });
  };

  const deleteProduct = async (productId: string) => {
    await new ProductService().deleteById(productId).then(response => {
      dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
      getProducts();
    });
  };

  useEffect(() => {
    setProducts(
      products.slice(pageParams.pageNumber * pageParams.pageSize, (pageParams.pageNumber + 1) * pageParams.pageSize),
    );
  }, [pageParams]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            {t("helper_filters")}
          </Grid>
          <Grid item xs={12}>
            <CustomTextField placeholder={t("helper_search")} />
          </Grid>
          <CreateFieldsFilter formik={formik} fields={fields} />
          <Grid
            item
            xs={12}
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <CustomButton
              text="button_clear"
              type="rounded-outlined"
              startIcon="cancelCircle"
              color={COLORS.lightText}
            />
            <CustomButton text="button_apply" type="rounded-outlined" startIcon="checkCircle" />
          </Grid>
        </Grid>
        <Grid item xs={9.5} sx={{ padding: 5 }}>
          <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "25px", marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <CustomTitle text={[{ text: "Quản lý sản phẩm", highlight: true }]} />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CustomButton
                  text="Tạo sản phẩm"
                  type="rounded-outlined"
                  startIcon="lightAdd"
                  color={COLORS.lightText}
                  handleOnClick={() => {
                    setOpenAddDialog(true);
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomBackgroundCard sizeX="auto" sizeY="auto" padding={-2}>
              <CustomTable
                pointerOnHover
                highlightOnHover
                showCheckbox={false}
                data={products}
                table={table}
                columns={columns}
                pageParams={pageParams}
                onChangePageNumber={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: value }));
                }}
                onChangePageSize={(value: number) => {
                  setPageParams(pageParams => ({ ...pageParams, pageNumber: 0, pageSize: value }));
                }}
                onClickRow={(row: any) => {
                  setItem(row.original);
                  setOpenEditDialog(true);
                }}
              />
            </CustomBackgroundCard>
          </Grid>
        </Grid>
        {openEditDialog && (
          <DialogEditProduct
            itemEdit={item}
            openDialog={openEditDialog}
            handleCloseDialog={() => {
              setOpenEditDialog(false);
              getProducts();
            }}
          />
        )}
        {openAddDialog && (
          <DialogAddProduct
            openDialog={openAddDialog}
            handleCloseDialog={() => {
              setOpenAddDialog(false);
              getProducts();
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
export default ProductsPage;
