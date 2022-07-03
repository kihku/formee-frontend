/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { URL_PROFILE } from "apis/axiosClient";
import { ProductService } from "apis/productService/productService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomButton } from "components/CustomButton";
import { CustomChip } from "components/CustomChip";
import { CustomIcon } from "components/CustomIcon";
import CustomTable from "components/CustomTable";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { useFormik } from "formik";
import { Pageable } from "models/baseModels";
import { initProductRequest, ProductDTO, ProductSearchRequest, ProductTypeDTO } from "models/product";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CellProps, Column, useRowSelect, useTable } from "react-table";
import { closeConfirmation, openConfirmation } from "redux/actions/confirmDialog";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import StringUtils from "utils/stringUtils";
import * as Yup from "yup";
import { ProductTypeItem } from "./components/productTypeItem";
import DialogAddProduct from "./dialogs/addProductDialog";
import DialogAddProductType from "./dialogs/addTypeDialog";
import DialogEditProduct from "./dialogs/editProductDialog";

function ProductsPage() {
  const { t } = useTranslation(["commons", "buttons"]);
  const dispatch = useDispatch();
  const location = useLocation();

  const [item, setItem] = useState<ProductDTO>({} as ProductDTO);
  const [typeItem, setTypeItem] = useState<ProductTypeDTO>({} as ProductTypeDTO);
  const [selectedType, setSelectedType] = useState<ProductTypeDTO>({} as ProductTypeDTO);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openAddTypeDialog, setOpenAddTypeDialog] = useState<boolean>(false);
  const [pageParams, setPageParams] = useState<Pageable>({
    total: 0,
    pageNumber: 0,
    pageSize: 10,
  });

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: initProductRequest,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnChange: false,
  });

  const tableContent: Column<ProductDTO>[] = [
    {
      Header: "Hình ảnh",
      accessor: undefined,
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.imageName) && (
              <img
                src={`${URL_PROFILE.PRO}/images/${row.original.imageName}`}
                width="80"
                height="auto"
                style={{
                  backgroundColor: COLORS.grayBackground,
                  display: "flex",
                  alignItems: "center",
                  placeContent: "center",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      Header: "Loại sản phẩm",
      accessor: "typeId",
      maxWidth: 10,
      Cell: ({ row }: CellProps<ProductDTO, {}>) => {
        return (
          <Box display="flex" justifyContent="left">
            {!StringUtils.isNullOrEmty(row.original.typeId) && (
              <CustomChip
                text={productTypes.find(item => item.uuid === row.original.typeId)?.name}
                backgroundColor={productTypes.find(item => item.uuid === row.original.typeId)?.backgroundColor}
                textColor={productTypes.find(item => item.uuid === row.original.typeId)?.color}
              />
            )}
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
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              color: row.original.inventory === 0 ? COLORS.redError : COLORS.text,
              fontWeight: row.original.inventory === 0 ? 600 : 400,
            }}
          >
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
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              color: row.original.inventory === 0 ? COLORS.redError : COLORS.text,
              fontWeight: row.original.inventory === 0 ? 600 : 400,
            }}
          >
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
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              color: row.original.inventory === 0 ? COLORS.redError : COLORS.text,
              fontWeight: row.original.inventory === 0 ? 600 : 400,
            }}
          >
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
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              color: row.original.inventory === 0 ? COLORS.redError : COLORS.text,
              fontWeight: row.original.inventory === 0 ? 600 : 400,
            }}
          >
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
              onClick={e => {
                e.stopPropagation();
                setItem(row.original);
                setOpenEditDialog(true);
              }}
            >
              <CustomIcon name="edit" />
            </IconButton>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                deleteProduct(row.original);
              }}
            >
              <CustomIcon name="delete" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columns = useMemo(() => tableContent, [productTypes]);

  const table = useTable(
    {
      columns,
      data: products,
    },
    useRowSelect,
  );

  async function handleSubmitForm(values: ProductSearchRequest) {
    getProducts(values);
  }

  const getProducts = async (values: ProductSearchRequest) => {
    await new ProductService().filterProducts(values).then(response => {
      if (response.result) {
        setProducts(response.result.content);
        setPageParams({ ...pageParams, total: response.result.totalElements });
      }
    });
  };

  const deleteProduct = async (product: ProductDTO) => {
    dispatch(
      openConfirmation({
        id: "confirmDialog",
        open: true,
        title: "Xóa sản phẩm",
        content: "Bạn có chắc chắn muốn xóa " + product.name + " ?",
        value: "",
        onClose: isOk => handleCloseDelete(Boolean(isOk), product.uuid),
      }),
    );
  };

  const handleCloseDelete = async (isOk: boolean, productId: any) => {
    if (isOk) {
      await new ProductService().deleteById(productId).then(response => {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        formik.handleSubmit();
      });
    }
    dispatch(closeConfirmation());
  };

  const getProductTypes = async () => {
    await new ProductService().getAllTypes().then(response => {
      if (response.result) {
        setProductTypes(response.result);
      }
    });
  };

  const createProductType = async (values: ProductTypeDTO) => {
    await new ProductService().createProductType(values).then(response => {
      if (Number(response.code) === 200) {
        dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
        setOpenAddTypeDialog(false);
        getProductTypes();
      } else {
        dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
      }
    });
  };

  const deleteProductType = async (type: ProductTypeDTO) => {
    dispatch(
      openConfirmation({
        id: "confirmDialog",
        open: true,
        title: "Xóa loại sản phẩm",
        content: "Bạn có chắc chắn muốn xóa " + type.name + " ?",
        value: "",
        onClose: isOk => handleCloseDeleteType(Boolean(isOk), type.uuid),
      }),
    );
  };

  const handleCloseDeleteType = async (isOk: boolean, typeId: any) => {
    if (isOk) {
      await new ProductService().deleteTypeById(typeId).then(response => {
        if (Number(response.code) === 200) {
          dispatch(openNotification({ open: true, content: response.message, severity: "success" }));
          getProductTypes();
        } else {
          dispatch(openNotification({ open: true, content: response.message, severity: "error" }));
        }
      });
    }
    dispatch(closeConfirmation());
  };

  useEffect(() => {
    formik.handleSubmit();
  }, [pageParams.pageNumber, pageParams.pageSize]);

  useEffect(() => {
    getProductTypes();
    if (location.state) {
      let state: any = location.state;
      let openAddDialog: boolean = Boolean(state.openAddDialog);
      setOpenAddDialog(openAddDialog);
    }
  }, []);

  return (
    <Box>
      <Grid container sx={{ minHeight: "95vh" }}>
        <Grid item xs={2.5} sx={{ padding: 3, backgroundColor: COLORS.white }}>
          <Grid item xs={12} sx={{ fontWeight: 700, fontSize: "25px", marginBottom: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box> {t("helper_filters")}</Box>
              <Tooltip title="Xoá bộ lọc">
                <IconButton
                  onClick={() => {
                    formik.resetForm();
                    formik.handleSubmit();
                  }}
                >
                  <CustomIcon name="clearFilter" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <StyledInput
              fullWidth
              type="text"
              name="keywords"
              placeholder={t("helper_search")}
              value={formik.values.keywords}
              onChange={e => formik.setFieldValue("keywords", e.target.value)}
            />
          </Grid>
          {/* <CreateFieldsFilter formik={formik} fields={fields} /> */}
          <Grid
            item
            xs={12}
            sx={{
              // marginTop: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {/* <CustomButton
              text="button_clear"
              type="rounded-outlined"
              startIcon="cancelCircle"
              color={COLORS.lightText}
            /> */}
            <CustomButton
              text="button_apply"
              type="rounded-outlined"
              startIcon="checkCircle"
              handleOnClick={() => {
                formik.handleSubmit();
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 3 }}>
            <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                // marginBottom: 1,
              }}
            >
              <Box sx={{ fontWeight: 600, fontSize: "15px", color: COLORS.primary }}>{"LOẠI SẢN PHẨM"}</Box>
              <Tooltip title="Thêm loại mới">
                <IconButton
                  onClick={() => {
                    setOpenAddTypeDialog(true);
                  }}
                >
                  <CustomIcon name="lightAdd" color={COLORS.primary} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {productTypes.map((type, key) => {
                return (
                  <ProductTypeItem
                    key={key}
                    item={type}
                    handleEditType={(item: ProductTypeDTO) => {
                      setTypeItem(item);
                      setOpenAddTypeDialog(true);
                    }}
                    handleDeleteType={(item: ProductTypeDTO) => {
                      deleteProductType(item);
                    }}
                    handleOnClick={(item: ProductTypeDTO) => {
                      formik.setFieldValue("typeId", item.uuid);
                      getProducts({ ...formik.values, typeId: item.uuid });
                    }}
                    handleAddProduct={(item: ProductTypeDTO) => {
                      setSelectedType(item);
                      setOpenAddDialog(true);
                    }}
                  />
                );
              })}
            </Box>
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
            productTypes={productTypes}
            openDialog={openEditDialog}
            handleCloseDialog={() => {
              setOpenEditDialog(false);
              formik.handleSubmit();
            }}
          />
        )}
        {openAddDialog && (
          <DialogAddProduct
            openDialog={openAddDialog}
            productTypes={productTypes}
            selectedTypeId={selectedType.uuid}
            handleCloseDialog={() => {
              setOpenAddDialog(false);
              formik.handleSubmit();
            }}
          />
        )}
        {openAddTypeDialog && (
          <DialogAddProductType
            itemEdit={typeItem}
            openDialog={openAddTypeDialog}
            handleCloseDialog={() => {
              setOpenAddTypeDialog(false);
            }}
            handleSubmitDialog={createProductType}
          />
        )}
      </Grid>
    </Box>
  );
}
export default ProductsPage;
