import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponce } from "../../shared/sendResponce";
import status from "http-status";

const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await SpecialtyService.createSpecialty(payload)
        sendResponce(res, {
            httpStatuscode: status.CREATED,
            success: true,
            message: 'Specialty created successfully',
            data: result
        })
    }
)

const getAllSpecialties = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecialtyService.getAllSpecialties();
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: 'Specialties fetched successfully',
            data: result
        })
    }
)

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await SpecialtyService.deleteSpecialty(id as string)
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: 'Specialty deleted successfully',
            data: result,
        })
    }
)

const updateSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body
        const result = await SpecialtyService.updateSpecialty(id as string, payload)
        sendResponce(res, {
            httpStatuscode: status.OK,
            success: true,
            message: 'Specialty updated successfully',
            data: result,
        })
    }
)


export const SpecialtyController = {
    createSpecialty,
    getAllSpecialties,
    deleteSpecialty,
    updateSpecialty
}