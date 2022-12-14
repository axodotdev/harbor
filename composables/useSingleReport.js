import { useQuery } from "@tanstack/vue-query";
import { http } from "../utils/http";

export const useSingleReport = () => {
  const route = useRoute();
  const {
    isLoading,
    data: report,
    isError,
  } = useQuery({
    queryKey: [`report`, route.params.id],
    queryFn: () => http.get(`/api/reports/${route.params.id}`),
    retry: 0,
    placeholderData: {},
  });

  return {
    report,
    isLoading,
    fetchError: isError,
  };
};
