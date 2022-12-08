import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createToast } from "mosha-vue-toastify";
import { useSingleReport } from "./useSingleReport";

export const useNote = () => {
  const queryClient = useQueryClient();
  const { report } = useSingleReport();
  const route = useRoute();

  const { mutateAsync: mutateNote, isLoading: isLoadingNote } = useMutation({
    mutationFn: ({ pkg, note }) =>
      $fetch(`/api/reports/${route.params.id}`, {
        method: "PUT",
        body: {
          ...report.value.state,
          [pkg]: {
            ...report.value?.state?.[pkg],
            note,
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", route.params.id] });
      createToast("Note updated", {
        type: "success",
        hideProgressBar: true,
      });
    },
    onError: () =>
      createToast("There was an issue updating the note", {
        type: "danger",
        hideProgressBar: true,
      }),
  });

  return {
    mutateNote,
    isLoadingNote,
  };
};
