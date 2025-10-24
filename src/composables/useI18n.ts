import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

interface Translations {
  [key: string]: {
    [lang: string]: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.reports': {
    'en': 'Reports',
    'es': 'Reportes',
    'fr': 'Rapports',
    'de': 'Berichte'
  },
  'nav.library': {
    'en': 'Library',
    'es': 'Biblioteca',
    'fr': 'Bibliothèque',
    'de': 'Bibliothek'
  },
  'nav.people': {
    'en': 'People',
    'es': 'Personas',
    'fr': 'Personnes',
    'de': 'Personen'
  },
  'nav.activities': {
    'en': 'Activities',
    'es': 'Actividades',
    'fr': 'Activités',
    'de': 'Aktivitäten'
  },
  'nav.settings': {
    'en': 'Settings',
    'es': 'Configuración',
    'fr': 'Paramètres',
    'de': 'Einstellungen'
  },
  'nav.getStarted': {
    'en': 'Get Started',
    'es': 'Comenzar',
    'fr': 'Commencer',
    'de': 'Loslegen'
  },

  // Settings
  'settings.profile': {
    'en': 'Profile Settings',
    'es': 'Configuración de Perfil',
    'fr': 'Paramètres de Profil',
    'de': 'Profil-Einstellungen'
  },
  'settings.notifications': {
    'en': 'Notification Settings',
    'es': 'Configuración de Notificaciones',
    'fr': 'Paramètres de Notification',
    'de': 'Benachrichtigungseinstellungen'
  },
  'settings.appearance': {
    'en': 'Appearance',
    'es': 'Apariencia',
    'fr': 'Apparence',
    'de': 'Erscheinungsbild'
  },
  'settings.theme': {
    'en': 'Theme',
    'es': 'Tema',
    'fr': 'Thème',
    'de': 'Design'
  },
  'settings.language': {
    'en': 'Language',
    'es': 'Idioma',
    'fr': 'Langue',
    'de': 'Sprache'
  },
  'settings.timezone': {
    'en': 'Timezone',
    'es': 'Zona Horaria',
    'fr': 'Fuseau Horaire',
    'de': 'Zeitzone'
  },

  // Theme options
  'theme.light': {
    'en': 'Light',
    'es': 'Claro',
    'fr': 'Clair',
    'de': 'Hell'
  },
  'theme.dark': {
    'en': 'Dark',
    'es': 'Oscuro',
    'fr': 'Sombre',
    'de': 'Dunkel'
  },
  'theme.auto': {
    'en': 'Auto (System)',
    'es': 'Auto (Sistema)',
    'fr': 'Auto (Système)',
    'de': 'Auto (System)'
  },

  // Common
  'common.save': {
    'en': 'Save Changes',
    'es': 'Guardar Cambios',
    'fr': 'Enregistrer les Modifications',
    'de': 'Änderungen Speichern'
  },
  'common.cancel': {
    'en': 'Cancel',
    'es': 'Cancelar',
    'fr': 'Annuler',
    'de': 'Abbrechen'
  }
}

export function useI18n() {
  const settingsStore = useSettingsStore()

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation key "${key}" not found`)
      return key
    }

    const currentLang = settingsStore.language
    return translation[currentLang] || translation['en'] || key
  }

  const currentLanguage = computed(() => settingsStore.language)

  return {
    t,
    currentLanguage
  }
}