import { MISSING_CRITERIA_KEYS } from "../utils/constants";
import { ref, watchEffect } from "vue";
import axios from "axios";

export const useCurrentEula = ({ report, criteria: APICriteria }) => {
  const criteria = ref([]);
  const get = (newReport) => {
    newReport.suggested_criteria.map(async (currentCriteria) => {
      if (criteria[currentCriteria]) return;
      const defaultCriteria = MISSING_CRITERIA_KEYS[currentCriteria];
      if (defaultCriteria.description_url) {
        const data = await axios
          .get(defaultCriteria["description-url"])
          .then(({ data }) => data);

        criteria.value[currentCriteria] = data;
        return;
      }
      if (APICriteria[currentCriteria]?.description) {
        criteria.value[currentCriteria] =
          APICriteria[currentCriteria].description;
      } else {
        const data = await axios
          .get(APICriteria[currentCriteria]["description-url"])
          .then(({ data }) => data);
        criteria.value[currentCriteria] = data;
      }
    });
  };

  watchEffect(() => get(report));
  return criteria;
};
