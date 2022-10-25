import { useQuery } from "vue-query";

export const useSingleReport = () => {
  const route = useRoute();

  const fetcher = async (url) =>
    await fetch(url, {
      headers: useRequestHeaders(["cookie"]),
    }).then((response) => response.json());

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
