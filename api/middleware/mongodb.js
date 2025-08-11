import User from "../models/user.js";

export async function getUserUUID(req, res, next) {
  try {
    let user_db = await User.findOne({ username: req.username });
    req.userId = user_db._id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno na verificação do usuário" });
  }
}
