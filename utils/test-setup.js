import { setupServer } from "msw/node";
import { rest } from "msw";
import { SINGLE_REPORT_MOCK } from "./mocks";

const server = setupServer(
  rest.get("///api/reports/678-s", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SINGLE_REPORT_MOCK));
  }),
  rest.put("///api/reports/678-s", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => {
  const useRoute = vi.fn(() => ({
    params: { id: "678-s" },
    query: { name: "clap" },
  }));

  vi.stubGlobal("useRoute", useRoute);

  const useRequestHeaders = vi.fn(() => {});

  vi.stubGlobal("useRequestHeaders", useRequestHeaders);
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
