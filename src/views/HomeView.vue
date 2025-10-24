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
              class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors"
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
          title="Reports" 
          :show-filters="true"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- Dashboard Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <!-- Top Row: Stats Cards + Activity Chart -->
          <div class="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
            <!-- Stats Cards -->
            <div class="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Active Users"
                :value="stats.activeUsers"
                :subtitle="`/${stats.totalUsers}`"
                :show-chart="true"
                :chart-data="[20, 25, 30, 28, 35, 32, 40]"
                chart-color="#3b82f6"
              />
              
              <StatsCard
                title="Questions Answered"
                :value="stats.questionsAnswered"
                :show-chart="true"
                :chart-data="[100, 120, 140, 130, 160, 150, 180]"
                chart-color="#10b981"
              />
              
              <StatsCard
                title="Av. Session Length"
                :value="stats.averageSessionLength"
                :show-chart="true"
                :chart-data="[2, 2.5, 3, 2.8, 3.5, 3.2, 4]"
                chart-color="#f59e0b"
              />
            </div>
            
            <!-- Activity Chart -->
            <div class="xl:col-span-1 min-w-0">
              <div class="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 h-full min-h-[200px]">
                <ActivityChart />
              </div>
            </div>
          </div>

          <!-- Knowledge Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Starting Knowledge"
              :value="knowledge.startingKnowledge"
              subtitle="%"
              :show-chart="true"
              :chart-data="[50, 55, 60, 58, 62, 60, 64]"
              chart-color="#6366f1"
            />
            
            <StatsCard
              title="Current Knowledge"
              :value="knowledge.currentKnowledge"
              subtitle="%"
              :show-chart="true"
              :chart-data="[70, 75, 80, 78, 82, 84, 86]"
              chart-color="#06b6d4"
            />
            
            <StatsCard
              title="Knowledge Gain"
              :value="knowledgeGainFormatted"
              trend="+34%"
              trend-direction="up"
              :show-chart="true"
              :chart-data="[10, 15, 20, 18, 25, 30, 34]"
              chart-color="#10b981"
            />
          </div>

          <!-- Topics Section -->
          <div class="mb-8">
            <TopicsSection />
          </div>

          <!-- Leaderboards -->
          <LeaderboardSection />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  BarChart3, 
  Library, 
  Users, 
  Activity, 
  HelpCircle, 
  Settings 
} from 'lucide-vue-next'
import { useDashboardStore } from '@/stores/dashboard'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import StatsCard from '@/components/StatsCard.vue'
import ActivityChart from '@/components/ActivityChart.vue'
import TopicsSection from '@/components/TopicsSection.vue'
import LeaderboardSection from '@/components/LeaderboardSection.vue'

const dashboardStore = useDashboardStore()
const showMobileMenu = ref(false)

const stats = computed(() => dashboardStore.stats)
const knowledge = computed(() => dashboardStore.knowledge)
const knowledgeGainFormatted = computed(() => dashboardStore.knowledgeGainFormatted)

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

// Initialize store data on component mount
onMounted(() => {
  dashboardStore.initializeData()
})
</script>
