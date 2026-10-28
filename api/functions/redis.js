import { createClient } from "redis";

let client = null;

export async function connect() {
  try {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    client.on("error", (err) => console.error(`Redis error: ${err}`));

    client.on("end", () => console.log("Redis disconnected"));

    client.on("ready", () => console.log("Redis OK"));

    await client.connect();
  } catch (error) {
    throw error;
  }
}

export function get() {
  return client;
}
