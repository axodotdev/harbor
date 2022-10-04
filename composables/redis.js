import { createClient } from "redis";

export const useRedis = async () => {
  const client = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  return client;
};
