import { defineStore } from 'pinia'
import type { 
  DashboardStats, 
  KnowledgeStats, 
  TopicData, 
  UserLeaderboard, 
  GroupLeaderboard,
  ActivityData,
  FilterOption
} from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    // Current filters
    currentTimeframe: 'all-time',
    currentPeople: 'all',
    currentTopic: 'all',
    
    // Base data sets for different filters
    baseData: {
      'all-time': {
        stats: {
          activeUsers: 27,
          totalUsers: 90,
          questionsAnswered: 3298,
          averageSessionLength: '2m 34s'
        },
        knowledge: {
          startingKnowledge: 64,
          currentKnowledge: 86,
          knowledgeGain: 34
        },
        activityData: [
          { month: 'Jan', value: 200 },
          { month: 'Feb', value: 250 },
          { month: 'Mar', value: 300 },
          { month: 'Apr', value: 280 },
          { month: 'May', value: 350 },
          { month: 'Jun', value: 320 },
          { month: 'Jul', value: 400 },
          { month: 'Aug', value: 380 },
          { month: 'Sep', value: 450 },
          { month: 'Oct', value: 420 },
          { month: 'Nov', value: 480 },
          { month: 'Dec', value: 500 }
        ]
      },
      '30d': {
        stats: {
          activeUsers: 23,
          totalUsers: 90,
          questionsAnswered: 1847,
          averageSessionLength: '3m 12s'
        },
        knowledge: {
          startingKnowledge: 68,
          currentKnowledge: 89,
          knowledgeGain: 21
        },
        activityData: [
          { month: 'Week 1', value: 120 },
          { month: 'Week 2', value: 180 },
          { month: 'Week 3', value: 220 },
          { month: 'Week 4', value: 190 }
        ]
      },
      '7d': {
        stats: {
          activeUsers: 19,
          totalUsers: 90,
          questionsAnswered: 456,
          averageSessionLength: '4m 8s'
        },
        knowledge: {
          startingKnowledge: 72,
          currentKnowledge: 91,
          knowledgeGain: 19
        },
        activityData: [
          { month: 'Mon', value: 45 },
          { month: 'Tue', value: 67 },
          { month: 'Wed', value: 89 },
          { month: 'Thu', value: 78 },
          { month: 'Fri', value: 92 },
          { month: 'Sat', value: 34 },
          { month: 'Sun', value: 51 }
        ]
      }
    },
    
    stats: {
      activeUsers: 27,
      totalUsers: 90,
      questionsAnswered: 3298,
      averageSessionLength: '2m 34s'
    } as DashboardStats,
    
    knowledge: {
      startingKnowledge: 64,
      currentKnowledge: 86,
      knowledgeGain: 34
    } as KnowledgeStats,
    
    weakestTopics: [] as TopicData[],
    strongestTopics: [] as TopicData[],
    
    userLeaderboard: [
      {
        id: '1',
        name: 'Jesse Thomas',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        points: 637,
        percentage: 88,
        rank: 1,
        trend: 'up' as const
      },
      {
        id: '2',
        name: 'Thisal Mathiyazhagan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        points: 637,
        percentage: 89,
        rank: 2,
        trend: 'down' as const
      }
    ] as UserLeaderboard[],
    
    groupLeaderboard: [
      {
        id: '1',
        name: 'Houston Facility',
        points: 52,
        users: 1,
        percentage: 97,
        rank: 1,
        trend: 'up' as const
      },
      {
        id: '2',
        name: 'Test Group',
        points: 52,
        users: 1,
        percentage: 95,
        rank: 2,
        trend: 'down' as const
      }
    ] as GroupLeaderboard[],
    
    activityData: [
      { month: 'Jan', value: 200 },
      { month: 'Feb', value: 250 },
      { month: 'Mar', value: 300 },
      { month: 'Apr', value: 280 },
      { month: 'May', value: 350 },
      { month: 'Jun', value: 320 },
      { month: 'Jul', value: 400 },
      { month: 'Aug', value: 380 },
      { month: 'Sep', value: 450 },
      { month: 'Oct', value: 420 },
      { month: 'Nov', value: 480 },
      { month: 'Dec', value: 500 }
    ] as ActivityData[],
    
    timeframeOptions: [
      { label: 'All-time', value: 'all-time' },
      { label: 'Last 30 days', value: '30d' },
      { label: 'Last 7 days', value: '7d' }
    ] as FilterOption[],
    
    peopleOptions: [
      { label: 'All', value: 'all' },
      { label: 'Active Users', value: 'active' },
      { label: 'New Users', value: 'new' }
    ] as FilterOption[],
    
    topicOptions: [
      { label: 'All', value: 'all' },
      { label: 'Security', value: 'security' },
      { label: 'Compliance', value: 'compliance' }
    ] as FilterOption[],
    
    // Topic-specific data
    topicData: {
      'all': {
        weakestTopics: [
          {
            id: '1',
            name: 'Food Safety',
            icon: '',
            percentage: 74,
            status: 'weak' as const,
            color: 'bg-orange-500'
          },
          {
            id: '2',
            name: 'Compliance Basics Procedures',
            icon: '',
            percentage: 62,
            status: 'weak' as const,
            color: 'bg-orange-500'
          },
          {
            id: '3',
            name: 'Company Networking',
            icon: '',
            percentage: 36,
            status: 'weak' as const,
            color: 'bg-red-500'
          }
        ],
        strongestTopics: [
          {
            id: '4',
            name: 'Covid Protocols',
            icon: '',
            percentage: 95,
            status: 'strong' as const,
            color: 'bg-green-500'
          },
          {
            id: '5',
            name: 'Cyber Security Basics',
            icon: '',
            percentage: 92,
            status: 'strong' as const,
            color: 'bg-green-500'
          },
          {
            id: '6',
            name: 'Social Media Policies',
            icon: '',
            percentage: 89,
            status: 'strong' as const,
            color: 'bg-green-500'
          }
        ]
      },
      'security': {
        weakestTopics: [
          {
            id: '1',
            name: 'Password Management',
            icon: '',
            percentage: 58,
            status: 'weak' as const,
            color: 'bg-red-500'
          },
          {
            id: '2',
            name: 'Phishing Detection',
            icon: '',
            percentage: 67,
            status: 'weak' as const,
            color: 'bg-orange-500'
          }
        ],
        strongestTopics: [
          {
            id: '3',
            name: 'Cyber Security Basics',
            icon: '',
            percentage: 92,
            status: 'strong' as const,
            color: 'bg-green-500'
          },
          {
            id: '4',
            name: 'Data Protection',
            icon: '',
            percentage: 88,
            status: 'strong' as const,
            color: 'bg-green-500'
          }
        ]
      },
      'compliance': {
        weakestTopics: [
          {
            id: '1',
            name: 'Compliance Basics Procedures',
            icon: '',
            percentage: 62,
            status: 'weak' as const,
            color: 'bg-orange-500'
          },
          {
            id: '2',
            name: 'Regulatory Requirements',
            icon: '',
            percentage: 54,
            status: 'weak' as const,
            color: 'bg-red-500'
          }
        ],
        strongestTopics: [
          {
            id: '3',
            name: 'Social Media Policies',
            icon: '',
            percentage: 89,
            status: 'strong' as const,
            color: 'bg-green-500'
          },
          {
            id: '4',
            name: 'Code of Conduct',
            icon: '',
            percentage: 85,
            status: 'strong' as const,
            color: 'bg-green-500'
          }
        ]
      }
    }
  }),
  
  getters: {
    activeUsersPercentage: (state) => 
      Math.round((state.stats.activeUsers / state.stats.totalUsers) * 100),
    
    knowledgeGainFormatted: (state) => 
      `+${state.knowledge.knowledgeGain}%`,
    
    currentWeakestTopics: (state) => {
      return state.topicData[state.currentTopic as keyof typeof state.topicData]?.weakestTopics || []
    },
    
    currentStrongestTopics: (state) => {
      return state.topicData[state.currentTopic as keyof typeof state.topicData]?.strongestTopics || []
    }
  },
  
  actions: {
    updateTimeframe(timeframe: string) {
      this.currentTimeframe = timeframe
      const data = this.baseData[timeframe as keyof typeof this.baseData]
      if (data) {
        this.stats = { ...data.stats }
        this.knowledge = { ...data.knowledge }
        this.activityData = [...data.activityData]
      }
    },
    
    updatePeopleFilter(people: string) {
      this.currentPeople = people
      // Simulate different data based on people filter
      if (people === 'active') {
        this.stats.activeUsers = Math.floor(this.stats.totalUsers * 0.8)
        this.stats.questionsAnswered = Math.floor(this.stats.questionsAnswered * 1.2)
      } else if (people === 'new') {
        this.stats.activeUsers = Math.floor(this.stats.totalUsers * 0.3)
        this.stats.questionsAnswered = Math.floor(this.stats.questionsAnswered * 0.4)
      } else {
        // Reset to base data for current timeframe
        const data = this.baseData[this.currentTimeframe as keyof typeof this.baseData]
        if (data) {
          this.stats = { ...data.stats }
        }
      }
    },
    
    updateTopicFilter(topic: string) {
      this.currentTopic = topic
      const topicData = this.topicData[topic as keyof typeof this.topicData]
      if (topicData) {
        this.weakestTopics = [...topicData.weakestTopics]
        this.strongestTopics = [...topicData.strongestTopics]
      }
    },
    
    // Initialize data on store creation
    initializeData() {
      this.updateTopicFilter('all')
      this.updateTimeframe('all-time')
    }
  }
})