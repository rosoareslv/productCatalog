import { checkToken } from "../functions/token.js";
import { invalidToken, expiredToken, tokenNotProvided } from "./handlers.js";

export function getAccessToken(req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      tokenNotProvided(req, res)
    }
    let tokenPayload = checkToken(token);
    if (tokenPayload.type !== 'access') {
      invalidToken(req, res)
    }
    req.username = tokenPayload.username
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      invalidToken(req, res)
    } else if (error.name == "TokenExpiredError") {
      expiredToken(req, res)
    }
    next(error);
  }
}

export function getRefreshToken(req, res, next) {
  try {
    let token = req.cookies["refreshToken"];
    if (!token) {
      tokenNotProvided(req, res)
    }
    let tokenPayload = checkToken(token);
    if (tokenPayload.type !== 'refresh') {
      invalidToken(req, res)
    }
    req.username = tokenPayload.username
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      invalidToken(req, res)
    } else if (error.name == "TokenExpiredError") {
      expiredToken(req, res)
    }
    next(error);
  }
}