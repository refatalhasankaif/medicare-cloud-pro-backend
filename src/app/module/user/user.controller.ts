import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { userService } from "./user.service";
import { sendResponce } from "../../shared/sendResponce";
import status from "http-status";

const createDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await userService.createDoctor(payload);
        sendResponce(res, {
            httpStatuscode: status.CREATED,
            success: true,
            message: "Doctor created successfully",
            data: result
        })
    }
)

const createAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await userService.createAdmin(payload);
        sendResponce(res, {
            httpStatuscode: status.CREATED,
            success: true,
            message: `${payload.role} created successfully`,
            data: result
        })
    }
)

export const userController = {
    createDoctor,
    createAdmin
}

