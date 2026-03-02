import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";

const router = Router()

router.use("/auth", AuthRoutes)
router.use('/specialties', SpecialtyRoutes)

export const IndexRoutes = router;