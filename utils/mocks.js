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
        from: null,
        to: "0.2.8",
        diffstat: {
          raw: " 15 files changed, 804 insertions(+)\n",
          count: 804,
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
