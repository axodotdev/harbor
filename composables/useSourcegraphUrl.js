import { watch, onMounted } from "vue";

const URL_BASE = "https://sourcegraph.com/crates/";
const getUrl = (report) =>
  report?.suggested_diff?.from
    ? `${report?.name}/-/compare/v${report?.suggested_diff?.from}...v${report?.suggested_diff?.to}`
    : `${report?.name}@v${report?.suggested_diff?.to}`;

export const useSourceGraphURL = (report) => {
  const url = useState(() => null);

  onMounted(() => (url.value = URL_BASE + getUrl(report.value)));
  watch(report, (newReport) => {
    url.value = URL_BASE + getUrl(newReport);
  });

  return url;
};
