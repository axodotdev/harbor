import { useRedis } from "../../../composables";
import { sendError, getCookie, isMethod } from "h3";
import { GH_TOKEN } from "../../../utils/constants";

export const fetchGh = (repo, cookie) => {
  return $fetch(repo, {
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `token ${cookie}`,
    },
  });
};

export default async (req) => {
  const cookie = getCookie(req, GH_TOKEN);
  const reportId = req?.context?.params?.id;
  const isGet = isMethod(req, "GET");

  if (reportId && isGet) {
    const client = await useRedis();
    const data = await client.get(reportId);
    const parsedData = JSON.parse(data);
    try {
      await fetchGh(`/repos/${parsedData.repo}`, cookie);

      return {
        suggestions: parsedData.suggest.suggestions,
        criteria: parsedData.context.criteria,
      };
    } catch (e) {
      return sendError(req, {
        statusCode: 401,
        fatal: true,
        statusMessage: "You do not have access to this repo",
      });
    }
  }

  return sendError(req, {
    statusCode: 500,
    fatal: true,
    statusMessage: "No report id was passed",
  });
};
