<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Weakest Topics -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Weakest Topics</h3>
      <div class="space-y-4">
        <div 
          v-for="topic in weakestTopics" 
          :key="topic.id"
          class="flex items-center space-x-4"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white" :class="getTopicIconBg(topic.name)">
            <component :is="getTopicIcon(topic.name)" :size="20" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="text-sm font-medium text-gray-900">{{ topic.name }}</h4>
              <span class="text-sm font-semibold text-gray-900">{{ topic.percentage }}% Correct</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'h-2 rounded-full transition-all duration-300',
                  topic.color
                ]"
                :style="{ width: `${topic.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Strongest Topics -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Strongest Topics</h3>
      <div class="space-y-4">
        <div 
          v-for="topic in strongestTopics" 
          :key="topic.id"
          class="flex items-center space-x-4"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white" :class="getTopicIconBg(topic.name)">
            <component :is="getTopicIcon(topic.name)" :size="20" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="text-sm font-medium text-gray-900">{{ topic.name }}</h4>
              <span class="text-sm font-semibold text-gray-900">{{ topic.percentage }}% Correct</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'h-2 rounded-full transition-all duration-300',
                  topic.color
                ]"
                :style="{ width: `${topic.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Apple, 
  FileText, 
  Globe, 
  Shield, 
  Lock, 
  Smartphone,
  Heart,
  ShieldCheck
} from 'lucide-vue-next'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const weakestTopics = computed(() => dashboardStore.currentWeakestTopics)
const strongestTopics = computed(() => dashboardStore.currentStrongestTopics)

const getTopicIcon = (topicName: string) => {
  switch (topicName.toLowerCase()) {
    case 'food safety':
      return Apple
    case 'compliance basics procedures':
      return FileText
    case 'company networking':
      return Globe
    case 'covid protocols':
      return Heart
    case 'cyber security basics':
      return Lock
    case 'social media policies':
      return Smartphone
    default:
      return Shield
  }
}

const getTopicIconBg = (topicName: string) => {
  switch (topicName.toLowerCase()) {
    case 'food safety':
      return 'bg-orange-500'
    case 'compliance basics procedures':
      return 'bg-blue-500'
    case 'company networking':
      return 'bg-purple-500'
    case 'covid protocols':
      return 'bg-blue-600'
    case 'cyber security basics':
      return 'bg-gray-800'
    case 'social media policies':
      return 'bg-pink-500'
    default:
      return 'bg-gray-500'
  }
}
</script>