import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { adminVerify } from "../middlewares/admin.auth.js";
import { createTripSchedule } from "../controllers/tripschedule.controller.js";

const router = Router();
router.route("/create_trip_schedule").post(verifyJWT,adminVerify,createTripSchedule)




export default router
