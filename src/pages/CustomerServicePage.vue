<script setup lang="ts">
import { ref } from 'vue'
import { Phone, MessageCircle, Clock, MapPin, Send, User, Bot, Image, File, Smile, Minus, PhoneIncoming } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const activeTab = ref<'hotline' | 'chat'>('hotline')
const messages = ref<{ id: number; type: 'user' | 'bot'; content: string; time: string }[]>([
  { id: 1, type: 'bot', content: '您好！欢迎来到忻州长城博物馆在线客服，我可以帮您解答关于门票预约、展览信息、场馆服务等问题。', time: '10:00' },
  { id: 2, type: 'bot', content: '请问有什么可以帮您的吗？', time: '10:00' },
])
const inputMessage = ref('')
const isTyping = ref(false)

const commonQuestions = [
  '门票预约流程是怎样的？',
  '博物馆开放时间是几点？',
  '如何取消已预约的门票？',
  '有针对儿童的优惠政策吗？',
]

const botResponses: Record<string, string> = {
  '门票预约流程是怎样的？': '您好！门票预约流程如下：1. 进入官网首页；2. 点击「门票预约」；3. 选择日期和时段；4. 填写实名信息；5. 完成支付。预约成功后，您将收到确认信息。',
  '博物馆开放时间是几点？': '忻州长城博物馆开放时间为周二至周日 9:00-17:00（16:30停止入馆），周一闭馆（法定节假日除外）。',
  '如何取消已预约的门票？': '您好！您可以在「我的订单」中找到对应订单，点击「取消预约」即可。请在入馆前24小时取消，以免影响您的预约记录。',
  '有针对儿童的优惠政策吗？': '您好！6周岁（含6周岁）以下或身高1.2米（含1.2米）以下的儿童免费参观，需由成人陪同。6-18周岁未成年人可购买学生票享受优惠。',
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage: { id: number; type: 'user' | 'bot'; content: string; time: string } = {
    id: Date.now(),
    type: 'user',
    content: inputMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  messages.value.push(userMessage)
  inputMessage.value = ''
  isTyping.value = true
  
  setTimeout(() => {
    const response = botResponses[userMessage.content] || '感谢您的提问！我们已收到您的问题，将尽快为您解答。如需更详细的帮助，请拨打服务热线：400-123-4567。'
    const botMessage: { id: number; type: 'user' | 'bot'; content: string; time: string } = {
      id: Date.now() + 1,
      type: 'bot',
      content: response,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(botMessage)
    isTyping.value = false
  }, 1500)
}

const quickReply = (question: string) => {
  inputMessage.value = question
  sendMessage()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main>
      <section class="bg-gradient-to-r from-indigo-500 to-purple-600 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageCircle class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold font-display">客服中心</h1>
              <p class="text-indigo-100 mt-1">24小时为您服务</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex gap-4 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
            <button
              @click="activeTab = 'hotline'"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'hotline' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <Phone class="w-4 h-4 inline mr-2" />
              服务热线
            </button>
            <button
              @click="activeTab = 'chat'"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'chat' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <MessageCircle class="w-4 h-4 inline mr-2" />
              在线咨询
            </button>
          </div>

          <div v-if="activeTab === 'hotline'" class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <PhoneIncoming class="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 font-display">服务热线</h3>
                  <p class="text-gray-500">7x24小时服务</p>
                </div>
              </div>
              <div class="text-center py-8">
                <a href="tel:4001234567" class="text-5xl font-bold text-primary-600 hover:text-primary-500 transition-colors">
                  400-123-4567
                </a>
                <p class="text-gray-400 mt-2">全国统一服务热线</p>
              </div>
              <div class="space-y-4">
                <button class="w-full py-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                  <Phone class="w-5 h-5" />
                  立即拨打
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">工作时间</h4>
                    <p class="text-gray-500">周二至周日 9:00-17:00</p>
                    <p class="text-sm text-gray-400">周一闭馆（法定节假日除外）</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MapPin class="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">联系地址</h4>
                    <p class="text-gray-500">山西省忻州市长城大道1号</p>
                    <p class="text-sm text-gray-400">忻州长城博物馆</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <MessageCircle class="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">微信咨询</h4>
                    <p class="text-gray-500">扫描下方二维码添加客服微信</p>
                    <div class="w-24 h-24 bg-gray-100 rounded-xl mt-3 flex items-center justify-center">
                      <MessageCircle class="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="font-bold text-white">在线客服</h3>
                  <p class="text-sm text-white/70">人工客服工作时间：9:00-17:00</p>
                </div>
                <div class="ml-auto">
                  <span class="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    在线
                  </span>
                </div>
              </div>
            </div>

            <div class="p-4 bg-gray-50 border-b border-gray-100">
              <p class="text-sm text-gray-500 mb-3">常见问题快速解答：</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="question in commonQuestions"
                  :key="question"
                  @click="quickReply(question)"
                  class="px-4 py-2 bg-white text-gray-600 text-sm rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all shadow-sm"
                >
                  {{ question }}
                </button>
              </div>
            </div>

            <div class="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                  'flex gap-3',
                  message.type === 'user' ? 'flex-row-reverse' : ''
                ]"
              >
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  message.type === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                ]">
                  <User v-if="message.type === 'user'" class="w-5 h-5" />
                  <Bot v-else class="w-5 h-5" />
                </div>
                <div :class="[
                  'max-w-xs md:max-w-sm',
                  message.type === 'user' ? 'text-right' : ''
                ]">
                  <div :class="[
                    'inline-block px-4 py-2 rounded-2xl',
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-700 rounded-bl-md shadow-sm'
                  ]">
                    {{ message.content }}
                  </div>
                  <p class="text-xs text-gray-400 mt-1">{{ message.time }}</p>
                </div>
              </div>

              <div v-if="isTyping" class="flex gap-3">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot class="w-5 h-5 text-gray-600" />
                </div>
                <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div class="flex gap-1">
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-gray-100 bg-white">
              <div class="flex gap-3">
                <button class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-500">
                  <Smile class="w-5 h-5" />
                </button>
                <button class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-500">
                  <Image class="w-5 h-5" />
                </button>
                <button class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-500">
                  <File class="w-5 h-5" />
                </button>
                <input
                  v-model="inputMessage"
                  type="text"
                  placeholder="输入您的问题..."
                  @keyup.enter="sendMessage"
                  class="flex-1 px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  @click="sendMessage"
                  class="w-12 h-12 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors flex items-center justify-center"
                >
                  <Send class="w-5 h-5" />
                </button>
              </div>
              <p class="text-xs text-gray-400 text-center mt-2">
                发送即表示您同意我们的服务条款和隐私政策
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>