<script setup lang="ts">import { ref, onMounted } from 'vue';
import { Calendar, Users, Award, MapPin, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockExhibitions, mockCrowdData } from '@/data/mockData';
const router = useRouter();
const currentSlide = ref(0);
const isPlaying = ref(false);
const showVideoModal = ref(false);
const slides = [
 {
 title: '穿越千年，触摸历史',
 description: '探索长城的辉煌历史，感受中华文明的博大精深',
 image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=great%20wall%20of%20china%20at%20sunset%20beautiful%20landscape%20ancient%20architecture&image_size=landscape_16_9',
 buttonText: '立即预约',
 buttonPath: '/ticket',
 },
 {
 title: '非遗传承，匠心独运',
 description: '体验传统手工艺，感受非遗文化的独特魅力',
 image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20traditional%20paper%20cutting%20art%20craftsman%20workshop&image_size=landscape_16_9',
 buttonText: '体验非遗',
 buttonPath: '/heritage',
 },
 {
 title: '文化盛宴，精彩呈现',
 description: '丰富的展览活动，带您领略长城文化的独特魅力',
 image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=museum%20exhibition%20ancient%20chinese%20relics%20great%20wall%20history&image_size=landscape_16_9',
 buttonText: '查看展览',
 buttonPath: '/exhibition',
 },
];
const stats = [
 { icon: Calendar, value: '365', label: '年历史沉淀' },
 { icon: Users, value: '100万+', label: '年接待游客' },
 { icon: Award, value: '5A', label: '国家级景区' },
 { icon: MapPin, value: '2000km', label: '长城遗址' },
];
const services = [
 {
 name: '门票预约',
 description: '实名制分时预约，轻松便捷',
 icon: '🎫',
 path: '/ticket',
 color: 'from-primary-500 to-primary-600',
 },
 {
 name: '文创商品',
 description: '精选文创产品，把文化带回家',
 icon: '🎁',
 path: '/gift',
 color: 'from-wall-500 to-wall-600',
 },
 {
 name: '讲解服务',
 description: '专业讲解员，深度解读历史',
 icon: '🎤',
 path: '/guide-service',
 color: 'from-emerald-500 to-emerald-600',
 },
 {
 name: '非遗体验',
 description: '传统手工艺，亲身感受非遗魅力',
 icon: '✂️',
 path: '/heritage',
 color: 'from-purple-500 to-purple-600',
 },
 {
 name: '场馆预约',
 description: '个人/团队场馆预约服务',
 icon: '🏛️',
 path: '/venue-booking',
 color: 'from-orange-500 to-orange-600',
 },
 {
 name: '导览服务',
 description: '专业导游，全程陪同讲解',
 icon: '🧭',
 path: '/tour-guide',
 color: 'from-cyan-500 to-cyan-600',
 },
];
const nextSlide = () => {
 currentSlide.value = (currentSlide.value + 1) % slides.length;
};
const prevSlide = () => {
 currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};
