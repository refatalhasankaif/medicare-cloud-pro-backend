import { catchAsync } from "../../shared/catchAsync";
import { sendResponce } from "../../shared/sendResponce";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const registerPatient = catchAsync(
    async(req: Request, res: Response) => {
        const payload = req.body;

        const result = await authService.registerPatient(payload)

        sendResponce(res, {
            httpStatuscode: 201,
            success: true,
            message: "Patient registered successfully",
            data: result
        })
    }
)

const loginUser = catchAsync(
    async(req: Request, res: Response) => {
        const payload = req.body;
        const result = await authService.loginUser(payload)
        sendResponce(res,{
            httpStatuscode: 200,
            success: true,
            message: "User logged in successfully",
            data: result
        })
    }
)
export const AuthController = {
    registerPatient,
    loginUser,
    
}