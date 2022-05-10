import { ComponentType, ValidationType } from "constants/forms";

export interface FormDTO {
  id: string;
  // shopId: string;
  name: string;
  image?: string;
  description?: string;
  tags?: string[];
  layout: FormLayoutDTO;
}

export interface FormResponseDTO {
  id: string;
  formId: string;
  createdDate: Date;
  response: any[]; // layout and response must be of the same length in order to map the answers to the components
}

export interface FormLayoutDTO {
  id: string;
  sections: FormSectionDTO[];
}

export interface FormSectionDTO {
  title: string;
  components: FormComponentDTO[];
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

export interface CommentDTO {
  id: string;
  orderId: string;
  createdBy: string;
  createDate: Date;
  content: string;
  isDefault: boolean;
}
