import { TbGwp } from "./tbgwp";

export class PostGwpEditResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbGwp: TbGwp;    
}
