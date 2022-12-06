import { useRedis } from "@/composables/useRedis";
import { sendError, getCookie, isMethod, readBody } from "h3";
import { GH_TOKEN } from "@/utils/constants";
import { fetchGh } from "@/utils/github";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, GH_TOKEN);
  const reportId = event?.context?.params?.id;
  const isGet = isMethod(event, "GET");
  const isPut = isMethod(event, "PUT");

  const client = await useRedis();
  const data = await client.get(reportId);
  const parsedData = JSON.parse(data);

  if (!parsedData.repo) {
    return sendError(event, {
      statusCode: 500,
      fatal: true,
      data: {
        message: "Invalid report ID",
      },
    });
  }

  if (isGet) {
    try {
      await fetchGh({
        url: `/repos/${parsedData.repo}`,
        cookie,
      });

      return {
        suggestions: parsedData.suggest.suggestions,
        criteria: parsedData.context.criteria,
        state: parsedData.state || {},
      };
    } catch (e) {
      return sendError(event, {
        statusCode: 401,
        fatal: true,
        data: {
          message: "You do not have access to this repo",
        },
      });
    }
  }

  if (isPut) {
    const body = await readBody(event);
    await client.set(
      reportId,
      JSON.stringify({
        ...parsedData,
        state: body,
      })
    );

    const newData = await client.get(reportId);

    return newData;
  }
});
