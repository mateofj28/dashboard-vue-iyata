export interface DashboardStats {
  activeUsers: number
  totalUsers: number
  questionsAnswered: number
  averageSessionLength: string
}

export interface KnowledgeStats {
  startingKnowledge: number
  currentKnowledge: number
  knowledgeGain: number
}

export interface TopicData {
  id: string
  name: string
  icon: string
  percentage: number
  status: 'weak' | 'strong'
  color: string
}

export interface UserLeaderboard {
  id: string
  name: string
  avatar: string
  points: number
  percentage: number
  rank: number
  trend: 'up' | 'down' | 'same'
}

export interface GroupLeaderboard {
  id: string
  name: string
  points: number
  users: number
  percentage: number
  rank: number
  trend: 'up' | 'down' | 'same'
}

export interface ActivityData {
  month: string
  value: number
}

export interface FilterOption {
  label: string
  value: string
}