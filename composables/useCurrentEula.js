import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { onMounted, watch } from "vue";

export const useCurrentEula = ({ report, criteria: APICriteria }) => {
  const criteria = useState(() => []);
  const get = (newReport) => {
    newReport.suggested_criteria.map(async (c) => {
      if (criteria[c]) return;
      const defaultCriteria = MISSING_CRITERIA_KEYS[c];

      if (defaultCriteria) {
        const data = await $fetch(defaultCriteria["description-url"]);

        criteria.value[c] = data;
        return;
      }
      if (APICriteria[c]?.description) {
        criteria.value[c] = APICriteria[c].description;
      } else {
        const data = await $fetch(APICriteria[c]["description-url"]);
        criteria.value[c] = data;
      }
    });
  };

  onMounted(() => get(report.value));
  watch(report, get);

  return criteria;
};
