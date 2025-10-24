<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Mobile Sidebar Overlay -->
      <div v-if="showMobileMenu" class="fixed inset-0 z-50 lg:hidden" @click="showMobileMenu = false">
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
            <RouterLink v-for="item in menuItems" :key="item.name" :to="item.route" :class="[
              'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
              $route.name === item.route.name
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            ]" @click="showMobileMenu = false">
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>

          <!-- Support Section -->
          <div class="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Support</div>
            <RouterLink v-for="item in supportItems" :key="item.name" :to="item.route" :class="[
              'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
              $route.name === item.route.name
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            ]" @click="showMobileMenu = false">
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <Header title="Settings" :show-filters="false" @toggle-mobile-menu="showMobileMenu = !showMobileMenu" />

        <!-- Settings Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <div class="max-w-4xl mx-auto space-y-8">

            <!-- Profile Settings -->
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <User :size="20" class="mr-2" />
                  Profile Settings
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-center space-x-6 mb-6">
                  <div class="relative">
                    <img :src="userProfile.avatar" :alt="userProfile.name"
                      class="w-20 h-20 rounded-full object-cover" />
                    <button
                      class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                      <Camera :size="16" />
                    </button>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold text-gray-900 dark:text-white">{{ userProfile.name }}</h4>
                    <p class="text-gray-600 dark:text-gray-400">{{ userProfile.role }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ userProfile.email }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input v-model="userProfile.name" type="text"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input v-model="userProfile.email" type="email"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                    <select v-model="userProfile.department"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">Human Resources</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                    <input v-model="userProfile.role" type="text"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Bell :size="20" class="mr-2" />
                  {{ t('settings.notifications') }}
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.email" type="checkbox" class="sr-only peer"
                      @change="settingsStore.updateNotifications({ email: ($event.target as HTMLInputElement).checked })" />
                    <div
                      class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in browser</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.push" type="checkbox" class="sr-only peer"
                      @change="settingsStore.updateNotifications({ push: ($event.target as HTMLInputElement).checked })" />
                    <div
                      class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">Course Reminders</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Get reminded about incomplete courses</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.courseReminders" type="checkbox" class="sr-only peer"
                      @change="settingsStore.updateNotifications({ courseReminders: ($event.target as HTMLInputElement).checked })" />
                    <div
                      class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>

                <!-- Privacy & Security -->
                <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Shield :size="16" class="mr-2" />
                    Privacy & Security
                  </h4>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h5 class="text-sm font-medium text-gray-900 dark:text-white">Data Sharing</h5>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Allow anonymous usage data collection</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="privacy.dataSharing" type="checkbox" class="sr-only peer"
                          @change="settingsStore.updatePrivacy({ dataSharing: ($event.target as HTMLInputElement).checked })" />
                        <div
                          class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                        </div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h5 class="text-sm font-medium text-gray-900 dark:text-white">Activity Tracking</h5>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Track learning progress and activity</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="privacy.activityTracking" type="checkbox" class="sr-only peer"
                          @change="settingsStore.updatePrivacy({ activityTracking: ($event.target as HTMLInputElement).checked })" />
                        <div
                          class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Appearance Settings -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Palette :size="20" class="mr-2" />
                  {{ t('settings.appearance') }}
                </h3>
              </div>
              <div class="p-6 space-y-6">
                <!-- Theme Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {{ t('settings.theme') }}
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div v-for="option in themeOptions" :key="option.value" :class="[
                      'relative flex items-center p-3 border rounded-lg cursor-pointer transition-all',
                      theme === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    ]" @click="theme = option.value as 'light' | 'dark' | 'auto'">
                      <component :is="option.icon" :size="20" class="mr-3 text-gray-600 dark:text-gray-400" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option.label }}</span>
                      <div v-if="theme === option.value"
                        class="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <!-- Language Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {{ t('settings.language') }}
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div v-for="option in languageOptions" :key="option.value" :class="[
                      'relative flex items-center p-3 border rounded-lg cursor-pointer transition-all',
                      language === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    ]" @click="language = option.value as 'en' | 'es' | 'fr' | 'de'">
                      <span class="text-lg mr-3">{{ option.flag }}</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option.label }}</span>
                      <div v-if="language === option.value"
                        class="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <!-- Timezone Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('settings.timezone') }}
                  </label>
                  <select v-model="timezone"
                    class="w-full md:w-64 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option v-for="option in timezoneOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Debug Info -->
            <div
              class="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-4">
              <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h4>
              <p class="text-sm text-yellow-700 dark:text-yellow-300">
                Current theme: {{ settingsStore.theme }} |
                Is Dark Mode: {{ settingsStore.isDarkMode }} |
                HTML has dark class: {{ hasDarkClass }}
              </p>
              <button @click="testDarkMode"
                class="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                Test Dark Mode Toggle
              </button>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end space-x-4">
              <button
                class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                {{ t('common.cancel') }}
              </button>
              <button @click="saveSettings"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {{ t('common.save') }}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  BarChart3,
  Library,
  Users,
  Activity,
  HelpCircle,
  Settings,
  User,
  Bell,
  Palette,
  Camera,
  Shield,
  Moon,
  Sun,
  Monitor
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from '@/composables/useI18n'

const showMobileMenu = ref(false)
const settingsStore = useSettingsStore()
const { t } = useI18n()

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

// User profile data
const userProfile = ref({
  name: 'Jesse Thomas',
  email: 'jesse.thomas@tesla.com',
  role: 'Senior Developer',
  department: 'engineering',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
})

// Computed properties for settings
const theme = computed({
  get: () => settingsStore.theme,
  set: (value) => settingsStore.updateTheme(value)
})

const language = computed({
  get: () => settingsStore.language,
  set: (value) => settingsStore.updateLanguage(value)
})

const timezone = computed({
  get: () => settingsStore.timezone,
  set: (value) => settingsStore.updateTimezone(value)
})

const notifications = computed({
  get: () => settingsStore.notifications,
  set: (value) => settingsStore.updateNotifications(value)
})

const privacy = computed({
  get: () => settingsStore.privacy,
  set: (value) => settingsStore.updatePrivacy(value)
})

// Computed property for debug info
const hasDarkClass = computed(() => {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark')
  }
  return false
})

// Theme options with icons
const themeOptions = [
  { value: 'light', label: t('theme.light'), icon: Sun },
  { value: 'dark', label: t('theme.dark'), icon: Moon },
  { value: 'auto', label: t('theme.auto'), icon: Monitor }
]

// Language options
const languageOptions = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' }
]

// Timezone options
const timezoneOptions = [
  { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
  { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
  { value: 'UTC+0', label: 'Greenwich Mean Time (UTC+0)' },
  { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
  { value: 'UTC+2', label: 'Central European Summer Time (UTC+2)' }
]

// Functions
const saveSettings = () => {
  const message = settingsStore.language === 'es' ? '¡Configuración guardada exitosamente!' :
    settingsStore.language === 'fr' ? 'Paramètres enregistrés avec succès!' :
      settingsStore.language === 'de' ? 'Einstellungen erfolgreich gespeichert!' :
        'Settings saved successfully!'
  alert(message)
}

const testDarkMode = () => {
  console.log('Testing dark mode toggle...')
  const currentTheme = settingsStore.theme
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  console.log(`Changing from ${currentTheme} to ${newTheme}`)
  settingsStore.updateTheme(newTheme)
}

// Initialize settings on mount
onMounted(() => {
  settingsStore.initializeSettings()
})
</script>