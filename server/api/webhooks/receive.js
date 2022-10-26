import { v4 as uuidv4 } from "uuid";
import { useRedis } from "@/composables/useRedis";
import { readBody, isMethod, sendError } from "h3";

export default async (req) => {
  const body = await readBody(req);
  const isPost = isMethod(req, "POST");

  try {
    // check where call comes from
    if (body && isPost) {
      const client = await useRedis();
      const id = uuidv4();
      const parsedData = JSON.parse(Object.keys(body));
      await client.set(id, JSON.stringify(parsedData));
      return {
        id,
      };
    }

    return sendError(req, {
      statusCode: 500,
      fatal: true,
      statusMessage: "No data received",
    });
  } catch (e) {
    return sendError(req, {
      statusCode: 500,
      fatal: true,
      statusMessage: "There has been an issue reading your data",
    });
  }
};
