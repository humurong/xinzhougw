export interface Contact {
  id: string
  name: string
  phone: string
  idCard?: string
}

export interface TimeSlot {
  id: string
  time: string
  available: boolean
  capacity?: number
  booked?: number
  remaining?: number
}

export interface TicketOrder {
  id: string
  orderNo: string
  name: string
  phone: string
  idCard: string
  date: string
  timeSlot: string
  type: string
  price: number
  status: 'pending' | 'paid' | 'used' | 'cancelled'
  createTime: string
  qrCode?: string
  ticketType?: string
  quantity?: number
  visitDate?: string
  contacts?: Contact[]
}

export interface GiftProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  category: string
  stock: number
  sales: number
}

export interface GiftOrder {
  id: string
  orderNo: string
  product: GiftProduct
  quantity: number
  totalPrice: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed'
  logisticsNo?: string
  createTime: string
  receiver: Contact & { address: string }
}

export interface GuideService {
  id: string
  name: string
  price: number
  duration: string
  guideName: string
  description: string
  availableDates: string[]
  timeSlots: TimeSlot[]
}

export interface GuideOrder {
  id: string
  orderNo: string
  service: GuideService
  date: string
  timeSlot: string
  status: 'pending' | 'paid' | 'used' | 'cancelled'
  createTime: string
  contact: Contact
}

export interface HeritageActivity {
  id: string
  name: string
  price: number
  duration: string
  description: string
  image: string
  availableDates: string[]
  timeSlots: TimeSlot[]
  participants: number
}

export interface HeritageOrder {
  id: string
  orderNo: string
  activity: HeritageActivity
  date: string
  timeSlot: string
  participants: number
  totalPrice: number
  status: 'pending' | 'paid' | 'used' | 'cancelled'
  createTime: string
  contacts: Contact[]
}

export interface Venue {
  id: string
  name: string
  description: string
  capacity: number
  image: string
}

export interface VenueBooking {
  id: string
  orderNo: string
  venue: Venue
  type: 'personal' | 'team'
  date: string
  timeSlot: string
  status: 'pending' | 'confirmed' | 'used' | 'cancelled'
  createTime: string
  contact: Contact
  teamName?: string
  teamSize?: number
}

export interface TourGuide {
  id: string
  name: string
  avatar: string
  title: string
  experience: string
  languages: string[]
  specialties: string[]
  availableDates: string[]
  timeSlots: TimeSlot[]
  price: number
}

export interface Exhibition {
  id: string
  name: string
  description: string
  image: string
  startDate: string
  endDate: string
  location: string
  availableDates: string[]
  timeSlots: TimeSlot[]
  price: number
}

export interface WeatherData {
  date: string
  temperature: { min: number; max: number }
  condition: string
  wind: string
  humidity: number
  uvIndex: number
  icon: string
}

export interface CrowdData {
  currentCount: number
  maxCapacity: number
  peakTime: string
  peakCount?: number
  trend: 'up' | 'down' | 'stable'
  trendData?: number[]
  hourlyData: { time: string; count: number }[]
  areas?: { id: string; name: string; count: number; max: number }[]
}

export interface Complaint {
  id: string
  type: 'complaint' | 'suggestion'
  title: string
  content: string
  images: string[]
  createTime: string
  status: 'pending' | 'replied'
  reply?: string
  replyTime?: string
}

export const mockContacts: Contact[] = [
  { id: '1', name: '张三', phone: '13800138001', idCard: '110101199001011234' },
  { id: '2', name: '李四', phone: '13900139002', idCard: '140101199505055678' },
]

export const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '09:00-10:00', available: true, capacity: 50, booked: 23, remaining: 27 },
  { id: '2', time: '10:00-11:00', available: true, capacity: 50, booked: 15, remaining: 35 },
  { id: '3', time: '11:00-12:00', available: false, capacity: 50, booked: 50, remaining: 0 },
  { id: '4', time: '13:00-14:00', available: true, capacity: 50, booked: 10, remaining: 40 },
  { id: '5', time: '14:00-15:00', available: true, capacity: 50, booked: 20, remaining: 30 },
  { id: '6', time: '15:00-16:00', available: true, capacity: 50, booked: 8, remaining: 42 },
  { id: '7', time: '16:00-17:00', available: false, capacity: 50, booked: 50, remaining: 0 },
]

