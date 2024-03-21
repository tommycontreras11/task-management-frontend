import { statusCode } from '../utils/statusCode';

export interface IResponse {
    status: typeof statusCode;
    message: string;
    data?: any;
    success: boolean;
}