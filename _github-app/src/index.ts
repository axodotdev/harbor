import { Probot } from "probot";

export = (app: Probot) => {
  app.on("check_run.completed", async (context) => {
    const params = {
      owner: context.payload.repository.owner.login,
      check_run_id: context.payload.check_run.id,
      repo: context.payload.repository.name
    }
    const { data: annotations } = await context.octokit.checks.listAnnotations(params)
    const { data: check } = await context.octokit.checks.get(params)
    console.log(check, annotations);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
