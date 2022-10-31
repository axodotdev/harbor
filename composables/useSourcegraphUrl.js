import { watch, onMounted, ref } from "vue";

const URL_BASE = "https://sourcegraph.com/crates/";
const getUrl = (report) => {
  return report?.suggested_diff?.from
    ? `${report?.name}/-/compare/v${report?.suggested_diff?.from}...v${report?.suggested_diff?.to}`
    : `${report?.name}@v${report?.suggested_diff?.to}`;
};

export const useSourceGraphURL = (report) => {
  const url = ref(null);

  onMounted(() => (url.value = URL_BASE + getUrl(report.value)));
  watch(report, (newReport) => {
    url.value = URL_BASE + getUrl(newReport);
  });

  return url;
};
