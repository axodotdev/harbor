import { watch } from "vue";
import { MISSING_CRITERIA_KEYS } from "../utils/constants";

export const useCurrentDescription = ({ report, info }) => {
  const currentDescription = useState(() => null);

  watch(info, async (currentInfo) => {
    if (currentInfo) {
      const all = currentInfo.split(",");
      all.map(async (single) => {
        const defaultCriteria = MISSING_CRITERIA_KEYS[single];

        if (defaultCriteria) {
          const desc = await $fetch(defaultCriteria["description-url"]);
          currentDescription.value = desc;
          return;
        }
        const currentInReport = report.value.criteria[single];
        console.log(currentInReport);
        if (currentInReport.description) {
          currentDescription.value = currentInReport.description;
        } else {
          const desc = await $fetch(currentInReport["description-url"]);
          currentDescription.value = desc;
        }
      });
    }
  });

  return currentDescription;
};
