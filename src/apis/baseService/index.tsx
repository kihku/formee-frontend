export interface Pagination<T extends Iterable<any>> {
    page: number;
    size: number;
    total: number;
    rows: T;
}

export interface PageRequest {
    pageSize: number;
    pageNumber: number;
    keywords?: string;
    active?: any;
    direction?: string;
    sortBy?: string;
    keywordsButton?: string;
}

export interface BaseResponse {
    isSuccess: boolean;
    message: string;
    data?: any;
    description?: any;
}

export interface DataResponse<T> {
    code: string;
    description: string;
    errors: string;
    message: string;
    result?: T;
    meta?: string;
}

export interface BaseReponseI<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}

export class BaseService {
    protected getRequestHeaders = () => {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    };
}

export enum ResponseCode {
	CONFLICT = "409",
	NOT_FOUND = "404",
	SUCCESS = "200",
	BAD_REQUEST = "400",
}
