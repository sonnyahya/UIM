import { TbBrand } from './tbbrand';

export class GetBrandResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstTbBrand: TbBrand[] = Array(new TbBrand());
}
