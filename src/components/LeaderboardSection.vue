<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- User Leaderboard -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Leaderboard</h3>
      <div class="space-y-4">
        <div 
          v-for="user in userLeaderboard" 
          :key="user.id"
          class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center space-x-3 flex-1">
            <div class="relative">
              <img 
                :src="user.avatar" 
                :alt="user.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div class="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
                <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{ user.rank }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.points }} Points • {{ user.percentage }}% Correct</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-1">
              <span class="text-lg font-bold text-gray-900 dark:text-white">{{ user.rank }}</span>
              <component 
                :is="getTrendIcon(user.trend)" 
                :size="16" 
                :class="getTrendColor(user.trend)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Groups Leaderboard -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Groups Leaderboard</h3>
      <div class="space-y-4">
        <div 
          v-for="group in groupLeaderboard" 
          :key="group.id"
          class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center space-x-3 flex-1">
            <div class="relative">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Users :size="20" class="text-blue-600 dark:text-blue-400" />
              </div>
              <div class="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
                <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{ group.rank }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ group.name }}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ group.points }} Points / User • {{ group.percentage }}% Correct</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-1">
              <span class="text-lg font-bold text-gray-900 dark:text-white">{{ group.rank }}</span>
              <component 
                :is="getTrendIcon(group.trend)" 
                :size="16" 
                :class="getTrendColor(group.trend)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus, Users } from 'lucide-vue-next'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const userLeaderboard = computed(() => dashboardStore.userLeaderboard)
const groupLeaderboard = computed(() => dashboardStore.groupLeaderboard)

const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
  switch (trend) {
    case 'up':
      return TrendingUp
    case 'down':
      return TrendingDown
    default:
      return Minus
  }
}

const getTrendColor = (trend: 'up' | 'down' | 'same') => {
  switch (trend) {
    case 'up':
      return 'text-green-600 dark:text-green-400'
    case 'down':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-gray-400 dark:text-gray-500'
  }
}
</script>