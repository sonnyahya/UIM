import { TbUser } from './tbuser';

export class UserAddResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUsers: TbUser = new TbUser();
}
