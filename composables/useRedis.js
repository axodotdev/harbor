import { createClient } from "redis";

export const useRedis = async () => {
  const client = createClient({
    url: process.env.REDIS_LINK,
    password: process.env.REDIS_PASSWORD,
  });
  // eslint-disable-next-line no-console
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  return client;
};
