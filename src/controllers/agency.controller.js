import { Agency } from "../models/agency.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const createAgency = asyncHandler(async (req, res) => {
  const { code, name, details, owner } = req.body;
  const findOwner = await User.findOne({username : owner }).select(
    "-password -refreshToken"
  )
  if (!findOwner) {
    throw new ApiError(400, "Owner not found");
  }
  const existedAgency = await Agency.findOne({
    $or: [{ code }, { name }],
  });
  if (existedAgency) {
    throw new ApiError(400, "Agency Code or name allready used")
  }
  const createdAgency = await Agency.create({ code, details, name, owner: findOwner });
  if ( !createdAgency) {
    throw new ApiError(500, "somthing went worng while creating Agency")
  }
  return res
  .status(200)
  .json(new ApiResponce(201, createdAgency,"Agency created successfully"))
});
const getAgency = asyncHandler(async(req, res)=>{
//get code or name from user
//check in database
const {code, name} = req.body
const findAgency = await Agency.findOne(
  {
    $or: [{code},{name}]
  }
)
if (!findAgency) {
  throw new ApiError(404, "Agency not found")
}
return res.status(200)
.json(new ApiResponce(200, findAgency,"Agency Details fetch successfully"))
})

export { createAgency, getAgency }
