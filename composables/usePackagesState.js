export const usePackageState = () => {
  const state = useState("packages-state", () => {});

  const togglePackageApproval = (pkg) => {
    state.value = {
      ...state.value,
      [pkg]: state.value?.[pkg] ? false : true,
    };
  };

  return {
    state,
    togglePackageApproval,
  };
};
