<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</h3>
      <component 
        v-if="icon" 
        :is="icon" 
        :size="20" 
        class="text-gray-400" 
      />
    </div>
    
    <div class="flex items-end justify-between">
      <div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {{ formattedValue }}
          <span v-if="subtitle" class="text-lg font-normal text-gray-500">
            {{ subtitle }}
          </span>
        </div>
        
        <div v-if="trend" class="flex items-center space-x-1">
          <component 
            :is="trendIcon" 
            :size="16" 
            :class="trendColor"
          />
          <span :class="['text-sm font-medium', trendColor]">
            {{ trend }}
          </span>
        </div>
      </div>
      
      <!-- Mini Chart -->
      <div v-if="showChart" class="w-20 h-12">
        <svg viewBox="0 0 80 48" class="w-full h-full">
          <polyline
            :points="chartPoints"
            fill="none"
            :stroke="chartColor"
            stroke-width="2"
            class="opacity-70"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
  icon?: any
  showChart?: boolean
  chartData?: number[]
  chartColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  trendDirection: 'neutral',
  showChart: false,
  chartColor: '#3b82f6',
  chartData: () => [20, 25, 30, 28, 35, 32, 40, 38, 45, 42, 48, 50]
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const trendIcon = computed(() => {
  switch (props.trendDirection) {
    case 'up':
      return TrendingUp
    case 'down':
      return TrendingDown
    default:
      return Minus
  }
})

const trendColor = computed(() => {
  switch (props.trendDirection) {
    case 'up':
      return 'text-green-600'
    case 'down':
      return 'text-red-600'
    default:
      return 'text-gray-500'
  }
})

const chartPoints = computed(() => {
  const width = 80
  const height = 48
  const padding = 4
  
  const maxValue = Math.max(...props.chartData)
  const minValue = Math.min(...props.chartData)
  const range = maxValue - minValue || 1
  
  return props.chartData
    .map((value, index) => {
      const x = (index / (props.chartData.length - 1)) * (width - 2 * padding) + padding
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding)
      return `${x},${y}`
    })
    .join(' ')
})
</script>