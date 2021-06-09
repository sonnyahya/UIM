import { ViewBrandProduct } from './viewbrandproduct';

export class GetProductListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewBrandProduct: ViewBrandProduct[] = Array(new ViewBrandProduct());
    length: number;
}
