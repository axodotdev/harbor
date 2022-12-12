import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";
import { useSingleReport } from "./useSingleReport";

export const useToggleApproval = ({ eula, pkg }) => {
  const queryClient = useQueryClient();
  const { report } = useSingleReport();
  const route = useRoute();

  const createBody = (value) => ({
    ...report.value.state,
    [pkg]: {
      ...report.value.state?.[pkg],
      [eula]: value,
    },
  });
  const queryKey = ["report", route.params.id];
  const { mutateAsync } = useMutation({
    mutationFn: (value) =>
      $fetch(`/api/reports/${route.params.id}`, {
        method: "PUT",
        body: createBody(value),
      }),
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, {
        ...report.value,
        state: createBody(value),
      });

      return { previousState };
    },
    onError: ({ response: error }, __, context) => {
      queryClient.setQueryData(queryKey, context.previousState);
      createToast(
        error.statusText || "There has been an issue updating approval",
        {
          type: "danger",
          hideProgressBar: true,
        }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    toggleEulaPackageApproval: mutateAsync,
  };
};
