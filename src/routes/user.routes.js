import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { validater } from "../middlewares/validater.js";
import { verifyJWT } from "../middlewares/auth.js";


const router = Router();

router.route("/register").post(validater,registerUser)
router.route("/login").post(validater,loginUser)
//seccured routes
router.route("/logout").post(verifyJWT,logoutUser)




export default router