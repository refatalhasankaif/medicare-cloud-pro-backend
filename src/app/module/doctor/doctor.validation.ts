import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateDoctorValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters").optional(),
        profilePhoto: z.string().url("Invalid URL format").optional(),
        contactNumber: z.string().min(11, "Contact number must be at least 11 digits").optional(),
        registrationNumber: z.string().optional(),
        experience: z.number().int("Experience must be a whole number").nonnegative("Experience cannot be negative").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be either MALE or FEMALE").optional(),
        appointmentFee: z.number().positive("Appointment fee must be positive").optional(),
        qualification: z.string().optional(),
        currentWorkingPlace: z.string().optional(),
        designation: z.string().optional(),
        address: z.string().optional(),
    }),
});

export const doctorValidation = {
    updateDoctorValidationSchema,
};
