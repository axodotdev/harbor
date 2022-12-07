import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  return sendError(event, {
    statusCode: 500,
    fatal: true,
    statusMessage: "No report ID was passed",
  });
});
