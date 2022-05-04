import { CustomOption } from "models/baseModels";

export type ComponentType = "IDENTITY" | "SELECT" | "STATUS" | "TEXT" | "NUMBER" | "CART" | "DATE";

export type ValidationType = "REQUIRED" | "GT" | "LT" | "MIN" | "MAX" | "LENGTH";

export const componentTypes: CustomOption[] = [
  {
    title: "Text",
    value: "TEXT",
  },
  {
    title: "Number",
    value: "NUMBER",
  },
  {
    title: "Date",
    value: "DATE",
  },
  {
    title: "Select",
    value: "SELECT",
  },
];

export const validationTypes: CustomOption[] = [
  {
    title: "Required",
    value: "REQUIRED",
  },
  {
    title: "Greater than",
    value: "GT",
  },
  {
    title: "Lower than",
    value: "LT",
  },
  {
    title: "Minimum value",
    value: "MIN",
  },
  {
    title: "Maximum value",
    value: "MAX",
  },
];
