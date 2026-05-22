<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, MapPin, Phone, Clock, ChevronDown } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isDropdownOpen = ref(false)

const mainNavItems = [
  { name: '首页', path: '/' },
  { name: '门票预约', path: '/ticket' },
  { name: '文创商品', path: '/gift' },
  { name: '展览活动', path: '/exhibition' },
]

const moreNavItems = [
  { name: '讲解服务', path: '/guide-service' },
  { name: '非遗体验', path: '/heritage' },
  { name: '场馆预约', path: '/venue-booking' },
  { name: '导览服务', path: '/tour-guide' },
  { name: '天气查询', path: '/weather' },
  { name: '投诉建议', path: '/complaint' },
  { name: '在线客服', path: '/customer-service' },
  { name: '客流查询', path: '/crowd' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const goToPage = (path: string) => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
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
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" @click="goToPage('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <span class="text-white text-xl font-bold font-display">长</span>
          </div>
          <div class="hidden sm:block">
            <h1 :class="['text-xl font-bold font-display transition-colors duration-300', isScrolled ? 'text-gray-900' : 'text-white']">忻州长城博物馆</h1>
            <p :class="['text-xs transition-colors duration-300', isScrolled ? 'text-gray-500' : 'text-white/70']">Xinzhou Great Wall Museum</p>
          </div>
        </div>

        <nav class="hidden lg:flex items-center gap-2">
          <button
            v-for="item in mainNavItems"
            :key="item.path"
            @click="goToPage(item.path)"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
              router.currentRoute.value.path === item.path
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                : isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-amber-600'
                  : 'text-white hover:bg-white/20'
            ]"
          >
            {{ item.name }}
          </button>

          <div class="relative">
            <button
              @click="toggleDropdown"
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1',
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              ]"
            >
              更多服务
              <ChevronDown :class="['w-4 h-4 transition-transform duration-300', isDropdownOpen ? 'rotate-180' : '']" />
            </button>
            
            <div 
              v-if="isDropdownOpen"
              class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-down"
            >
              <button
                v-for="item in moreNavItems"
                :key="item.path"
                @click="goToPage(item.path)"
                :class="[
                  'w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                  router.currentRoute.value.path === item.path
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-amber-600'
                ]"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
        </nav>

        <div class="hidden lg:flex items-center gap-6 text-sm">
          <div :class="['flex items-center gap-2 transition-colors duration-300', isScrolled ? 'text-gray-600' : 'text-white/80']">
            <MapPin class="w-4 h-4 text-amber-500" />
            <span class="hidden xl:inline">山西省忻州市</span>
          </div>
          <a :class="['flex items-center gap-2 transition-colors duration-300', isScrolled ? 'text-gray-600 hover:text-amber-600' : 'text-white/80 hover:text-white']" href="tel:0350-1234567">
            <Phone class="w-4 h-4 text-amber-500" />
            <span>0350-1234567</span>
          </a>
          <div :class="['flex items-center gap-2 transition-colors duration-300', isScrolled ? 'text-gray-600' : 'text-white/80']">
            <Clock class="w-4 h-4 text-amber-500" />
            <span>09:00-17:00</span>
          </div>
        </div>

        <button 
          @click="toggleMenu"
          :class="['lg:hidden p-2 rounded-lg transition-colors duration-300', isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20']"
        >
          <Menu v-if="!isMenuOpen" :class="['w-6 h-6 transition-colors duration-300', isScrolled ? 'text-gray-700' : 'text-white']" />
          <X v-else :class="['w-6 h-6 transition-colors duration-300', isScrolled ? 'text-gray-700' : 'text-white']" />
        </button>
      </div>
    </div>

    <div 
      v-if="isMenuOpen"
      class="lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-slide-up"
    >
      <nav class="container mx-auto px-4 py-4 space-y-1">
        <button
          v-for="item in [...mainNavItems, ...moreNavItems]"
          :key="item.path"
          @click="goToPage(item.path)"
          :class="[
            'w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 flex items-center justify-between',
            router.currentRoute.value.path === item.path
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-amber-600'
          ]"
        >
          <span>{{ item.name }}</span>
        </button>
      </nav>
      <div class="container mx-auto px-4 py-4 border-t border-gray-100 space-y-3 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <MapPin class="w-4 h-4 text-amber-500" />
          <span>山西省忻州市长城大道1号</span>
        </div>
        <a href="tel:0350-1234567" class="flex items-center gap-2 hover:text-amber-600 transition-colors">
          <Phone class="w-4 h-4 text-amber-500" />
          <span>0350-1234567</span>
        </a>
        <div class="flex items-center gap-2">
          <Clock class="w-4 h-4 text-amber-500" />
          <span>周二至周日 09:00-17:00（周一闭馆）</span>
        </div>
      </div>
    </div>

    <div 
      v-if="isDropdownOpen"
      class="lg:hidden fixed inset-0 z-40"
      @click="isDropdownOpen = false"
    ></div>
  </header>
</template>
