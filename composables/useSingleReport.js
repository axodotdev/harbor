import { useQuery } from "vue-query";
import { usePackageState } from "./usePackagesState";
import { watch } from "vue";

export const useSingleReport = () => {
  const route = useRoute();
  const { init } = usePackageState();

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

  watch(report, (newReport) => {
    if (newReport) {
      init(newReport.state);
    }
  });

  return {
    report,
    isLoading,
    fetchError,
  };
};
