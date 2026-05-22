<script setup lang="ts">import { computed } from 'vue';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Eye, MapPin } from 'lucide-vue-next';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockWeatherData } from '@/data/mockData';
const weatherIconMap: Record<string, typeof Sun> = {
 sunny: Sun,
 cloudy: Cloud,
 overcast: Cloud,
 rainy: CloudRain,
 snowy: CloudSnow,
};
const getWeatherIcon = (icon: string) => {
 return weatherIconMap[icon] || Sun;
};
const getUVDescription = (index: number) => {
 if (index <= 2)
 return '低';
 if (index <= 5)
 return '中等';
 if (index <= 7)
 return '高';
 if (index <= 10)
 return '很高';
 return '极高';
};
const getUVColor = (index: number) => {
 if (index <= 2)
 return 'text-green-600 bg-green-100';
 if (index <= 5)
 return 'text-yellow-600 bg-yellow-100';
 if (index <= 7)
 return 'text-orange-600 bg-orange-100';
 return 'text-red-600 bg-red-100';
};
const todayWeather = computed(() => mockWeatherData[0]);
const currentDate = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const getDayName = (dateStr: string) => {
 const date = new Date(dateStr);
 return weekDays[date.getDay()];
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-100 to-white">
    <Header />
    
    <main>
      <section class="bg-gradient-to-r from-sky-500 to-blue-600 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Thermometer class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold font-display">天气查询</h1>
              <p class="text-sky-100 mt-1 flex items-center gap-1">
                <MapPin class="w-4 h-4" />
                忻州长城博物馆
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
              <div class="flex items-center gap-6">
                <div class="w-24 h-24 bg-sky-100 rounded-2xl flex items-center justify-center">
                  <component :is="getWeatherIcon(todayWeather.icon)" class="w-14 h-14 text-sky-500" />
                </div>
                <div>
                  <div class="text-6xl font-bold text-gray-900">
                    {{ todayWeather.temperature.max }}°
                    <span class="text-3xl text-gray-400">{{ todayWeather.temperature.min }}°</span>
                  </div>
                  <div class="text-xl text-gray-600 mt-2">{{ todayWeather.condition }}</div>
                  <div class="text-sm text-gray-400 mt-1">今日 {{ currentDate }}</div>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                <div class="bg-sky-50 rounded-xl p-4 text-center">
                  <div class="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Wind class="w-5 h-5 text-sky-500" />
                  </div>
                  <div class="text-sm text-gray-500">风力</div>
                  <div class="font-semibold text-gray-900">{{ todayWeather.wind }}</div>
                </div>
                <div class="bg-blue-50 rounded-xl p-4 text-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Droplets class="w-5 h-5 text-blue-500" />
                  </div>
                  <div class="text-sm text-gray-500">湿度</div>
                  <div class="font-semibold text-gray-900">{{ todayWeather.humidity }}%</div>
                </div>
                <div class="bg-yellow-50 rounded-xl p-4 text-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye class="w-5 h-5 text-yellow-500" />
                  </div>
                  <div class="text-sm text-gray-500">紫外线</div>
                  <div :class="['font-semibold px-2 py-1 rounded-full text-sm', getUVColor(todayWeather.uvIndex)]">
                    {{ getUVDescription(todayWeather.uvIndex) }}
                  </div>
                </div>
                <div class="bg-orange-50 rounded-xl p-4 text-center">
                  <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Thermometer class="w-5 h-5 text-orange-500" />
                  </div>
                  <div class="text-sm text-gray-500">体感温度</div>
                  <div class="font-semibold text-gray-900">{{ todayWeather.temperature.max - 2 }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-6 font-display">未来天气</h3>
            <div class="grid grid-cols-5 gap-4">
              <div 
                v-for="(weather, index) in mockWeatherData" 
                :key="index"
                class="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="text-sm text-gray-500 mb-3">{{ getDayName(weather.date) }}</div>
                <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <component :is="getWeatherIcon(weather.icon)" class="w-7 h-7 text-gray-600" />
                </div>
                <div class="text-sm font-semibold">
                  <span class="text-gray-900">{{ weather.temperature.max }}°</span>
                  <span class="text-gray-400 ml-1">{{ weather.temperature.min }}°</span>
                </div>
                <div class="text-xs text-gray-400 mt-1">{{ weather.condition }}</div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 mt-8">
            <h3 class="text-lg font-bold text-gray-900 mb-4 font-display">温馨提示</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></span>
                <span>今日天气{{ todayWeather.condition }}，建议{{ todayWeather.temperature.max < 10 ? '增添衣物' : '适当增减衣物' }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></span>
                <span>紫外线强度{{ getUVDescription(todayWeather.uvIndex) }}，{{ todayWeather.uvIndex > 5 ? '请注意防晒' : '' }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></span>
                <span>风力{{ todayWeather.wind }}，{{ todayWeather.icon === 'snowy' ? '请注意保暖和防滑' : '' }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>