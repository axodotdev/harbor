import { getQuery, sendRedirect, setCookie } from "h3";

const REDIRECT_URL = "/";

export default async (req, res) => {
  const { code } = getQuery(req);

  if (!code) {
    return sendRedirect(res, REDIRECT_URL);
  }
  const response = await $fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
  });
  if (response.error) {
    return sendRedirect(res, REDIRECT_URL);
  }

  setCookie(res, "gh_token", response.access_token, { path: "/" });

  return sendRedirect(res, REDIRECT_URL);
};
