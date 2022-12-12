import { useQuery } from "@tanstack/vue-query";

const fetcher = (url) =>
  $fetch(url, {
    headers: useRequestHeaders(["cookie"]),
  });

export const useSingleReport = () => {
  const route = useRoute();
  const {
    isLoading,
    data: report,
    isError,
  } = useQuery({
    queryKey: [`report`, route.params.id],
    queryFn: () => fetcher(`/api/reports/${route.params.id}`),
    retry: 0,
    placeholderData: {},
  });

  return {
    report,
    isLoading,
    fetchError: isError,
  };
};