export const mockTicketOrders: TicketOrder[] = [
  {
    id: '1',
    orderNo: 'TCK20240115001',
    name: '张三',
    phone: '13800138001',
    idCard: '110101199001011234',
    date: '2024-01-20',
    timeSlot: '09:00-10:00',
    type: '成人票',
    ticketType: 'adult',
    price: 60,
    quantity: 1,
    status: 'paid',
    createTime: '2024-01-15 09:30:00',
    qrCode: 'TCK20240115001',
    visitDate: '2024-01-20',
    contacts: [mockContacts[0]],
  },
  {
    id: '2',
    orderNo: 'TCK20240110002',
    name: '李四',
    phone: '13900139002',
    idCard: '140101199505055678',
    date: '2024-01-12',
    timeSlot: '14:00-15:00',
    type: '学生票',
    ticketType: 'student',
    price: 30,
    quantity: 1,
    status: 'used',
    createTime: '2024-01-10 14:00:00',
    qrCode: 'TCK20240110002',
    visitDate: '2024-01-12',
    contacts: [mockContacts[1]],
  },
]

export const mockGiftProducts: GiftProduct[] = [
  {
    id: '1',
    name: '长城主题陶瓷杯',
    price: 128,
    originalPrice: 168,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop',
    description: '采用传统工艺制作，杯身印有长城图案',
    category: '工艺品',
    stock: 50,
    sales: 123,
  },
  {
    id: '2',
    name: '明代兵器模型套装',
    price: 268,
    originalPrice: 328,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=400&fit=crop',
    description: '1:6比例还原明代兵器',
    category: '模型玩具',
    stock: 30,
    sales: 45,
  },
  {
    id: '3',
    name: '长城风景明信片套装',
    price: 38,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop',
    description: '精选长城四季风景，一套12张',
    category: '文具',
    stock: 200,
    sales: 567,
  },
  {
    id: '4',
    name: '非遗剪纸艺术作品',
    price: 198,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    description: '国家级非遗传承人手工制作',
    category: '非遗作品',
    stock: 20,
    sales: 18,
  },
  {
    id: '5',
    name: '长城历史书籍套装',
    price: 258,
    originalPrice: 318,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    description: '一套三本，详细介绍长城历史',
    category: '图书',
    stock: 80,
    sales: 89,
  },
  {
    id: '6',
    name: '传统刺绣钱包',
    price: 158,
    image: 'https://images.unsplash.com/photo-1577776359516-58e14a529e4a?w=400&h=400&fit=crop',
    description: '手工刺绣，精美典雅',
    category: '服饰配件',
    stock: 60,
    sales: 156,
  },
]

export const mockGiftOrders: GiftOrder[] = [
  {
    id: '1',
    orderNo: 'GFT20240115001',
    product: mockGiftProducts[0],
    quantity: 2,
    totalPrice: 256,
    status: 'shipped',
    logisticsNo: 'SF1234567890',
    createTime: '2024-01-15 09:20:00',
    receiver: { id: '1', name: '张三', phone: '13800138001', address: '北京市朝阳区xxx街道xxx号' },
  },
  {
    id: '2',
    orderNo: 'GFT20240110002',
    product: mockGiftProducts[2],
    quantity: 1,
    totalPrice: 38,
    status: 'completed',
    logisticsNo: 'YT9876543210',
    createTime: '2024-01-10 14:30:00',
    receiver: { id: '2', name: '李四', phone: '13900139002', address: '山西省太原市xxx路xxx号' },
  },
]

