import { TbGwpSku } from "./tbgwpsku";

export class PostGwpAddRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
	tbgSku: string;
    tbGwpSku: TbGwpSku[] = Array();
}
