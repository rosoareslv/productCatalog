const jwt = require("jsonwebtoken");

function createTokens(username) {
  try {
    let accessToken = jwt.sign(
      { username: username, rand: Math.random() },
      process.env.PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "10m",
      }
    );
    let refreshToken = jwt.sign(
      { username: username, rand: Math.random() },
      process.env.PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "1d",
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

function checkToken(token) {
  try {
    let obj = jwt.verify(token.replace("Bearer ", ""), process.env.PRIVATE_KEY);
    return obj.username;
  } catch (error) {
    throw error;
  }
}

module.exports = { createTokens, checkToken };
