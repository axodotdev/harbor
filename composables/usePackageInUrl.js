import { onMounted, watch } from "vue";

export const usePackageInUrl = ({ report }) => {
  const selected = useState(() => null);
  const route = useRoute();
  const getPkg = () =>
    report.value?.suggestions.find((a) => a.name === route.query.name);

  onMounted(() => {
    if (report) selected.value = getPkg();
  });
  watch([route, report], () => (selected.value = getPkg()));

  return selected;
};
