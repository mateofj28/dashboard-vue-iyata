import { computed, ref, watch } from 'vue'
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
  'nav.support': {
    'en': 'Support',
    'es': 'Soporte',
    'fr': 'Support',
    'de': 'Support'
  },

  // People View
  'people.title': {
    'en': 'People',
    'es': 'Personas',
    'fr': 'Personnes',
    'de': 'Personen'
  },
  'people.search': {
    'en': 'Search people...',
    'es': 'Buscar personas...',
    'fr': 'Rechercher des personnes...',
    'de': 'Personen suchen...'
  },
  'people.allDepartments': {
    'en': 'All Departments',
    'es': 'Todos los Departamentos',
    'fr': 'Tous les Départements',
    'de': 'Alle Abteilungen'
  },
  'people.allStatus': {
    'en': 'All Status',
    'es': 'Todos los Estados',
    'fr': 'Tous les Statuts',
    'de': 'Alle Status'
  },
  'people.totalPeople': {
    'en': 'Total People',
    'es': 'Total de Personas',
    'fr': 'Total des Personnes',
    'de': 'Gesamtpersonen'
  },
  'people.activeUsers': {
    'en': 'Active Users',
    'es': 'Usuarios Activos',
    'fr': 'Utilisateurs Actifs',
    'de': 'Aktive Benutzer'
  },
  'people.departments': {
    'en': 'Departments',
    'es': 'Departamentos',
    'fr': 'Départements',
    'de': 'Abteilungen'
  },
  'people.avgCompletion': {
    'en': 'Avg. Completion',
    'es': 'Promedio de Finalización',
    'fr': 'Achèvement Moyen',
    'de': 'Durchschnittliche Fertigstellung'
  },
  'people.teamMembers': {
    'en': 'Team Members',
    'es': 'Miembros del Equipo',
    'fr': 'Membres de l\'Équipe',
    'de': 'Teammitglieder'
  },
  'people.person': {
    'en': 'Person',
    'es': 'Persona',
    'fr': 'Personne',
    'de': 'Person'
  },
  'people.department': {
    'en': 'Department',
    'es': 'Departamento',
    'fr': 'Département',
    'de': 'Abteilung'
  },
  'people.role': {
    'en': 'Role',
    'es': 'Rol',
    'fr': 'Rôle',
    'de': 'Rolle'
  },
  'people.progress': {
    'en': 'Progress',
    'es': 'Progreso',
    'fr': 'Progrès',
    'de': 'Fortschritt'
  },
  'people.lastActive': {
    'en': 'Last Active',
    'es': 'Última Actividad',
    'fr': 'Dernière Activité',
    'de': 'Zuletzt Aktiv'
  },
  'people.status': {
    'en': 'Status',
    'es': 'Estado',
    'fr': 'Statut',
    'de': 'Status'
  },

  // Activities View
  'activities.title': {
    'en': 'Activities',
    'es': 'Actividades',
    'fr': 'Activités',
    'de': 'Aktivitäten'
  },
  'activities.allActivities': {
    'en': 'All Activities',
    'es': 'Todas las Actividades',
    'fr': 'Toutes les Activités',
    'de': 'Alle Aktivitäten'
  },
  'activities.courses': {
    'en': 'Courses',
    'es': 'Cursos',
    'fr': 'Cours',
    'de': 'Kurse'
  },
  'activities.assessments': {
    'en': 'Assessments',
    'es': 'Evaluaciones',
    'fr': 'Évaluations',
    'de': 'Bewertungen'
  },
  'activities.discussions': {
    'en': 'Discussions',
    'es': 'Discusiones',
    'fr': 'Discussions',
    'de': 'Diskussionen'
  },
  'activities.totalActivities': {
    'en': 'Total Activities',
    'es': 'Total de Actividades',
    'fr': 'Total des Activités',
    'de': 'Gesamtaktivitäten'
  },
  'activities.completedToday': {
    'en': 'Completed Today',
    'es': 'Completadas Hoy',
    'fr': 'Terminées Aujourd\'hui',
    'de': 'Heute Abgeschlossen'
  },
  'activities.inProgress': {
    'en': 'In Progress',
    'es': 'En Progreso',
    'fr': 'En Cours',
    'de': 'In Bearbeitung'
  },
  'activities.avgDuration': {
    'en': 'Avg. Duration',
    'es': 'Duración Promedio',
    'fr': 'Durée Moyenne',
    'de': 'Durchschnittsdauer'
  },
  'activities.recentActivities': {
    'en': 'Recent Activities',
    'es': 'Actividades Recientes',
    'fr': 'Activités Récentes',
    'de': 'Aktuelle Aktivitäten'
  },

  // Library View
  'library.title': {
    'en': 'Library',
    'es': 'Biblioteca',
    'fr': 'Bibliothèque',
    'de': 'Bibliothek'
  },
  'library.search': {
    'en': 'Search courses, topics, or content...',
    'es': 'Buscar cursos, temas o contenido...',
    'fr': 'Rechercher des cours, sujets ou contenu...',
    'de': 'Kurse, Themen oder Inhalte suchen...'
  },
  'library.allCategories': {
    'en': 'All Categories',
    'es': 'Todas las Categorías',
    'fr': 'Toutes les Catégories',
    'de': 'Alle Kategorien'
  },
  'library.totalCourses': {
    'en': 'Total Courses',
    'es': 'Total de Cursos',
    'fr': 'Total des Cours',
    'de': 'Gesamtkurse'
  },
  'library.completed': {
    'en': 'Completed',
    'es': 'Completados',
    'fr': 'Terminés',
    'de': 'Abgeschlossen'
  },
  'library.avgScore': {
    'en': 'Avg. Score',
    'es': 'Puntuación Promedio',
    'fr': 'Score Moyen',
    'de': 'Durchschnittliche Punktzahl'
  },

  // Get Started View
  'getStarted.title': {
    'en': 'Get Started',
    'es': 'Comenzar',
    'fr': 'Commencer',
    'de': 'Loslegen'
  },
  'getStarted.welcome': {
    'en': 'Welcome to Tesla Learning Platform',
    'es': 'Bienvenido a la Plataforma de Aprendizaje Tesla',
    'fr': 'Bienvenue sur la Plateforme d\'Apprentissage Tesla',
    'de': 'Willkommen bei der Tesla Lernplattform'
  },
  'getStarted.subtitle': {
    'en': 'Get started with your learning journey in just a few steps',
    'es': 'Comienza tu viaje de aprendizaje en solo unos pasos',
    'fr': 'Commencez votre parcours d\'apprentissage en quelques étapes',
    'de': 'Beginnen Sie Ihre Lernreise in nur wenigen Schritten'
  },
  'getStarted.helpResources': {
    'en': 'Help & Resources',
    'es': 'Ayuda y Recursos',
    'fr': 'Aide et Ressources',
    'de': 'Hilfe & Ressourcen'
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

  // Departments
  'departments.engineering': {
    'en': 'Engineering',
    'es': 'Ingeniería',
    'fr': 'Ingénierie',
    'de': 'Ingenieurwesen'
  },
  'departments.marketing': {
    'en': 'Marketing',
    'es': 'Marketing',
    'fr': 'Marketing',
    'de': 'Marketing'
  },
  'departments.sales': {
    'en': 'Sales',
    'es': 'Ventas',
    'fr': 'Ventes',
    'de': 'Vertrieb'
  },
  'departments.hr': {
    'en': 'Human Resources',
    'es': 'Recursos Humanos',
    'fr': 'Ressources Humaines',
    'de': 'Personalwesen'
  },
  'departments.operations': {
    'en': 'Operations',
    'es': 'Operaciones',
    'fr': 'Opérations',
    'de': 'Betrieb'
  },

  // Status
  'status.active': {
    'en': 'Active',
    'es': 'Activo',
    'fr': 'Actif',
    'de': 'Aktiv'
  },
  'status.inactive': {
    'en': 'Inactive',
    'es': 'Inactivo',
    'fr': 'Inactif',
    'de': 'Inaktiv'
  },
  'status.completed': {
    'en': 'Completed',
    'es': 'Completado',
    'fr': 'Terminé',
    'de': 'Abgeschlossen'
  },
  'status.inProgress': {
    'en': 'In Progress',
    'es': 'En Progreso',
    'fr': 'En Cours',
    'de': 'In Bearbeitung'
  },
  'status.pending': {
    'en': 'Pending',
    'es': 'Pendiente',
    'fr': 'En Attente',
    'de': 'Ausstehend'
  },
  'status.failed': {
    'en': 'Failed',
    'es': 'Fallido',
    'fr': 'Échoué',
    'de': 'Fehlgeschlagen'
  },

  // Categories
  'categories.security': {
    'en': 'Security',
    'es': 'Seguridad',
    'fr': 'Sécurité',
    'de': 'Sicherheit'
  },
  'categories.safety': {
    'en': 'Safety',
    'es': 'Seguridad',
    'fr': 'Sécurité',
    'de': 'Sicherheit'
  },
  'categories.compliance': {
    'en': 'Compliance',
    'es': 'Cumplimiento',
    'fr': 'Conformité',
    'de': 'Compliance'
  },
  'categories.networking': {
    'en': 'Networking',
    'es': 'Redes',
    'fr': 'Réseautage',
    'de': 'Netzwerk'
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
  },
  'common.total': {
    'en': 'Total',
    'es': 'Total',
    'fr': 'Total',
    'de': 'Gesamt'
  },
  'common.today': {
    'en': 'Today',
    'es': 'Hoy',
    'fr': 'Aujourd\'hui',
    'de': 'Heute'
  },
  'common.progress': {
    'en': 'Progress',
    'es': 'Progreso',
    'fr': 'Progrès',
    'de': 'Fortschritt'
  },
  'common.avg': {
    'en': 'Avg',
    'es': 'Prom',
    'fr': 'Moy',
    'de': 'Ø'
  }
}

export function useI18n() {
  const settingsStore = useSettingsStore()

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      return key
    }

    const currentLang = settingsStore.language
    return translation[currentLang] || translation['en'] || key
  }

  return {
    t
  }
}