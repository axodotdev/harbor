export const getVersionChangeText = (diff) => {
  return diff?.from
    ? `changed from v${diff?.from} to v${diff?.to}`
    : `full audit recommended`;
};
