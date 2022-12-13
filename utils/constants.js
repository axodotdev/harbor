export const GH_TOKEN = "gh_token";
export const GH_STATE = "gh_user";
export const REDIRECT_OATH_URL = `https://github.com/login/oauth/authorize?scope=repo&client_id=`;
export const REDIRECT_COOKIE = "redirect_to";
export const GH_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

export const MISSING_CRITERIA_KEYS = {
  "safe-to-deploy": {
    name: "Safe to deploy",
    "description-url":
      "https://raw.githubusercontent.com/mozilla/cargo-vet/main/src/criteria/safe-to-deploy.txt",
  },
  "safe-to-run": {
    name: "Safe to run",
    "description-url":
      "https://raw.githubusercontent.com/mozilla/cargo-vet/main/src/criteria/safe-to-run.txt",
  },
};

export const NOTE_MESSAGES = {
  empty: "add a note for this library",
  filled: "update note for this library",
  placeholder: "add note",
};
