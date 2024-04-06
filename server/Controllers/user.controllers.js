import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import generateToken from "../Utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.app.use(bodyParser.json());

  if (!username || !email || !password) {
    throw new Error("please fill the Fields");
  }
  const userExists = await User.findById({
    $or: [{ username: username }, { email: email }],
  });
  if (userExists) {
    throw new Error("User Already Exists");
  }

  const newUser = await User.create({
    username: username,
    email: email,
    password: password,
  });

  if (newUser) {
    generateToken(res, newUser._id);

    res
      .status(201)
      .json(
        (_id = newUser._id),
        (username = newUser.username),
        (email = newUser.email),
        (message = "User Created Successfully")
      );
  } else {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && user.isPasswordCorrect(password)) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: "User Logged In Successfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
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
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { registerUser, loginUser, logout, getUserProfile, updateUserProfile };
