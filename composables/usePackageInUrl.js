import { watchEffect } from "vue";

export const usePackageInUrl = ({ report }) => {
  const selected = useState(() => null);
  const route = useRoute();

  watchEffect(
    () =>
      (selected.value = report.value?.suggestions.find(
        (suggestion) => suggestion.name === route.query.name
      ))
  );

  return selected;
};
