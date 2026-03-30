import { Router  } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema, createAdminZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.post("/create-doctor",
    validateRequest(createDoctorZodSchema),
    userController.createDoctor
)

router.post("/create-admin",
    checkAuth(Role.SUPER_ADMIN),
    validateRequest(createAdminZodSchema),
    userController.createAdmin
)

export const userRoutes = router;
