import { useRedis } from "../../../composables/redis";
import { sendError, getCookie, isMethod } from "h3";

export const fetchRepo = (repo, cookie) => {
  return $fetch(`repos/${repo}`, {
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `token ${cookie}`,
    },
  });
};

export default async (req) => {
  const cookie = getCookie(req, "gh_token");
  const reportId = req?.context?.params?.id;
  const isGet = isMethod(req, "GET");
  if (reportId && isGet) {
    const client = await useRedis();
    const data = await client.get(reportId);
    const parsedData = JSON.parse(data);

    try {
      await fetchRepo(parsedData.repo, cookie);
      return parsedData;
    } catch (e) {
      console.log(e);
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
