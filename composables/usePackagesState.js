import { watch } from "vue";

export const usePackageState = () => {
  const route = useRoute();
  const state = useState("packages-state", () => {});

  const setState = (initialState) => (state.value = initialState);

  watch(state, (newState) => {
    $fetch(`/api/reports/${route.params.id}`, {
      method: "PUT",
      body: newState,
    });
  });

  const toggleEulaPackageApproval = (pkg, eula) => {
    state.value = {
      ...state.value,
      [pkg]: {
        ...state.value?.[pkg],
        [eula]: state.value?.[pkg]?.[eula] ? false : true,
      },
    };
  };

  const addNote = (pkg, note) => {
    state.value = {
      ...state.value,
      [pkg]: {
        ...state.value?.[pkg],
        note,
      },
    };
  };

  const areAllEulasApproved = (report) => {
    const needsApproval = report.suggested_criteria;
    const approved = state.value?.[report.name] || {};

    return needsApproval.every((criteria) => approved[criteria]);
  };

  return {
    setState,
    state,
    addNote,
    toggleEulaPackageApproval,
    areAllEulasApproved,
  };
};
