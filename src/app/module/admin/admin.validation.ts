import z from "zod";

export const updateAdminValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters").optional(),
        profilePhoto: z.string().url("Invalid URL format").optional(),
        contactNumber: z.string().min(11, "Contact number must be at least 11 digits").optional(),
    }),
});

export const adminValidation = {
    updateAdminValidationSchema,
};
