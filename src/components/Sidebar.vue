<template>
  <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen sticky top-0 hidden lg:flex">
    <!-- Tesla Logo -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div class="flex items-center space-x-2">
        <div class="text-tesla-red font-bold text-xl tracking-wider">TESLA</div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <!-- Support Section -->
    <div class="px-4 py-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
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
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  BarChart3, 
  Library, 
  Users, 
  Activity, 
  HelpCircle, 
  Settings 
} from 'lucide-vue-next'

interface MenuItem {
  name: string
  icon: any
  route: { name: string }
}

const menuItems = ref<MenuItem[]>([
  { name: 'Reports', icon: BarChart3, route: { name: 'reports' } },
  { name: 'Library', icon: Library, route: { name: 'library' } },
  { name: 'People', icon: Users, route: { name: 'people' } },
  { name: 'Activities', icon: Activity, route: { name: 'activities' } }
])

const supportItems = ref<MenuItem[]>([
  { name: 'Get Started', icon: HelpCircle, route: { name: 'get-started' } },
  { name: 'Settings', icon: Settings, route: { name: 'settings' } }
])
</script>