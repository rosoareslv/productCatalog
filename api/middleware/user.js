import User  from "../models/user.js";
import { mongoInternalError } from "./handlers.js";
import { userNotFound } from "./handlers.js";

export async function getUserUUID(req, res, next) {
  try {
    let user_db = await User.findOne({ username: req.username });
    if (!user_db) {
      userNotFound(req, res);
    }
    req.userId = user_db._id;
    next();
  } catch (error) {
    mongoInternalError(error, req, res);
  }
}
