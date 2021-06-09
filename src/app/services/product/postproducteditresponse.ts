import { TbProduct } from "./tbproduct";

export class PostProductEditResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbProduct: TbProduct;
}
