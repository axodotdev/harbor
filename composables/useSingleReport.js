import { useQuery } from "vue-query";
import { usePackageState } from "./usePackagesState";
import { watch } from "vue";
const fetcher = (url) =>
  $fetch(url, {
    headers: useRequestHeaders(["cookie"]),
  });

export const useSingleReport = () => {
  const route = useRoute();
  const { setState } = usePackageState();

  const {
    data: report,
    error: fetchError,
    isLoading,
  } = useQuery(
    [`report`, route.params.id],
    () => fetcher(`/api/reports/${route.params.id}`),
    {
      staleTime: 5000,
      retry: 0,
    }
  );

  watch(report, (newReport) => {
    if (newReport) setState(newReport.state);
  });

  return {
    report,
    isLoading,
    fetchError,
  };
};
