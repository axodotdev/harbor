<script setup>
import Nav from "../components/Nav.vue";
import { useGithubUser } from "../composables";
import "mosha-vue-toastify/dist/style.css";

const user = await useGithubUser();
</script>

<template>
  <div class="flex h-full">
    <Nav />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between border-b border-slate-800 bg-gray-50 px-4 py-1.5"
        >
          <div class="axo-gradient-text font-bold text-lg">H</div>
          <div>
            <button
              type="button"
              class="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <user-menu :user="user" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="relative z-0 flex flex-col md:flex-row flex-1 overflow-hidden"
      >
        <main class="relative z-0 flex-1 overflow-y-auto order-last">
          <div class="md:absolute inset-0">
            <slot name="main"></slot>
          </div>
        </main>
        <aside
          class="relative md:w-96 w-full flex-shrink-0 border-r border-slate-800 order-first max-h-[30vh] md:max-h-max overflow-y-scroll md:overflow-visible"
        >
          <div class="md:absolute inset-0">
            <slot name="list"></slot>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
