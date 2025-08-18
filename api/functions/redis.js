import { createClient } from "redis";

let redisClient = null

export async function connectRedis() {
  try {
    redisClient = createClient({
      url: "redis://whitelist:6379",
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    redisClient.on("end", () => {
      console.log("Redis disconnected");
    })
    await redisClient.connect();
  } catch (error) {
    throw error;
  }
}

export function getRedisClient() {
  return redisClient
}
