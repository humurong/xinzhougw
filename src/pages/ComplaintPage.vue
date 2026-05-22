<script setup lang="ts">
import { ref } from 'vue'
import { FileText, MessageSquare, Image, Video, Send, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockComplaints, type Complaint } from '@/data/mockData'

const activeTab = ref<'submit' | 'list'>('submit')
const complaintType = ref<'complaint' | 'suggestion'>('complaint')
const title = ref('')
const content = ref('')
const images = ref<string[]>([])
const complaints = ref<Complaint[]>(mockComplaints)
const showSuccessModal = ref(false)

const handleSubmit = () => {
  if (!title.value || !content.value) {
    alert('请填写完整内容')
    return
  }
  const newComplaint: Complaint = {
    id: Date.now().toString(),
    type: complaintType.value,
    title: title.value,
    content: content.value,
    images: images.value,
    status: 'pending',
    createTime: new Date().toLocaleString('zh-CN'),
  }
  complaints.value.unshift(newComplaint)
  showSuccessModal.value = true
  title.value = ''
  content.value = ''
  images.value = []
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已解决'
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main>
      <section class="bg-gradient-to-r from-amber-500 to-orange-600 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageSquare class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold font-display">投诉建议</h1>
              <p class="text-amber-100 mt-1">您的反馈是我们进步的动力</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex gap-4 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
            <button
              @click="activeTab = 'submit'"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'submit' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              提交反馈
            </button>
            <button
              @click="activeTab = 'list'"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                activeTab === 'list' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              反馈记录
            </button>
          </div>

          <div v-if="activeTab === 'submit'" class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6 font-display">提交您的反馈</h3>

            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">反馈类型</label>
                <div class="flex gap-4">
                  <button
                    @click="complaintType = 'complaint'"
                    :class="[
                      'flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all duration-300 border-2',
                      complaintType === 'complaint' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-200 hover:border-red-300'
                    ]"
                  >
                    <AlertCircle class="w-5 h-5" />
                    <span class="font-medium">问题投诉</span>
                  </button>
                  <button
                    @click="complaintType = 'suggestion'"
                    :class="[
                      'flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all duration-300 border-2',
                      complaintType === 'suggestion' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-green-300'
                    ]"
                  >
                    <FileText class="w-5 h-5" />
                    <span class="font-medium">建议意见</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center gap-2">
                    <FileText class="w-4 h-4" />
                    标题
                  </span>
                </label>
                <input
                  v-model="title"
                  type="text"
                  placeholder="请简要描述您的反馈内容"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center gap-2">
                    <MessageSquare class="w-4 h-4" />
                    详细内容
                  </span>
                </label>
                <textarea
                  v-model="content"
                  rows="6"
                  placeholder="请详细描述您遇到的问题或提出的建议..."
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center gap-2">
                    <Image class="w-4 h-4" />
                    图片/视频 (选填)
                  </span>
                </label>
                <div class="flex gap-3">
                  <button
                    v-for="i in 4"
                    :key="i"
                    @click="images.length < 4 && images.push(`image-${i}`)"
                    :class="[
                      'w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300',
                      images.length >= i 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-primary-300'
                    ]"
                  >
                    <Image v-if="images.length < i" class="w-6 h-6 text-gray-400" />
                    <Video v-else class="w-6 h-6 text-primary-500" />
                    <span class="text-xs text-gray-400 mt-1">{{ i }}</span>
                  </button>
                </div>
                <p class="text-xs text-gray-400 mt-2">支持上传4张图片或视频，格式支持jpg、png、mp4</p>
              </div>

              <div class="pt-4 border-t border-gray-100">
                <button
                  @click="handleSubmit"
                  class="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send class="w-5 h-5" />
                  提交反馈
                </button>
                <p class="text-center text-xs text-gray-400 mt-4">
                  提交即表示您同意我们的隐私政策，我们会在3个工作日内回复
                </p>
              </div>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="complaint in complaints"
              :key="complaint.id"
              class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    complaint.type === 'complaint' ? 'bg-red-100' : 'bg-green-100'
                  ]">
                    <AlertCircle v-if="complaint.type === 'complaint'" class="w-5 h-5 text-red-600" />
                    <FileText v-else class="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">{{ complaint.title }}</h4>
                    <p class="text-sm text-gray-400">{{ complaint.type === 'complaint' ? '问题投诉' : '建议意见' }}</p>
                  </div>
                </div>
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(complaint.status)]">
                  {{ getStatusText(complaint.status) }}
                </span>
              </div>

              <p class="text-gray-600 mb-4 leading-relaxed">{{ complaint.content }}</p>

              <div class="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Clock class="w-4 h-4" />
                <span>{{ complaint.createTime }}</span>
              </div>

              <div v-if="complaint.reply" class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <CheckCircle class="w-4 h-4 text-green-500" />
                  <span class="font-medium text-gray-700">官方回复</span>
                  <span class="text-xs text-gray-400">{{ complaint.replyTime }}</span>
                </div>
                <p class="text-gray-600 text-sm">{{ complaint.reply }}</p>
              </div>

              <div v-else-if="complaint.status === 'pending'" class="flex items-center gap-2 text-sm text-yellow-600">
                <RefreshCw class="w-4 h-4 animate-spin" style="animation-duration: 3s" />
                <span>我们正在处理您的反馈，请耐心等待...</span>
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
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle class="w-10 h-10 text-green-500" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2 font-display">提交成功</h3>
        <p class="text-gray-600 mb-6">
          感谢您的反馈，我们会在3个工作日内处理并回复您
        </p>
        <div class="flex gap-4">
          <button
            @click="activeTab = 'list'; closeSuccessModal()"
            class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            查看记录
          </button>
          <button
            @click="closeSuccessModal()"
            class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>