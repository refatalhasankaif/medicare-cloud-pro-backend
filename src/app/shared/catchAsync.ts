import { NextFunction, RequestHandler, Request, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Failed to fetch',
                error: error.message
            })
        }
    }
}