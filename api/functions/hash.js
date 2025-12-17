import bcrypt from "bcryptjs";

const SALT_NUMBER = 10;

export async function generateHash(password) {
  let salt = await bcrypt.genSalt(SALT_NUMBER);
  let hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
