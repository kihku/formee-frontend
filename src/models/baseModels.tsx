import { SxProps, Theme } from "@mui/material";
import { IconType } from "components/CustomIcon";
import { FormikErrors } from "formik";
import { ReactNode } from "react";

export interface CustomOption {
  title: string;
  value: any;
  icon?: IconType;
  iconColor?: string;
  checkedIcon?: IconType;
  checkedIconColor?: string;
  disableRipple?: boolean;
  component?: ReactNode;
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
  helplerText?: string;
  handleOnClickHelperText?: () => void;

  // select
  options?: K[];
  fieldValue?: keyof K;
  fieldString?: keyof K;
}
