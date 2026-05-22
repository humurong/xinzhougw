<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, MapPin, Clock, Ticket, Users, Star, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockExhibitions, mockTimeSlots, mockContacts, type Exhibition, type TimeSlot, type Contact } from '@/data/mockData'

const router = useRouter()
const activeTab = ref<'list' | 'booking'>('list')
const selectedExhibition = ref<Exhibition | null>(null)
const selectedDate = ref('')
const selectedTimeSlot = ref<TimeSlot | null>(null)
const selectedContact = ref<Contact | null>(null)
const showSuccessModal = ref(false)
const bookingQuantity = ref(1)

const filteredExhibitions = computed(() => mockExhibitions)

const handleSelectExhibition = (exhibition: Exhibition) => {
  selectedExhibition.value = exhibition
  activeTab.value = 'booking'
  selectedDate.value = exhibition.availableDates[0] || ''
}

const handleBooking = () => {
  if (!selectedExhibition.value || !selectedDate.value || !selectedTimeSlot.value || !selectedContact.value) {
    alert('请填写完整预约信息')
    return
  }
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  activeTab.value = 'list'
  selectedExhibition.value = null
  selectedTimeSlot.value = null
  selectedContact.value = null
  bookingQuantity.value = 1
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    used: '已使用',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main>
      <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calendar class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold font-display">展览活动</h1>
              <p class="text-primary-100 mt-1">探索精彩展览，领略长城文化</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex gap-4 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
            <button
              @click="activeTab = 'list'; selectedExhibition = null"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'list' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              展览列表
            </button>
            <button
              @click="activeTab = 'booking'"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'booking' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              预约记录
            </button>
          </div>

          <div v-if="activeTab === 'list'" class="space-y-6">
            <div 
              v-for="exhibition in filteredExhibitions" 
              :key="exhibition.id"
              class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div class="flex flex-col md:flex-row">
                <div class="md:w-2/5 relative overflow-hidden">
                  <img 
                    :src="exhibition.image" 
                    :alt="exhibition.name"
                    class="w-full h-48 md:h-full object-cover"
                  />
                  <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">进行中</span>
                  </div>
                </div>
                <div class="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2 font-display">{{ exhibition.name }}</h3>
                    <p class="text-gray-600 mb-4">{{ exhibition.description }}</p>
                    <div class="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-2">
                        <Calendar class="w-4 h-4 text-primary-500" />
                        <span>{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <MapPin class="w-4 h-4 text-primary-500" />
                        <span>{{ exhibition.location }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Ticket class="w-4 h-4 text-primary-500" />
                        <span>票价: ¥{{ exhibition.price }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Star class="w-4 h-4 text-yellow-500" />
                        <span>4.9分 (128评价)</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    @click="handleSelectExhibition(exhibition)"
                    class="mt-4 w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
                  >
                    立即预约
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'booking'">
            <div v-if="!selectedExhibition" class="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar class="w-10 h-10 text-gray-400" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">暂无选择的展览</h3>
              <p class="text-gray-500 mb-6">请先从展览列表中选择要预约的展览</p>
              <button 
                @click="activeTab = 'list'"
                class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
              >
                浏览展览
              </button>
            </div>

            <div v-else class="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-xl font-bold text-gray-900 font-display">展览预约</h3>
                <button 
                  @click="activeTab = 'list'; selectedExhibition = null"
                  class="text-primary-600 hover:text-primary-500 text-sm"
                >
                  返回列表
                </button>
              </div>

              <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-1">
                  <img 
                    :src="selectedExhibition.image" 
                    :alt="selectedExhibition.name"
                    class="w-full h-48 object-cover rounded-xl"
                  />
                  <h4 class="font-bold text-gray-900 mt-3">{{ selectedExhibition.name }}</h4>
                  <p class="text-gray-500 text-sm">¥{{ selectedExhibition.price }} / 人</p>
                </div>

                <div class="md:col-span-2 space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">选择日期</label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="date in selectedExhibition.availableDates"
                        :key="date"
                        @click="selectedDate = date"
                        :class="[
                          'px-4 py-2 rounded-lg text-sm transition-all duration-300',
                          selectedDate === date 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        ]"
                      >
                        {{ date }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">选择时段</label>
                    <div class="grid grid-cols-2 gap-2">
                      <button
                        v-for="slot in selectedExhibition.timeSlots"
                        :key="slot.id"
                        @click="selectedTimeSlot = slot"
                        :class="[
                          'p-3 rounded-lg text-left transition-all duration-300 border-2',
                          selectedTimeSlot?.id === slot.id 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-primary-300'
                        ]"
                      >
                        <div class="flex items-center justify-between mb-1">
                          <span class="font-medium text-gray-900">{{ slot.time }}</span>
                          <span class="text-xs text-primary-600">{{ slot.remaining }}张</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <Users class="w-3 h-3 text-gray-400" />
                          <span class="text-xs text-gray-400">已约{{ slot.booked }}/{{ slot.capacity }}</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">预约人数</label>
                    <div class="flex items-center gap-4">
                      <button 
                        @click="bookingQuantity = Math.max(1, bookingQuantity - 1)"
                        class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span class="text-xl font-bold w-12 text-center">{{ bookingQuantity }}</span>
                      <button 
                        @click="bookingQuantity++"
                        class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">选择联系人</label>
                    <div class="space-y-2">
                      <button
                        v-for="contact in mockContacts"
                        :key="contact.id"
                        @click="selectedContact = contact"
                        :class="[
                          'w-full p-3 rounded-lg text-left transition-all duration-300 border-2 flex items-center justify-between',
                          selectedContact?.id === contact.id 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-primary-300'
                        ]"
                      >
                        <div>
                          <div class="font-medium text-gray-900">{{ contact.name }}</div>
                          <div class="text-xs text-gray-400">{{ contact.phone }}</div>
                        </div>
                        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                          :class="selectedContact?.id === contact.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'">
                          <svg v-if="selectedContact?.id === contact.id" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div class="pt-4 border-t border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-gray-600">合计</span>
                      <span class="text-2xl font-bold text-primary-600">¥{{ selectedExhibition.price * bookingQuantity }}</span>
                    </div>
                    <button 
                      @click="handleBooking"
                      class="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Clock class="w-4 h-4" />
                      确认预约
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />

    <div 
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center" @click.stop>
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2 font-display">预约成功</h3>
        <p class="text-gray-600 mb-6">
          您已成功预约「{{ selectedExhibition?.name }}」<br/>
          时间：{{ selectedDate }} {{ selectedTimeSlot?.time }}<br/>
          人数：{{ bookingQuantity }}人
        </p>
        <div class="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <div class="text-sm text-gray-500 mb-1">订单号</div>
          <div class="font-mono font-bold text-gray-900">EXH{{ Date.now().toString().slice(-8) }}</div>
        </div>
        <button 
          @click="closeSuccessModal"
          class="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
        >
          完成
        </button>
      </div>
    </div>
  </div>
</template>