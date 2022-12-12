import { v4 as uuidv4 } from "uuid";
import { useRedis } from "@/composables/useRedis";
import { readBody, isMethod, sendError, getRequestHeaders } from "h3";

export default defineEventHandler(async (event) => {
  const headers = await getRequestHeaders(event);
  const body = await readBody(event);
  const isPost = isMethod(event, "POST");

  try {
    if (!headers["user-agent"].includes("actions/github-script")) {
      return sendError(event, {
        statusCode: 401,
        fatal: true,
        statusMessage: "Unauthorized",
      });
    }

    if (body && isPost) {
      const client = await useRedis();
      const id = uuidv4();
      await client.set(id, JSON.stringify(body));
      return {
        id,
      };
    }

    return sendError(event, {
      statusCode: 500,
      fatal: true,
      statusMessage: "No data received",
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return sendError(event, {
      statusCode: 500,
      fatal: true,
      statusMessage: "There has been an issue reading your data",
    });
  }
});
