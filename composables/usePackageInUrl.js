import { onMounted, watch } from "vue";

export const usePackageInUrl = ({ report }) => {
  const selected = useState(() => null);
  const route = useRoute();
  const getPkgByName = () =>
    report.value?.suggestions.find(
      (suggestion) => suggestion.name === route.query.name
    );

  onMounted(() => {
    if (report) selected.value = getPkgByName();
  });
  watch([route, report], () => (selected.value = getPkgByName()));

  return selected;
};
