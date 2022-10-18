import { watch } from "vue";

export const useSourceGraphURL = (report) => {
  const url = useState(() => null);

  const URL_BASE = "https://sourcegraph.com/crates/";
  watch(report, (newReport) => {
    url.value =
      URL_BASE + newReport?.suggested_diff?.from
        ? `${newReport?.name}/-/compare/v${newReport?.suggested_diff?.from}...v${newReport?.suggested_diff?.to}`
        : `${newReport?.name}@v${newReport?.suggested_diff?.to}`;
  });

  return url;
};
