import { checkToken } from "../functions/token.js"

export function getTokenInfo(req, res, next) {
  try {
    let token = req.headers["authorization"] || req.cookies["refreshToken"];
    if (!token) {
      return res.status(400).json({ message: "Token não fornecido" });
    }
    req.username = checkToken(token);
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    } else if (error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    next(error);
  }
}