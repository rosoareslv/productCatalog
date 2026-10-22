import User from "../models/user.js";
import { generateHash, checkPassword } from "../functions/hash.js";
import { createTokens } from "../functions/token.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../functions/validators.js";

import { get as getRedis } from "../functions/redis.js";

export async function create(req, res, next) {
  try {
    let validation = registerUserValidator.validate(req.body);
    if (validation.error != undefined) {
      return res.status(400).json({
        error: validation.error.message,
      });
    }
    let username = await User.findOne({ username: req.body.username });
    if (username != null) {
      return res.status(403).json({
        message: "Username indisponível",
        username: req.body.username,
      });
    }
    req.body.password = await generateHash(req.body.password);
    await new User(req.body).save();
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    let loginValidation = loginUserValidator.validate(req.body);
    if (loginValidation.error != undefined) {
      return res.status(400).json({
        error: loginValidation.error.message,
      });
    }
    let user_db = await User.findOne({ username: req.body.username });
    if (user_db == null) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    let is_user = await checkPassword(req.body.password, user_db.password);
    if (!is_user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    let { accessToken, refreshToken } = createTokens(req.body.username);
    await getRedis().set(req.body.username, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      maxAge: 86400000,
    });
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    let latestRefreshToken = await getRedis().get(req.username);
    if (latestRefreshToken != req.cookies["refreshToken"]) {
      return res.status(401).json({ message: "Not authorized" });
    }
    let { accessToken, refreshToken } = createTokens(req.username);
    await getRedis().set(req.username, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      maxAge: 86400000,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
}
