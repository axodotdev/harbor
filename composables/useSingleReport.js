import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";

const fetcher = (url) =>
  $fetch(url, {
    headers: useRequestHeaders(["cookie"]),
  });

export const useSingleReport = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: report,
    isError,
  } = useQuery({
    queryKey: [`report`, route.params.id],
    queryFn: () => fetcher(`/api/reports/${route.params.id}`),
    retry: 0,
  });

  const areAllEulasApproved = ({ name, suggested_criteria }) => {
    return suggested_criteria.every(
      (criteria) => report.value?.state?.[name]?.[criteria]
    );
  };

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", route.params.id] });
    },
  });

  const { mutateAsync: mutateNote } = useMutation({
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
    },
  });

  const toggleEulaPackageApproval = mutateApproval;

  const addNote = mutateNote;

  return {
    report,
    isLoading,
    fetchError: isError,
    areAllEulasApproved,
    toggleEulaPackageApproval,
    addNote,
  };
};
