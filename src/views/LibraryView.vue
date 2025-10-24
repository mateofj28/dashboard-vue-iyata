<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Mobile Sidebar Overlay -->
      <div 
        v-if="showMobileMenu" 
        class="fixed inset-0 z-50 lg:hidden"
        @click="showMobileMenu = false"
      >
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
          <!-- Tesla Logo -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center space-x-2">
              <div class="text-tesla-red font-bold text-xl tracking-wider">TESLA</div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="flex-1 px-4 py-6 space-y-2">
            <RouterLink
              v-for="item in menuItems" 
              :key="item.name"
              :to="item.route"
              :class="[
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
                $route.name === item.route.name
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
              @click="showMobileMenu = false"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>

          <!-- Support Section -->
          <div class="px-4 py-6 border-t border-gray-200">
            <div class="text-sm font-medium text-gray-500 mb-4">Support</div>
            <RouterLink
              v-for="item in supportItems" 
              :key="item.name"
              :to="item.route"
              :class="[
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
                $route.name === item.route.name
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
              @click="showMobileMenu = false"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <Header 
          title="Library"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- Library Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <!-- Search and Filters -->
          <div class="mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="relative">
                <Search :size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search courses, topics, or content..."
                  class="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="flex items-center space-x-4">
                <select 
                  v-model="selectedCategory"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="security">Security</option>
                  <option value="compliance">Compliance</option>
                  <option value="safety">Safety</option>
                  <option value="networking">Networking</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Courses</p>
                  <p class="text-3xl font-bold text-gray-900">{{ libraryStats.totalCourses }}</p>
                </div>
                <BookOpen :size="24" class="text-blue-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Completed</p>
                  <p class="text-3xl font-bold text-gray-900">{{ libraryStats.completed }}</p>
                </div>
                <CheckCircle :size="24" class="text-green-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">In Progress</p>
                  <p class="text-3xl font-bold text-gray-900">{{ libraryStats.inProgress }}</p>
                </div>
                <Clock :size="24" class="text-orange-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Avg. Score</p>
                  <p class="text-3xl font-bold text-gray-900">{{ libraryStats.avgScore }}%</p>
                </div>
                <Award :size="24" class="text-purple-500" />
              </div>
            </div>
          </div>

          <!-- Course Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="course in filteredCourses" 
              :key="course.id"
              class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-xl font-bold mb-1">{{ course.title }}</h3>
                  <p class="text-sm opacity-90">{{ course.category }}</p>
                </div>
                <div class="absolute top-4 right-4">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    course.status === 'completed' ? 'bg-green-100 text-green-800' :
                    course.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ course.status === 'completed' ? 'Completed' : 
                       course.status === 'in-progress' ? 'In Progress' : 'Not Started' }}
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
                
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div class="flex items-center space-x-1">
                      <Clock :size="16" />
                      <span>{{ course.duration }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <Users :size="16" />
                      <span>{{ course.enrolled }} enrolled</span>
                    </div>
                  </div>
                </div>
                
                <div class="mb-4">
                  <div class="flex items-center justify-between text-sm mb-1">
                    <span class="text-gray-600">Progress</span>
                    <span class="font-medium">{{ course.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      :class="[
                        'h-2 rounded-full transition-all duration-300',
                        course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      ]"
                      :style="{ width: `${course.progress}%` }"
                    ></div>
                  </div>
                </div>
                
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  {{ course.status === 'completed' ? 'Review' : 
                     course.status === 'in-progress' ? 'Continue' : 'Start Course' }}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  BarChart3, 
  Library, 
  Users, 
  Activity, 
  HelpCircle, 
  Settings,
  Search,
  BookOpen,
  CheckCircle,
  Clock,
  Award
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

const showMobileMenu = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('all')

// Menu items for mobile sidebar
const menuItems = ref([
  { name: 'Reports', icon: BarChart3, route: { name: 'reports' } },
  { name: 'Library', icon: Library, route: { name: 'library' } },
  { name: 'People', icon: Users, route: { name: 'people' } },
  { name: 'Activities', icon: Activity, route: { name: 'activities' } }
])

const supportItems = ref([
  { name: 'Get Started', icon: HelpCircle, route: { name: 'get-started' } },
  { name: 'Settings', icon: Settings, route: { name: 'settings' } }
])

const libraryStats = ref({
  totalCourses: 24,
  completed: 18,
  inProgress: 4,
  avgScore: 87
})

const courses = ref([
  {
    id: 1,
    title: 'Food Safety Fundamentals',
    category: 'Safety',
    description: 'Learn the essential principles of food safety and hygiene in the workplace.',
    duration: '45 min',
    enrolled: 156,
    progress: 74,
    status: 'in-progress'
  },
  {
    id: 2,
    title: 'Covid Protocols',
    category: 'Safety',
    description: 'Comprehensive guide to COVID-19 safety protocols and procedures.',
    duration: '30 min',
    enrolled: 203,
    progress: 100,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Cyber Security Basics',
    category: 'Security',
    description: 'Introduction to cybersecurity best practices and threat awareness.',
    duration: '60 min',
    enrolled: 189,
    progress: 92,
    status: 'in-progress'
  },
  {
    id: 4,
    title: 'Compliance Basics Procedures',
    category: 'Compliance',
    description: 'Understanding regulatory compliance and organizational procedures.',
    duration: '40 min',
    enrolled: 134,
    progress: 62,
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Social Media Policies',
    category: 'Compliance',
    description: 'Guidelines for appropriate social media use in professional settings.',
    duration: '25 min',
    enrolled: 167,
    progress: 100,
    status: 'completed'
  },
  {
    id: 6,
    title: 'Company Networking',
    category: 'Networking',
    description: 'Building professional relationships and networking within the organization.',
    duration: '35 min',
    enrolled: 98,
    progress: 36,
    status: 'in-progress'
  }
])

const filteredCourses = computed(() => {
  let filtered = courses.value

  if (searchQuery.value) {
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(course => 
      course.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  return filtered
})
</script>