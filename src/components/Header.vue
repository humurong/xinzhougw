<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, MapPin, Phone, Clock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '门票预约', path: '/ticket' },
  { name: '文创商品', path: '/gift' },
  { name: '讲解服务', path: '/guide-service' },
  { name: '非遗体验', path: '/heritage' },
  { name: '场馆预约', path: '/venue-booking' },
  { name: '导览服务', path: '/tour-guide' },
  { name: '展览活动', path: '/exhibition' },
  { name: '天气查询', path: '/weather' },
  { name: '投诉建议', path: '/complaint' },
  { name: '在线客服', path: '/customer-service' },
  { name: '客流查询', path: '/crowd' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const goToPage = (path: string) => {
  isMenuOpen.value = false
  router.push(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" @click="goToPage('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
            <span class="text-white text-xl font-bold display font-display">长</span>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-gray-900 font-display">忻州长城博物馆</h1>
            <p class="text-xs text-gray-500">Xinzhou Great Wall Museum</p>
          </div>
        </div>

        <nav class="hidden lg:flex items-center gap-1">
          <button
            v-for="item in navItems"
            :key="item.path"
            @click="goToPage(item.path)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              router.currentRoute.value.path === item.path
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
            ]"
          >
            {{ item.name }}
          </button>
        </nav>

        <div class="hidden lg:flex items-center gap-6 text-sm">
          <div class="flex items-center gap-2 text-gray-600">
            <MapPin class="w-4 h-4 text-primary-500" />
            <span>山西省忻州市</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <Phone class="w-4 h-4 text-primary-500" />
            <span>0350-1234567</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <Clock class="w-4 h-4 text-primary-500" />
            <span>09:00-17:00</span>
          </div>
        </div>

        <button 
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6 text-gray-700" />
          <X v-else class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>

    <div 
      v-if="isMenuOpen"
      class="lg:hidden bg-white border-t border-gray-100 animate-slide-down"
    >
      <nav class="container mx-auto px-4 py-4 space-y-1">
        <button
          v-for="item in navItems"
          :key="item.path"
          @click="goToPage(item.path)"
          :class="[
            'w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200',
            router.currentRoute.value.path === item.path
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
          ]"
        >
          {{ item.name }}
        </button>
      </nav>
      <div class="container mx-auto px-4 py-4 border-t border-gray-100 space-y-3 text-sm">
        <div class="flex items-center gap-2 text-gray-600">
          <MapPin class="w-4 h-4 text-primary-500" />
          <span>山西省忻州市</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <Phone class="w-4 h-4 text-primary-500" />
          <span>0350-1234567</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <Clock class="w-4 h-4 text-primary-500" />
          <span>09:00-17:00</span>
        </div>
      </div>
    </div>
  </header>
</template>
