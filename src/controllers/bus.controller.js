import { Bus } from "../models/bus.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { Agency } from "../models/agency.js"
import { ApiError} from "../utils/ApiErrors.js"
import {ApiResponce} from "../utils/ApiResponce.js"
//code capacity maker agency

const addBus = asyncHandler(async(req, res )=>{
    const {code, capacity, maker, agency} = req.body
    const findAgency = await Agency.findOne({code:agency})
    if (!findAgency) {
        throw new ApiError(404, "Agency not found")
    }
    const addedBus = await Bus.create(
        {code,
        capacity,
        maker,
        agency: findAgency}
    )
    if (!addedBus) {
        throw new ApiError(404, "somthing went worng while Adding Bus")
    }
    return res.status(200)
    .json(new ApiResponce(200, addedBus, "Bus Added successfully"))

})
export { addBus }