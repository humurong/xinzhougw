<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShoppingCart, Search, Star, Package, Truck, Eye, Minus, Plus, Check, X, Zap, Filter, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockGiftProducts, mockGiftOrders, type GiftProduct } from '@/data/mockData'

const router = useRouter()
const activeTab = ref<'products' | 'orders'>('products')
const searchQuery = ref('')
const selectedCategory = ref('all')
const showProductDetailModal = ref(false)
const showOrderDetailModal = ref(false)
const showLogisticsModal = ref(false)
const showSuccessModal = ref(false)
const selectedProduct = ref<GiftProduct | null>(null)
const quantity = ref(1)
const categories = ['all', '工艺品', '模型玩具', '文具', '非遗作品', '图书', '服饰配件']

const filteredProducts = computed(() => {
  let products = mockGiftProducts
  if (selectedCategory.value !== 'all') {
    products = products.filter(p => p.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    products = products.filter(p => p.name.includes(searchQuery.value))
  }
  return products
})

const filteredOrders = computed(() => {
  if (!searchQuery.value)
    return mockGiftOrders
  return mockGiftOrders.filter(order => order.orderNo.includes(searchQuery.value))
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '待支付',
    paid: '待发货',
    shipped: '已发货',
    delivered: '已送达',
    completed: '已完成',
  }
  return map[status] || status
}

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-blue-100 text-blue-700',
    shipped: 'bg-orange-100 text-orange-700',
    delivered: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}

const viewProductDetail = (product: GiftProduct) => {
  selectedProduct.value = product
  quantity.value = 1
  showProductDetailModal.value = true
}

const viewOrderDetail = () => {
  showOrderDetailModal.value = true
}

const checkLogistics = () => {
  showLogisticsModal.value = true
}

