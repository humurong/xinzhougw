<script setup lang="ts">
import { computed, ref } from 'vue'
import { Users, TrendingUp, TrendingDown, Building, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockCrowdData } from '@/data/mockData'

const crowdData = ref(mockCrowdData)

const currentRate = computed(() => {
  return Math.round((crowdData.value.currentCount / crowdData.value.maxCapacity) * 100)
})

const getStatusInfo = computed(() => {
  if (currentRate.value < 50) {
    return { text: '客流较少', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle }
  } else if (currentRate.value < 80) {
    return { text: '客流适中', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock }
  } else {
    return { text: '客流较多', color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle }
  }
})

const timeLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

const maxTrendValue = computed(() => {
  return Math.max(...crowdData.value.trend)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <Header />
    
    <main>
      <section class="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold font-display">实时客流</h1>
              <p class="text-emerald-100 mt-1 flex items-center gap-1">
                <MapPin class="w-4 h-4" />
                忻州长城博物馆
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-gray-600">当前客流</h3>
                <div :class="['px-3 py-1 rounded-full text-sm flex items-center gap-1', getStatusInfo.bg, getStatusInfo.color]">
                  <component :is="getStatusInfo.icon" class="w-4 h-4" />
                  {{ getStatusInfo.text }}
                </div>
              </div>
              <div class="text-5xl font-bold text-gray-900 mb-2">
                {{ crowdData.currentCount.toLocaleString() }}
              </div>
              <div class="text-gray-400 text-sm">
                / {{ crowdData.maxCapacity.toLocaleString() }} 人
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm mb-2">
                  <span class="text-gray-500">客流占比</span>
                  <span class="font-medium text-gray-700">{{ currentRate }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    :class="[
                      'h-3 rounded-full transition-all duration-1000',
                      currentRate < 50 ? 'bg-green-500' : currentRate < 80 ? 'bg-yellow-500' : 'bg-red-500'
                    ]"
                    :style="{ width: `${currentRate}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-gray-600">今日峰值</h3>
                <div class="flex items-center gap-1 text-orange-500">
                  <TrendingUp class="w-4 h-4" />
                  <span class="text-sm">峰值时段</span>
                </div>
              </div>
              <div class="text-5xl font-bold text-gray-900 mb-2">
                {{ crowdData.peakCount.toLocaleString() }}
              </div>
              <div class="text-gray-400 text-sm">人</div>
              <div class="mt-4 p-3 bg-orange-50 rounded-xl">
                <div class="flex items-center gap-2 text-orange-700">
                  <Clock class="w-4 h-4" />
                  <span class="text-sm">峰值时段：{{ crowdData.peakTime }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-gray-600">较昨日</h3>
                <div class="flex items-center gap-1 text-blue-500">
                  <TrendingDown class="w-4 h-4" />
                  <span class="text-sm">-12.5%</span>
                </div>
              </div>
              <div class="text-5xl font-bold text-gray-900 mb-2">
                -1,250
              </div>
              <div class="text-gray-400 text-sm">人</div>
              <div class="mt-4 p-3 bg-blue-50 rounded-xl">
                <div class="flex items-center gap-2 text-blue-700">
                  <TrendingDown class="w-4 h-4" />
                  <span class="text-sm">客流较昨日有所下降</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-6 font-display flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-emerald-500" />
              今日客流趋势
            </h3>
            <div class="h-64 flex items-end justify-between gap-2 px-4">
              <div 
                v-for="(value, index) in crowdData.trend" 
                :key="index"
                class="flex-1 flex flex-col items-center gap-2"
              >
                <div class="relative w-full">
                  <div 
                    class="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:from-emerald-600 hover:to-teal-500 cursor-pointer"
                    :style="{ height: `${(value / maxTrendValue) * 200}px` }"
                  ></div>
                  <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                    {{ value }}
                  </span>
                </div>
                <span class="text-xs text-gray-400">{{ timeLabels[index] }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-6 font-display flex items-center gap-2">
              <Building class="w-5 h-5 text-emerald-500" />
              各区域客流分布
            </h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="area in crowdData.areas" 
                :key="area.name"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300',
                  (area.count / area.max) > 0.8 ? 'border-red-200 bg-red-50/50' : 'border-gray-100 hover:border-emerald-200'
                ]"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900">{{ area.name }}</h4>
                  <Users class="w-5 h-5 text-gray-400" />
                </div>
                <div class="text-3xl font-bold text-gray-900 mb-1">
                  {{ area.count.toLocaleString() }}
                  <span class="text-sm font-normal text-gray-400">/ {{ area.max }}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div 
                    :class="[
                      'h-2 rounded-full transition-all duration-500',
                      (area.count / area.max) > 0.8 ? 'bg-red-500' : (area.count / area.max) > 0.5 ? 'bg-yellow-500' : 'bg-emerald-500'
                    ]"
                    :style="{ width: `${(area.count / area.max) * 100}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-400">
                  占比 {{ Math.round((area.count / area.max) * 100) }}%
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mt-8">
            <div :class="['rounded-2xl p-6', getStatusInfo.bg]">
              <div class="flex items-center gap-3 mb-4">
                <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', getStatusInfo.bg]">
                  <component :is="getStatusInfo.icon" class="w-6 h-6" :class="getStatusInfo.color" />
                </div>
                <div>
                  <h4 :class="['font-bold', getStatusInfo.color]">{{ getStatusInfo.text }}</h4>
                  <p class="text-sm text-gray-500">建议出行提示</p>
                </div>
              </div>
              <p class="text-gray-600">
                {{ currentRate < 50 ? '当前馆内客流较少，是参观的好时机。建议您可以从容地参观各个展厅，细细品味长城文化的魅力。' : currentRate < 80 ? '当前馆内客流适中，参观体验良好。部分热门展厅可能需要稍作等待，建议合理安排参观路线。' : '当前馆内客流较多，建议您优先参观人流较少的区域，或考虑错峰参观。我们会尽力为您提供良好的参观体验。' }}
              </p>
            </div>

            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
              <h4 class="font-bold text-gray-900 mb-4">入馆须知</h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                  <span class="text-sm text-gray-600">入馆需携带有效身份证件进行实名验证</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                  <span class="text-sm text-gray-600">参观全程请佩戴口罩，保持社交距离</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                  <span class="text-sm text-gray-600">禁止携带易燃易爆物品及液体入馆</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                  <span class="text-sm text-gray-600">馆内设有多处休息区，可随时休息</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>