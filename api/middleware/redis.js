import { getRedisClient } from "../functions/redis.js";

export function getConnection(req, res, next) {
  try {
    req.redis = getRedisClient();
    next();
  } catch (error) {
    throw error;
  }
}
