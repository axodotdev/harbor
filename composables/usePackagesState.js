export const usePackageState = () => {
  const state = useState("packages-state", () => {});

  const toggleEulaPackageApproval = (pkg, eula) => {
    state.value = {
      ...state.value,
      [pkg]: {
        ...state.value?.[pkg],
        [eula]: state.value?.[pkg]?.[eula] ? false : true,
      },
    };
  };

  const togglePackageApproval = (pkg) => {
    state.value = {
      ...state.value,
      [pkg]: {
        ...state.value?.[pkg],
        approved: true,
      },
    };
  };

  const isPackageAllApproved = (report) => {
    const needsApproval = report.suggested_criteria;
    const approved = state.value?.[report.name] || {};

    return needsApproval.every((criteria) => approved[criteria]);
  };

  return {
    state,
    togglePackageApproval,
    toggleEulaPackageApproval,
    isPackageAllApproved,
  };
};
