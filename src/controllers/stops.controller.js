import { Stop } from "../models/stop.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponce } from "../utils/ApiResponce.js";

//code, name, details
const addStop = asyncHandler(async (req, res) => {
  const { code, name, details } = req.body;
  if (!code && !name && !details) {
    throw new ApiError(500, "All fileds are required");
  }
  const findStop = await Stop.findOne({ code: code });
  if (findStop) {
    throw new ApiError(404, "Stop is allready Avlable");
  }
  const addedBusStop = await Stop.create({ code, name, details });
  if (!addedBusStop) {
    throw new ApiError(400, "somthing went worng while Adding the Stops");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, addedBusStop, "Bus Stop Added successfully"));
});

const getStop = asyncHandler(async (req, res) => {
  const {code} = req.body
  const findStop = await Stop.findOne({ code });
  if (!findStop) {
    throw new ApiError(404, "Stop not found");
  }
  return res.status(200)
  .json(new ApiResponce(200, findStop, "Bus Stop found"));
});
export { addStop, getStop };
