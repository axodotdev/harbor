import { useRedis } from "../../../composables/redis";

export default async (req) => {
  const reportId = req?.context?.params?.id;
  const isGet = isMethod(req, "GET");

  if (reportId && isGet) {
    const client = await useRedis();
    const data = await client.get(reportId);
    return JSON.parse(data);
  }
};
