import { TbGwp } from "./tbgwp";

export class PostGwpAddResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbGwp: TbGwp;    
}
