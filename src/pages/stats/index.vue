<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { getAllRecommendations } from '../../services/api'
import type { RecommendationRecord } from '../../types/api'

// Register components
use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

interface AgeGroupStats {
  age: string
  count: number
}

interface GenderStats {
  sex: string
  count: number
}

interface DrinkCountStats {
  drinkCount: string
  count: number
}

interface PopularLiquorStats {
  liquorName: string
  count: number
}

const recommendations = ref<RecommendationRecord[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await getAllRecommendations()
    recommendations.value = data
  } catch (err) {
    console.error('통계 데이터 로드 실패:', err)
    error.value = '데이터를 불러올 수 없습니다. 더미 데이터를 사용합니다.'

    // Use dummy data for demonstration
    const dummyData: RecommendationRecord[] = [
      {
        id: 1,
        age: 25,
        sex: 'female',
        drinkCount: 3,
        liquorName: '복순도가 손막걸리',
        reason: '포도와 잘 어울려요',
      },
      {
        id: 2,
        age: 34,
        sex: 'male',
        drinkCount: 1,
        liquorName: '문배술',
        reason: '깊은 풍미가 좋아요',
      },
      {
        id: 3,
        age: 28,
        sex: 'female',
        drinkCount: 2,
        liquorName: '이화주',
        reason: '꽃향이 매력적이에요',
      },
      {
        id: 4,
        age: 45,
        sex: 'male',
        drinkCount: 4,
        liquorName: '복순도가 손막걸리',
        reason: '부드러운 맛이 좋아요',
      },
      {
        id: 5,
        age: 22,
        sex: 'female',
        drinkCount: 1,
        liquorName: '안동소주',
        reason: '깔끔한 맛이에요',
      },
      {
        id: 6,
        age: 38,
        sex: 'male',
        drinkCount: 3,
        liquorName: '문배술',
        reason: '전통적인 맛이 좋아요',
      },
      {
        id: 7,
        age: 31,
        sex: 'female',
        drinkCount: 2,
        liquorName: '이화주',
        reason: '향이 좋아요',
      },
      {
        id: 8,
        age: 29,
        sex: 'male',
        drinkCount: 2,
        liquorName: '복순도가 손막걸리',
        reason: '마시기 편해요',
      },
    ]
    recommendations.value = dummyData
  } finally {
    isLoading.value = false
  }
})