export const mockGuideServices: GuideService[] = [
  {
    id: '1',
    name: '精品讲解服务',
    price: 200,
    duration: '2小时',
    guideName: '王导',
    description: '资深讲解员，10年讲解经验，擅长历史故事讲解',
    availableDates: ['2024-01-20', '2024-01-21', '2024-01-22'],
    timeSlots: mockTimeSlots.slice(0, 4),
  },
  {
    id: '2',
    name: 'VIP专属讲解',
    price: 500,
    duration: '3小时',
    guideName: '李导',
    description: '金牌讲解员，国家级导游资质，可提供英文讲解',
    availableDates: ['2024-01-20', '2024-01-22', '2024-01-23'],
    timeSlots: mockTimeSlots.slice(1, 5),
  },
]

export const mockGuideOrders: GuideOrder[] = [
  {
    id: '1',
    orderNo: 'GUIDE20240115001',
    service: mockGuideServices[0],
    date: '2024-01-20',
    timeSlot: '10:00-11:00',
    status: 'paid',
    createTime: '2024-01-15 11:00:00',
    contact: mockContacts[0],
  },
]

export const mockHeritageActivities: HeritageActivity[] = [
  {
    id: '1',
    name: '传统剪纸体验',
    price: 168,
    duration: '1.5小时',
    description: '在非遗传承人的指导下，学习传统剪纸技艺',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    availableDates: ['2024-01-21', '2024-01-22', '2024-01-27', '2024-01-28'],
    timeSlots: mockTimeSlots.slice(2, 5),
    participants: 10,
  },
  {
    id: '2',
    name: '陶艺制作体验',
    price: 198,
    duration: '2小时',
    description: '亲手制作一件属于自己的陶艺作品',
    image: 'https://images.unsplash.com/photo-1551632436-7e4613849d7d?w=400&h=300&fit=crop',
    availableDates: ['2024-01-20', '2024-01-23', '2024-01-26', '2024-01-29'],
    timeSlots: mockTimeSlots.slice(1, 4),
    participants: 8,
  },
  {
    id: '3',
    name: '古代射箭体验',
    price: 128,
    duration: '1小时',
    description: '体验古代射箭运动，感受传统武艺',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop',
    availableDates: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-23'],
    timeSlots: mockTimeSlots.slice(3, 6),
    participants: 12,
  },
]

export const mockHeritageOrders: HeritageOrder[] = [
  {
    id: '1',
    orderNo: 'HTG20240115001',
    activity: mockHeritageActivities[0],
    date: '2024-01-21',
    timeSlot: '14:00-15:00',
    participants: 2,
    totalPrice: 336,
    status: 'paid',
    createTime: '2024-01-15 16:00:00',
    contacts: [mockContacts[0], mockContacts[1]],
  },
]

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: '一号展厅',
    description: '可容纳200人的大型展厅，适合举办各类展览活动',
    capacity: 200,
    image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    name: '多功能厅',
    description: '配备音响投影设备，适合举办讲座、会议等活动',
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    name: 'VIP接待室',
    description: '温馨舒适的小型接待空间，适合商务洽谈',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=450&fit=crop',
  },
]

export const mockVenueBookings: VenueBooking[] = [
  {
    id: '1',
    orderNo: 'Venue20240115001',
    venue: mockVenues[1],
    type: 'team',
    date: '2024-01-25',
    timeSlot: '14:00-16:00',
    status: 'confirmed',
    createTime: '2024-01-15 10:00:00',
    contact: mockContacts[0],
    teamName: 'xxx公司',
    teamSize: 50,
  },
]

export const mockTourGuides: TourGuide[] = [
  {
    id: '1',
    name: '张明',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    title: '高级导游',
    experience: '15年',
    languages: ['中文', '英文'],
    specialties: ['历史讲解', '文化解读'],
    availableDates: ['2024-01-20', '2024-01-21', '2024-01-22'],
    timeSlots: mockTimeSlots,
    price: 300,
  },
  {
    id: '2',
    name: '李华',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    title: '金牌导游',
    experience: '10年',
    languages: ['中文', '日文', '韩文'],
    specialties: ['艺术鉴赏', '建筑解析'],
    availableDates: ['2024-01-21', '2024-01-22', '2024-01-23'],
    timeSlots: mockTimeSlots.slice(1, 5),
    price: 400,
  },
]

