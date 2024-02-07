import { Router } from "express";
import { createAgency, getAgency } from "../controllers/agency.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { adminVerify } from "../middlewares/admin.auth.js";

const router = Router();
router.route("/create_agency").post(verifyJWT,adminVerify,createAgency)
router.route("/get_agency").get(verifyJWT,adminVerify,getAgency)


export default router
