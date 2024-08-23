import generateJWT from "../helpers/generateJWT.js";
import { responseStandar } from "../helpers/response.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (password.length <= 5) {
    return res
      .status(400)
      .json(
        responseStandar(
          false,
          [],
          [{ msg: "Password is to short, minimum need to have 5 characters" }]
        )
      );
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res
      .status(409)
      .json(responseStandar(false, [], [{ msg: "username already in use" }]));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashPassword,
      email,
      firstName,
      lastName,
    });

    const createdUser = await newUser.save();
    createdUser.password = undefined;
    res.status(201).json(responseStandar(true, createdUser));
  } catch (error) {
    console.log(error);
    res.status(500).json(responseStandar(false, [], error));
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("-token");

  if (!user) {
    return res
      .status(404)
      .json(
        responseStandar(false, [], [{ msg: `User ${username} was not found` }])
      );
  }

  if (await user.comparePassword(password)) {
    user.password = undefined;
    res.status(200).json(responseStandar(true, { user, token: generateJWT(user._id) }));
  } else {
    return res
      .status(403)
      .json(responseStandar(false, [], [{ msg: "Password are incorrect" }]));
  }
};
