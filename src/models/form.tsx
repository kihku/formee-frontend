import { CreateFieldsFormProps } from "components/CreateFieldsForm";
import { defaultFormLayoutEng, defaultFormLayoutVi } from "constants/constants";
import { ComponentType, ValidationType } from "constants/forms";
import { CommentDTO } from "./comment";

export interface FormDTO {
  uuid: string;
  userId?: string;
  templateId?: string;
  name: string;
  image?: string;
  description?: string;
  tags?: string[];
  layoutJson: string;
  sections?: CreateFieldsFormProps<any, any>[];
  responsePermission?: string;
  createdBy?: string;
  isDefault?: boolean;
  color: string;
  imagePath: string;
}

export interface FormResponseDTO {
  uuid: string;
  formId: string;
  orderName: string;
  createdDate: Date;
  response: any; // layout and response must be of the same length in order to map the answers to the components
  requested?: boolean;
  confirmed?: boolean;
  comments?: CommentDTO[];
  discount?: string;
  status?: string;
  shippingFee?: number;
}

export interface FormLayoutDTO {
  // id: string;
  sections: CreateFieldsFormProps<any, any>[];
}

export interface FormSectionDTO {
  title: string;
  components: CreateFieldsFormProps<any, any>[];
}

export interface FormComponentDTO {
  title: string;
  type: ComponentType;
  validation: FormValidationDTO[];
  showOnTable: boolean;
}

export interface FormValidationDTO {
  type: ValidationType;
  controlValue?: any;
  errorMessgage?: string;
}

export interface FormOrderSearchRequest {
  formId: string;
  startDate: string;
  endDate: string;
  keywords: string;
  orderStatus: string[];
  pageNumber: number;
  pageSize: number;
}

export const initFilterRequest: FormOrderSearchRequest = {
  formId: "",
  startDate: "",
  endDate: "",
  keywords: "",
  orderStatus: [],
  pageNumber: 0,
  pageSize: 10,
};

export const initFormDTOEng: FormDTO = {
  uuid: "",
  name: "",
  color: "",
  imagePath: "",
  layoutJson: JSON.stringify(defaultFormLayoutEng),
};

export const initFormDTOVi: FormDTO = {
  uuid: "",
  name: "",
  color: "",
  imagePath: "",
  layoutJson: JSON.stringify(defaultFormLayoutVi),
};
