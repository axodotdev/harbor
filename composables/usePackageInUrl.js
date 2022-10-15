import { onMounted, watch } from "vue";

export const usePackageInUrl = ({ report }) => {
  const selected = useState(() => null);
  const route = useRoute();
  const getPkg = () =>
    Object.values(report.value?.suggestions)
      .flat()
      .find((a) => a.name === route.query.name);

  onMounted(() => {
    if (report) selected.value = getPkg();
  });
  watch(route, () => (selected.value = getPkg()));

  return selected;
};
