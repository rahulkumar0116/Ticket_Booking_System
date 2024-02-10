import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { adminVerify } from "../middlewares/admin.auth.js";
import { createTrip, getTrip } from "../controllers/trip.controller.js";

const router = Router();
router.route("/create_trip").post(verifyJWT,adminVerify,createTrip)
router.route("/gettrip").get(verifyJWT,adminVerify,getTrip)




export default router
