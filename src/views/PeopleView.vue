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
          title="Personas"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- People Content -->
        <main class="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          <!-- Search and Filters -->
          <div class="mb-4 sm:mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div class="relative sm:flex-1 sm:max-w-sm">
                <Search :size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar personas..."
                  class="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select 
                  v-model="selectedDepartment"
                  class="w-full sm:w-48 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos los Departamentos</option>
                  <option value="engineering">Ingeniería</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Ventas</option>
                  <option value="hr">Recursos Humanos</option>
                  <option value="operations">Operaciones</option>
                </select>
                <select 
                  v-model="selectedStatus"
                  class="w-full sm:w-32 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Total</span>
                    <span class="hidden sm:inline">Total de Personas</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ peopleStats.total }}</p>
                </div>
                <Users :size="16" class="text-blue-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Activos</span>
                    <span class="hidden sm:inline">Usuarios Activos</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ peopleStats.active }}</p>
                </div>
                <UserCheck :size="16" class="text-green-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Departamentos</span>
                    <span class="hidden sm:inline">Departamentos</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ peopleStats.departments }}</p>
                </div>
                <Building :size="16" class="text-purple-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span class="sm:hidden">Promedio</span>
                    <span class="hidden sm:inline">Promedio de Finalización</span>
                  </p>
                  <p class="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ peopleStats.avgCompletion }}%</p>
                </div>
                <TrendingUp :size="16" class="text-orange-500 flex-shrink-0 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
          </div>

          <!-- People Table/Cards -->
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Miembros del Equipo</h3>
            </div>
            
            <!-- Desktop Table View -->
            <div class="hidden lg:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Persona
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Departamento
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rol
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Progreso
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Última Actividad
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr 
                    v-for="person in filteredPeople" 
                    :key="person.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img 
                          :src="person.avatar" 
                          :alt="person.name"
                          class="w-10 h-10 rounded-full object-cover"
                        />
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 dark:text-white">{{ person.name }}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{{ person.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ person.department }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ person.role }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                          <div 
                            :class="[
                              'h-2 rounded-full',
                              person.progress >= 80 ? 'bg-green-500' :
                              person.progress >= 60 ? 'bg-blue-500' :
                              person.progress >= 40 ? 'bg-orange-500' : 'bg-red-500'
                            ]"
                            :style="{ width: `${person.progress}%` }"
                          ></div>
                        </div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ person.progress }}%</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ person.lastActive }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        person.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      ]">
                        {{ person.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Cards View -->
            <div class="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
              <div 
                v-for="person in filteredPeople" 
                :key="person.id"
                class="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-start space-x-3">
                  <img 
                    :src="person.avatar" 
                    :alt="person.name"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ person.name }}</h4>
                        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{{ person.email }}</p>
                        <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span class="truncate block sm:inline">{{ person.department }}</span>
                          <span class="hidden sm:inline"> • </span>
                          <span class="truncate block sm:inline">{{ person.role }}</span>
                        </div>
                      </div>
                      <span :class="[
                        'inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full flex-shrink-0',
                        person.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      ]">
                        {{ person.status }}
                      </span>
                    </div>
                    
                    <div class="mt-2 sm:mt-3">
                      <div class="flex items-center">
                        <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2 mr-2 sm:mr-3">
                          <div 
                            :class="[
                              'h-1.5 sm:h-2 rounded-full',
                              person.progress >= 80 ? 'bg-green-500' :
                              person.progress >= 60 ? 'bg-blue-500' :
                              person.progress >= 40 ? 'bg-orange-500' : 'bg-red-500'
                            ]"
                            :style="{ width: `${person.progress}%` }"
                          ></div>
                        </div>
                        <span class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white flex-shrink-0">{{ person.progress }}%</span>
                      </div>
                    </div>
                    
                    <div class="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {{ person.lastActive }}
                    </div>
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
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  BarChart3, 
  Library, 
  Users, 
  Activity, 
  HelpCircle, 
  Settings,
  Search,
  UserCheck,
  Building,
  TrendingUp
} from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const showMobileMenu = ref(false)
const searchQuery = ref('')
const selectedDepartment = ref('all')
const selectedStatus = ref('all')

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

const peopleStats = ref({
  total: 127,
  active: 98,
  departments: 5,
  avgCompletion: 76
})

const people = ref([
  {
    id: 1,
    name: 'Jesse Thomas',
    email: 'jesse.thomas@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    department: 'Engineering',
    role: 'Senior Developer',
    progress: 88,
    lastActive: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    name: 'Thisal Mathiyazhagan',
    email: 'thisal.m@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    department: 'Engineering',
    role: 'Software Engineer',
    progress: 89,
    lastActive: '1 day ago',
    status: 'active'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    department: 'Marketing',
    role: 'Marketing Manager',
    progress: 92,
    lastActive: '3 hours ago',
    status: 'active'
  },
  {
    id: 4,
    name: 'Michael Chen',
    email: 'michael.chen@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face',
    department: 'Sales',
    role: 'Sales Representative',
    progress: 67,
    lastActive: '5 hours ago',
    status: 'active'
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    department: 'HR',
    role: 'HR Specialist',
    progress: 95,
    lastActive: '1 hour ago',
    status: 'active'
  },
  {
    id: 6,
    name: 'David Wilson',
    email: 'david.wilson@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    department: 'Operations',
    role: 'Operations Manager',
    progress: 43,
    lastActive: '2 weeks ago',
    status: 'inactive'
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    department: 'Engineering',
    role: 'UX Designer',
    progress: 78,
    lastActive: '4 hours ago',
    status: 'active'
  },
  {
    id: 8,
    name: 'James Brown',
    email: 'james.brown@tesla.com',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face',
    department: 'Sales',
    role: 'Sales Manager',
    progress: 85,
    lastActive: '6 hours ago',
    status: 'active'
  }
])

const filteredPeople = computed(() => {
  let filtered = people.value

  if (searchQuery.value) {
    filtered = filtered.filter(person => 
      person.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedDepartment.value !== 'all') {
    filtered = filtered.filter(person => 
      person.department.toLowerCase() === selectedDepartment.value.toLowerCase()
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(person => 
      person.status === selectedStatus.value
    )
  }

  return filtered
})
</script>