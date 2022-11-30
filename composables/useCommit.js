import { useMutation } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";

export const useCommit = () => {
  const { params } = useRoute();
  const { mutateAsync: commit, isLoading } = useMutation({
    mutationFn: () =>
      $fetch(`/api/reports/${params.id}/commit`, {
        method: "POST",
      }),
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
