<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
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
        <div class="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <!-- Tesla Logo -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
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
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="showMobileMenu = false"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>

          <!-- Support Section -->
          <div class="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Support</div>
            <RouterLink
              v-for="item in supportItems" 
              :key="item.name"
              :to="item.route"
              :class="[
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
                $route.name === item.route.name
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
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
          title="Actividades"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- Activities Content -->
        <main class="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          <!-- Filter Tabs -->
          <div class="mb-4 sm:mb-6">
            <div class="border-b border-gray-200 dark:border-gray-700">
              <nav class="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  ]"
                  @click="activeTab = tab.id"
                >
                  {{ tab.name }}
                </button>
              </nav>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Total</span>
                    <span class="hidden sm:inline">Total de Actividades</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ activityStats.total }}</p>
                </div>
                <Activity :size="16" class="text-blue-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Hoy</span>
                    <span class="hidden sm:inline">Completadas Hoy</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ activityStats.completedToday }}</p>
                </div>
                <CheckCircle :size="16" class="text-green-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">En Progreso</span>
                    <span class="hidden sm:inline">En Progreso</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ activityStats.inProgress }}</p>
                </div>
                <Clock :size="16" class="text-orange-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Promedio</span>
                    <span class="hidden sm:inline">Duración Promedio</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ activityStats.avgDuration }}</p>
                </div>
                <Timer :size="16" class="text-purple-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
          </div>

          <!-- Activity Feed -->
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Actividades Recientes</h3>
            </div>
            
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div 
                v-for="activity in filteredActivities" 
                :key="activity.id"
                class="p-3 sm:p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-start space-x-3 sm:space-x-4">
                  <div :class="[
                    'flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
                    getActivityColor(activity.type)
                  ]">
                    <component :is="getActivityIcon(activity.type)" :size="16" class="text-white sm:w-5 sm:h-5" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex-1 min-w-0">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ activity.title }}</p>
                          <span :class="[
                            'inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 self-start',
                            activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                            activity.status === 'in-progress' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                            activity.status === 'pending' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' :
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          ]">
                            {{ activity.status }}
                          </span>
                        </div>
                      </div>
                      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{{ activity.timestamp }}</p>
                    </div>
                    
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <div class="flex items-center space-x-1">
                        <img 
                          :src="activity.user.avatar" 
                          :alt="activity.user.name"
                          class="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0"
                        />
                        <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{{ activity.user.name }}</span>
                      </div>
                      
                      <div class="flex items-center space-x-3 sm:space-x-4">
                        <div class="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <Clock :size="12" class="sm:w-3.5 sm:h-3.5" />
                          <span>{{ activity.duration }}</span>
                        </div>
                        
                        <div v-if="activity.score" class="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <Award :size="12" class="sm:w-3.5 sm:h-3.5" />
                          <span>{{ activity.score }}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  CheckCircle,
  Clock,
  Timer,
  Award,
  BookOpen,
  Play,
  FileText,
  MessageSquare
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const showMobileMenu = ref(false)
const activeTab = ref('all')

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

const tabs = ref([
  { id: 'all', name: 'Todas las Actividades' },
  { id: 'courses', name: 'Cursos' },
  { id: 'assessments', name: 'Evaluaciones' },
  { id: 'discussions', name: 'Discusiones' }
])

const activityStats = ref({
  total: 1247,
  completedToday: 89,
  inProgress: 156,
  avgDuration: '12m'
})

const activities = ref([
  {
    id: 1,
    type: 'course',
    title: 'Food Safety Fundamentals',
    description: 'Completed module 3: Temperature Control and Storage',
    status: 'completed',
    timestamp: '2 hours ago',
    duration: '15 min',
    score: 92,
    user: {
      name: 'Jesse Thomas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 2,
    type: 'assessment',
    title: 'Covid Protocols Assessment',
    description: 'Passed final assessment with excellent score',
    status: 'completed',
    timestamp: '3 hours ago',
    duration: '8 min',
    score: 95,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    type: 'course',
    title: 'Cyber Security Basics',
    description: 'Started new course - Introduction to Cybersecurity',
    status: 'in-progress',
    timestamp: '5 hours ago',
    duration: '45 min',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 4,
    type: 'discussion',
    title: 'Best Practices Discussion',
    description: 'Participated in team discussion about compliance procedures',
    status: 'completed',
    timestamp: '1 day ago',
    duration: '22 min',
    user: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 5,
    type: 'assessment',
    title: 'Company Networking Quiz',
    description: 'Attempted networking fundamentals quiz',
    status: 'failed',
    timestamp: '1 day ago',
    duration: '12 min',
    score: 45,
    user: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 6,
    type: 'course',
    title: 'Social Media Policies',
    description: 'Completed all modules and final assessment',
    status: 'completed',
    timestamp: '2 days ago',
    duration: '25 min',
    score: 89,
    user: {
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 7,
    type: 'course',
    title: 'Compliance Basics Procedures',
    description: 'Working through regulatory compliance modules',
    status: 'in-progress',
    timestamp: '3 days ago',
    duration: '18 min',
    user: {
      name: 'James Brown',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 8,
    type: 'discussion',
    title: 'Safety Protocol Updates',
    description: 'Reviewed new safety guidelines with team',
    status: 'completed',
    timestamp: '4 days ago',
    duration: '35 min',
    user: {
      name: 'Thisal Mathiyazhagan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  }
])

const filteredActivities = computed(() => {
  if (activeTab.value === 'all') {
    return activities.value
  }
  
  const typeMap = {
    'courses': 'course',
    'assessments': 'assessment',
    'discussions': 'discussion'
  }
  
  return activities.value.filter(activity => 
    activity.type === typeMap[activeTab.value as keyof typeof typeMap]
  )
})

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'course':
      return BookOpen
    case 'assessment':
      return FileText
    case 'discussion':
      return MessageSquare
    default:
      return Activity
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'course':
      return 'bg-blue-500'
    case 'assessment':
      return 'bg-green-500'
    case 'discussion':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}
</script>