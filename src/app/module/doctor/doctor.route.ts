import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorValidation } from "./doctor.validation";
import { Role } from "../../../generated/prisma/client";

const router = Router();

// Get all doctors - accessible to authenticated users
router.get("/", 
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    doctorController.getAllDoctors
)

// Get doctor by ID
router.get("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    doctorController.getDoctorById
)

// Update doctor
router.patch("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    validateRequest(doctorValidation.updateDoctorValidationSchema),
    doctorController.updateDoctor
)

// Soft delete doctor - only admin and super admin
router.delete("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.softDeleteDoctor
)

export const doctorRoutes = router;