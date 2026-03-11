import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponce, TErrorSource } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handelZodError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVars.NODE_ENV === 'development') {
        console.log("Error from global error handler:", err);
    }
    let errorSource: TErrorSource[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = 'Internel Server Error';

    if (err instanceof z.ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = [...simplifiedError.errorSource]

        err.issues.forEach(issue => {
            errorSource.push({
                path: issue.path.join(" => "),
                message: issue.message
            })

        })
    }

    const errorResponce: TErrorResponce = {
        success: false,
        message: message,
        errorSource,
        error: envVars.NODE_ENV === 'development' ? err : undefined,
    }


    res.status(statusCode).json({errorResponce})
}