import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { bookTicket, createTicket } from "../controllers/ticket.controller.js";


const router = Router();
router.route("/create_ticket").post(verifyJWT,createTicket)
router.route("/book_ticket").post(verifyJWT,bookTicket)





export default router
