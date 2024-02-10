import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js"
import agencyRouter from "./routes/agency.routes.js"
import busRouter from "./routes/bus.routes.js"
import stopRouter from "./routes/stop.routes.js"
import tripRouter from "./routes/trip.routes.js"
import tripScheduleRouter from "./routes/tripschedule.routes.js"
import ticketRouter from "./routes/ticket.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/agency", agencyRouter)
app.use("/api/v1/bus", busRouter)
app.use("/api/v1/stop", stopRouter)
app.use("/api/v1/trip", tripRouter)
app.use("/api/v1/tripschedule", tripScheduleRouter)
app.use("/api/v1/ticket", ticketRouter)






app.get("/",(req, res)=>{
  res.send({message:"this is home page"})
})

export {app}
