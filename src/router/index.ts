import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import TicketPage from '@/pages/TicketPage.vue'
import GiftPage from '@/pages/GiftPage.vue'
import GuideServicePage from '@/pages/GuideServicePage.vue'
import HeritagePage from '@/pages/HeritagePage.vue'
import VenueBookingPage from '@/pages/VenueBookingPage.vue'
import TourGuidePage from '@/pages/TourGuidePage.vue'
import ExhibitionPage from '@/pages/ExhibitionPage.vue'
import WeatherPage from '@/pages/WeatherPage.vue'
import ComplaintPage from '@/pages/ComplaintPage.vue'
import CustomerServicePage from '@/pages/CustomerServicePage.vue'
import CrowdPage from '@/pages/CrowdPage.vue'
import OrderDetailPage from '@/pages/OrderDetailPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/ticket', name: 'ticket', component: TicketPage },
  { path: '/gift', name: 'gift', component: GiftPage },
  { path: '/guide-service', name: 'guideService', component: GuideServicePage },
  { path: '/heritage', name: 'heritage', component: HeritagePage },
  { path: '/venue-booking', name: 'venueBooking', component: VenueBookingPage },
  { path: '/tour-guide', name: 'tourGuide', component: TourGuidePage },
  { path: '/exhibition', name: 'exhibition', component: ExhibitionPage },
  { path: '/weather', name: 'weather', component: WeatherPage },
  { path: '/complaint', name: 'complaint', component: ComplaintPage },
  { path: '/customer-service', name: 'customerService', component: CustomerServicePage },
  { path: '/crowd', name: 'crowd', component: CrowdPage },
  { path: '/order-detail/:type/:id', name: 'orderDetail', component: OrderDetailPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
