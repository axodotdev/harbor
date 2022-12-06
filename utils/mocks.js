export const SINGLE_REPORT_MOCK = {
  suggestions: [
    {
      name: "clap",
      notable_parents: "cargo-vet-school",
      suggested_criteria: ["safe-to-deploy"],
      suggested_diff: {
        from: "4.0.15",
        to: "4.0.29",
        diffstat: {
          raw: " 28 files changed, 384 insertions(+), 175 deletions(-)\n",
          count: 559,
        },
      },
      confident: true,
    },
    {
      name: "serde_json",
      notable_parents: "reqwest, cargo-vet-school",
      suggested_criteria: ["safe-to-deploy"],
      suggested_diff: {
        from: "1.0.86",
        to: "1.0.87",
        diffstat: {
          raw: " 11 files changed, 248 insertions(+), 380 deletions(-)\n",
          count: 628,
        },
      },
      confident: true,
    },
  ],
  criteria: {
    "legalese-audit": {
      description: "a cool description for legalese-audit",
      implies: ["safe-to-run", "too-big-to-fail"],
    },
    "safe-to-deploy": {
      description: "a cool description for safe to deploy",
    },
  },
  state: {
    clap: {
      "safe-to-deploy": true,
      note: "one",
    },
    serde_json: {
      "safe-to-deploy": false,
    },
  },
};
