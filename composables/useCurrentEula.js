import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { ref, watchEffect } from "vue";
import { http } from "../utils/http";

export const useCurrentEula = ({ report, criteria: APICriteria }) => {
  const criteria = ref([]);
  const get = (newReport) => {
    newReport.suggested_criteria.map(async (currentCriteria) => {
      if (criteria[currentCriteria]) return;
      const defaultCriteria = MISSING_CRITERIA_KEYS[currentCriteria];
      if (defaultCriteria.description_url) {
        const data = await http.get(defaultCriteria["description-url"]);

        criteria.value[currentCriteria] = data;
        return;
      }
      if (APICriteria[currentCriteria]?.description) {
        criteria.value[currentCriteria] =
          APICriteria[currentCriteria].description;
      } else {
        const data = await http.get(
          APICriteria[currentCriteria]["description-url"]
        );

        criteria.value[currentCriteria] = data;
      }
    });
  };

  watchEffect(() => get(report));
  return criteria;
};
