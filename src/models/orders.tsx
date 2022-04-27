export interface OrderDTO {
    id: string;
    customerName: string;
    phoneNumber: string;
    total: string;
    createdDate: Date;
    status: string;
    statusColor?: string;
    statusBackgroundColor?: string;
}