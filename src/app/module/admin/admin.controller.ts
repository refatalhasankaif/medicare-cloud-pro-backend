import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponce } from "../../shared/sendResponce";
import status from "http-status";
import { adminService } from "./admin.service";

const getAllAdmins = catchAsync(
    async (req: Request, res: Response) => {
        const result = await adminService.getAllAdmins();
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: "Admins retrieved successfully",
            data: result
        })
    }
)

const getAdminById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await adminService.getAdminById(id);
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: "Admin retrieved successfully",
            data: result
        })
    }
)

const updateAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await adminService.updateAdmin(id, req.body);
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: "Admin updated successfully",
            data: result
        })
    }
)

const softDeleteAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await adminService.softDeleteAdmin(id);
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })
    }
)

export const adminController = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    softDeleteAdmin,
}
