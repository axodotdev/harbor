import { v4 as uuidv4 } from "uuid";
import { useRedis } from "../../../composables/redis";
import FAKE_DATA from "../../../assets/test.json";

export default async (req) => {
  const body = readBody(req);
  const isPost = isMethod(req, "POST");
  // check where call comes from

  if (body && isPost) {
    const client = await useRedis();
    const id = uuidv4();
    await client.set(id, JSON.stringify(FAKE_DATA));
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
