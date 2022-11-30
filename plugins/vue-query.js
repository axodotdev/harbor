import { VueQueryPlugin, QueryClient, hydrate } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  const options = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);

  if (process.client) {
    if (nuxtApp.payload.state && nuxtApp.payload.state["vueQueryState"]) {
      hydrate(queryClient, nuxtApp.payload.state["vueQueryState"]);
    }
  }
});
