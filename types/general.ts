export interface BaseResponse<T> {
    data: T;
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
export type Pagination = BaseResponse<any>['meta'];
