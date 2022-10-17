<script setup>
import Nav from "../components/Nav.vue";
import { useGithubUser } from "../composables/github";

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
          <div>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
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
        class="relative z-0 flex flex-col sm:flex-row flex-1 overflow-hidden"
      >
        <main class="relative z-0 flex-1 overflow-y-auto order-last">
          <div class="sm:absolute inset-0">
            <slot name="main"></slot>
          </div>
        </main>
        <aside
          class="relative sm:w-96 w-full flex-shrink-0 overflow-y-auto border-r border-slate-800 order-first max-h-[40vh] sm:max-h-max"
        >
          <div class="sm:absolute inset-0">
            <slot name="list"></slot>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
