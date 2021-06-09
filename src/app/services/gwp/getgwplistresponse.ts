import { ViewGwpProduct } from './viewgwpproduct';

export class GetGwpListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewGwpProduct: ViewGwpProduct[] = Array(new ViewGwpProduct());
    length: number;
}