const goToSlide = (index: number) => {
 currentSlide.value = index;
};
const goToPage = (path: string) => {
 router.push(path);
};
const openVideoModal = () => {
 showVideoModal.value = true;
};
const closeVideoModal = () => {
 showVideoModal.value = false;
 isPlaying.value = false;
};
let slideInterval: ReturnType<typeof setInterval>;
onMounted(() => {
 slideInterval = setInterval(nextSlide, 5000);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />
    
    <main>
      <section class="relative h-screen overflow-hidden">
        <div class="absolute inset-0">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            :class="[
              'absolute inset-0 transition-all duration-1000',
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            ]"
          >
            <img 
              :src="slide.image" 
              :alt="slide.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          </div>
        </div>

        <div class="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16">
          <div class="max-w-3xl">
            <div 
              v-for="(slide, index) in slides" 
              :key="index"
              :class="[
                'transition-all duration-1000',
                currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              ]"
            >
              <span class="inline-block px-4 py-1 bg-primary-600 text-white text-sm rounded-full mb-6">
                欢迎来到忻州长城博物馆
              </span>
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display leading-tight">
                {{ slide.title }}
              </h1>
              <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                {{ slide.description }}
              </p>
              <button 
                @click="goToPage(slide.buttonPath)"
                class="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {{ slide.buttonText }}
                <ArrowRight class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <button 
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        >
          <ChevronRight class="w-6 h-6" />
        </button>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-12 h-2 rounded-full transition-all duration-300',
              currentSlide === index ? 'bg-primary-500 w-16' : 'bg-white/30'
            ]"
          ></button>
        </div>

        <button 
          @click="openVideoModal"
          class="absolute bottom-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 z-20 group"
        >
          <div class="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play class="w-6 h-6 ml-1" />
          </div>
        </button>
      </section>

      <section class="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="text-center text-white"
            >
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <component :is="stat.icon" class="w-8 h-8" />
                </div>
              </div>
              <div class="text-3xl md:text-4xl font-bold mb-2">{{ stat.value }}</div>
              <div class="text-sm text-primary-100">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">便捷服务</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">一站式服务，让您的博物馆之旅更加轻松愉快</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <button
              v-for="service in services"
              :key="service.name"
              @click="goToPage(service.path)"
              class="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left"
            >
              <div 
                :class="[
                  'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform',
                  service.color
                ]"
              >
                {{ service.icon }}
              </div>
              <h3 class="font-semibold text-gray-900 mb-1">{{ service.name }}</h3>
              <p class="text-sm text-gray-500 line-clamp-2">{{ service.description }}</p>
            </button>
          </div>
        </div>
      </section>

      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">精彩展览</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">探索最新的展览活动，领略长城文化的独特魅力</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <button
              v-for="exhibition in mockExhibitions"
              :key="exhibition.id"
              @click="goToPage('/exhibition')"
              class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div class="relative h-48 md:h-56 overflow-hidden">
                <img 
                  :src="exhibition.image" 
                  :alt="exhibition.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <span class="px-3 py-1 bg-primary-600 text-sm rounded-full">进行中</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {{ exhibition.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ exhibition.description }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ exhibition.location }}</span>
                  <span>{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
                </div>
              </div>
            </button>
          </div>

          <div class="text-center mt-10">
            <button 
              @click="goToPage('/exhibition')"
              class="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              查看全部展览
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section class="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div class="container mx-auto px-4">
          <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
              <div class="flex-1">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">
                  实时客流信息
                </h3>
                <p class="text-gray-600 mb-6">
                  当前馆内人数：{{ mockCrowdData.currentCount }} / {{ mockCrowdData.maxCapacity }}
                </p>
                <div class="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-500"
                    :style="{ width: `${(mockCrowdData.currentCount / mockCrowdData.maxCapacity) * 100}%` }"
                  ></div>
                </div>
                <div class="flex justify-between mt-2 text-sm text-gray-500">
                  <span>当前客流</span>
                  <span>客流峰值: {{ mockCrowdData.peakTime }}</span>
                </div>
              </div>
              <button 
                @click="goToPage('/crowd')"
                class="px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                查看详细客流
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 font-display">游客心声</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">听听他们怎么说</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div 
              v-for="i in 3" 
              :key="i"
              class="bg-gray-800/50 rounded-2xl p-6 backdrop-blur"
            >
              <div class="flex items-center gap-1 mb-4">
                <span v-for="star in 5" :key="star" class="text-yellow-400">★</span>
              </div>
              <p class="text-gray-300 mb-6 italic">
                "非常棒的博物馆！展品丰富，讲解专业，让我对长城有了全新的认识。强烈推荐给所有历史爱好者！"
              </p>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <Users class="w-6 h-6" />
                </div>
                <div>
                  <div class="font-semibold">游客{{ i }}</div>
                  <div class="text-sm text-gray-400">2024年1月参观</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />

    <div 
      v-if="showVideoModal"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      @click="closeVideoModal"
    >
      <div 
        class="bg-gray-900 rounded-2xl max-w-4xl w-full overflow-hidden"
        @click.stop
      >
        <div class="relative aspect-video bg-gray-800">
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              @click="isPlaying = !isPlaying"
              class="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <Play class="w-10 h-10 ml-1" />
            </button>
          </div>
          <div class="absolute top-4 right-4">
            <button 
              @click="closeVideoModal"
              class="text-white/70 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">忻州长城博物馆宣传片</h3>
          <p class="text-gray-400 text-sm">时长：3分30秒</p>
        </div>
      </div>
    </div>
  </div>
</template>
