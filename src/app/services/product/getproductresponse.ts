import { TbProduct } from './tbproduct';

export class GetProductResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbProduct: TbProduct = new TbProduct();
}
