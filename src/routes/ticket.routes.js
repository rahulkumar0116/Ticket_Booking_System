import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { createTicket } from "../controllers/ticket.controller.js";


const router = Router();
router.route("/book_ticket").post(verifyJWT,createTicket)




export default router
