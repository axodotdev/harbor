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
      description:
        'The attended parties heretoforeafter agree to the clauses\nestablish in subsection 1c(ii) and 3b(iv) of the charter of audits and practices\nas handed down by royal ascent during the establishment of the software "AS IS"\npolicy of 1763.\n\nShould the administrative authority defined in addendum 22b disenfranchise as\nestablished in addendum 24c, then all audits performed under this act are declared\nnull and void with a grace period of 16 financial quarters or 4 calendar years,\nwhichever happens first.\n\nFailing to adhere to these terms shall make the attended parties liable for any\nand all coliabilities of the enshrined corporate officers and will be tasked with\nmaking whole the losses of those affected.',
      "description-url": null,
      implies: ["safe-to-run", "too-big-to-fail"],
    },
    "too-big-to-fail": {
      description: null,
      "description-url":
        "https://gist.githubusercontent.com/Gankra/9dfbe4d131d82f659b363374e71bd03a/raw/c9f74a939a6767c25d197fe58ac42ec0244edf80/too-big-to-fail.txt",
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
