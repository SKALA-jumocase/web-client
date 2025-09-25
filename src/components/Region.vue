<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '../composables/useUser'

const { userData, isUserDataComplete } = useUser()

const formData = ref({
  travelPurpose: '',
  companionType: '',
  query: '',
})

const handleSubmit = () => {
  if (!formData.value.travelPurpose || !formData.value.companionType || !formData.value.query.trim()) return
  if (!isUserDataComplete.value || !userData.value) {
    alert('기본 정보를 먼저 입력해주세요.')
    return
  }

  const fullFormData = {
    age: userData.value.age,
    sex: userData.value.sex,
    travelPurpose: formData.value.travelPurpose,
    companionType: formData.value.companionType,
    query: formData.value.query,
  }

  console.log('여행 추천 요청 데이터:', fullFormData)
  alert('백엔드가 준비되지 않아 콘솔에 출력되었습니다.')
}
</script>

<template>
  <div class="bg-surfaceBright text-onPrimary mx-auto max-w-3xl min-w-sm rounded-2xl p-8 shadow-lg">
    <div class="mb-8 text-center">
      <h2 class="mb-2 text-3xl font-bold">여행지 추천</h2>
      <p class="text-onPrimary/80">당신에게 맞는 여행지를 추천해드립니다</p>
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
      <div>
        <label class="mb-2 block text-sm font-medium">여행 목적</label>
        <select
          v-model="formData.travelPurpose"
          class="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택해주세요</option>
          <option value="힐링">힐링</option>
          <option value="맛집 탐방">맛집 탐방</option>
          <option value="자연 감상">자연 감상</option>
          <option value="액티비티">액티비티</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium">동행자 유형</label>
        <select
          v-model="formData.companionType"
          class="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택해주세요</option>
          <option value="혼자">혼자</option>
          <option value="친구">친구</option>
          <option value="연인">연인</option>
          <option value="가족">가족</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium">질문</label>
        <textarea
          v-model="formData.query"
          placeholder="예: 서울에서 가까운 힐링 여행지를 추천해주세요"
          class="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          :rows="3"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="!formData.travelPurpose || !formData.companionType || !formData.query.trim()"
        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
      >
        여행지 추천 받기
      </button>
    </form>
  </div>
</template>