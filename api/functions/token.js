import jwt from "jsonwebtoken";

export function createTokens(username, accessTokenExpiresIn = "10m") {
  try {
    let accessToken = jwt.sign(
      { username: username, rand: Math.random(), type: "access" },
      process.env.PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: accessTokenExpiresIn,
      },
    );
    let refreshToken = jwt.sign(
      { username: username, rand: Math.random(), type: "refresh" },
      process.env.PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "1d",
      },
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

export function checkToken(token) {
  try {
    return jwt.verify(token.replace("Bearer ", ""), process.env.PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
  } catch (error) {
    throw error;
  }
}
