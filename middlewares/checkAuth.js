import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { responseStandar } from "../helpers/response.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (req.header("x-api-token")) {
    try {
      token = req.header("x-api-token");
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.payload).select(
        "-password -token -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      return res
        .status(404)
        .json(responseStandar(false, [], [{ msg: "Something wrong happens" }]));
    }
  }

  if (!token) {
    return res
      .status(401)
      .json(responseStandar(false, [], [{ msg: "Token are not valid" }]));
  }
};
export default checkAuth;