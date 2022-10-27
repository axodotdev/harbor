import { v4 as uuidv4 } from "uuid";
import { useRedis } from "@/composables/useRedis";
import { readBody, isMethod, sendError, getRequestHeaders } from "h3";

export default async (req) => {
  const headers = await getRequestHeaders(req);
  const body = await readBody(req);
  const isPost = isMethod(req, "POST");

  try {
    if (!headers["user-agent"].includes("actions/github-script")) {
      return sendError(req, {
        statusCode: 401,
        fatal: true,
        statusMessage: "Unauthorized",
      });
    }
    // check where call comes from
    if (body && isPost) {
      const client = await useRedis();
      const id = uuidv4();
      await client.set(id, JSON.stringify(body));
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
    console.log(e);
    return sendError(req, {
      statusCode: 500,
      fatal: true,
      statusMessage: "There has been an issue reading your data",
    });
  }
};
