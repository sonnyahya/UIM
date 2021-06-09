import { TbProduct } from './tbproduct';

export class GetSellableProductResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstTbProduct: TbProduct[] = Array(new TbProduct());
}
