import { prisma } from "../../lib/prisma"
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { IUpdateAdminPayload } from "./admin.interface";

const getAllAdmins = async() => {
    const admins = await prisma.admin.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
    return admins;  
}

const getAdminById = async(id: string) => {
    const admin = await prisma.admin.findUnique({
        where: { 
            id,
            isDeleted: false,
        },
        include: {
            user: true,
        }
    })

    if (!admin) {
        throw new AppError(status.NOT_FOUND, "Admin not found");
    }

    return admin;
}

const updateAdmin = async(id: string, payload: IUpdateAdminPayload) => {
    const existingAdmin = await prisma.admin.findUnique({
        where: { id, isDeleted: false }
    })

    if (!existingAdmin) {
        throw new AppError(status.NOT_FOUND, "Admin not found");
    }

    const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: payload,
        include: {
            user: true,
        }
    })

    return updatedAdmin;
}

const softDeleteAdmin = async(id: string) => {
    const admin = await prisma.admin.findUnique({
        where: { id }
    })

    if (!admin) {
        throw new AppError(status.NOT_FOUND, "Admin not found");
    }

    if (admin.isDeleted) {
        throw new AppError(status.NOT_FOUND, "Admin is already deleted");
    }

    const result = await prisma.admin.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        }
    })

    return result;
}

export const adminService = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    softDeleteAdmin,
}
