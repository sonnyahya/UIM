import { TbOrder } from './tborder';

export class GetOrderListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstTbOrder: TbOrder[] = Array(new TbOrder());
    length: number;
}
