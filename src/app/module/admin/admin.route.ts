import { Router } from "express";
import { adminController } from "./admin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidation } from "./admin.validation";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.get("/", 
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAllAdmins
)

router.get("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAdminById
)

router.patch("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(adminValidation.updateAdminValidationSchema),
    adminController.updateAdmin
)

router.delete("/:id",
    checkAuth(Role.SUPER_ADMIN),
    adminController.softDeleteAdmin
)

export const adminRoutes = router;
