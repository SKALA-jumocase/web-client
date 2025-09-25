<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLiquorRecommendations } from '../services/api'
import { useUser } from '../composables/useUser'
import type { FormData } from '../types/api'

const router = useRouter()
const { userData, isUserDataComplete } = useUser()

const formData = ref({
  drinkCount: 1,
  userQuery: '',
})
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!formData.value.userQuery.trim()) return
  if (!isUserDataComplete.value || !userData.value) {
    alert('기본 정보를 먼저 입력해주세요.')
    return
  }

  const fullFormData: FormData = {
    age: userData.value.age,
    sex: userData.value.sex,
    drinkCount: formData.value.drinkCount,
    userQuery: formData.value.userQuery,
  }

  isLoading.value = true
  try {
    const recommendations = await getLiquorRecommendations(fullFormData)

    // Store recommendations in sessionStorage for result page
    sessionStorage.setItem('recommendations', JSON.stringify(recommendations))
    sessionStorage.setItem('formData', JSON.stringify(fullFormData))

    router.push('/result')
  } catch (error) {
    console.error('추천 요청 실패:', error)
    alert('추천 요청에 실패했습니다. 다시 시도해 주세요.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-surfaceBright text-onPrimary mx-auto max-w-3xl min-w-sm rounded-2xl p-8 shadow-lg">
    <div class="mb-8 text-center">
      <h2 class="mb-2 text-3xl font-bold">전통주 여정을 시작해보세요</h2>
      <p class="text-onPrimary/80">당신에게 맞는 전통주를 추천해드립니다</p>
    </div>

    <div v-if="!isUserDataComplete" class="py-8 text-center">
      <div class="mb-4 text-4xl">🔒</div>
      <h3 class="mb-2 text-lg font-semibold">기본 정보가 필요합니다</h3>
      <p class="text-onPrimary/80 mb-4">
        맞춤 추천을 위해 나이대와 성별 정보를 먼저 입력해주세요.
      </p>
      <p class="text-onPrimary/60 text-sm">
        메인페이지에서 "시작하기" 버튼을 눌러 기본정보를 입력해주세요.
      </p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 음주빈도 선택 -->
      <div>
        <label class="mb-2 block text-sm font-medium">음주빈도</label>
        <select
          v-model="formData.drinkCount"
          class="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
        >
          <option :value="1">거의 안 마심</option>
          <option :value="2">가끔 (월 1-2회)</option>
          <option :value="3">자주 (주 1-2회)</option>
          <option :value="4">매우 자주 (주 3회 이상)</option>
        </select>
      </div>

      <!-- 질문 입력 -->
      <div>
        <label class="mb-2 block text-sm font-medium">어떤 전통주를 찾고 계신가요?</label>
        <textarea
          v-model="formData.userQuery"
          placeholder="예: 포도랑 같이 마실 전통주를 추천해줘"
          class="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          :rows="3"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading || !formData.userQuery.trim()"
        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
      >
        {{ isLoading ? '추천 받는 중...' : '전통주 추천 받기' }}
      </button>
    </form>
  </div>
</template>