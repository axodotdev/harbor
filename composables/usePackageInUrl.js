import { computed, watchEffect } from "vue";

export const usePackageInUrl = ({ report }) => {
  const selected = useState(() => null);
  const route = useRoute();
  const suggestions = computed(() => report.value.suggestions || []);
  const getPkgByName = () =>
    suggestions.value.find(
      (suggestion) => suggestion.name === route.query.name
    );

  watchEffect(() => {
    selected.value = getPkgByName();
  });

  return selected;
};
