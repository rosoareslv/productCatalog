import jwt from "jsonwebtoken";
import { exec } from "child_process";
import fs from "fs";
import util from "util";

const execAsync = util.promisify(exec);

export function createTokens(username) {
  try {
    let accessToken = jwt.sign(
      { username: username, rand: Math.random(), type: "access" },
      process.env.SECRET_KEY,
      {
        algorithm: "RS256",
        expiresIn: "10m",
      },
    );
    let refreshToken = jwt.sign(
      { username: username, rand: Math.random(), type: "refresh" },
      process.env.SECRET_KEY,
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
    return jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
  } catch (error) {
    throw error;
  }
}

export async function createJWTKeys() {
  try {
    const { stdout, stderr } = await execAsync(
      "echo 'yes' | ssh-keygen -t rsa -b 4096 -m PEM -f /keys/id_rsa -N ''",
    );
    process.env.SECRET_KEY = fs.readFileSync("/keys/id_rsa").toString();
  } catch (error) {
    throw error;
  }
}
