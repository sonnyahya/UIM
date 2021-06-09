import { ViewOrderPack } from './vieworderpack';

export class GetOrderPackListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewOrderPack: ViewOrderPack[] = Array(new ViewOrderPack());
    length: number;
}
