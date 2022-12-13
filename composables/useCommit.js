import { useMutation } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";
import { http } from "../utils/http";

export const useCommit = () => {
  const { params } = useRoute();
  const { mutateAsync: commit, isLoading } = useMutation({
    mutationFn: () => http.post(`/api/reports/${params.id}/commit`),
    onSuccess: () =>
      createToast("Commit triggered!", {
        type: "success",
        hideProgressBar: true,
      }),
    onError: () =>
      createToast("There has been an error", {
        type: "danger",
        hideProgressBar: true,
      }),
  });

  return { commit, isLoading };
};
