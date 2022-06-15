import { GridSize, SxProps, Theme } from "@mui/material";
import { IconType } from "components/CustomIcon";
import { ComponentType } from "constants/forms";
import { FormikErrors } from "formik";
import { ReactNode } from "react";

export interface CustomOption {
  title: string;
  value: any;
  icon?: IconType;
  color?: string;
  checkedIcon?: IconType;
  checkedColor?: string;
  backgroundColor?: string;
  disableRipple?: boolean;
  component?: ReactNode;
  parentValue?: any;
}

export interface Pageable {
  total: number;
  pageNumber: number;
  pageSize: number;
}

export interface FormikType<T> {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<T>> | Promise<void>;
  values: T;
  errors: any;
}

export interface FieldGeneral<T, K> {
  name?: keyof T;
  label?: String;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  formik?: FormikType<T>;

  // text field
  type?: "text" | "number" | "password";
  helperText?: string;
  handleOnClickHelperText?: () => void;
  multiline?: boolean;

  // select
  options?: K[];
  fieldValue?: keyof K;
  fieldString?: keyof K;
}

export interface FilterFieldGeneral<T, K> {
  name: keyof T;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  formik?: FormikType<T>;

  // text field
  type: "text" | "checkbox" | "picker";

  // select
  options?: K[];
  fieldValue?: keyof K;
  fieldString?: keyof K;
}

export interface FormFieldGeneral<T, K> {
  index: number;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  show?: boolean;
  isEditing?: boolean;
  formik?: FormikType<T>;
  xs?: GridSize;

  // text field
  type: ComponentType;
  helperText?: string;

  // select
  options?: K[];
  fieldValue?: keyof K;
  fieldString?: keyof K;
}