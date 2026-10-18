import { checkToken } from "../functions/token.js";
import { invalidToken, expiredToken } from "./handlers.js";

export function getAccessToken(req, res) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      tokenNotProvided(req, res)
    }
    req.username = checkToken(token);
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      invalidToken(req, res)
    } else if (error.name == "TokenExpiredError") {
      expiredToken(req, res)
    }
  }
}

export function getRefreshToken(req, res) {
  try {
    let token = req.cookies["refreshToken"];
    if (!token) {
      tokenNotProvided(req, res)
    }
    checkToken(token);
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      invalidToken(req, res)
    } else if (error.name == "TokenExpiredError") {
      expiredToken(req, res)
    }
  }
}