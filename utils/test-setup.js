import { setupServer } from "msw/node";
import { rest } from "msw";
import { SINGLE_REPORT_MOCK } from "./mocks";
import { ref } from "vue";

const emptyReturn = (req, res, ctx) => res(ctx.status(200), ctx.json({}));

const server = setupServer(
  rest.get("///api/reports/678-s", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SINGLE_REPORT_MOCK));
  }),
  rest.put("///api/reports/678-s", emptyReturn),
  rest.get(
    "///mozilla/cargo-vet/main/src/criteria/safe-to-deploy.txt",
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.text(SINGLE_REPORT_MOCK.criteria["safe-to-deploy"].description)
      )
  )
);

beforeAll(() => {
  const useRoute = vi.fn(() => ({
    params: { id: "678-s" },
    query: { name: "clap" },
  }));

  vi.stubGlobal("useRoute", useRoute);

  const useRequestHeaders = vi.fn(() => {});

  const useState = vi.fn((_, value) => ref(value));

  vi.stubGlobal("useState", useState);

  vi.stubGlobal("useRequestHeaders", useRequestHeaders);
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
