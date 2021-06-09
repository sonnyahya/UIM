import { TbOrder } from './tborder';

export class GetOrderResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbOrder: TbOrder = new TbOrder();
}
