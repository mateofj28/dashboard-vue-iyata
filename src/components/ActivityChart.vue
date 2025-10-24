<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-gray-500">Activity</h3>
      <select 
        v-model="selectedPeriod"
        class="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
    </div>
    
    <div class="h-32 w-full overflow-hidden">
      <div class="flex items-end justify-between h-full space-x-0.5 min-w-0">
        <div 
          v-for="(item, index) in chartData" 
          :key="index"
          class="flex flex-col items-center flex-1 min-w-0"
        >
          <div class="w-full flex items-end justify-center mb-1 h-20">
            <div 
              :style="{ height: `${(item.value / maxValue) * 100}%` }"
              class="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600 cursor-pointer min-h-[2px]"
              :title="`${item.month}: ${item.value}`"
            ></div>
          </div>
          <span class="text-xs text-gray-400 font-medium truncate w-full text-center">
            {{ item.month.slice(0, 3) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const selectedPeriod = ref('month')

const chartData = computed(() => dashboardStore.activityData)

const maxValue = computed(() => {
  return Math.max(...chartData.value.map(item => item.value))
})
</script>