const addToCart = () => {
  if (!selectedProduct.value)
    return
  showSuccessModal.value = true
}

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50">
    <Header />
    
    <main class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div class="flex items-center gap-4">
            <button 
              @click="goToHome"
              class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-600 hover:text-amber-600 hover:shadow-md transition-all"
            >
              ←
            </button>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-stone-900 font-display">文创商品</h1>
              <p class="text-sm text-stone-500">精选文创产品，把文化带回家</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="relative px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all">
              <ShoppingCart class="w-5 h-5 inline mr-2" />
              购物车
              <span class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-1 inline-flex mb-8">
          <button
            @click="activeTab = 'products'"
            :class="[
              'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2',
              activeTab === 'products' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Package class="w-4 h-4" />
            商品列表
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2',
              activeTab === 'orders' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Truck class="w-4 h-4" />
            我的订单
          </button>
        </div>

        <div v-if="activeTab === 'products'" class="space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div class="flex gap-4 flex-1 bg-stone-50 rounded-xl p-3">
              <Search class="w-5 h-5 text-gray-400 mt-1" />
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索商品"
                class="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1',
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                ]"
              >
                <Filter v-if="category === 'all'" class="w-4 h-4" />
                {{ category === 'all' ? '全部' : category }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              v-for="product in filteredProducts"
              :key="product.id"
              @click="viewProductDetail(product)"
              class="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 text-left transform hover:-translate-y-2"
            >
              <div class="relative h-52 overflow-hidden bg-stone-100">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div v-if="product.originalPrice" class="absolute top-3 right-3 flex flex-col gap-2">
                  <div class="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                    <Zap class="w-3 h-3" />
                    限时优惠
                  </div>
                  <div class="px-2 py-1 bg-black/60 backdrop-blur text-white text-xs rounded-full">
                    省¥{{ product.originalPrice - product.price }}
                  </div>
                </div>

                <div class="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button class="w-full py-2.5 bg-white/95 backdrop-blur text-amber-600 font-semibold rounded-xl hover:bg-white transition-colors shadow-lg">
                    快速购买
                  </button>
                </div>
              </div>

              <div class="p-5">
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex items-center gap-0.5">
                    <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <span class="text-sm text-stone-500">{{ product.sales }}人已购</span>
                </div>
                
                <h3 class="text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                  {{ product.name }}
                </h3>
                
                <p class="text-sm text-stone-500 mb-4 line-clamp-2 h-10">{{ product.description }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-bold text-amber-600">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-stone-400 line-through">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <span class="px-2.5 py-1 bg-stone-100 text-stone-500 text-xs rounded-full">
                    库存: {{ product.stock }}
                  </span>
                </div>
              </div>
            </button>
          </div>

          <div v-if="filteredProducts.length === 0" class="text-center py-20">
            <div class="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package class="w-12 h-12 text-stone-400" />
            </div>
            <h3 class="text-xl font-semibold text-stone-600 mb-2">暂无商品</h3>
            <p class="text-stone-500">换个关键词试试吧~</p>
          </div>
        </div>

        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-4 flex gap-4 bg-stone-50">
            <Search class="w-5 h-5 text-gray-400 mt-2" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="输入订单号搜索"
              class="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div class="space-y-4">
            <div 
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <span class="font-mono text-stone-700 font-medium">{{ order.orderNo }}</span>
                    <span :class="['px-3 py-1.5 text-sm font-medium rounded-full', getStatusColor(order.status)]">
                      {{ getStatusText(order.status) }}
                    </span>
                  </div>
                  <button 
                    @click="viewOrderDetail"
                    class="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Eye class="w-4 h-4" />
                    详情
                  </button>
                </div>
                
                <div class="flex gap-4">
                  <div class="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      :src="order.product.image" 
                      :alt="order.product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-stone-900 mb-2">{{ order.product.name }}</h4>
                    <p class="text-sm text-stone-500 mb-3">数量: {{ order.quantity }}</p>
                    <div class="flex items-center justify-between">
                      <span class="text-xl font-bold text-amber-600">¥{{ order.totalPrice }}</span>
                      <div v-if="order.status === 'shipped' || order.status === 'delivered'">
                        <button 
                          @click="checkLogistics"
                          class="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                        >
                          <Truck class="w-4 h-4" />
                          查看物流
                          <ChevronRight class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="text-center py-20">
              <div class="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package class="w-12 h-12 text-stone-400" />
              </div>
              <h3 class="text-xl font-semibold text-stone-600 mb-2">暂无订单记录</h3>
              <button 
                @click="activeTab = 'products'"
                class="text-amber-600 hover:text-amber-700 font-medium"
              >
                去选购
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />

    <div 
      v-if="showProductDetailModal && selectedProduct"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showProductDetailModal = false"
    >
      <div 
        class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        @click.stop
      >
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-1/2 h-72 lg:h-auto bg-stone-100 relative">
            <img 
              :src="selectedProduct.image" 
              :alt="selectedProduct.name"
              class="w-full h-full object-cover"
            />
            <button 
              @click="showProductDetailModal = false"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-stone-600 hover:text-stone-800 hover:bg-white transition-all shadow-lg"
            >
              <X class="w-5 h-5" />
            </button>
            <div v-if="selectedProduct.originalPrice" class="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
              限时优惠
            </div>
          </div>
          
          <div class="lg:w-1/2 p-6 lg:p-8 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                {{ selectedProduct.category }}
              </span>
              <span class="text-sm text-stone-500">{{ selectedProduct.sales }}人已购</span>
            </div>
            
            <h3 class="text-2xl font-bold text-stone-900 mb-3">{{ selectedProduct.name }}</h3>
            <p class="text-stone-600 mb-6 leading-relaxed">{{ selectedProduct.description }}</p>
            
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-4xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                ¥{{ selectedProduct.price }}
              </span>
              <span v-if="selectedProduct.originalPrice" class="text-lg text-stone-400 line-through">
                ¥{{ selectedProduct.originalPrice }}
              </span>
              <span v-if="selectedProduct.originalPrice" class="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                省¥{{ selectedProduct.originalPrice - selectedProduct.price }}
              </span>
            </div>
            
            <div class="bg-stone-50 rounded-2xl p-4 mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-stone-600 font-medium">数量</span>
                <span class="text-stone-400 text-sm">库存: {{ selectedProduct.stock }}件</span>
              </div>
              <div class="flex items-center gap-4">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition-all shadow-sm border border-stone-200"
                >
                  <Minus class="w-5 h-5" />
                </button>
                <span class="w-16 text-center text-2xl font-bold text-stone-900">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition-all shadow-sm border border-stone-200"
                >
                  <Plus class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div class="mt-auto flex gap-4">
              <button 
                class="flex-1 py-4 border-2 border-amber-500 text-amber-600 rounded-2xl font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart class="w-5 h-5" />
                加入购物车
              </button>
              <button 
                @click="addToCart"
                class="flex-1 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/30"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="showOrderDetailModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showOrderDetailModal = false"
    >
      <div 
        class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in"
        @click.stop
      >
        <div class="p-6 border-b border-stone-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-stone-900">订单详情</h3>
          <button @click="showOrderDetailModal = false" class="text-stone-400 hover:text-stone-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                :src="mockGiftOrders[0].product.image" 
                :alt="mockGiftOrders[0].product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-stone-900">{{ mockGiftOrders[0].product.name }}</h4>
              <p class="text-sm text-stone-500">数量: {{ mockGiftOrders[0].quantity }}</p>
              <p class="text-xl font-bold text-amber-600">¥{{ mockGiftOrders[0].totalPrice }}</p>
            </div>
          </div>
          <div class="bg-stone-50 rounded-xl p-4 space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-stone-500">订单号</span>
              <span class="text-stone-700 font-mono">{{ mockGiftOrders[0].orderNo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">下单时间</span>
              <span class="text-stone-700">{{ mockGiftOrders[0].createTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">收货人</span>
              <span class="text-stone-700">{{ mockGiftOrders[0].receiver.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">联系电话</span>
              <span class="text-stone-700">{{ mockGiftOrders[0].receiver.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">收货地址</span>
              <span class="text-stone-700 text-right max-w-[60%]">{{ mockGiftOrders[0].receiver.address }}</span>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-stone-100">
          <button 
            @click="showOrderDetailModal = false"
            class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showLogisticsModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showLogisticsModal = false"
    >
      <div 
        class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in"
        @click.stop
      >
        <div class="p-6 border-b border-stone-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-stone-900">物流信息</h3>
          <button @click="showLogisticsModal = false" class="text-stone-400 hover:text-stone-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6">
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
            <div class="text-sm text-stone-500 mb-1">运单号</div>
            <div class="text-lg font-mono text-stone-900 font-semibold">{{ mockGiftOrders[0].logisticsNo }}</div>
          </div>
          <div class="relative pl-6">
            <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-stone-200"></div>
            <div class="space-y-5">
              <div class="relative">
                <div class="absolute -left-[18px] w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div class="text-stone-900 font-semibold">已签收</div>
                <div class="text-sm text-stone-500">2024-01-12 14:30:00</div>
                <div class="text-sm text-stone-500">签收人：本人</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-4 h-4 bg-stone-300 rounded-full"></div>
                <div class="text-stone-700 font-medium">派送中</div>
                <div class="text-sm text-stone-500">2024-01-12 10:00:00</div>
                <div class="text-sm text-stone-500">派送员：王师傅 13800138000</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-4 h-4 bg-stone-300 rounded-full"></div>
                <div class="text-stone-700 font-medium">到达派送网点</div>
                <div class="text-sm text-stone-500">2024-01-12 08:00:00</div>
                <div class="text-sm text-stone-500">北京市朝阳区网点</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-4 h-4 bg-stone-300 rounded-full"></div>
                <div class="text-stone-700 font-medium">已发货</div>
                <div class="text-sm text-stone-500">2024-01-11 16:00:00</div>
                <div class="text-sm text-stone-500">忻州长城博物馆文创商店</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-stone-100">
          <button 
            @click="showLogisticsModal = false"
            class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showSuccessModal = false"
    >
      <div 
        class="bg-white rounded-3xl max-w-md w-full overflow-hidden text-center shadow-2xl animate-scale-in"
        @click.stop
      >
        <div class="p-8">
          <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <Check class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-stone-900 mb-2">购买成功</h3>
          <p class="text-stone-500 mb-8">您的订单已提交，请在订单列表中查看</p>
          <div class="flex gap-4">
            <button 
              @click="activeTab = 'orders'; showSuccessModal = false"
              class="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              查看订单
            </button>
            <button 
              @click="showSuccessModal = false"
              class="flex-1 py-3.5 border-2 border-stone-200 rounded-xl text-stone-600 font-semibold hover:bg-stone-50 transition-all"
            >
              继续购物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
