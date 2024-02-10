import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { adminVerify } from "../middlewares/admin.auth.js";
import { addStop, getStop } from "../controllers/stops.controller.js";


const router = Router();
router.route("/addstop").post(verifyJWT,adminVerify,addStop)
router.route("/getstop").get(verifyJWT,getStop)




export default router
