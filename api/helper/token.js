const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./keys/id_rsa").toString();

function createTokens(username) {
  try {
    let accessToken = jwt.sign({ username: username }, privateKey, {
      algorithm: "RS256",
      expiresIn: "10m",
    });
    let refreshToken = jwt.sign({ username: username }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

function checkToken(token) {
  try {
    let obj = jwt.verify(token.replace("Bearer ", ""), privateKey);
    return obj.username;
  } catch (error) {
    throw error;
  }
}

module.exports = { createTokens, checkToken };
