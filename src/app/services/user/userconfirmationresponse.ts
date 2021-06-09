import { TbUser } from './tbuser';

export class UserConfirmationResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUsers: TbUser = new TbUser();
}
