import User from "../models/user.js";
import { mongoInternalError, userNotFound } from "../handlers/database.js";

export async function getUserUUID(req, res, next) {
  try {
    let user_db = await User.findOne({ username: req.username });
    if (!user_db) {
      return userNotFound(req, res);
    }
    req.userId = user_db._id;
    next();
  } catch (error) {
    mongoInternalError(error, req, res);
  }
}
