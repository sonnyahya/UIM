import { TbGwp } from './tbgwp';
import { TbGwpSku } from './tbgwpsku';

export class GetGwpResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbGwp: TbGwp = new TbGwp();
    lstTbGwpSku: TbGwpSku[] = Array(new TbGwpSku());
}
