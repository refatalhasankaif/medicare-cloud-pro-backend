import { Router  } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post("/create-doctor",

    // (req: Request, res: Response, next: NextFunction) => {
    //     console.log(req.body)

    //     const parseResult = createDoctorZodSchema.safeParse(req.body);
    //     if (!parseResult.success) {
    //         next(parseResult.error);
    //     }
    //     req.body = parseResult.data;
    //     next();
    // },

    validateRequest(createDoctorZodSchema),

    userController.createDoctor)


// router.post("/create-admin", userController.createAdmin)
// router.post("/create-superadmin", userController.createSuperAdmin)

export const userRoutes = router;
