<script setup lang="ts">
import { ref } from 'vue'
import TraditionalDrink from '../../components/TraditionalDrink.vue'
import Specialty from '../../components/Specialty.vue'
import Region from '../../components/Region.vue'
import Modal from '../../components/Modal.vue'
import { useUser } from '../../composables/useUser'

import LogoBK from '../../assets/logo_bk.png'

const { isUserDataComplete } = useUser()
const isModalOpen = ref(false)
</script>

<template>
  <div class="mx-auto my-8 flex flex-col gap-8">
    <!-- 시작하기 버튼 - 기본 정보가 없을 때만 표시 -->
    <div v-if="!isUserDataComplete" class="py-8 text-center">
      <div class="mx-auto flex max-w-md flex-col rounded-2xl bg-white p-8 shadow-lg">
        <img class="mx-auto mb-8 w-40" :src="LogoBK" />
        <h2 class="mb-4 text-2xl font-bold text-gray-900">
          당신을 위한 추천을 시작해보세요
        </h2>
        <p class="mb-6 text-gray-600">맞춤형 추천을 위해 기본 정보를 입력해주세요</p>
        <button
          @click="isModalOpen = true"
          class="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          시작하기
        </button>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="mt-8 flex flex-row gap-8">
      <TraditionalDrink />
      <Specialty />
      <Region />
    </div>

    <!-- Modal -->
    <Modal :is-open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
