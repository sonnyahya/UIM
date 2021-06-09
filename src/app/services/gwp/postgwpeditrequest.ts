import { TbGwpSku } from "./tbgwpsku";

export class PostGwpEditRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
	tbgId: string;
	tbgSku: string;    
    tbGwpSku: TbGwpSku[] = Array();
}
