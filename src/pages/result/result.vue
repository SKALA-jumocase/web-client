<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getLiquorPairings } from '../../services/api'
import type { LiquorRecommendationWithId, FormData, PairingResponse } from '../../types/api'

const router = useRouter()

const recommendations = ref<LiquorRecommendationWithId[]>([])
const formData = ref<FormData | null>(null)
const selectedLiquor = ref<LiquorRecommendationWithId | null>(null)
const pairing = ref<PairingResponse | null>(null)
const isLoadingPairing = ref(false)

onMounted(() => {
  const storedRecommendations = sessionStorage.getItem('recommendations')
  const storedFormData = sessionStorage.getItem('formData')

  if (storedRecommendations && storedFormData) {
    const parsedRecommendations: LiquorRecommendationWithId[] = JSON.parse(storedRecommendations)
    const parsedFormData: FormData = JSON.parse(storedFormData)

    console.log(JSON.parse(storedRecommendations))
    recommendations.value = parsedRecommendations
    formData.value = parsedFormData
  } else {
    // Dummy data for testing when sessionStorage is empty
    const dummyRecommendations: LiquorRecommendationWithId[] = [
      {
        id: 1,
        liquorName: '복순도가 손막걸리',
        reason: '포도의 과일산과 막걸리의 약한 산미가 만나 스파클링와인처럼 청량한 조합을 만듭니다.',
      },
      {
        id: 2,
        liquorName: '문배술',
        reason: '포도의 달콤함과 문배술의 깊은 풍미가 어우러져 독특한 맛의 조화를 선사합니다.',
      },
      {
        id: 3,
        liquorName: '이화주',
        reason: '포도와 함께 마시면 꽃향과 과일향이 조화롭게 어우러진 우아한 맛을 즐길 수 있습니다.',
      },
    ]
    recommendations.value = dummyRecommendations
    formData.value = {
      age: 25,
      sex: 'female',
      drinkCount: 2,
      userQuery: '포도랑 같이 마실 전통주를 추천해줘',
    }
  }
})

const handleSelectLiquor = async (liquor: LiquorRecommendationWithId) => {
  selectedLiquor.value = liquor
  isLoadingPairing.value = true
  pairing.value = null

  try {
    const pairingData = await getLiquorPairings(liquor.id)
    pairing.value = pairingData
  } catch (error) {
    console.error('페어링 정보 로드 실패:', error)
    // Don't set dummy data, leave pairing as null to show error state
    pairing.value = null
  } finally {
    isLoadingPairing.value = false
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="!formData" class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">추천 데이터를 불러올 수 없습니다</h2>
      <button @click="goHome" class="text-blue-600 hover:underline">
        다시 시도하기
      </button>
    </div>
  </div>

  <div v-else class="min-h-screen w-full py-8">
    <div class="mx-auto max-w-6xl px-4">
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-3xl font-bold text-gray-900">전통주 추천 결과</h1>
        <p class="text-gray-600">"{{ formData.userQuery }}"에 대한 추천입니다</p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- 추천 목록 -->
        <div class="space-y-4 lg:col-span-2">
          <h2 class="mb-4 text-xl font-semibold text-gray-800">추천 전통주</h2>
          <div
            v-for="recommendation in recommendations"
            :key="recommendation.id"
            class="cursor-pointer rounded-lg border-2 bg-white p-6 shadow-md transition-all hover:shadow-lg"
            :class="{
              'border-blue-500 bg-blue-50': selectedLiquor?.id === recommendation.id,
              'border-gray-200 hover:border-gray-300': selectedLiquor?.id !== recommendation.id
            }"
            @click="handleSelectLiquor(recommendation)"
          >
            <h3 class="mb-2 text-lg font-semibold text-gray-900">
              {{ recommendation.liquorName }}
            </h3>
            <p class="leading-relaxed text-gray-600">{{ recommendation.reason }}</p>
            <div
              v-if="selectedLiquor?.id === recommendation.id"
              class="mt-3 text-sm font-medium text-blue-600"
            >
              ✓ 선택된 전통주
            </div>
          </div>
        </div>

        <!-- 페어링 정보 -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 rounded-lg bg-white p-6 shadow-md">
            <h2 class="mb-4 text-xl font-semibold text-gray-800">음식 페어링</h2>

            <div v-if="!selectedLiquor" class="py-8 text-center">
              <div class="mb-4 text-4xl text-gray-400">🍶</div>
              <p class="text-gray-500">
                전통주를 선택하면
                <br />
                어울리는 음식을 알려드려요
              </p>
            </div>

            <div v-else>
              <h3 class="mb-3 font-medium text-gray-900">
                {{ selectedLiquor.liquorName }}와 어울리는 음식
              </h3>

              <div v-if="isLoadingPairing" class="py-4 text-center">
                <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p class="mt-2 text-gray-500">페어링 정보 로딩 중...</p>
              </div>

              <div v-else-if="pairing" class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 text-2xl">🍽️</div>
                <p class="text-lg font-medium text-gray-800">{{ pairing.foodName }}</p>
                <p class="mt-2 text-sm text-gray-600">
                  이 조합으로 더욱 맛있게 즐겨보세요!
                </p>
              </div>

              <div v-else class="py-4 text-center">
                <div class="mb-2 text-2xl text-red-400">❌</div>
                <p class="font-medium text-red-600">페어링 정보 로드 실패</p>
                <p class="mt-1 text-sm text-gray-500">잠시 후 다시 시도해 주세요</p>
                <button
                  @click="handleSelectLiquor(selectedLiquor!)"
                  class="mt-3 text-sm text-blue-600 underline hover:text-blue-800"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <button
          @click="goHome"
          class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          다시 추천받기
        </button>
      </div>
    </div>
  </div>
</template>
