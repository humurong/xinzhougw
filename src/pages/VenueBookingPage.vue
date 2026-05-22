<script setup lang="ts">import { ref, computed } from 'vue';
import { Calendar, Users, Building, Check, Eye, Search, X } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockVenues, mockVenueBookings, mockContacts } from '@/data/mockData';
const router = useRouter();
const activeTab = ref<'venues' | 'orders'>('venues');
const bookingType = ref<'personal' | 'team'>('personal');
const selectedVenueId = ref('');
const selectedDate = ref('');
const selectedTimeSlot = ref('');
const selectedContactId = ref('');
const teamName = ref('');
const teamSize = ref(10);
const showBookingModal = ref(false);
const showOrderDetailModal = ref(false);
const showSuccessModal = ref(false);
const searchQuery = ref('');
const timeSlots = [
 { id: '1', time: '09:00-11:00', label: '上午场' },
 { id: '2', time: '14:00-16:00', label: '下午场' },
 { id: '3', time: '16:00-18:00', label: '傍晚场' },
];
const getAvailableDates = () => {
 const dates: string[] = [];
 const today = new Date();
 for (let i = 1; i < 15; i++) {
 const date = new Date(today);
 date.setDate(today.getDate() + i);
 dates.push(date.toISOString().split('T')[0]);
 }
 return dates;
};
const selectedVenue = computed(() => {
 return mockVenues.find(v => v.id === selectedVenueId.value);
});
const filteredOrders = computed(() => {
 if (!searchQuery.value)
 return mockVenueBookings;
 return mockVenueBookings.filter(order => order.orderNo.includes(searchQuery.value));
});
const getStatusText = (status: string) => {
 const map: Record<string, string> = {
 pending: '待确认',
 confirmed: '已确认',
 used: '已使用',
 cancelled: '已取消',
 };
 return map[status] || status;
};
const getStatusColor = (status: string) => {
 const map: Record<string, string> = {
 pending: 'bg-yellow-100 text-yellow-800',
 confirmed: 'bg-green-100 text-green-800',
 used: 'bg-gray-100 text-gray-600',
 cancelled: 'bg-red-100 text-red-800',
 };
 return map[status] || 'bg-gray-100 text-gray-600';
};
const openBookingModal = (venueId: string) => {
 selectedVenueId.value = venueId;
 selectedDate.value = '';
 selectedTimeSlot.value = '';
 selectedContactId.value = '';
 bookingType.value = 'personal';
 teamName.value = '';
 teamSize.value = 10;
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
 if (bookingType.value === 'team') {
 if (!teamName.value) {
 alert('请填写团队名称');
 return;
 }
 if (teamSize.value > (selectedVenue.value?.capacity || 100)) {
 alert(`团队人数不能超过场馆容量(${selectedVenue.value?.capacity}人)`);
 return;
 }
 }
 showBookingModal.value = false;
 showSuccessModal.value = true;
};
const goToHome = () => {
 router.push('/');
};
const cancelBooking = () => {
 alert('取消预约成功');
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
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">场馆预约</h1>
            <p class="text-sm text-gray-500">个人/团队博物馆场馆分时预约</p>
          </div>
        </div>

        <div class="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
          <button
            @click="activeTab = 'venues'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'venues' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            场馆列表
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

        <div v-if="activeTab === 'venues'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="venue in mockVenues"
            :key="venue.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div class="relative h-40 overflow-hidden">
              <img 
                :src="venue.image" 
                :alt="venue.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <div class="flex items-center gap-2 mb-1">
                  <Building class="w-5 h-5" />
                  <span class="text-lg font-bold">{{ venue.name }}</span>
                </div>
                <div class="flex items-center gap-1 text-sm">
                  <Users class="w-4 h-4" />
                  <span>容量: {{ venue.capacity }}人</span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ venue.description }}</p>
              <button 
                @click="openBookingModal(venue.id)"
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
                    <span class="text-sm text-gray-500">
                      {{ order.type === 'team' ? '团队预约' : '个人预约' }}
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
                    <div class="text-gray-500">场馆</div>
                    <div class="text-gray-900 font-medium">{{ order.venue.name }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">预约日期</div>
                    <div class="text-gray-900 font-medium">{{ order.date }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">时间段</div>
                    <div class="text-gray-900 font-medium">{{ order.timeSlot }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">联系人</div>
                    <div class="text-gray-900 font-medium">{{ order.contact.name }}</div>
                  </div>
                </div>
              </div>
              
              <div v-if="order.status === 'confirmed'" class="px-6 py-4 bg-green-50 border-t flex items-center justify-between">
                <div class="text-sm text-green-700 flex items-center gap-2">
                  <Check class="w-4 h-4" />
                  预约已确认，请准时前往
                </div>
                <button 
                  @click="cancelBooking"
                  class="px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  取消预约
                </button>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building class="w-12 h-12 text-gray-400" />
              </div>
              <p class="text-gray-500 mb-2">暂无预约记录</p>
              <button 
                @click="activeTab = 'venues'"
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
      v-if="showBookingModal && selectedVenue"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showBookingModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">预约 {{ selectedVenue.name }}</h3>
        </div>
        <div class="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">预约类型</label>
            <div class="flex gap-3">
              <button
                @click="bookingType = 'personal'"
                :class="[
                  'flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  bookingType === 'personal' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                个人预约
              </button>
              <button
                @click="bookingType = 'team'"
                :class="[
                  'flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  bookingType === 'team' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                团队预约
              </button>
            </div>
          </div>

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
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="slot in timeSlots"
                :key="slot.id"
                @click="selectedTimeSlot = slot.id"
                :class="[
                  'p-3 rounded-xl text-center text-sm transition-all duration-200',
                  selectedTimeSlot === slot.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                <div class="font-medium">{{ slot.label }}</div>
                <div :class="['text-xs', selectedTimeSlot === slot.id ? 'text-white/70' : 'text-gray-500']">
                  {{ slot.time }}
                </div>
              </button>
            </div>
          </div>

          <div v-if="bookingType === 'team'">
            <label class="block text-sm font-medium text-gray-700 mb-3">团队名称</label>
            <input 
              v-model="teamName"
              type="text"
              placeholder="请输入团队名称"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div v-if="bookingType === 'team'">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              团队人数 
              <span class="text-gray-400 font-normal">(最大{{ selectedVenue.capacity }}人)</span>
            </label>
            <input 
              v-model.number="teamSize"
              type="number"
              min="1"
              :max="selectedVenue.capacity"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
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
              <span>场馆</span>
              <span>{{ selectedVenue.name }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>预约类型</span>
              <span>{{ bookingType === 'personal' ? '个人预约' : '团队预约' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>日期</span>
              <span>{{ selectedDate || '未选择' }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>时间段</span>
              <span>{{ timeSlots.find(s => s.id === selectedTimeSlot)?.time || '未选择' }}</span>
            </div>
            <div v-if="bookingType === 'team'" class="flex justify-between text-sm text-gray-600 mb-2">
              <span>团队名称</span>
              <span>{{ teamName || '未填写' }}</span>
            </div>
            <div v-if="bookingType === 'team'" class="flex justify-between text-sm text-gray-600 mb-2">
              <span>团队人数</span>
              <span>{{ teamSize }} 人</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>联系人</span>
              <span>{{ mockContacts.find(c => c.id === selectedContactId)?.name || '未选择' }}</span>
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
            提交预约
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
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                :src="mockVenueBookings[0].venue.image" 
                :alt="mockVenueBookings[0].venue.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ mockVenueBookings[0].venue.name }}</h4>
              <p class="text-sm text-gray-500">{{ mockVenueBookings[0].venue.description }}</p>
            </div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">订单号</span>
              <span class="text-gray-700 font-mono">{{ mockVenueBookings[0].orderNo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预约类型</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].type === 'team' ? '团队预约' : '个人预约' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预约日期</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].date }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">时间段</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].timeSlot }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">联系人</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].contact.name }}</span>
            </div>
            <div v-if="mockVenueBookings[0].teamName" class="flex justify-between">
              <span class="text-gray-500">团队名称</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].teamName }}</span>
            </div>
            <div v-if="mockVenueBookings[0].teamSize" class="flex justify-between">
              <span class="text-gray-500">团队人数</span>
              <span class="text-gray-700">{{ mockVenueBookings[0].teamSize }} 人</span>
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
          <p class="text-gray-500 mb-6">我们会尽快确认您的预约，请保持电话畅通</p>
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
