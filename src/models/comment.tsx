export interface CommentDTO {
    uuid: string;
    orderId: string;
    message: string;
    createdBy: string;
    createdDate: string;
    fromEdit: boolean;
    captcha?: string;
}