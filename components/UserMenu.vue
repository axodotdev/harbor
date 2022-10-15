<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const props = defineProps({
  user: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <div class="relative flex items-center justify-center sm:mb-6">
    <Menu>
      <MenuButton>
        <img
          class="inline-block h-9 w-9 rounded-full"
          :src="props.user?.avatar_url"
          alt=""
        />
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div>
          <MenuItems
            class="absolute sm:left-2 -left-24 z-10 sm:mb-24 -mb-24 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-slate-800 b-slate-900"
          >
            <MenuItem v-slot="{ active }">
              <NuxtLink
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
                to="/logout"
              >
                Sign out
              </NuxtLink>
            </MenuItem>
          </MenuItems>
        </div>
      </transition>
    </Menu>
  </div>
</template>
