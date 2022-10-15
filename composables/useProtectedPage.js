import { useGithubUser } from "./github";
import { REDIRECT_COOKIE } from "../utils/constants";

export const useProtectedPage = async () => {
  const route = useRoute();
  const user = await useGithubUser();

  if (!user.value) {
    useCookie(REDIRECT_COOKIE).value = route.params.id;
    navigateTo({
      path: "/",
    });
  }
};
