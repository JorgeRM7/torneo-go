<template>
  <header class="sticky top-0 z-50 border-b border-orange-200 bg-white/90 shadow-sm backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#F26A1B] text-lg font-black text-white shadow-md">
          GO
        </div>

        <div>
          <h1 class="text-lg font-black leading-none text-[#F26A1B]">
            Torneo GO
          </h1>
          <p class="text-xs font-semibold text-[#55B532]">
            Grupo Ortiz
          </p>
        </div>
      </RouterLink>

      <button
        class="inline-flex rounded-xl border border-orange-200 p-2 text-[#F26A1B] md:hidden"
        @click="open = !open"
      >
        <svg
          v-if="!open"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-orange-50 hover:text-[#F26A1B]"
          active-class="!bg-[#F26A1B] !text-white shadow-lg shadow-orange-500/20"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </nav>

    <div
      v-if="open"
      class="border-t border-orange-100 bg-white px-4 py-4 md:hidden"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-2">
        <RouterLink
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-orange-50 hover:text-[#F26A1B]"
          active-class="!bg-[#F26A1B] !text-white"
          @click="open = false"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const open = ref(false)

const menu = [
  {
    name: 'Principal',
    to: '/',
  },
  {
    name: 'Clasificación',
    to: '/standings',
  },
  {
    name: 'Equipos',
    to: '/teams',
  },
  {
    name: 'Eliminación Directa',
    to: '/knockouts',
  },
]
</script>