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

export { registerUser };
