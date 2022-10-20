// @ts-check

import { createNodeMiddleware, createProbot } from "probot";

function app(app) {
  app.on(["pull_request.opened", "pull_request.edited"], async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

export default createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhook",
});
