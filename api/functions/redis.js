import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://whitelist:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("end", () => {
  console.log("Redis disconnected");
});

async function connect() {
  try {
    await redisClient.connect();
  } catch (error) {
    throw error;
  }
}

connect()