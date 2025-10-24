import { defineStore } from 'pinia'

export interface SettingsState {
  theme: 'light' | 'dark' | 'auto'
  language: 'en' | 'es' | 'fr' | 'de'
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    courseReminders: boolean
    weeklyReports: boolean
  }
  privacy: {
    dataSharing: boolean
    activityTracking: boolean
  }
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-8',
    notifications: {
      email: true,
      push: true,
      courseReminders: true,
      weeklyReports: false
    },
    privacy: {
      dataSharing: false,
      activityTracking: true
    }
  }),

  getters: {
    isDarkMode: (state) => {
      if (state.theme === 'auto') {
        if (typeof window !== 'undefined') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
      }
      return state.theme === 'dark'
    },

    currentLanguageLabel: (state) => {
      const labels = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch'
      }
      return labels[state.language]
    }
  },

  actions: {
    updateTheme(theme: 'light' | 'dark' | 'auto') {
      this.theme = theme
      this.applyTheme()
      this.saveToLocalStorage()
    },

    updateLanguage(language: 'en' | 'es' | 'fr' | 'de') {
      this.language = language
      this.saveToLocalStorage()
      // Aquí podrías integrar con vue-i18n
      console.log(`Language changed to: ${language}`)
    },

    updateTimezone(timezone: string) {
      this.timezone = timezone
      this.saveToLocalStorage()
    },

    updateNotifications(notifications: Partial<SettingsState['notifications']>) {
      this.notifications = { ...this.notifications, ...notifications }
      this.saveToLocalStorage()
    },

    updatePrivacy(privacy: Partial<SettingsState['privacy']>) {
      this.privacy = { ...this.privacy, ...privacy }
      this.saveToLocalStorage()
    },

    applyTheme() {
      const isDark = this.isDarkMode
      const html = document.documentElement
      const body = document.body
      
      console.log(`Applying theme: ${this.theme}, isDark: ${isDark}`)
      
      if (isDark) {
        html.classList.add('dark')
        body.classList.add('dark')
        console.log('Added dark class to html and body')
      } else {
        html.classList.remove('dark')
        body.classList.remove('dark')
        console.log('Removed dark class from html and body')
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('tesla-dashboard-settings', JSON.stringify(this.$state))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('tesla-dashboard-settings')
      if (saved) {
        try {
          const settings = JSON.parse(saved)
          this.$patch(settings)
          this.applyTheme()
        } catch (error) {
          console.error('Error loading settings from localStorage:', error)
        }
      }
    },

    initializeSettings() {
      console.log('Initializing settings...')
      this.loadFromLocalStorage()
      
      // Apply theme after a small delay to ensure DOM is ready
      setTimeout(() => {
        this.applyTheme()
      }, 100)
      
      // Listen for system theme changes when in auto mode
      if (typeof window !== 'undefined' && this.theme === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (this.theme === 'auto') {
            this.applyTheme()
          }
        })
      }
    }
  }
})