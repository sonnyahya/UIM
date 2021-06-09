import { TbOrder } from "./tborder";
import { TbOrderPack } from "./tborderpack";
import { TbOrderPackDetail } from "./tborderpackdetail";

export class PostOrderPackingRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;

    tbopOrderNo: string;    
    lstTbOrderPackDetail: TbOrderPackDetail[] = Array(new TbOrderPackDetail());
    lstTbOrder: TbOrder[] = Array(new TbOrder());
}
