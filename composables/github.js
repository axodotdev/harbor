import { GH_STATE, GH_TOKEN, REDIRECT_OATH_URL } from "../utils/constants";

export const useGithubCookie = () => useCookie(GH_TOKEN);

export const githubFetch = (url, fetchOptions = {}) => {
  return $fetch(url, {
    baseURL: "https://api.github.com",
    ...fetchOptions,
    headers: {
      Authorization: `token ${useGithubCookie().value}`,
      ...fetchOptions.headers,
    },
  });
};

export const useGithubUser = async () => {
  const cookie = useGithubCookie();
  const user = useState(GH_STATE);
  if (cookie.value && !user.value) {
    try {
      user.value = await githubFetch("/user");
    } catch (e) {
      navigateTo("/logout");
    }
  }
  return user;
};

export const githubLogin = () => {
  if (process.client) {
    const { GITHUB_CLIENT_ID } = useRuntimeConfig();
    window.location.replace(`${REDIRECT_OATH_URL}${GITHUB_CLIENT_ID}`);
  }
};
