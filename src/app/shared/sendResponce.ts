import { Response } from "express";
interface IResponceData<T> {
    httpStatuscode: number;
    success: boolean;
    message: string;
    data?: T;
}
export const sendResponce = <T>(res: Response, responceData: IResponceData<T>) => {
    const {
        httpStatuscode,
        success,
        message,
        data,
    } = responceData;
    res.status(httpStatuscode).json({
        success,
        message,
        data,
    })
}