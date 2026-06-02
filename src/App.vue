<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>
<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <Navbar />

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

