<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <div class="bg-surface flex min-h-screen w-full">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
