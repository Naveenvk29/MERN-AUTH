import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import generateToken from "../Utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new Error("please fill the Fields");
  }
  const userExists = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });
  if (userExists) {
    throw new Error("User Already Exists");
  }

  const newUser = await User.create({
    userName: userName,
    email: email,
    password: password,
  });

  if (newUser) {
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    });
  } else {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const isMatch = await user.matchPassword(password);
  if (isMatch) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie(
    "jwt",
    {},
    {
      httpOnly: true,
      expires: new Date(0),
    }
  );
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { registerUser, loginUser, logout, getUserProfile, updateUserProfile };
