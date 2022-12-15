import { useQuery } from "@tanstack/vue-query";
import { http } from "../utils/http";

export const useSingleReport = () => {
  const route = useRoute();
  const {
    data: report,
    isError,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: [`report`, route.params.id],
    queryFn: () => http.get(`/api/reports/${route.params.id}`),
    retry: 0,
    placeholderData: {},
  });

  return {
    report,
    isFetched: isFetchedAfterMount,
    fetchError: isError,
  };
};
