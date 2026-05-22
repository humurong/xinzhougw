<script setup lang="ts">import { ref, computed } from 'vue';
import { Calendar, Clock, Users, Plus, X, FileText, Check, Search, Eye } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockContacts, mockTimeSlots, mockTicketOrders, type Contact, type TicketOrder } from '@/data/mockData';
const router = useRouter();
const activeTab = ref<'booking' | 'orders'>('booking');
const selectedDate = ref('2024-01-20');
const selectedTimeSlot = ref('');
const selectedTicketType = ref('adult');
const quantity = ref(1);
const showContactsModal = ref(false);
const showAddContactModal = ref(false);
const showOrderDetailModal = ref(false);
const showSuccessModal = ref(false);
const searchOrderNo = ref('');
const newContact = ref<Contact>({ id: '', name: '', idCard: '', phone: '' });
const selectedContacts = ref<Contact[]>([]);
const ticketTypes = [
 { id: 'adult', name: '成人票', price: 60, desc: '适用于18-64周岁' },
 { id: 'student', name: '学生票', price: 30, desc: '凭学生证入园' },
 { id: 'child', name: '儿童票', price: 0, desc: '6周岁以下免费' },
 { id: 'elder', name: '老人票', price: 30, desc: '65周岁以上优惠' },
];
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
const filteredOrders = computed(() => {
 if (!searchOrderNo.value)
 return mockTicketOrders;
 return mockTicketOrders.filter(order => order.orderNo.includes(searchOrderNo.value));
});
const totalPrice = computed(() => {
 const ticket = ticketTypes.find(t => t.id === selectedTicketType.value);
 return ticket ? ticket.price * quantity.value * selectedContacts.value.length : 0;
});
const getStatusText = (status: TicketOrder['status']) => {
 const map: Record<string, string> = {
 pending: '待支付',
 paid: '已支付',
 used: '已使用',
 refunded: '已退款',
 };
 return map[status] || status;
};
const getStatusColor = (status: TicketOrder['status']) => {
 const map: Record<string, string> = {
 pending: 'bg-yellow-100 text-yellow-800',
 paid: 'bg-green-100 text-green-800',
 used: 'bg-gray-100 text-gray-600',
 refunded: 'bg-red-100 text-red-800',
 };
 return map[status] || 'bg-gray-100 text-gray-600';
};
const addContact = () => {
 if (!newContact.value.name || !newContact.value.idCard || !newContact.value.phone) {
 alert('请填写完整信息');
 return;
 }
 newContact.value.id = Date.now().toString();
 mockContacts.push({ ...newContact.value });
 newContact.value = { id: '', name: '', idCard: '', phone: '' };
 showAddContactModal.value = false;
};
const toggleContactSelection = (contact: Contact) => {
 const index = selectedContacts.value.findIndex(c => c.id === contact.id);
 if (index > -1) {
 selectedContacts.value.splice(index, 1);
 }
 else {
 selectedContacts.value.push(contact);
 }
};
const addNewContactFromSelection = () => {
 showContactsModal.value = false;
};
const submitBooking = () => {
 if (selectedContacts.value.length === 0) {
 alert('请选择游客');
 return;
 }
 if (!selectedTimeSlot.value) {
 alert('请选择时间段');
 return;
 }
 if (selectedContacts.value.length !== quantity.value) {
 alert('游客人数与票量不一致');
 return;
 }
 showSuccessModal.value = true;
};
const viewOrderDetail = (order: TicketOrder) => {
 showOrderDetailModal.value = true;
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
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">门票预约</h1>
            <p class="text-sm text-gray-500">实名制分时预约，轻松便捷</p>
          </div>
        </div>

        <div class="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
          <button
            @click="activeTab = 'booking'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'booking' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            预约门票
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'orders' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            订单查询
          </button>
        </div>

        <div v-if="activeTab === 'booking'" class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar class="w-5 h-5 text-primary-500" />
                选择日期
              </h3>
              <div class="grid grid-cols-5 md:grid-cols-7 gap-3">
                <button
                  v-for="date in getAvailableDates()"
                  :key="date"
                  @click="selectedDate = date"
                  :class="[
                    'p-3 rounded-xl text-center transition-all duration-200',
                    selectedDate === date 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  ]"
                >
                  <div class="text-sm">{{ date.slice(5) }}</div>
                  <div class="text-xs opacity-70">
                    {{ ['日','一','二','三','四','五','六'][new Date(date).getDay()] }}
                  </div>
                </button>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock class="w-5 h-5 text-primary-500" />
                选择时间段
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  v-for="slot in mockTimeSlots"
                  :key="slot.id"
                  @click="selectedTimeSlot = slot.id"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    selectedTimeSlot === slot.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-100 hover:border-gray-200'
                  ]"
                >
                  <div class="font-medium text-gray-900 mb-1">{{ slot.time }}</div>
                  <div class="flex items-center gap-4 text-xs text-gray-500">
                    <span>承载量: {{ slot.capacity }}</span>
                    <span>已约: {{ slot.booked }}</span>
                    <span :class="slot.remaining < 30 ? 'text-red-500' : 'text-green-500'">
                      剩余: {{ slot.remaining }}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users class="w-5 h-5 text-primary-500" />
                选择游客
                <span class="text-sm font-normal text-gray-500">
                  (已选择 {{ selectedContacts.length }} 人)
                </span>
              </h3>
              
              <div v-if="selectedContacts.length === 0" class="text-center py-8">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users class="w-8 h-8 text-gray-400" />
                </div>
                <p class="text-gray-500 mb-4">暂无已选游客</p>
              </div>
              
              <div v-else class="space-y-3 mb-4">
                <div 
                  v-for="contact in selectedContacts" 
                  :key="contact.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div class="font-medium text-gray-900">{{ contact.name }}</div>
                    <div class="text-sm text-gray-500">{{ contact.idCard }}</div>
                  </div>
                  <button 
                    @click="toggleContactSelection(contact)"
                    class="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                @click="showContactsModal = true"
                class="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus class="w-5 h-5" />
                添加游客
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">选择票种</h3>
              <div class="space-y-3">
                <button
                  v-for="ticket in ticketTypes"
                  :key="ticket.id"
                  @click="selectedTicketType = ticket.id"
                  :class="[
                    'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    selectedTicketType === ticket.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-100 hover:border-gray-200'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-900">{{ ticket.name }}</span>
                    <span class="text-primary-600 font-bold">
                      {{ ticket.price === 0 ? '免费' : `¥${ticket.price}` }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ ticket.desc }}</div>
                </button>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">数量</h3>
              <div class="flex items-center gap-4">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
                >
                  -
                </button>
                <span class="text-2xl font-bold text-gray-900 w-12 text-center">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
              <div class="flex justify-between text-gray-600 mb-2">
                <span>票种</span>
                <span>{{ ticketTypes.find(t => t.id === selectedTicketType)?.name }} × {{ quantity }} × {{ selectedContacts.length }}</span>
              </div>
              <div class="flex justify-between text-gray-600 mb-2">
                <span>参观日期</span>
                <span>{{ selectedDate }}</span>
              </div>
              <div class="flex justify-between text-gray-600 mb-4">
                <span>时间段</span>
                <span>{{ mockTimeSlots.find(s => s.id === selectedTimeSlot)?.time || '未选择' }}</span>
              </div>
              <div class="border-t border-primary-200 pt-4 flex justify-between items-end">
                <span class="text-gray-700">合计</span>
                <span class="text-3xl font-bold text-primary-600">¥{{ totalPrice }}</span>
              </div>
              <button 
                @click="submitBooking"
                class="w-full mt-6 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors shadow-lg"
              >
                确认预约
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="bg-white rounded-2xl shadow-sm p-4 flex gap-4">
            <Search class="w-5 h-5 text-gray-400 mt-2" />
            <input 
              v-model="searchOrderNo"
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
                    @click="viewOrderDetail(order)"
                    class="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Eye class="w-4 h-4" />
                    详情
                  </button>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div class="text-gray-500">票种</div>
                    <div class="text-gray-900 font-medium">{{ order.ticketType }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">数量</div>
                    <div class="text-gray-900 font-medium">{{ order.quantity }} 张</div>
                  </div>
                  <div>
                    <div class="text-gray-500">日期</div>
                    <div class="text-gray-900 font-medium">{{ order.visitDate }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500">金额</div>
                    <div class="text-gray-900 font-medium">¥{{ order.price * order.quantity }}</div>
                  </div>
                </div>
              </div>
              
              <div v-if="order.status === 'paid'" class="px-6 py-4 bg-gray-50 border-t">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-500">
                    <FileText class="w-4 h-4 inline mr-2" />
                    凭二维码入园
                  </div>
                  <div class="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                    <div class="text-center text-xs font-mono text-gray-700">{{ order.qrCode?.slice(-8) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText class="w-12 h-12 text-gray-400" />
              </div>
              <p class="text-gray-500 mb-2">暂无订单记录</p>
              <button 
                @click="activeTab = 'booking'"
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
      v-if="showContactsModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showContactsModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">选择游客</h3>
          <button 
            @click="showContactsModal = false"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="grid gap-4">
            <button
              v-for="contact in mockContacts"
              :key="contact.id"
              @click="toggleContactSelection(contact)"
              :class="[
                'p-4 rounded-xl border-2 transition-all duration-200 text-left',
                selectedContacts.some(c => c.id === contact.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-100 hover:border-gray-200'
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-gray-900">{{ contact.name }}</div>
                  <div class="text-sm text-gray-500">{{ contact.idCard }} · {{ contact.phone }}</div>
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
              </div>
            </button>
          </div>
        </div>
        <div class="p-6 border-t flex gap-4">
          <button 
            @click="showAddContactModal = true"
            class="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:border-gray-300 transition-colors"
          >
            添加新联系人
          </button>
          <button 
            @click="addNewContactFromSelection"
            class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
          >
            确认选择 ({{ selectedContacts.length }})
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showAddContactModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showAddContactModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-md w-full"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">添加新联系人</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input 
              v-model="newContact.name"
              type="text"
              placeholder="请输入姓名"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
            <input 
              v-model="newContact.idCard"
              type="text"
              placeholder="请输入身份证号"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <input 
              v-model="newContact.phone"
              type="tel"
              placeholder="请输入手机号"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div class="p-6 border-t flex gap-4">
          <button 
            @click="showAddContactModal = false"
            class="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="addContact"
            class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
          >
            确认添加
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
          <h3 class="text-xl font-bold text-gray-900">订单详情</h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="bg-gray-50 rounded-xl p-4 text-center">
            <div class="text-6xl font-bold text-primary-600 mb-2">{{ mockTicketOrders[0].qrCode?.slice(-8) }}</div>
            <div class="text-sm text-gray-500">电子门票二维码</div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">订单号</span>
              <span class="text-gray-700 font-mono">{{ mockTicketOrders[0].orderNo }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">票种</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].ticketType }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">数量</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].quantity }} 张</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">金额</span>
              <span class="text-gray-700">¥{{ mockTicketOrders[0].price * mockTicketOrders[0].quantity }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">参观日期</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].visitDate }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">时间段</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].timeSlot }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">游客</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].contacts.map(c => c.name).join(', ') }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">下单时间</span>
              <span class="text-gray-700">{{ mockTicketOrders[0].createTime }}</span>
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
          <p class="text-gray-500 mb-6">您的订单已提交，请在订单列表中查看</p>
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <div class="text-sm text-gray-500 mb-1">订单号</div>
            <div class="text-lg font-mono text-gray-900">TCK{{ Date.now().toString().slice(-9) }}</div>
          </div>
          <div class="flex gap-4">
            <button 
              @click="activeTab = 'orders'; showSuccessModal = false"
              class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
            >
              查看订单
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
