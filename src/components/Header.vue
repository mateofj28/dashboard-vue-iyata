<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <button 
            class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="$emit('toggleMobileMenu')"
          >
            <Menu :size="20" />
          </button>
          <h1 class="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">{{ title || 'Reports' }}</h1>
        </div>
        
        <!-- Filters - Only show on Reports page -->
        <div v-if="showFilters" class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Timeframe:</label>
            <select 
              v-model="selectedTimeframe"
              class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="handleTimeframeChange"
            >
              <option 
                v-for="option in timeframeOptions" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">People:</label>
            <select 
              v-model="selectedPeople"
              class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="handlePeopleChange"
            >
              <option 
                v-for="option in peopleOptions" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Topic:</label>
            <select 
              v-model="selectedTopic"
              class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="handleTopicChange"
            >
              <option 
                v-for="option in topicOptions" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Download Button -->
      <button class="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
        <Download :size="16" />
        <span class="hidden sm:inline">Download</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Download, Menu } from 'lucide-vue-next'
import { useDashboardStore } from '@/stores/dashboard'

interface Props {
  title?: string
  showFilters?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Reports',
  showFilters: true
})

defineEmits<{
  toggleMobileMenu: []
}>()

const dashboardStore = useDashboardStore()

const selectedTimeframe = ref('all-time')
const selectedPeople = ref('all')
const selectedTopic = ref('all')

const timeframeOptions = computed(() => dashboardStore.timeframeOptions)
const peopleOptions = computed(() => dashboardStore.peopleOptions)
const topicOptions = computed(() => dashboardStore.topicOptions)

const handleTimeframeChange = () => {
  dashboardStore.updateTimeframe(selectedTimeframe.value)
}

const handlePeopleChange = () => {
  dashboardStore.updatePeopleFilter(selectedPeople.value)
}

const handleTopicChange = () => {
  dashboardStore.updateTopicFilter(selectedTopic.value)
}
</script>