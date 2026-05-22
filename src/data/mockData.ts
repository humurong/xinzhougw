export interface Contact {
  id: string
  name: string
  idCard: string
  phone: string
}

export interface TimeSlot {
  id: string
  time: string
  capacity: number
  booked: number
  remaining: number
}

export interface TicketOrder {
  id: string
  orderNo: string
  ticketType: string
  price: number
  quantity: number
  status: 'pending' | 'paid' | 'used' | 'refunded'
  visitDate: string
  timeSlot: string
  contacts: Contact[]
  createTime: string
  qrCode?: string
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
  receiver: {
    name: string
    phone: string
    address: string
  }
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

export interface TourOrder {
  id: string
  orderNo: string
  guide: TourGuide
  date: string
  timeSlot: string
  status: 'pending' | 'paid' | 'used' | 'cancelled'
  createTime: string
  contact: Contact
  participants: number
  totalPrice: number
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

export interface ExhibitionOrder {
  id: string
  orderNo: string
  exhibition: Exhibition
  date: string
  timeSlot: string
  status: 'pending' | 'paid' | 'used' | 'cancelled'
  createTime: string
  contact: Contact
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

export interface Complaint {
  id: string
  type: 'problem' | 'suggestion'
  title: string
  content: string
  images: string[]
  status: 'pending' | 'processing' | 'resolved'
  createTime: string
  reply?: string
  replyTime?: string
}

export const mockContacts: Contact[] = [
  { id: '1', name: '张三', idCard: '110101199001011234', phone: '13800138001' },
  { id: '2', name: '李四', idCard: '110101199502022345', phone: '13900139002' },
]

export const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '09:00-10:00', capacity: 200, booked: 45, remaining: 155 },
  { id: '2', time: '10:00-11:00', capacity: 200, booked: 78, remaining: 122 },
  { id: '3', time: '11:00-12:00', capacity: 150, booked: 32, remaining: 118 },
  { id: '4', time: '14:00-15:00', capacity: 200, booked: 95, remaining: 105 },
  { id: '5', time: '15:00-16:00', capacity: 200, booked: 67, remaining: 133 },
  { id: '6', time: '16:00-17:00', capacity: 150, booked: 23, remaining: 127 },
]

export const mockTicketOrders: TicketOrder[] = [
  {
    id: '1',
    orderNo: 'TCK20240115001',
    ticketType: '成人票',
    price: 60,
    quantity: 2,
    status: 'paid',
    visitDate: '2024-01-20',
    timeSlot: '10:00-11:00',
    contacts: [mockContacts[0]],
    createTime: '2024-01-15 10:30:00',
    qrCode: 'TCK20240115001',
  },
  {
    id: '2',
    orderNo: 'TCK20240114002',
    ticketType: '学生票',
    price: 30,
    quantity: 1,
    status: 'used',
    visitDate: '2024-01-14',
    timeSlot: '14:00-15:00',
    contacts: [mockContacts[1]],
    createTime: '2024-01-13 15:45:00',
    qrCode: 'TCK20240114002',
  },
]

export const mockGiftProducts: GiftProduct[] = [
  {
    id: '1',
    name: '长城主题陶瓷杯',
    price: 128,
    originalPrice: 168,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20great%20wall%20themed%20ceramic%20cup%20with%20traditional%20pattern&image_size=square',
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
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=ancient%20chinese%20ming%20dynasty%20weapon%20model%20set%20sword%20spear&image_size=square',
    description: '1:6比例还原明代兵器',
    category: '模型玩具',
    stock: 30,
    sales: 45,
  },
  {
    id: '3',
    name: '长城风景明信片套装',
    price: 38,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20great%20wall%20landscape%20postcard%20set%20beautiful%20scenery&image_size=square',
    description: '精选长城四季风景，一套12张',
    category: '文具',
    stock: 200,
    sales: 567,
  },
  {
    id: '4',
    name: '非遗剪纸艺术作品',
    price: 198,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20traditional%20paper%20cutting%20art%20great%20wall%20pattern&image_size=square',
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
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20great%20wall%20history%20book%20collection%20set%20hardcover&image_size=square',
    description: '一套三本，详细介绍长城历史',
    category: '图书',
    stock: 80,
    sales: 89,
  },
  {
    id: '6',
    name: '传统刺绣钱包',
    price: 158,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20traditional%20embroidery%20wallet%20with%20floral%20pattern&image_size=square',
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
    receiver: { name: '张三', phone: '13800138001', address: '北京市朝阳区xxx街道xxx号' },
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
    receiver: { name: '李四', phone: '13900139002', address: '山西省太原市xxx路xxx号' },
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
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20museum%20exhibition%20hall%20large%20space%20bright%20lighting&image_size=landscape_16_9',
  },
  {
    id: '2',
    name: '多功能厅',
    description: '配备音响投影设备，适合举办讲座、会议等活动',
    capacity: 100,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20conference%20room%20multipurpose%20hall%20with%20projector&image_size=landscape_16_9',
  },
  {
    id: '3',
    name: 'VIP接待室',
    description: '温馨舒适的小型接待空间，适合商务洽谈',
    capacity: 20,
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=elegant%20VIP%20reception%20room%20luxurious%20comfortable%20chinese%20style&image_size=landscape_16_9',
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
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20chinese%20male%20tour%20guide%20portrait%20friendly%20smile&image_size=square',
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
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20chinese%20female%20tour%20guide%20portrait%20elegant&image_size=square',
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
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=great%20wall%20history%20exhibition%20museum%20display%20ancient%20relics&image_size=landscape_16_9',
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
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=ming%20dynasty%20military%20equipment%20exhibition%20ancient%20weapons&image_size=landscape_16_9',
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
    condition: '小雪',
    wind: '北风5-6级',
    humidity: 75,
    uvIndex: 1,
    icon: 'snowy',
  },
  {
    date: '2024-01-24',
    temperature: { min: -5, max: 6 },
    condition: '晴',
    wind: '东风2-3级',
    humidity: 40,
    uvIndex: 3,
    icon: 'sunny',
  },
]

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    type: 'suggestion',
    title: '建议增加更多互动体验项目',
    content: '参观时发现博物馆的互动体验项目较少，建议增加一些适合家庭参与的互动活动，让孩子们也能更好地了解长城文化。',
    images: [],
    status: 'resolved',
    createTime: '2024-01-10 09:30:00',
    reply: '感谢您的建议！我们正在规划新的互动体验区域，预计下个月对外开放，敬请期待。',
    replyTime: '2024-01-12 14:00:00',
  },
  {
    id: '2',
    type: 'problem',
    title: '卫生间卫生问题',
    content: '今天参观时发现二楼卫生间地面有水渍，地面较滑，存在安全隐患。',
    images: [],
    status: 'processing',
    createTime: '2024-01-15 10:20:00',
  },
]

export const mockCrowdData = {
  currentCount: 1256,
  maxCapacity: 3000,
  peakTime: '10:00-11:00',
  peakCount: 2150,
  trend: [800, 1200, 1500, 1800, 2000, 2150, 1900, 1600, 1300, 1100, 900, 700],
  areas: [
    { name: '一号展厅', count: 320, max: 500 },
    { name: '二号展厅', count: 280, max: 400 },
    { name: '三号展厅', count: 180, max: 300 },
    { name: '文创商店', count: 150, max: 200 },
    { name: '休息区', count: 80, max: 150 },
    { name: '其他区域', count: 246, max: 1450 },
  ],
}
