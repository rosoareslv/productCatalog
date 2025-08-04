const { checkToken } = require("../functions/token");

function getTokenInfo(req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ message: "Token não fornecido" });
    }
    req.username = checkToken(token);
    next();
  } catch (error) {
    throw error;
  }
}

module.exports = getTokenInfo

