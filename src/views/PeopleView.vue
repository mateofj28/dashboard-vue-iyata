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
          title="People"
          @toggle-mobile-menu="showMobileMenu = !showMobileMenu" 
        />
        
        <!-- People Content -->
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <!-- Search and Filters -->
          <div class="mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="relative">
                <Search :size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search people by name, department, or role..."
                  class="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="flex items-center space-x-4">
                <select 
                  v-model="selectedDepartment"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="operations">Operations</option>
                </select>
                <select 
                  v-model="selectedStatus"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total People</p>
                  <p class="text-3xl font-bold text-gray-900">{{ peopleStats.total }}</p>
                </div>
                <Users :size="24" class="text-blue-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Active Users</p>
                  <p class="text-3xl font-bold text-gray-900">{{ peopleStats.active }}</p>
                </div>
                <UserCheck :size="24" class="text-green-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Departments</p>
                  <p class="text-3xl font-bold text-gray-900">{{ peopleStats.departments }}</p>
                </div>
                <Building :size="24" class="text-purple-500" />
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Avg. Completion</p>
                  <p class="text-3xl font-bold text-gray-900">{{ peopleStats.avgCompletion }}%</p>
                </div>
                <TrendingUp :size="24" class="text-orange-500" />
              </div>
            </div>
          </div>

          <!-- People Table -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Team Members</h3>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Person
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="person in filteredPeople" 
                    :key="person.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img 
                          :src="person.avatar" 
                          :alt="person.name"
                          class="w-10 h-10 rounded-full object-cover"
                        />
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ person.name }}</div>
                          <div class="text-sm text-gray-500">{{ person.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ person.department }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ person.role }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
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
                        <span class="text-sm font-medium text-gray-900">{{ person.progress }}%</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ person.lastActive }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        person.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      ]">
                        {{ person.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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