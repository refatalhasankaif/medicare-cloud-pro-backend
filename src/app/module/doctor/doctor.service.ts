import { prisma } from "../../lib/prisma"
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async() => {
    const doctors = await prisma.doctor.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            user: true,
            doctorSpecialties: {
                include: {
                    specialty: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
    return doctors;  
}

const getDoctorById = async(id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: { 
            id,
            isDeleted: false,
        },
        include: {
            user: true,
            doctorSpecialties: {
                include: {
                    specialty: true
                }
            }
        }
    })

    if (!doctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    return doctor;
}

const updateDoctor = async(id: string, payload: IUpdateDoctorPayload) => {
    const existingDoctor = await prisma.doctor.findUnique({
        where: { id, isDeleted: false }
    })

    if (!existingDoctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    const updatedDoctor = await prisma.doctor.update({
        where: { id },
        data: payload as any,
        include: {
            user: true,
            doctorSpecialties: {
                include: {
                    specialty: true
                }
            }
        }
    })

    return updatedDoctor;
}

const softDeleteDoctor = async(id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id }
    })

    if (!doctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    if (doctor.isDeleted) {
        throw new AppError(status.NOT_FOUND, "Doctor is already deleted");
    }

    const result = await prisma.doctor.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        }
    })

    return result;
}

export const doctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    softDeleteDoctor,
}