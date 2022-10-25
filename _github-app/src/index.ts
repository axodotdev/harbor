import { Probot } from "probot";

export default (app: Probot) => {
  app.on("workflow_run.completed", async ({ pullRequest, payload, octokit }) => {
    try {
      console.log(payload.workflow_run.conclusion)
      if (!pullRequest.length || payload.workflow_run.conclusion !== "failure") return;
      const params = {
        owner: payload.repository.owner.login,
        run_id: payload.workflow_run.id,
        repo: payload.repository.name
      }
      const { data: logs } = await octokit.actions.downloadWorkflowRunLogs(params)
      // @ts-ignore
      const dec = new TextDecoder("utf-8").decode(logs)
      octokit.checks.create({

      })
      console.log(dec);
    } catch (e) {
      console.log(e)
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
