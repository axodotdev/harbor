import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";
import { useSingleReport } from "./useSingleReport";
import axios from "axios";

export const useToggleApproval = ({ eula }) => {
  const queryClient = useQueryClient();
  const { report } = useSingleReport();
  const route = useRoute();

  const createBody = (value) => ({
    ...report.value.state,
    [route.query.name]: {
      ...report.value.state?.[route.query.name],
      [eula]: value,
    },
  });
  const queryKey = ["report", route.params.id];
  const { mutateAsync } = useMutation({
    mutationFn: (value) =>
      axios.put(`/api/reports/${route.params.id}`, createBody(value)),
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
        error.statusText || "There has been an issue toggling approval",
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
