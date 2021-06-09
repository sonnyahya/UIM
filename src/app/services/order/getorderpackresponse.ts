import { TbOrder } from './tborder';
import { TbOrderPack } from './tborderpack';
import { TbOrderPackDetail } from './tborderpackdetail';

export class GetOrderPackResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbOrderPack: TbOrderPack;	
    lstTbOrderPackDetail: TbOrderPackDetail[] = Array(new TbOrderPackDetail());
    lstTbOrder: TbOrder[] = Array(new TbOrder());
}
