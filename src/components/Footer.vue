<script setup lang="ts">
import { MapPin, Phone, Clock, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '门票预约', path: '/ticket' },
  { name: '文创商品', path: '/gift' },
  { name: '讲解服务', path: '/guide-service' },
  { name: '非遗体验', path: '/heritage' },
  { name: '场馆预约', path: '/venue-booking' },
]

const goToPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl font-bold font-display">长</span>
            </div>
            <div>
              <h3 class="text-lg font-bold font-display">忻州长城博物馆</h3>
              <p class="text-xs text-gray-400">Xinzhou Great Wall Museum</p>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-4">
            忻州长城博物馆是一座集收藏、展示、研究、教育于一体的综合性博物馆，致力于保护和传承长城文化遗产。
          </p>
          <div class="flex gap-3">
            <button class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Facebook class="w-5 h-5" />
            </button>
            <button class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Twitter class="w-5 h-5" />
            </button>
            <button class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Instagram class="w-5 h-5" />
            </button>
            <button class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Youtube class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <button 
                @click="goToPage(link.path)"
                class="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200"
              >
                {{ link.name }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">联系我们</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-primary-400 mt-0.5" />
              <span class="text-sm text-gray-400">山西省忻州市忻府区长城大街1号</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-primary-400" />
              <span class="text-sm text-gray-400">0350-1234567</span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-primary-400" />
              <span class="text-sm text-gray-400">info@xinzhougw.com</span>
            </li>
            <li class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-primary-400" />
              <span class="text-sm text-gray-400">周二至周日 09:00-17:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">订阅资讯</h4>
          <p class="text-sm text-gray-400 mb-4">订阅我们的资讯，获取最新展览和活动信息</p>
          <div class="flex gap-2">
            <input 
              type="email" 
              placeholder="输入您的邮箱" 
              class="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button class="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors text-sm font-medium">
              订阅
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">
          © 2024 忻州长城博物馆 版权所有
        </p>
        <div class="flex gap-6 text-sm text-gray-400">
          <button class="hover:text-white transition-colors">隐私政策</button>
          <button class="hover:text-white transition-colors">使用条款</button>
          <button class="hover:text-white transition-colors">网站地图</button>
        </div>
      </div>
    </div>
  </footer>
</template>
