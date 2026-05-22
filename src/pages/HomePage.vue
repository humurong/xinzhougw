<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Calendar, Users, Award, MapPin, ArrowRight, Play, ChevronLeft, ChevronRight, Star, Mountain, Landmark, History } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockExhibitions, mockCrowdData } from '@/data/mockData'

const router = useRouter()
const currentSlide = ref(0)
const isPlaying = ref(false)
const showVideoModal = ref(false)

const slides = [
  {
    title: '穿越千年，触摸历史',
    subtitle: 'Explore the Great Wall',
    description: '探索长城的辉煌历史，感受中华文明的博大精深',
    image: 'https://picsum.photos/seed/greatwall1/1920/1080?blur=0',
    backupImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop',
    buttonText: '立即预约',
    buttonPath: '/ticket',
  },
  {
    title: '非遗传承，匠心独运',
    subtitle: 'Intangible Heritage',
    description: '体验传统手工艺，感受非遗文化的独特魅力',
    image: 'https://picsum.photos/seed/culture2/1920/1080?blur=0',
    backupImage: 'https://images.unsplash.com/photo-1544569146-534e1114661d?w=1920&h=1080&fit=crop',
    buttonText: '体验非遗',
    buttonPath: '/heritage',
  },
  {
    title: '文化盛宴，精彩呈现',
    subtitle: 'Cultural Exhibition',
    description: '丰富的展览活动，带您领略长城文化的独特魅力',
    image: 'https://picsum.photos/seed/exhibition3/1920/1080?blur=0',
    backupImage: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=1920&h=1080&fit=crop',
    buttonText: '查看展览',
    buttonPath: '/exhibition',
  },
]

const stats = [
  { icon: History, value: '2300+', label: '年历史沉淀', suffix: '' },
  { icon: Users, value: '100万+', label: '年接待游客', suffix: '' },
  { icon: Award, value: '5A', label: '国家级景区', suffix: '' },
  { icon: Mountain, value: '2000', label: '公里长城', suffix: 'km' },
]

