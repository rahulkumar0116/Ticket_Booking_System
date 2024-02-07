import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const generateAccessTokenandRefrshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "somthing went worng while genreting token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, fullName, lastName, mobileNumber, role } =
    req.body;
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(400, "user allready exist");
  }
  // const mobNumFound = await User.find({ mobileNumber: mobileNumber });
  // if (mobNumFound) {
  //   throw new ApiError(500, "Moblie number already in used");
  // }
  const user = await User.create({
    email: email,
    username,
    fullName: fullName,
    lastName: lastName,
    mobileNumber: mobileNumber,
    password,
    role,
  });
  const createdUser = await User.findOne(user._id);
  if (!createdUser) {
    throw new ApiError(500, "somthing went worng while creating the user");
  }
  return res
    .status(201)
    .json(new ApiResponce(201, createdUser, "User Registered Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(500, "User not found");
  }
  const passwordValidation = await user.isPasswordCorrect(password);
  if (!passwordValidation) {
    throw new ApiError(404, "Invalid password");
  }
  const { accessToken, refreshToken } = await generateAccessTokenandRefrshToken(
    user._id
  );
  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        { user: logedInUser, accessToken, refreshToken },
        "User LogedIn successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "User Logout successfully"));
});
export { registerUser, loginUser, logoutUser };
