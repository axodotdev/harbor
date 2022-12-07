import { VueQueryPlugin, QueryClient, hydrate } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetch data every 2 minutes
        refetchInterval: 120000,
      },
    },
  });
  const options = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);

  if (process.client) {
    if (nuxtApp.payload.state && nuxtApp.payload.state["vueQueryState"]) {
      hydrate(queryClient, nuxtApp.payload.state["vueQueryState"]);
    }
  }
});