const ageGroupStats = computed((): AgeGroupStats[] => {
  const ageGroups = recommendations.value.reduce(
    (acc, rec) => {
      let ageGroup: string
      if (rec.age < 30) ageGroup = '20대'
      else if (rec.age < 40) ageGroup = '30대'
      else if (rec.age < 50) ageGroup = '40대'
      else ageGroup = '50대 이상'

      acc[ageGroup] = (acc[ageGroup] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(ageGroups).map(([age, count]) => ({ age, count }))
})

const genderStats = computed((): GenderStats[] => {
  const genderGroups = recommendations.value.reduce(
    (acc, rec) => {
      const gender = rec.sex === 'male' ? '남성' : '여성'
      acc[gender] = (acc[gender] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(genderGroups).map(([sex, count]) => ({ sex, count }))
})

const drinkCountStats = computed((): DrinkCountStats[] => {
  const drinkCountGroups = recommendations.value.reduce(
    (acc, rec) => {
      let drinkLevel: string
      switch (rec.drinkCount) {
        case 0:
        case 1:
          drinkLevel = '거의 안 마심'
          break
        case 2:
          drinkLevel = '가끔 마심'
          break
        case 3:
          drinkLevel = '자주 마심'
          break
        case 4:
          drinkLevel = '매우 자주 마심'
          break
        default:
          drinkLevel = '거의 안 마심'
      }

      acc[drinkLevel] = (acc[drinkLevel] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(drinkCountGroups).map(([drinkCount, count]) => ({ drinkCount, count }))
})

const popularLiquorStats = computed((): PopularLiquorStats[] => {
  const liquorGroups = recommendations.value.reduce(
    (acc, rec) => {
      acc[rec.liquorName] = (acc[rec.liquorName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(liquorGroups)
    .map(([liquorName, count]) => ({ liquorName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5
})

// Chart options
const ageChartOption = computed(() => ({
  title: { text: '연령대별 사용자' },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ageGroupStats.value.map(item => item.age)
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: ageGroupStats.value.map(item => item.count),
    type: 'bar',
    itemStyle: { color: '#0088FE' }
  }]
}))

const genderChartOption = computed(() => ({
  title: { text: '성별 분포' },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [{
    name: '성별',
    type: 'pie',
    radius: '50%',
    data: genderStats.value.map(item => ({ value: item.count, name: item.sex })),
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}))

const drinkChartOption = computed(() => ({
  title: { text: '음주 빈도별 분포' },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: drinkCountStats.value.map(item => item.drinkCount)
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: drinkCountStats.value.map(item => item.count),
    type: 'bar',
    itemStyle: { color: '#00C49F' }
  }]
}))

const liquorChartOption = computed(() => ({
  title: { text: '인기 전통주 TOP 5' },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: popularLiquorStats.value.map(item => item.liquorName)
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: popularLiquorStats.value.map(item => item.count),
    type: 'bar',
    itemStyle: { color: '#FFBB28' }
  }]
}))

const getDrinkCountLabel = (count: number): string => {
  switch (count) {
    case 1: return '거의 안 마심'
    case 2: return '가끔 마심'
    case 3: return '자주 마심'
    case 4: return '매우 자주 마심'
    default: return '거의 안 마심'
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      <p class="text-gray-600">통계 데이터를 불러오는 중...</p>
    </div>
  </div>

  <div v-else class="mb-8 min-h-screen w-full py-8">
    <div class="mx-auto max-w-7xl px-4">
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-3xl font-bold text-gray-900">전통주 추천 통계</h1>
        <p class="text-gray-600">사용자들의 전통주 선택 패턴을 분석해보세요</p>
        <div v-if="error" class="mt-4 rounded border border-yellow-400 bg-yellow-100 p-3 text-yellow-700">
          {{ error }}
        </div>
      </div>

      <!-- 요약 카드들 -->
      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div class="rounded-lg bg-white p-6 shadow-md">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">총 추천 수</h3>
          <p class="text-3xl font-bold text-blue-600">{{ recommendations.length }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">인기 전통주</h3>
          <p class="text-xl font-bold text-green-600">
            {{ popularLiquorStats[0]?.liquorName || 'N/A' }}
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">주 연령대</h3>
          <p class="text-xl font-bold text-purple-600">
            {{ ageGroupStats.sort((a, b) => b.count - a.count)[0]?.age || 'N/A' }}
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">성별 비율</h3>
          <p class="text-xl font-bold text-pink-600">
            {{ genderStats.find((g) => g.sex === '여성')?.count || 0 }} :
            {{ genderStats.find((g) => g.sex === '남성')?.count || 0 }}
          </p>
        </div>
      </div>

      <!-- 차트들 -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- 연령대별 통계 -->
        <div class="rounded-lg bg-white p-6 shadow-md">
          <v-chart :option="ageChartOption" style="height: 300px;" />
        </div>

        <!-- 성별 통계 -->
        <div class="rounded-lg bg-white p-6 shadow-md">
          <v-chart :option="genderChartOption" style="height: 300px;" />
        </div>

        <!-- 음주 빈도 통계 -->
        <div class="rounded-lg bg-white p-6 shadow-md">
          <v-chart :option="drinkChartOption" style="height: 300px;" />
        </div>

        <!-- 인기 전통주 -->
        <div class="rounded-lg bg-white p-6 shadow-md">
          <v-chart :option="liquorChartOption" style="height: 300px;" />
        </div>
      </div>

      <!-- 최근 추천 목록 -->
      <div class="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">최근 추천 기록</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 text-left">ID</th>
                <th class="px-4 py-2 text-left">나이</th>
                <th class="px-4 py-2 text-left">성별</th>
                <th class="px-4 py-2 text-left">음주빈도</th>
                <th class="px-4 py-2 text-left">추천 전통주</th>
                <th class="px-4 py-2 text-left">추천 사유</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="rec in recommendations.slice(0, 10)"
                :key="rec.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="px-4 py-2">{{ rec.id }}</td>
                <td class="px-4 py-2">{{ rec.age }}세</td>
                <td class="px-4 py-2">{{ rec.sex === 'male' ? '남성' : '여성' }}</td>
                <td class="px-4 py-2">{{ getDrinkCountLabel(rec.drinkCount) }}</td>
                <td class="px-4 py-2 font-medium">{{ rec.liquorName }}</td>
                <td class="max-w-xs truncate px-4 py-2 text-sm text-gray-600">
                  {{ rec.reason }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
