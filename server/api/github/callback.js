import { getQuery, sendRedirect, setCookie } from "h3";
import { GH_ACCESS_TOKEN_URL } from "../../../utils/constants";

const REDIRECT_URL = "/";

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  if (!code) {
    return sendRedirect(event, REDIRECT_URL);
  }
  const response = await $fetch(GH_ACCESS_TOKEN_URL, {
    method: "POST",
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
  });
  if (response.error) {
    return sendRedirect(event, REDIRECT_URL);
  }
  setCookie(event, "gh_token", response.access_token, { path: "/" });
  return sendRedirect(event, REDIRECT_URL);
});
