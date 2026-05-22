<script setup lang="ts">import { ref, computed } from 'vue';
import { ShoppingCart, Search, Star, Package, Truck, Eye, Minus, Plus, Check } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mockGiftProducts, mockGiftOrders, type GiftProduct } from '@/data/mockData';
const router = useRouter();
const activeTab = ref<'products' | 'orders'>('products');
const searchQuery = ref('');
const selectedCategory = ref('all');
const showProductDetailModal = ref(false);
const showOrderDetailModal = ref(false);
const showLogisticsModal = ref(false);
const showSuccessModal = ref(false);
const selectedProduct = ref<GiftProduct | null>(null);
const quantity = ref(1);
const categories = ['all', '工艺品', '模型玩具', '文具', '非遗作品', '图书', '服饰配件'];
const filteredProducts = computed(() => {
 let products = mockGiftProducts;
 if (selectedCategory.value !== 'all') {
 products = products.filter(p => p.category === selectedCategory.value);
 }
 if (searchQuery.value) {
 products = products.filter(p => p.name.includes(searchQuery.value));
 }
 return products;
});
const filteredOrders = computed(() => {
 if (!searchQuery.value)
 return mockGiftOrders;
 return mockGiftOrders.filter(order => order.orderNo.includes(searchQuery.value));
});
const getStatusText = (status: string) => {
 const map: Record<string, string> = {
 pending: '待支付',
 paid: '待发货',
 shipped: '已发货',
 delivered: '已送达',
 completed: '已完成',
 };
 return map[status] || status;
};
const getStatusColor = (status: string) => {
 const map: Record<string, string> = {
 pending: 'bg-yellow-100 text-yellow-800',
 paid: 'bg-blue-100 text-blue-800',
 shipped: 'bg-orange-100 text-orange-800',
 delivered: 'bg-purple-100 text-purple-800',
 completed: 'bg-green-100 text-green-800',
 };
 return map[status] || 'bg-gray-100 text-gray-600';
};
const viewProductDetail = (product: GiftProduct) => {
 selectedProduct.value = product;
 quantity.value = 1;
 showProductDetailModal.value = true;
};
const viewOrderDetail = () => {
 showOrderDetailModal.value = true;
};
const checkLogistics = () => {
 showLogisticsModal.value = true;
};
const addToCart = () => {
 if (!selectedProduct.value)
 return;
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
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 font-display">文创商品</h1>
            <p class="text-sm text-gray-500">精选文创产品，把文化带回家</p>
          </div>
        </div>

        <div class="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-sm inline-flex">
          <button
            @click="activeTab = 'products'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'products' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            商品列表
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'orders' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            我的订单
          </button>
        </div>

        <div v-if="activeTab === 'products'" class="space-y-6">
          <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
            <div class="flex gap-4 flex-1">
              <Search class="w-5 h-5 text-gray-400 mt-2" />
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索商品"
                class="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200',
                  selectedCategory === category 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ category === 'all' ? '全部' : category }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              v-for="product in filteredProducts"
              :key="product.id"
              @click="viewProductDetail(product)"
              class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
            >
              <div class="relative h-48 overflow-hidden">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-if="product.originalPrice" class="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                  限时优惠
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center gap-1 mb-2">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span class="text-xs text-gray-500 ml-1">{{ product.sales }}人已购</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-2">
                    <span class="text-xl font-bold text-primary-600">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-400">库存: {{ product.stock }}</span>
                </div>
              </div>
            </button>
          </div>

          <div v-if="filteredProducts.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package class="w-12 h-12 text-gray-400" />
            </div>
            <p class="text-gray-500">暂无商品</p>
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
                    @click="viewOrderDetail"
                    class="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Eye class="w-4 h-4" />
                    详情
                  </button>
                </div>
                <div class="flex gap-4">
                  <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      :src="order.product.image" 
                      :alt="order.product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 mb-1">{{ order.product.name }}</h4>
                    <p class="text-sm text-gray-500 mb-2">数量: {{ order.quantity }}</p>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-bold text-primary-600">¥{{ order.totalPrice }}</span>
                      <div v-if="order.status === 'shipped' || order.status === 'delivered'">
                        <button 
                          @click="checkLogistics"
                          class="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                        >
                          <Truck class="w-4 h-4" />
                          查看物流
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package class="w-12 h-12 text-gray-400" />
              </div>
              <p class="text-gray-500 mb-2">暂无订单记录</p>
              <button 
                @click="activeTab = 'products'"
                class="text-primary-600 hover:text-primary-700"
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
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showProductDetailModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 h-64 md:h-auto bg-gray-100">
            <img 
              :src="selectedProduct.image" 
              :alt="selectedProduct.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="md:w-1/2 p-6 flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {{ selectedProduct.category }}
              </span>
              <span class="text-xs text-gray-400">{{ selectedProduct.sales }}人已购</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ selectedProduct.name }}</h3>
            <p class="text-gray-600 mb-4">{{ selectedProduct.description }}</p>
            <div class="flex items-center gap-2 mb-6">
              <span class="text-3xl font-bold text-primary-600">¥{{ selectedProduct.price }}</span>
              <span v-if="selectedProduct.originalPrice" class="text-lg text-gray-400 line-through">
                ¥{{ selectedProduct.originalPrice }}
              </span>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <span class="text-gray-600">数量</span>
              <div class="flex items-center gap-4">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus class="w-4 h-4" />
                </button>
                <span class="w-12 text-center text-xl font-bold">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus class="w-4 h-4" />
                </button>
              </div>
              <span class="text-sm text-gray-400">库存: {{ selectedProduct.stock }}</span>
            </div>
            <div class="mt-auto flex gap-4">
              <button 
                class="flex-1 py-4 border-2 border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart class="w-5 h-5" />
                加入购物车
              </button>
              <button 
                @click="addToCart"
                class="flex-1 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors"
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
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                :src="mockGiftOrders[0].product.image" 
                :alt="mockGiftOrders[0].product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ mockGiftOrders[0].product.name }}</h4>
              <p class="text-sm text-gray-500">数量: {{ mockGiftOrders[0].quantity }}</p>
              <p class="text-lg font-bold text-primary-600">¥{{ mockGiftOrders[0].totalPrice }}</p>
            </div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">订单号</span>
              <span class="text-gray-700 font-mono">{{ mockGiftOrders[0].orderNo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">下单时间</span>
              <span class="text-gray-700">{{ mockGiftOrders[0].createTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">收货人</span>
              <span class="text-gray-700">{{ mockGiftOrders[0].receiver.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">联系电话</span>
              <span class="text-gray-700">{{ mockGiftOrders[0].receiver.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">收货地址</span>
              <span class="text-gray-700 text-right max-w-[60%]">{{ mockGiftOrders[0].receiver.address }}</span>
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
      v-if="showLogisticsModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click="showLogisticsModal = false"
    >
      <div 
        class="bg-white rounded-2xl max-w-md w-full overflow-hidden"
        @click.stop
      >
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">物流信息</h3>
        </div>
        <div class="p-6">
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <div class="text-sm text-gray-500 mb-1">运单号</div>
            <div class="text-lg font-mono text-gray-900">{{ mockGiftOrders[0].logisticsNo }}</div>
          </div>
          <div class="relative pl-6">
            <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div class="space-y-4">
              <div class="relative">
                <div class="absolute -left-[18px] w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
                <div class="text-gray-900 font-medium">已签收</div>
                <div class="text-sm text-gray-500">2024-01-12 14:30:00</div>
                <div class="text-sm text-gray-500">签收人：本人</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-3 h-3 bg-gray-300 rounded-full"></div>
                <div class="text-gray-700">派送中</div>
                <div class="text-sm text-gray-500">2024-01-12 10:00:00</div>
                <div class="text-sm text-gray-500">派送员：王师傅 13800138000</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-3 h-3 bg-gray-300 rounded-full"></div>
                <div class="text-gray-700">到达派送网点</div>
                <div class="text-sm text-gray-500">2024-01-12 08:00:00</div>
                <div class="text-sm text-gray-500">北京市朝阳区网点</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[14px] w-3 h-3 bg-gray-300 rounded-full"></div>
                <div class="text-gray-700">已发货</div>
                <div class="text-sm text-gray-500">2024-01-11 16:00:00</div>
                <div class="text-sm text-gray-500">忻州长城博物馆文创商店</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 border-t">
          <button 
            @click="showLogisticsModal = false"
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
          <h3 class="text-2xl font-bold text-gray-900 mb-2">购买成功</h3>
          <p class="text-gray-500 mb-6">您的订单已提交，请在订单列表中查看</p>
          <div class="flex gap-4">
            <button 
              @click="activeTab = 'orders'; showSuccessModal = false"
              class="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
            >
              查看订单
            </button>
            <button 
              @click="showSuccessModal = false"
              class="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              继续购物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
