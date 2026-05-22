<script setup lang="ts">import { ref, computed } from 'vue';
import { Clock, Users, Star, Calendar, Check, Eye, Search } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockGuideServices, mockGuideOrders, mockContacts } from '@/data/mockData';
const router = useRouter();
const activeTab = ref<'services' | 'orders'>('services');
const selectedServiceId = ref('');
const selectedDate = ref('');
const selectedTimeSlot = ref('');
const selectedContactId = ref('');
const showBookingModal = ref(false);
const showOrderDetailModal = ref(false);
const showSuccessModal = ref(false);
const searchQuery = ref('');
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
const selectedService = computed(() => {
 return mockGuideServices.find(s => s.id === selectedServiceId.value);
});
const filteredOrders = computed(() => {
 if (!searchQuery.value)
 return mockGuideOrders;
 return mockGuideOrders.filter(order => order.orderNo.includes(searchQuery.value));
});
const getStatusText = (status: string) => {
 const map: Record<string, string> = {
 pending: '待支付',
 paid: '已支付',
 used: '已使用',
 cancelled: '已取消',
 };
 return map[status] || status;
};
const getStatusColor = (status: string) => {
 const map: Record<string, string> = {
 pending: 'bg-yellow-100 text-yellow-800',
 paid: 'bg-green-100 text-green-800',
 used: 'bg-gray-100 text-gray-600',
 cancelled: 'bg-red-100 text-red-800',
 };
 return map[status] || 'bg-gray-100 text-gray-600';
};
const openBookingModal = (serviceId: string) => {
 selectedServiceId.value = serviceId;
 selectedDate.value = '';
 selectedTimeSlot.value = '';
 selectedContactId.value = '';
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
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">讲解服务</h1>
            <p class="text-sm text-gray-500">专业讲解员，深度解读历史</p>
          </div>
        </div>

        <div class="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
          <button
            @click="activeTab = 'services'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'services' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            服务列表
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'orders' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            我的预约
          </button>
        </div>

        <div v-if="activeTab === 'services'" class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="service in mockGuideServices"
            :key="service.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ service.name }}</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      {{ service.duration }}
                    </span>
                    <span class="flex items-center gap-1">
                      <Users class="w-4 h-4" />
                      讲解员: {{ service.guideName }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold text-primary-600">¥{{ service.price }}</span>
                  <span class="text-sm text-gray-500 block">/次</span>
                </div>
              </div>
              
              <p class="text-gray-600 mb-6">{{ service.description }}</p>

              <div class="flex items-center gap-1 mb-4">
                <Star v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span class="text-sm text-gray-500 ml-2">4.9分 · 128条评价</span>
              </div>

              <button 
                @click="openBookingModal(service.id)"
                class="w-full py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors shadow-lg"
              >
                立即预约
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="bg-white rounded-2xl shadow-sm p-4 flex gap-4">
            <Search class="w-5 h-5 text-gray-400 mt-2" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="输入订单号搜索"
              class="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div class="space-y-4">
            <div 
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <span class="font-mono text-gray-600">{{ order.orderNo }}</span>
                    <span :class="['px-3 py-1 text-sm rounded-full', getStatusColor(order.status)]">
                      {{ getStatusText(order.status) }}
                    </span>
                  </div>
                  <button 
                    @click="showOrderDetailModal = true"
                    class="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Eye class="w-4 h-4" />
                    详情
                  </button>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div class="text-gray-500">服务名称</div>
                    <div class="text-gray-900 font-medium">{{ order.service.name }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">讲解员</div>
                    <div class="text-gray-900 font-medium">{{ order.service.guideName }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">预约日期</div>
                    <div class="text-gray-900 font-medium">{{ order.date }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">金额</div>
                    <div class="text-gray-900 font-medium">¥{{ order.service.price }}</div>
                  </div>
                </div>
              </div>
              
              <div v-if="order.status === 'paid'" class="px-6 py-4 bg-green-50 border-t">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-green-700 flex items-center gap-2">
                    <Check class="w-4 h-4" />
                    请于预约时间前往服务台核销
                  </div>
                  <div class="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                    <div class="text-center text-xs font-mono text-green-700">{{ order.orderNo.slice(-8) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar class="w-12 h-12 text-gray-400" />
              </div>
              <p class="text-gray-500 mb-2">暂无预约记录</p>
              <button 
                @click="activeTab = 'services'"
                class="text-primary-600 hover:text-primary-700"
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
      v-if="showBookingModal && selectedService"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showBookingModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">预约 {{ selectedService.name }}</h3>
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
                v-for="slot in selectedService.timeSlots"
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
            <label class="block text-sm font-medium text-gray-700 mb-3">选择联系人</label>
            <div class="space-y-2">
              <button
                v-for="contact in mockContacts"
                :key="contact.id"
                @click="selectedContactId = contact.id"
                :class="[
                  'w-full p-3 rounded-xl text-left text-sm transition-all duration-200',
                  selectedContactId === contact.id 
                    ? 'border-2 border-primary-600 bg-primary-50' 
                    : 'border-2 border-transparent bg-gray-50 hover:bg-gray-100'
                ]"
              >
                <div class="font-medium text-gray-900">{{ contact.name }}</div>
                <div class="text-xs text-gray-500">{{ contact.phone }} · {{ contact.idCard }}</div>
              </button>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>服务名称</span>
              <span>{{ selectedService.name }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>日期</span>
              <span>{{ selectedDate || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>时间段</span>
              <span>{{ selectedService.timeSlots.find(s => s.id === selectedTimeSlot)?.time || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-4">
              <span>联系人</span>
              <span>{{ mockContacts.find(c => c.id === selectedContactId)?.name || '未选择' }}</span>
            </div>
            <div class="flex justify-between items-end">
              <span class="text-gray-700">合计</span>
              <span class="text-2xl font-bold text-primary-600">¥{{ selectedService.price }}</span>
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
      v-if="showOrderDetailModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showOrderDetailModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-md w-full overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">预约详情</h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="bg-green-50 rounded-xl p-4 text-center">
            <div class="text-6xl font-bold text-green-600 mb-2">{{ mockGuideOrders[0].orderNo.slice(-8) }}</div>
            <div class="text-sm text-green-700">核销二维码</div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">订单号</span>
              <span class="text-gray-700 font-mono">{{ mockGuideOrders[0].orderNo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">服务名称</span>
              <span class="text-gray-700">{{ mockGuideOrders[0].service.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">讲解员</span>
              <span class="text-gray-700">{{ mockGuideOrders[0].service.guideName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预约日期</span>
              <span class="text-gray-700">{{ mockGuideOrders[0].date }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">时间段</span>
              <span class="text-gray-700">{{ mockGuideOrders[0].timeSlot }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">联系人</span>
              <span class="text-gray-700">{{ mockGuideOrders[0].contact.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">金额</span>
              <span class="text-gray-700">¥{{ mockGuideOrders[0].service.price }}</span>
            </div>
          </div>
        </div>
        <div class="p-6 border-t">
          <button 
            @click="showOrderDetailModal = false"
            class="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
          >
            关闭
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
              @click="activeTab = 'orders'; showSuccessModal = false"
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
