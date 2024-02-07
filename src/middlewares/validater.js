import { ApiError } from "../utils/ApiErrors.js";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validater = (req, res, next)=>{
const {email} = req.body
if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email")
}
    next()
}

export { validater }