const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const uploadImage = require("../utils/uploadImage");
const asyncHandler = require("../utils/asyncHandler");

const generateAcessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    (user.refreshToken = refreshToken),
      await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  if (!req.file) {
    throw new ApiError(404, "Profile image is missing");
  }
  const file = req.file;
  const profileImage = await uploadImage(file);
  const user = await User.create({
    name,
    email,
    profileImage,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  return res.status(201).json({
    data: createdUser,
    code: 200,
    message: "User registered successfully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new Error("Email is required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new Error("Inavlaid password");
  }

  const { accessToken, refreshToken } = await generateAcessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res.status(200).json({
    data: { loggedInUser, accessToken, refreshToken },
    code: 200,
    message: "User loggedin succesfully",
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const userProfile = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res.status(200).json({
    data: userProfile,
    code: 200,
    message: "User Profile",
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
