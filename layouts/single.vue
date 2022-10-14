<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
const sidebarOpen = ref(false);

const closeMenu = () => (sidebarOpen.value = false);
</script>

<template>
  <div class="flex h-full">
    <Nav :open="sidebarOpen" :close-menu="closeMenu" />
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
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="relative z-0 sm:flex flex-1 overflow-hidden">
        <main
          class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last"
        >
          <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <slot name="main"></slot>
          </div>
        </main>
        <aside
          class="relative w-96 flex-shrink-0 overflow-y-auto border-r border-slate-800 sm:order-first sm:flex sm:flex-col"
        >
          <div class="absolute inset-0">
            <slot name="list"></slot>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
