import { useRedis } from "@/composables/useRedis";
import { sendError, getCookie, isMethod } from "h3";
import { GH_TOKEN } from "@/utils/constants";
import { postGh, fetchGh } from "@/utils/github";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, GH_TOKEN);
  const reportId = event?.context?.params?.id;
  const isPost = isMethod(event, "POST");
  if (reportId) {
    const client = await useRedis();
    const data = await client.get(reportId);
    const parsedData = JSON.parse(data);
    if (isPost) {
      try {
        const { name: userName, email } = await fetchGh({
          url: "/user",
          cookie,
        });

        const {
          suggest: { suggestions },
          state,
        } = parsedData;

        const returnedData = suggestions
          .filter((suggestion) => Object.keys(state).includes(suggestion.name))
          .map(({ name, suggested_diff }) => ({
            who: `${userName} <${email}>`,
            package: name,
            version1: suggested_diff.from || suggested_diff.to,
            ...(suggested_diff.from ? { version2: suggested_diff.to } : {}),
            criteria: Object.keys(parsedData.state[name]).filter(
              (criteria) =>
                parsedData.state[name][criteria] && criteria !== "note"
            ),
            notes: parsedData.state[name].note || "",
            // not implemented
            dependency_criteria: [],
          }));
        const { head } = await fetchGh({
          url: `repos/${parsedData.repo}/pulls/${parsedData.pr}`,
          cookie,
        });
        await postGh({
          url: `/repos/${head.user.login}/${head.repo.name}/actions/workflows/cargo-vet-certify.yml/dispatches`,
          cookie,
          body: {
            ref: head.ref,
            inputs: {
              audits: Buffer.from(JSON.stringify(returnedData)).toString(
                "base64"
              ),
            },
          },
        });

        return returnedData;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return sendError(event, {
          statusCode: 401,
          fatal: true,
          statusMessage: "You do not have access to this repo",
        });
      }
    }
  }

  return sendError(event, {
    statusCode: 500,
    fatal: true,
    statusMessage: "No report id was passed",
  });
});
