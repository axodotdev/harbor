import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";
import { useSingleReport } from "./useSingleReport";

export const useToggleApproval = () => {
  const queryClient = useQueryClient();
  const { report } = useSingleReport();
  const route = useRoute();
  const { mutateAsync: mutateApproval } = useMutation({
    mutationFn: ({ pkg, eula }) =>
      $fetch(`/api/reports/${route.params.id}`, {
        method: "PUT",
        body: {
          ...report.value.state,
          [pkg]: {
            ...report.value?.state?.[pkg],
            [eula]: report.value?.state?.[pkg]?.[eula] ? false : true,
          },
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["report", route.params.id] }),
    onError: () =>
      createToast("There has been an issue toggling approval", {
        type: "danger",
        hideProgressBar: true,
      }),
  });

  return {
    toggleEulaPackageApproval: mutateApproval,
  };
};
