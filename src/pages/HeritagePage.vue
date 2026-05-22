<script setup lang="ts">import { ref, computed } from 'vue';
import { Clock, Users, Star, Calendar, Check, Eye, Search, Plus, X } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockHeritageActivities, mockHeritageOrders, mockContacts, type Contact } from '@/data/mockData';
const router = useRouter();
const activeTab = ref<'activities' | 'orders'>('activities');
const selectedActivityId = ref('');
const selectedDate = ref('');
const selectedTimeSlot = ref('');
const selectedContacts = ref<Contact[]>([]);
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
const selectedActivity = computed(() => {
 return mockHeritageActivities.find(a => a.id === selectedActivityId.value);
});
const filteredOrders = computed(() => {
 if (!searchQuery.value)
 return mockHeritageOrders;
 return mockHeritageOrders.filter(order => order.orderNo.includes(searchQuery.value));
});
const totalPrice = computed(() => {
 if (!selectedActivity.value)
 return 0;
 return selectedActivity.value.price * selectedContacts.value.length;
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
const toggleContactSelection = (contact: Contact) => {
 const index = selectedContacts.value.findIndex(c => c.id === contact.id);
 if (index > -1) {
 selectedContacts.value.splice(index, 1);
 }
 else {
 if (selectedContacts.value.length >= (selectedActivity.value?.participants || 10)) {
 alert(`最多选择${selectedActivity.value?.participants}人`);
 return;
 }
 selectedContacts.value.push(contact);
 }
};
const openBookingModal = (activityId: string) => {
 selectedActivityId.value = activityId;
 selectedDate.value = '';
 selectedTimeSlot.value = '';
 selectedContacts.value = [];
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
 if (selectedContacts.value.length === 0) {
 alert('请选择参与人员');
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
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">非遗体验</h1>
            <p class="text-sm text-gray-500">传统手工艺，亲身感受非遗魅力</p>
          </div>
        </div>

        <div class="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
          <button
            @click="activeTab = 'activities'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'activities' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            体验项目
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

        <div v-if="activeTab === 'activities'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="activity in mockHeritageActivities"
            :key="activity.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div class="relative h-40 overflow-hidden">
              <img 
                :src="`https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20traditional%20craft%20${encodeURIComponent(activity.name)}%20workshop&image_size=square`" 
                :alt="activity.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <span class="text-2xl font-bold">¥{{ activity.price }}</span>
                <span class="text-sm ml-1">/人</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ activity.name }}</h3>
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ activity.description }}</p>
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  {{ activity.duration }}
                </span>
                <span class="flex items-center gap-1">
                  <Users class="w-4 h-4" />
                  限{{ activity.participants }}人
                </span>
              </div>
              <div class="flex items-center gap-1 mb-4">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span class="text-xs text-gray-500 ml-1">4.8分</span>
              </div>
              <button 
                @click="openBookingModal(activity.id)"
                class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors"
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
                    <div class="text-gray-500">项目名称</div>
                    <div class="text-gray-900 font-medium">{{ order.activity.name }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">参与人数</div>
                    <div class="text-gray-900 font-medium">{{ order.participants }} 人</div>
                  </div>
                  <div>
                    <div class="text-gray-500">预约日期</div>
                    <div class="text-gray-900 font-medium">{{ order.date }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">金额</div>
                    <div class="text-gray-900 font-medium">¥{{ order.totalPrice }}</div>
                  </div>
                </div>
              </div>
              
              <div v-if="order.status === 'paid'" class="px-6 py-4 bg-green-50 border-t">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-green-700 flex items-center gap-2">
                    <Check class="w-4 h-4" />
                    请于预约时间前往体验区核销
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
                @click="activeTab = 'activities'"
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
      v-if="showBookingModal && selectedActivity"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showBookingModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">预约 {{ selectedActivity.name }}</h3>
        </div>
        <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
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
                v-for="slot in selectedActivity.timeSlots"
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
            <label class="block text-sm font-medium text-gray-700 mb-3">
              选择参与人员 
              <span class="text-gray-400 font-normal">(已选 {{ selectedContacts.length }}/{{ selectedActivity.participants }}人)</span>
            </label>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <button
                v-for="contact in mockContacts"
                :key="contact.id"
                @click="toggleContactSelection(contact)"
                :class="[
                  'w-full p-3 rounded-xl text-left text-sm transition-all duration-200 flex items-center justify-between',
                  selectedContacts.some(c => c.id === contact.id)
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                ]"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ contact.name }}</div>
                  <div class="text-xs text-gray-500">{{ contact.phone }}</div>
                </div>
                <div 
                  :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                    selectedContacts.some(c => c.id === contact.id)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300'
                  ]"
                >
                  <Check v-if="selectedContacts.some(c => c.id === contact.id)" class="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>项目名称</span>
              <span>{{ selectedActivity.name }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>日期</span>
              <span>{{ selectedDate || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>时间段</span>
              <span>{{ selectedActivity.timeSlots.find(s => s.id === selectedTimeSlot)?.time || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>参与人数</span>
              <span>{{ selectedContacts.length }} 人 × ¥{{ selectedActivity.price }}</span>
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
            <div class="text-6xl font-bold text-green-600 mb-2">{{ mockHeritageOrders[0].orderNo.slice(-8) }}</div>
            <div class="text-sm text-green-700">核销二维码</div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">订单号</span>
              <span class="text-gray-700 font-mono">{{ mockHeritageOrders[0].orderNo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">项目名称</span>
              <span class="text-gray-700">{{ mockHeritageOrders[0].activity.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">参与人数</span>
              <span class="text-gray-700">{{ mockHeritageOrders[0].participants }} 人</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预约日期</span>
              <span class="text-gray-700">{{ mockHeritageOrders[0].date }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">时间段</span>
              <span class="text-gray-700">{{ mockHeritageOrders[0].timeSlot }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">参与人员</span>
              <span class="text-gray-700">{{ mockHeritageOrders[0].contacts.map(c => c.name).join(', ') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">金额</span>
              <span class="text-gray-700">¥{{ mockHeritageOrders[0].totalPrice }}</span>
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
          <p class="text-gray-500 mb-6">请于预约时间前往体验区核销</p>
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