const services = [
  {
    name: '门票预约',
    description: '实名制分时预约，轻松便捷',
    icon: '🎫',
    path: '/ticket',
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    name: '文创商品',
    description: '精选文创产品，把文化带回家',
    icon: '🎁',
    path: '/gift',
    gradient: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    name: '讲解服务',
    description: '专业讲解员，深度解读历史',
    icon: '🎤',
    path: '/guide-service',
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: '非遗体验',
    description: '传统手工艺，亲身感受非遗魅力',
    icon: '✂️',
    path: '/heritage',
    gradient: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    name: '场馆预约',
    description: '个人/团队场馆预约服务',
    icon: '🏛️',
    path: '/venue-booking',
    gradient: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  {
    name: '导览服务',
    description: '专业导游，全程陪同讲解',
    icon: '🧭',
    path: '/tour-guide',
    gradient: 'from-cyan-500 to-sky-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
  },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const goToPage = (path: string) => {
  router.push(path)
}

const openVideoModal = () => {
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
  isPlaying.value = false
}

let slideInterval: ReturnType<typeof setInterval>
onMounted(() => {
  slideInterval = setInterval(nextSlide, 6000)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50">
    <Header />
    
    <main>
      <section class="relative h-screen overflow-hidden">
        <div class="absolute inset-0">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            :class="[
              'absolute inset-0 transition-all duration-1000 ease-out',
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            ]"
          >
            <div class="w-full h-full">
              <img 
                :src="slide.image" 
                :alt="slide.title"
                class="w-full h-full object-cover"
                @error="(e: any) => e.target.src = slide.backupImage"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-stone-800/50 via-stone-700/30 to-stone-900/40"></div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </div>
        </div>

        <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-stone-900/30 to-transparent z-10"></div>
        <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-900/40 to-transparent z-10"></div>

        <div class="relative z-20 h-full flex flex-col justify-center px-4 md:px-8 lg:px-20">
          <div class="max-w-4xl">
            <div 
              v-for="(slide, index) in slides" 
              :key="index"
              :class="[
                'transition-all duration-1000 ease-out',
                currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              ]"
            >
              <div class="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-8 shadow-lg shadow-amber-500/30">
                <Landmark class="w-4 h-4" />
                欢迎来到忻州长城博物馆
              </div>
              
              <p class="text-amber-400 text-lg md:text-xl font-light tracking-widest mb-4 uppercase">
                {{ slide.subtitle }}
              </p>
              
              <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-display leading-tight tracking-tight">
                {{ slide.title }}
              </h1>
              
              <p class="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                {{ slide.description }}
              </p>
              
              <button 
                @click="goToPage(slide.buttonPath)"
                class="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-full hover:from-amber-400 hover:to-amber-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-xl shadow-amber-500/30"
              >
                {{ slide.buttonText }}
                <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <button 
          @click="prevSlide"
          class="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-30 border border-white/20"
        >
          <ChevronLeft class="w-7 h-7" />
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-30 border border-white/20"
        >
          <ChevronRight class="w-7 h-7" />
        </button>

        <div class="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30">
          <div class="flex gap-4">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'relative w-16 h-3 rounded-full transition-all duration-500 overflow-hidden group',
                currentSlide === index ? 'bg-amber-500' : 'bg-white/20 hover:bg-white/30'
              ]"
            >
              <span 
                v-if="currentSlide === index"
                class="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 animate-pulse"
              ></span>
              <span 
                :class="[
                  'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                  currentSlide === index ? 'w-full bg-white/40' : 'w-0 group-hover:w-full bg-white/20'
                ]"
              ></span>
            </button>
          </div>
          <p class="text-white/60 text-sm">
            {{ currentSlide + 1 }} / {{ slides.length }}
          </p>
        </div>

        <button 
          @click="openVideoModal"
          class="absolute bottom-16 right-8 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-500 transform hover:scale-115 z-30 border border-amber-400/30 group"
        >
          <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/40">
            <Play class="w-7 h-7 ml-1" />
          </div>
        </button>
      </section>

      <section class="py-20 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <p class="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">Our Heritage</p>
            <h2 class="text-3xl md:text-4xl font-bold text-white font-display">传承与荣耀</h2>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="relative group"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative bg-stone-800/50 backdrop-blur rounded-2xl p-6 border border-stone-700/50 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2">
                <div class="flex justify-center mb-5">
                  <div class="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all duration-500">
                    <component :is="stat.icon" class="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                    {{ stat.value }}
                    <span class="text-xl text-amber-400">{{ stat.suffix }}</span>
                  </div>
                  <div class="text-stone-400 text-sm">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-gradient-to-b from-stone-50 to-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <p class="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">Services</p>
            <h2 class="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-display">便捷服务</h2>
            <p class="text-stone-500 text-lg max-w-2xl mx-auto">一站式服务，让您的博物馆之旅更加轻松愉快</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <button
              v-for="service in services"
              :key="service.name"
              @click="goToPage(service.path)"
              class="group relative"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div :class="[
                'relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl',
                service.borderColor,
                'group-hover:border-transparent'
              ]">
                <div :class="[
                  'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl mb-5 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg',
                  service.gradient
                ]">
                  {{ service.icon }}
                </div>
                <h3 class="font-semibold text-stone-900 mb-2 text-center group-hover:text-amber-600 transition-colors">{{ service.name }}</h3>
                <p class="text-stone-500 text-xs text-center line-clamp-2">{{ service.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <p class="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">Exhibitions</p>
            <h2 class="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-display">精彩展览</h2>
            <p class="text-stone-500 text-lg max-w-2xl mx-auto">探索最新的展览活动，领略长城文化的独特魅力</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <button
              v-for="exhibition in mockExhibitions"
              :key="exhibition.id"
              @click="goToPage('/exhibition')"
              class="group relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-stone-100">
                <div class="relative h-56 md:h-72 overflow-hidden">
                  <img 
                    :src="exhibition.image" 
                    :alt="exhibition.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div class="absolute top-4 left-4 z-20">
                    <span class="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-full shadow-lg">
                      <Star class="w-3 h-3 fill-current" />
                      进行中
                    </span>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                </div>
                <div class="p-8">
                  <h3 class="text-2xl font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors font-display">
                    {{ exhibition.name }}
                  </h3>
                  <p class="text-stone-600 mb-4 line-clamp-2 leading-relaxed">{{ exhibition.description }}</p>
                  <div class="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div class="flex items-center gap-2 text-stone-500">
                      <MapPin class="w-4 h-4" />
                      <span>{{ exhibition.location }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-amber-600 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
                      <ArrowRight class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div class="text-center mt-14">
            <button 
              @click="goToPage('/exhibition')"
              class="group inline-flex items-center gap-3 px-10 py-4 border-2 border-stone-300 text-stone-700 font-semibold rounded-full hover:border-amber-500 hover:text-amber-600 hover:bg-amber-500/5 transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              查看全部展览
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section class="py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700">
        <div class="container mx-auto px-4">
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-white/20 shadow-2xl">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div class="flex-1 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                  <Users class="w-5 h-5 text-white" />
                  <span class="text-white/90 text-sm font-medium">实时数据</span>
                </div>
                <h3 class="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
                  实时客流信息
                </h3>
                <p class="text-white/80 text-lg mb-8">
                  当前馆内人数：<span class="text-white font-bold text-2xl">{{ mockCrowdData.currentCount }}</span> / {{ mockCrowdData.maxCapacity }}
                </p>
                <div class="w-full max-w-md mx-auto lg:mx-0">
                  <div class="relative">
                    <div class="w-full bg-white/20 rounded-full h-6 overflow-hidden">
                      <div 
                        class="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000 relative"
                        :style="{ width: `${(mockCrowdData.currentCount / mockCrowdData.maxCapacity) * 100}%` }"
                      >
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div class="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span class="text-amber-600 text-xs font-bold">{{ Math.round((mockCrowdData.currentCount / mockCrowdData.maxCapacity) * 100) }}%</span>
                    </div>
                  </div>
                  <div class="flex justify-between mt-4 text-white/70 text-sm">
                    <span>当前客流</span>
                    <span>客流峰值: {{ mockCrowdData.peakTime }}</span>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0">
                <button 
                  @click="goToPage('/crowd')"
                  class="px-10 py-5 bg-white text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  查看详细客流
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-gradient-to-b from-stone-50 to-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <p class="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">Testimonials</p>
            <h2 class="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-display">游客心声</h2>
            <p class="text-stone-500 text-lg max-w-2xl mx-auto">听听他们怎么说</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div 
              v-for="i in 3" 
              :key="i"
              class="group relative"
            >
              <div class="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-stone-300/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100">
                <div class="flex items-center gap-1 mb-6">
                  <Star v-for="star in 5" :key="star" class="w-5 h-5 text-amber-400 fill-current"></Star>
                </div>
                <p class="text-stone-600 mb-8 leading-relaxed italic">
                  "非常棒的博物馆！展品丰富，讲解专业，让我对长城有了全新的认识。强烈推荐给所有历史爱好者！"
                </p>
                <div class="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div class="font-semibold text-stone-900">游客{{ i }}</div>
                    <div class="text-stone-400 text-sm">2024年1月参观</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-stone-900">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p class="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">Contact Us</p>
              <h3 class="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                联系我们
              </h3>
              <p class="text-stone-400 mb-8 leading-relaxed">
                如有任何问题或建议，欢迎随时联系我们。我们的专业团队将竭诚为您服务。
              </p>
              <div class="space-y-4">
                <div class="flex items-center gap-4 text-stone-300">
                  <div class="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center">
                    <MapPin class="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p class="font-medium text-white">地址</p>
                    <p class="text-stone-400 text-sm">山西省忻州市长城大道1号</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 text-stone-300">
                  <div class="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center">
                    <Phone class="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p class="font-medium text-white">电话</p>
                    <p class="text-stone-400 text-sm">0350-1234567</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 text-stone-300">
                  <div class="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center">
                    <Clock class="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p class="font-medium text-white">开放时间</p>
                    <p class="text-stone-400 text-sm">周二至周日 09:00-17:00（周一闭馆）</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-stone-500/20 rounded-3xl blur-3xl"></div>
              <div class="relative bg-stone-800/50 backdrop-blur rounded-3xl p-8 border border-stone-700/50">
                <h4 class="text-xl font-bold text-white mb-6">快速留言</h4>
                <form class="space-y-4">
                  <input 
                    type="text" 
                    placeholder="您的姓名" 
                    class="w-full px-4 py-3 bg-stone-700/50 border border-stone-600 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="您的邮箱" 
                    class="w-full px-4 py-3 bg-stone-700/50 border border-stone-600 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <textarea 
                    placeholder="留言内容" 
                    rows="4"
                    class="w-full px-4 py-3 bg-stone-700/50 border border-stone-600 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    class="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                  >
                    提交留言
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />

    <div 
      v-if="showVideoModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeVideoModal"
    >
      <div 
        class="bg-stone-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl"
        @click.stop
      >
        <div class="relative aspect-video bg-stone-900">
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              @click="isPlaying = !isPlaying"
              class="w-28 h-28 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-amber-500/40"
            >
              <Play class="w-12 h-12 text-white ml-1" />
            </button>
          </div>
          <div class="absolute top-4 right-4">
            <button 
              @click="closeVideoModal"
              class="text-white/70 hover:text-white transition-colors text-3xl font-light"
            >
              ×
            </button>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-2xl font-bold text-white mb-2">忻州长城博物馆宣传片</h3>
          <p class="text-stone-400 text-sm">时长：3分30秒</p>
        </div>
      </div>
    </div>
  </div>
</template>
