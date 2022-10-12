import { v4 as uuidv4 } from "uuid";
import { useRedis } from "../../../composables/redis";
import { readBody, isMethod } from "h3";

export default async (req) => {
  const body = await readBody(req);
  const isPost = isMethod(req, "POST");

  // check where call comes from

  if (body && isPost) {
    const client = await useRedis();
    const id = uuidv4();
    await client.set(id, JSON.stringify(body));
    const data = await client.get(id);

    return {
      id,
      ...JSON.parse(data),
    };
  }

  return {
    error: "no json data received",
  };
};
