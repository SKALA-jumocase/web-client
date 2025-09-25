<script setup lang="ts">
import Logo from '../assets/Logo_WH.png';
</script>

<template>
  <header class="bg-primaryContainer text-surface w-full shadow-lg">
    <div class="mx-auto max-w-6xl px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center space-x-3 transition-opacity hover:opacity-80"
        >
          <img class="w-30" :src="Logo" />
          <div>
            <h1 class="text-2xl font-bold tracking-wide"></h1>
            <p class="text-xs">한국의 멋과 맛을 담다</p>
          </div>
        </router-link>

        <nav class="flex items-center space-x-6">
          <router-link
            to="/"
            class="hover:bg-surfaceBright/30 rounded-md px-4 py-2 font-medium transition-colors"
          >
            추천받기
          </router-link>
          <router-link
            to="/stats"
            class="hover:bg-surfaceBright/30 rounded-md p-2 font-medium transition-colors"
          >
            통계보기
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>
