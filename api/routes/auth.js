const express = require("express");
const User = require("../models/user");
const hash = require("../helper/hash");
const token = require("../helper/token");
const { loginUser, registerUser } = require("../helper/validators");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    let registerValidation = registerUser.validate(req.body);
    if (registerValidation.error != undefined) {
      return res.status(400).json({
        error: registerValidation.error.message,
      });
    }
    let username = await User.findOne({ username: req.body.username });
    if (username != null) {
      return res.status(403).json({
        message: "Username indisponível",
        username: req.body.username,
      });
    }
    req.body.password = await hash.generateHash(req.body.password);
    await new User(req.body).save();
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let loginValidation = loginUser.validate(req.body);
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
    let is_user = await hash.checkPassword(req.body.password, user_db.password);
    if (!is_user) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    let user_token = token.createToken(req.body.username);
    return res.status(200).json({
      token: user_token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
