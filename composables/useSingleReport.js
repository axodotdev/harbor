import { useQuery } from "vue-query";

export const useSingleReport = () => {
  const route = useRoute();

  const fetcher = (url) =>
    $fetch(url, {
      headers: useRequestHeaders(["cookie"]),
    });

  const {
    data: report,
    error: fetchError,
    isLoading,
  } = useQuery(
    [`report`, route.params.id],
    () => fetcher(`/api/reports/${route.params.id}`),
    {
      staleTime: 5000,
    }
  );

  return {
    report,
    isLoading,
    fetchError,
  };
};
