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
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{{ t('nav.support') }}</div>
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
          :title="t('getStarted.title')"
          :show-filters="false"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- Get Started Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <div class="max-w-4xl mx-auto">
            
            <!-- Welcome Section -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Rocket :size="32" />
                </div>
                <div>
                  <h1 class="text-3xl font-bold mb-2">{{ t('getStarted.welcome') }}</h1>
                  <p class="text-blue-100 text-lg">{{ t('getStarted.subtitle') }}</p>
                </div>
              </div>
            </div>

            <!-- Quick Start Steps -->
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ t('getStarted.quickStartSteps') }}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div 
                v-for="(step, index) in quickStartSteps" 
                :key="step.id"
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                @click="navigateToStep(step.route)"
              >
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <component :is="step.icon" :size="24" class="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ step.description }}</p>
                <div class="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  <span>{{ step.action }}</span>
                  <ArrowRight :size="16" class="ml-1" />
                </div>
              </div>
            </div>

            <!-- Learning Paths -->
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ t('getStarted.learningPaths') }}</h2>
                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">{{ t('getStarted.choosePathDesc') }}</p>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    v-for="path in learningPaths" 
                    :key="path.id"
                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <div class="flex items-center space-x-3 mb-3">
                      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', path.color]">
                        <component :is="path.icon" :size="20" class="text-white" />
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">{{ path.title }}</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ path.duration }} • {{ path.courses }} courses</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ path.description }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 w-24">
                          <div 
                            :class="['h-2 rounded-full', path.progressColor]"
                            :style="{ width: `${path.progress}%` }"
                          ></div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400">{{ path.progress }}%</span>
                      </div>
                      <button class="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                        {{ t('getStarted.startPath') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Help & Resources -->
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ t('getStarted.helpResources') }}</h2>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div 
                    v-for="resource in helpResources" 
                    :key="resource.id"
                    class="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <component :is="resource.icon" :size="24" class="text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 class="font-medium text-gray-900 dark:text-white mb-1">{{ resource.title }}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ resource.description }}</p>
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
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  BarChart3, 
  Library, 
  Users, 
  Activity, 
  HelpCircle, 
  Settings,
  Rocket,
  ArrowRight,
  User,
  BookOpen,
  Shield,
  Briefcase,
  MessageCircle,
  FileText,
  Video,
  Phone,
  Heart
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { useI18n } from '@/composables/useI18n'

const router = useRouter()
const showMobileMenu = ref(false)
const { t } = useI18n()

// Menu items for mobile sidebar
const menuItems = ref([
  { name: t('nav.reports'), icon: BarChart3, route: { name: 'reports' } },
  { name: t('nav.library'), icon: Library, route: { name: 'library' } },
  { name: t('nav.people'), icon: Users, route: { name: 'people' } },
  { name: t('nav.activities'), icon: Activity, route: { name: 'activities' } }
])

const supportItems = ref([
  { name: t('nav.getStarted'), icon: HelpCircle, route: { name: 'get-started' } },
  { name: t('nav.settings'), icon: Settings, route: { name: 'settings' } }
])

const quickStartSteps = computed(() => [
  {
    id: 1,
    title: t('getStarted.completeProfile'),
    description: t('getStarted.completeProfileDesc'),
    action: t('getStarted.goToSettings'),
    icon: User,
    route: 'settings'
  },
  {
    id: 2,
    title: t('getStarted.exploreCourses'),
    description: t('getStarted.exploreCoursesDesc'),
    action: t('getStarted.viewLibrary'),
    icon: BookOpen,
    route: 'library'
  },
  {
    id: 3,
    title: t('getStarted.startLearning'),
    description: t('getStarted.startLearningDesc'),
    action: t('getStarted.startCourse'),
    icon: Rocket,
    route: 'library'
  }
])

const learningPaths = computed(() => [
  {
    id: 1,
    title: t('getStarted.securityFundamentals'),
    description: t('getStarted.securityFundamentalsDesc'),
    duration: `2-3 ${t('getStarted.weeks')}`,
    courses: 5,
    progress: 0,
    color: 'bg-red-500',
    progressColor: 'bg-red-500',
    icon: Shield
  },
  {
    id: 2,
    title: t('getStarted.complianceRegulations'),
    description: t('getStarted.complianceRegulationsDesc'),
    duration: `3-4 ${t('getStarted.weeks')}`,
    courses: 7,
    progress: 0,
    color: 'bg-blue-500',
    progressColor: 'bg-blue-500',
    icon: FileText
  },
  {
    id: 3,
    title: t('getStarted.professionalDevelopment'),
    description: t('getStarted.professionalDevelopmentDesc'),
    duration: `4-6 ${t('getStarted.weeks')}`,
    courses: 10,
    progress: 0,
    color: 'bg-green-500',
    progressColor: 'bg-green-500',
    icon: Briefcase
  },
  {
    id: 4,
    title: t('getStarted.safetyWellness'),
    description: t('getStarted.safetyWellnessDesc'),
    duration: `2-3 ${t('getStarted.weeks')}`,
    courses: 6,
    progress: 0,
    color: 'bg-orange-500',
    progressColor: 'bg-orange-500',
    icon: Heart
  }
])

const helpResources = computed(() => [
  {
    id: 1,
    title: t('getStarted.userGuide'),
    description: t('getStarted.userGuideDesc'),
    icon: FileText
  },
  {
    id: 2,
    title: t('getStarted.videoTutorials'),
    description: t('getStarted.videoTutorialsDesc'),
    icon: Video
  },
  {
    id: 3,
    title: t('getStarted.communityForum'),
    description: t('getStarted.communityForumDesc'),
    icon: MessageCircle
  },
  {
    id: 4,
    title: t('getStarted.contactSupport'),
    description: t('getStarted.contactSupportDesc'),
    icon: Phone
  }
])

const navigateToStep = (route: string) => {
  router.push({ name: route })
}
</script>