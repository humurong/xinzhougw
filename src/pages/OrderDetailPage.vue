<script setup lang="ts">import { computed, ref } from 'vue';
import { Ticket, MapPin, Clock, Users, CreditCard, CheckCircle, ChevronRight, QrCode, Phone, Mail, Calendar } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockTicketOrders, mockGiftOrders, mockGuideOrders, mockHeritageOrders, mockVenueBookings } from '@/data/mockData';
const route = useRoute();
const router = useRouter();
const showQRCodeModal = ref(false);
const type = route.params.type as string;
const id = route.params.id as string;
const orderData = computed(() => {
 const orders: Record<string, any[]> = {
 ticket: mockTicketOrders,
 gift: mockGiftOrders,
 guide: mockGuideOrders,
 heritage: mockHeritageOrders,
 venue: mockVenueBookings,
 };
 return orders[type]?.find((o: any) => o.id === id) || orders[type]?.[0] || null;
});
const getStatusText = (status: string) => {
 const statusMap: Record<string, string> = {
 pending: '待支付',
 paid: '已支付',
 used: '已使用',
 refunded: '已退款',
 shipped: '已发货',
 delivered: '已送达',
 completed: '已完成',
 confirmed: '已确认',
 cancelled: '已取消',
 };
 return statusMap[status] || status;
};
const getStatusColor = (status: string) => {
 const colorMap: Record<string, string> = {
 pending: 'text-yellow-600 bg-yellow-100',
 paid: 'text-blue-600 bg-blue-100',
 used: 'text-green-600 bg-green-100',
 refunded: 'text-gray-600 bg-gray-100',
 shipped: 'text-orange-600 bg-orange-100',
 delivered: 'text-cyan-600 bg-cyan-100',
 completed: 'text-green-600 bg-green-100',
 confirmed: 'text-blue-600 bg-blue-100',
 cancelled: 'text-red-600 bg-red-100',
 };
 return colorMap[status] || 'text-gray-600 bg-gray-100';
};
const handleBack = () => {
 router.back();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main>
      <section class="bg-white border-b border-gray-100">
        <div class="container mx-auto px-4 py-4">
          <button 
            @click="handleBack"
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronRight class="w-5 h-5 rotate-180" />
            返回
          </button>
        </div>
      </section>

      <section class="py-8" v-if="orderData">
        <div class="container mx-auto px-4">
          <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl font-bold font-display">订单详情</h1>
                <p class="text-white/70 mt-1">订单号：{{ orderData.orderNo }}</p>
              </div>
              <span :class="['px-4 py-2 rounded-full text-sm font-medium', getStatusColor(orderData.status)]"
                style="color: inherit; background-color: rgba(255,255,255,0.2);">
                {{ getStatusText(orderData.status) }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ticket class="w-5 h-5 text-primary-500" />
              商品信息
            </h3>
            <div class="flex gap-4">
              <div class="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  v-if="orderData.product?.image || orderData.service?.image || orderData.activity?.image || orderData.venue?.image"
                  :src="orderData.product?.image || orderData.service?.image || orderData.activity?.image || orderData.venue?.image"
                  alt="商品图片"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Ticket class="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-900 text-lg">{{ 
                  orderData.ticketType || 
                  orderData.product?.name || 
                  orderData.service?.name || 
                  orderData.activity?.name || 
                  orderData.venue?.name ||
                  '未知商品'
                }}</h4>
                <p class="text-gray-500 text-sm mt-1">{{ 
                  orderData.service?.description || 
                  orderData.activity?.description || 
                  orderData.venue?.description ||
                  ''
                }}</p>
                <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span v-if="orderData.price">
                    ¥{{ orderData.price }}
                  </span>
                  <span v-if="orderData.quantity || orderData.participants">
                    x{{ orderData.quantity || orderData.participants || 1 }}
                  </span>
                  <span v-if="orderData.duration" class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ orderData.duration }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar class="w-5 h-5 text-primary-500" />
              预约信息
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="orderData.visitDate || orderData.date" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Calendar class="w-4 h-4" />
                  预约日期
                </div>
                <div class="font-medium text-gray-900">{{ orderData.visitDate || orderData.date }}</div>
              </div>
              <div v-if="orderData.timeSlot" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Clock class="w-4 h-4" />
                  预约时段
                </div>
                <div class="font-medium text-gray-900">{{ orderData.timeSlot }}</div>
              </div>
              <div v-if="orderData.location || orderData.venue?.name" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <MapPin class="w-4 h-4" />
                  场馆/地点
                </div>
                <div class="font-medium text-gray-900">{{ orderData.location || orderData.venue?.name }}</div>
              </div>
              <div v-if="orderData.type" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Users class="w-4 h-4" />
                  预约类型
                </div>
                <div class="font-medium text-gray-900">{{ orderData.type === 'team' ? '团队预约' : '个人预约' }}</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users class="w-5 h-5 text-primary-500" />
              联系人信息
            </h3>
            <div class="space-y-3">
              <div v-if="orderData.contact" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-gray-900">{{ orderData.contact.name }}</div>
                    <div class="text-sm text-gray-500 mt-1">{{ orderData.contact.phone }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-400">身份证号</div>
                    <div class="text-sm text-gray-600">{{ orderData.contact.idCard }}</div>
                  </div>
                </div>
              </div>
              <div v-else-if="orderData.contacts?.length" class="space-y-3">
                <div 
                  v-for="(contact, index) in orderData.contacts" 
                  :key="index"
                  class="p-4 bg-gray-50 rounded-xl"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-900">{{ contact.name }}</div>
                      <div class="text-sm text-gray-500 mt-1">{{ contact.phone }}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-xs text-gray-400">身份证号</div>
                      <div class="text-sm text-gray-600">{{ contact.idCard }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="orderData.receiver" class="p-4 bg-gray-50 rounded-xl">
                <div class="font-medium text-gray-900">{{ orderData.receiver.name }}</div>
                <div class="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <Phone class="w-4 h-4" />
                  {{ orderData.receiver.phone }}
                </div>
                <div class="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <MapPin class="w-4 h-4" />
                  {{ orderData.receiver.address }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard class="w-5 h-5 text-primary-500" />
              支付信息
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span class="text-gray-600">商品金额</span>
                <span class="font-medium">¥{{ orderData.totalPrice || (orderData.price * (orderData.quantity || orderData.participants || 1)) }}</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span class="text-gray-600">实付金额</span>
                <span class="font-bold text-primary-600 text-xl">¥{{ orderData.totalPrice || (orderData.price * (orderData.quantity || orderData.participants || 1)) }}</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span class="text-gray-600">下单时间</span>
                <span class="text-gray-900">{{ orderData.createTime }}</span>
              </div>
              <div v-if="orderData.logisticsNo" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">物流单号</span>
                  <span class="font-mono text-gray-900">{{ orderData.logisticsNo }}</span>
                </div>
                <button class="mt-2 text-sm text-primary-600 hover:text-primary-500">
                  查看物流
                </button>
              </div>
            </div>
          </div>

          <div v-if="orderData.qrCode || orderData.status === 'paid'" class="bg-white rounded-2xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-gray-900 flex items-center gap-2">
                <QrCode class="w-5 h-5 text-primary-500" />
                电子凭证
              </h3>
              <button 
                @click="showQRCodeModal = true"
                class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors text-sm flex items-center gap-2"
              >
                <QrCode class="w-4 h-4" />
                查看二维码
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              {{ orderData.status === 'paid' ? '凭此二维码到馆验证入园' : '支付完成后即可生成电子凭证' }}
            </p>
          </div>

          <div class="flex gap-4 mt-8">
            <button 
              v-if="orderData.status === 'pending'"
              class="flex-1 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors font-medium"
            >
              立即支付
            </button>
            <button 
              v-if="orderData.status === 'pending' || orderData.status === 'confirmed' || orderData.status === 'paid'"
              class="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              取消订单
            </button>
            <button 
              v-if="orderData.status === 'paid' || orderData.status === 'used'"
              class="flex-1 py-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <CheckCircle class="w-5 h-5" />
              再次购买/预约
            </button>
          </div>
        </div>
      </section>

      <div v-else class="py-16 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ticket class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">订单不存在</h3>
        <p class="text-gray-500 mb-6">未找到该订单信息</p>
        <button 
          @click="router.back()"
          class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
        >
          返回上一页
        </button>
      </div>
    </main>
    
    <Footer />

    <div 
      v-if="showQRCodeModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showQRCodeModal = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center" @click.stop>
        <div class="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <QrCode class="w-32 h-32 text-gray-600" />
        </div>
        <div class="bg-gray-50 rounded-xl p-4 mb-6">
          <div class="text-sm text-gray-500 mb-1">凭证编号</div>
          <div class="font-mono font-bold text-xl text-gray-900">{{ orderData?.qrCode || orderData?.orderNo }}</div>
        </div>
        <p class="text-sm text-gray-500 mb-6">
          请在入场时向工作人员出示此二维码进行验证
        </p>
        <button 
          @click="showQRCodeModal = false"
          class="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>