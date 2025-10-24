<template>
  <div class="min-h-screen bg-gray-50">
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
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <Header 
          title="Settings"
          :show-filters="false"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- Settings Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <div class="max-w-4xl mx-auto space-y-8">
            
            <!-- Profile Settings -->
            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <User :size="20" class="mr-2" />
                  Profile Settings
                </h3>
              </div>
              <div class="p-6">
                <div class="flex items-center space-x-6 mb-6">
                  <div class="relative">
                    <img 
                      :src="userProfile.avatar" 
                      :alt="userProfile.name"
                      class="w-20 h-20 rounded-full object-cover"
                    />
                    <button class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                      <Camera :size="16" />
                    </button>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold text-gray-900">{{ userProfile.name }}</h4>
                    <p class="text-gray-600">{{ userProfile.role }}</p>
                    <p class="text-sm text-gray-500">{{ userProfile.email }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      v-model="userProfile.name"
                      type="text" 
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      v-model="userProfile.email"
                      type="email" 
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select 
                      v-model="userProfile.department"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">Human Resources</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input 
                      v-model="userProfile.role"
                      type="text" 
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <Bell :size="20" class="mr-2" />
                  Notification Settings
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p class="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="notifications.email" 
                      type="checkbox" 
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Push Notifications</h4>
                    <p class="text-sm text-gray-500">Receive push notifications in browser</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="notifications.push" 
                      type="checkbox" 
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Course Reminders</h4>
                    <p class="text-sm text-gray-500">Get reminded about incomplete courses</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="notifications.courseReminders" 
                      type="checkbox" 
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Appearance Settings -->
            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <Palette :size="20" class="mr-2" />
                  Appearance
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select 
                    v-model="appearance.theme"
                    class="w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select 
                    v-model="appearance.language"
                    class="w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end space-x-4">
              <button class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button 
                @click="saveSettings"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
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
  Settings,
  User,
  Bell,
  Palette,
  Camera
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

const showMobileMenu = ref(false)

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

// Notification settings
const notifications = ref({
  email: true,
  push: true,
  courseReminders: true
})

// Appearance settings
const appearance = ref({
  theme: 'light',
  language: 'en'
})

const saveSettings = () => {
  alert('Settings saved successfully!')
}
</script>