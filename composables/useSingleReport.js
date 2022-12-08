import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: useRequestHeaders(["cookie"]),
    })
    .then(({ data }) => data);

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
