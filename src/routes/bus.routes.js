import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { adminVerify } from "../middlewares/admin.auth.js";
import { addBus } from "../controllers/bus.controller.js";

const router = Router();
router.route("/addbus").post(verifyJWT,adminVerify,addBus)



export default router
