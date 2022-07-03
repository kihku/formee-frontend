import { Box, Menu, MenuItem } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { ProductTypeDTO } from "models/product";
import { useState } from "react";
import { COLORS } from "styles";

interface ProductTypeItemProps {
  item: ProductTypeDTO;
  handleOnClick: (item: ProductTypeDTO) => void;
  handleEditType: (item: ProductTypeDTO) => void;
  handleDeleteType: (item: ProductTypeDTO) => void;
  handleAddProduct: (item: ProductTypeDTO) => void;
}

export const ProductTypeItem = ({
  item,
  handleEditType,
  handleDeleteType,
  handleOnClick,
  handleAddProduct,
}: ProductTypeItemProps) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        gap: 2,
        paddingY: 1.5,
        paddingLeft: 2,
        cursor: "pointer",
        ":hover": {
          backgroundColor: COLORS.primaryBackground,
        },
      }}
      onContextMenu={handleContextMenu}
      onClick={() => {
        handleOnClick(item);
      }}
    >
      <Box
        sx={{
          minWidth: 10,
          minHeight: 10,
          backgroundColor: `${item.color}`,
          borderRadius: 50,
        }}
      />
      {item.name}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            handleClose();
            handleAddProduct(item);
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
            <CustomIcon name="edit" size={20} />
            {"Tạo sản phẩm mới"}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            handleClose();
            handleEditType(item);
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
            <CustomIcon name="edit" size={20} />
            {"Chỉnh sửa"}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            handleClose();
            handleDeleteType(item);
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
            <CustomIcon name="delete" size={20} />
            {"Xoá"}
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};
