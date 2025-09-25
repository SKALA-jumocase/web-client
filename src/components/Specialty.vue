<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '../composables/useUser'

const { userData, isUserDataComplete } = useUser()

const formData = ref({
  purpose: '',
  style: '',
  query: '',
})

const handleSubmit = () => {
  if (!formData.value.purpose || !formData.value.style || !formData.value.query.trim()) return
  if (!isUserDataComplete.value || !userData.value) {
    alert('기본 정보를 먼저 입력해주세요.')
    return
  }

  const fullFormData = {
    age: userData.value.age,
    sex: userData.value.sex,
    purpose: formData.value.purpose,
    style: formData.value.style,
    query: formData.value.query,
  }

  console.log('특산품 추천 요청 데이터:', fullFormData)
  alert('백엔드가 준비되지 않아 콘솔에 출력되었습니다.')
}
</script>

<template>
  <div class="bg-surfaceBright text-onPrimary mx-auto max-w-3xl min-w-sm rounded-2xl p-8 shadow-lg">
    <div class="mb-8 text-center">
      <h2 class="mb-2 text-3xl font-bold">특산품</h2>
      <p class="text-onPrimary/80">당신에게 맞는 특산품을 추천해드립니다</p>
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
        <label class="mb-2 block text-sm font-medium">용도 선택</label>
        <select
          v-model="formData.purpose"
          class="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택해주세요</option>
          <option value="선물">선물용</option>
          <option value="혼자">혼자</option>
          <option value="가족">가족</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium">상품 스타일</label>
        <select
          v-model="formData.style"
          class="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택해주세요</option>
          <option value="간편">간편 소비</option>
          <option value="건강">건강</option>
          <option value="전통">전통</option>
          <option value="프리미엄">프리미엄</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium">질문</label>
        <textarea
          v-model="formData.query"
          placeholder="예: 부모님 드릴 특산품을 추천해주세요"
          class="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
          :rows="3"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="!formData.purpose || !formData.style || !formData.query.trim()"
        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
      >
        특산품 추천 받기
      </button>
    </form>
  </div>
</template>