<script setup lang="ts">import { ref, computed } from 'vue';
import { Star, Clock, Users, Globe, Award, Calendar, Check, Eye, Search } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockTourGuides, mockContacts } from '@/data/mockData';
const router = useRouter();
const selectedGuideId = ref('');
const selectedDate = ref('');
const selectedTimeSlot = ref('');
const selectedContactId = ref('');
const participants = ref(1);
const showBookingModal = ref(false);
const showSuccessModal = ref(false);
const getAvailableDates = () => {
 const dates: string[] = [];
 const today = new Date();
 for (let i = 0; i < 14; i++) {
 const date = new Date(today);
 date.setDate(today.getDate() + i);
 dates.push(date.toISOString().split('T')[0]);
 }
 return dates;
};
const selectedGuide = computed(() => {
 return mockTourGuides.find(g => g.id === selectedGuideId.value);
});
const totalPrice = computed(() => {
 if (!selectedGuide.value)
 return 0;
 return selectedGuide.value.price * participants.value;
});
const openBookingModal = (guideId: string) => {
 selectedGuideId.value = guideId;
 selectedDate.value = '';
 selectedTimeSlot.value = '';
 selectedContactId.value = '';
 participants.value = 1;
 showBookingModal.value = true;
};
const submitBooking = () => {
 if (!selectedDate.value) {
 alert('请选择日期');
 return;
 }
 if (!selectedTimeSlot.value) {
 alert('请选择时间段');
 return;
 }
 if (!selectedContactId.value) {
 alert('请选择联系人');
 return;
 }
 showBookingModal.value = false;
 showSuccessModal.value = true;
};
const goToHome = () => {
 router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-4 mb-8">
          <button 
            @click="goToHome"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← 返回
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">导览服务</h1>
            <p class="text-sm text-gray-500">专业导游，全程陪同讲解</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="guide in mockTourGuides"
            :key="guide.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div class="p-6">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    :src="guide.avatar" 
                    :alt="guide.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-xl font-bold text-gray-900">{{ guide.name }}</h3>
                    <span class="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">{{ guide.title }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span class="flex items-center gap-1">
                      <Award class="w-4 h-4" />
                      {{ guide.experience }}经验
                    </span>
                    <span class="flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      服务时长: 2-3小时
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span class="text-sm text-gray-500 ml-1">4.9分</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold text-primary-600">¥{{ guide.price }}</span>
                  <span class="text-sm text-gray-500 block">/次</span>
                </div>
              </div>
              
              <div class="mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Globe class="w-4 h-4" />
                  <span>语言能力:</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="lang in guide.languages" 
                    :key="lang"
                    class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {{ lang }}
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Users class="w-4 h-4" />
                  <span>擅长领域:</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="specialty in guide.specialties" 
                    :key="specialty"
                    class="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                  >
                    {{ specialty }}
                  </span>
                </div>
              </div>

              <button 
                @click="openBookingModal(guide.id)"
                class="w-full py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors shadow-lg"
              >
                立即预约
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />

    <div 
      v-if="showBookingModal && selectedGuide"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showBookingModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">预约 {{ selectedGuide.name }}</h3>
        </div>
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">选择日期</label>
            <div class="grid grid-cols-7 gap-2">
              <button
                v-for="date in getAvailableDates()"
                :key="date"
                @click="selectedDate = date"
                :class="[
                  'p-2 rounded-lg text-center text-sm transition-all duration-200',
                  selectedDate === date 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ date.slice(8) }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">选择时间段</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="slot in selectedGuide.timeSlots"
                :key="slot.id"
                @click="selectedTimeSlot = slot.id"
                :class="[
                  'p-3 rounded-xl text-left text-sm transition-all duration-200',
                  selectedTimeSlot === slot.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                <div class="font-medium">{{ slot.time }}</div>
                <div :class="['text-xs', selectedTimeSlot === slot.id ? 'text-white/70' : 'text-gray-500']">
                  剩余: {{ slot.remaining }}
                </div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">参与人数</label>
            <div class="flex items-center gap-4">
              <button 
                @click="participants = Math.max(1, participants - 1)"
                class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
              >
                -
              </button>
              <span class="text-2xl font-bold text-gray-900 w-12 text-center">{{ participants }}</span>
              <button 
                @click="participants++"
                class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
              >
                +
              </button>
              <span class="text-sm text-gray-500">人</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">选择联系人</label>
            <div class="space-y-2">
              <button
                v-for="contact in mockContacts"
                :key="contact.id"
                @click="selectedContactId = contact.id"
                :class="[
                  'w-full p-3 rounded-xl text-left text-sm transition-all duration-200',
                  selectedContactId === contact.id 
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                ]"
              >
                <div class="font-medium text-gray-900">{{ contact.name }}</div>
                <div class="text-xs text-gray-500">{{ contact.phone }}</div>
              </button>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>导游</span>
              <span>{{ selectedGuide.name }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>日期</span>
              <span>{{ selectedDate || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>时间段</span>
              <span>{{ selectedGuide.timeSlots.find(s => s.id === selectedTimeSlot)?.time || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-4">
              <span>参与人数</span>
              <span>{{ participants }} 人 × ¥{{ selectedGuide.price }}</span>
            </div>
            <div class="flex justify-between items-end">
              <span class="text-gray-700">合计</span>
              <span class="text-2xl font-bold text-primary-600">¥{{ totalPrice }}</span>
            </div>
          </div>
        </div>
        <div class="p-6 border-t flex gap-4">
          <button 
            @click="showBookingModal = false"
            class="flex-1 py-4 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="submitBooking"
            class="flex-1 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors"
          >
            确认预约
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showSuccessModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-md w-full overflow-hidden text-center"
        @click.stop
      >
        <div class="p-8">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check class="w-10 h-10 text-green-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">预约成功</h3>
          <p class="text-gray-500 mb-6">请于预约时间前往服务台核销</p>
          <div class="flex gap-4">
            <button 
              @click="showSuccessModal = false"
              class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
            >
              查看预约
            </button>
            <button 
              @click="goToHome()"
              class="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
