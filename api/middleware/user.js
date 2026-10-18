import User  from "../models/user.js";
import { mongoInternalError } from "./handlers.js";

export async function getUserUUID(req, res, next) {
  try {
    let user_db = await User.findOne({ username: req.username });
    req.userId = user_db._id;
    next();
  } catch (error) {
    mongoInternalError(error, req, res)
  }
}
