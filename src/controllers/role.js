import { Role } from "../models/role";
import { ApiResponce } from "../utils/ApiResponce";
import { ApiError } from "../utils/apiErrors";
import { asyncHandler } from "../utils/asyncHandler";

const createRole = asyncHandler(async (req, res) => {
  const adminPermissions = ["Add_agency", "add_bus", "add_stop", "bookTicket"];
  const userPermission = ["bookTicket"];
  const { role } = req.body;
  const findRole = await Role.findOne({ role });
  if (findRole) {
    throw new ApiError(400, "Role Allready ");
  }
  if (findRole.name === "admin") {
    const createdRole = await Role.create({
      name: "admin",
      permissions: adminPermissions,
    });
    if(createRole){
        res.status(200)
        .json(new ApiResponce(201, createdRole, "Role Created successfully"))
    }
  } else if (findRole.name === "user") {
    const createdRole = await Role.create({
      name: "user",
      permissions: userPermission,
    });
    if(createRole){
        res.status(200)
        .json(new ApiResponce(201, createdRole, "Role Created successfully"))
    }
  }
});
