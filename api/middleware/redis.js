import { redisClient } from "../functions/redis.js";

export function getConnection(req, res, next) {
  try {
    req.redis = redisClient;
    next();
  } catch (error) {
    throw error;
  }
}
