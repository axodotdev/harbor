import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { watchEffect } from "vue";

export const useCurrentEula = ({ report, criteria: APICriteria }) => {
  const criteria = useState(() => []);
  const get = (newReport) => {
    newReport.suggested_criteria.map(async (currentCriteria) => {
      if (criteria[currentCriteria]) return;
      const defaultCriteria = MISSING_CRITERIA_KEYS[currentCriteria];

      if (defaultCriteria) {
        const data = await $fetch(defaultCriteria["description-url"]);

        criteria.value[currentCriteria] = data;
        return;
      }

      if (APICriteria[currentCriteria].description) {
        criteria.value[currentCriteria] =
          APICriteria[currentCriteria].description;
      } else {
        const data = await $fetch(
          APICriteria[currentCriteria]["description-url"]
        );
        criteria.value[currentCriteria] = data;
      }
    });
  };

  watchEffect(() => get(report.value));

  return criteria;
};