export const mockExhibitions: Exhibition[] = [
  {
    id: '1',
    name: '长城历史文化特展',
    description: '展示长城从春秋战国到明清时期的历史变迁',
    image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800&h=450&fit=crop',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    location: '一号展厅',
    availableDates: ['2024-01-20', '2024-01-21', '2024-01-22'],
    timeSlots: mockTimeSlots,
    price: 80,
  },
  {
    id: '2',
    name: '明代军事装备展',
    description: '展出明代各种兵器、盔甲等军事装备',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=450&fit=crop',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    location: '二号展厅',
    availableDates: ['2024-01-20', '2024-01-21', '2024-01-22'],
    timeSlots: mockTimeSlots.slice(0, 4),
    price: 60,
  },
]

export const mockWeatherData: WeatherData[] = [
  {
    date: '2024-01-20',
    temperature: { min: -5, max: 8 },
    condition: '晴',
    wind: '北风3-4级',
    humidity: 45,
    uvIndex: 2,
    icon: 'sunny',
  },
  {
    date: '2024-01-21',
    temperature: { min: -3, max: 10 },
    condition: '多云',
    wind: '南风2-3级',
    humidity: 50,
    uvIndex: 3,
    icon: 'cloudy',
  },
  {
    date: '2024-01-22',
    temperature: { min: -6, max: 5 },
    condition: '阴',
    wind: '西北风4-5级',
    humidity: 60,
    uvIndex: 1,
    icon: 'overcast',
  },
  {
    date: '2024-01-23',
    temperature: { min: -8, max: 2 },
    condition: '雪',
    wind: '北风4-5级',
    humidity: 75,
    uvIndex: 1,
    icon: 'snowy',
  },
  {
    date: '2024-01-24',
    temperature: { min: -10, max: 0 },
    condition: '晴',
    wind: '西北风3-4级',
    humidity: 40,
    uvIndex: 2,
    icon: 'sunny',
  },
  {
    date: '2024-01-25',
    temperature: { min: -5, max: 6 },
    condition: '多云',
    wind: '东南风2-3级',
    humidity: 55,
    uvIndex: 2,
    icon: 'cloudy',
  },
  {
    date: '2024-01-26',
    temperature: { min: -3, max: 9 },
    condition: '晴',
    wind: '南风2-3级',
    humidity: 45,
    uvIndex: 3,
    icon: 'sunny',
  },
]

export const mockCrowdData: CrowdData = {
  currentCount: 320,
  maxCapacity: 1000,
  peakTime: '10:00-11:00',
  peakCount: 420,
  trend: 'up',
  trendData: [150, 420, 380, 200, 250, 380, 320, 280],
  hourlyData: [
    { time: '09:00', count: 150 },
    { time: '10:00', count: 420 },
    { time: '11:00', count: 380 },
    { time: '12:00', count: 200 },
    { time: '13:00', count: 250 },
    { time: '14:00', count: 380 },
    { time: '15:00', count: 320 },
    { time: '16:00', count: 280 },
  ],
  areas: [
    { id: '1', name: '一号展厅', count: 120, max: 300 },
    { id: '2', name: '二号展厅', count: 80, max: 250 },
    { id: '3', name: '互动体验区', count: 60, max: 200 },
    { id: '4', name: '文创商店', count: 40, max: 150 },
  ],
}

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    type: 'suggestion',
    title: '关于增加讲解设备的建议',
    content: '建议在展厅内增加更多的语音讲解设备，方便游客自行了解展品信息。',
    images: [],
    createTime: '2024-01-15 10:30:00',
    status: 'replied',
    reply: '感谢您的建议！我们正在计划增加智能导览设备，预计下月投入使用。',
    replyTime: '2024-01-15 14:00:00',
  },
]
