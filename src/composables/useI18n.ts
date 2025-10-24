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
  'library.notStarted': {
    'en': 'Not Started',
    'es': 'No Iniciado',
    'fr': 'Non Commencé',
    'de': 'Nicht Begonnen'
  },
  'library.review': {
    'en': 'Review',
    'es': 'Revisar',
    'fr': 'Réviser',
    'de': 'Überprüfen'
  },
  'library.continue': {
    'en': 'Continue',
    'es': 'Continuar',
    'fr': 'Continuer',
    'de': 'Fortsetzen'
  },
  'library.startCourse': {
    'en': 'Start Course',
    'es': 'Iniciar Curso',
    'fr': 'Commencer le Cours',
    'de': 'Kurs Starten'
  },
  'library.enrolled': {
    'en': 'enrolled',
    'es': 'inscritos',
    'fr': 'inscrits',
    'de': 'eingeschrieben'
  },

  // Course titles and descriptions
  'courses.foodSafetyTitle': {
    'en': 'Food Safety Fundamentals',
    'es': 'Fundamentos de Seguridad Alimentaria',
    'fr': 'Fondamentaux de la Sécurité Alimentaire',
    'de': 'Grundlagen der Lebensmittelsicherheit'
  },
  'courses.foodSafetyDesc': {
    'en': 'Learn the essential principles of food safety and hygiene in the workplace.',
    'es': 'Aprende los principios esenciales de seguridad alimentaria e higiene en el lugar de trabajo.',
    'fr': 'Apprenez les principes essentiels de la sécurité alimentaire et de l\'hygiène sur le lieu de travail.',
    'de': 'Lernen Sie die wesentlichen Prinzipien der Lebensmittelsicherheit und Hygiene am Arbeitsplatz.'
  },
  'courses.covidProtocolsTitle': {
    'en': 'Covid Protocols',
    'es': 'Protocolos Covid',
    'fr': 'Protocoles Covid',
    'de': 'Covid-Protokolle'
  },
  'courses.covidProtocolsDesc': {
    'en': 'Comprehensive guide to COVID-19 safety protocols and procedures.',
    'es': 'Guía completa de protocolos y procedimientos de seguridad COVID-19.',
    'fr': 'Guide complet des protocoles et procédures de sécurité COVID-19.',
    'de': 'Umfassender Leitfaden zu COVID-19-Sicherheitsprotokollen und -verfahren.'
  },
  'courses.cyberSecurityTitle': {
    'en': 'Cyber Security Basics',
    'es': 'Fundamentos de Ciberseguridad',
    'fr': 'Bases de la Cybersécurité',
    'de': 'Grundlagen der Cybersicherheit'
  },
  'courses.cyberSecurityDesc': {
    'en': 'Introduction to cybersecurity best practices and threat awareness.',
    'es': 'Introducción a las mejores prácticas de ciberseguridad y conciencia de amenazas.',
    'fr': 'Introduction aux meilleures pratiques de cybersécurité et à la sensibilisation aux menaces.',
    'de': 'Einführung in bewährte Cybersicherheitspraktiken und Bedrohungsbewusstsein.'
  },
  'courses.complianceBasicsTitle': {
    'en': 'Compliance Basics Procedures',
    'es': 'Procedimientos Básicos de Cumplimiento',
    'fr': 'Procédures de Base de Conformité',
    'de': 'Grundlegende Compliance-Verfahren'
  },
  'courses.complianceBasicsDesc': {
    'en': 'Understanding regulatory compliance and organizational procedures.',
    'es': 'Comprensión del cumplimiento regulatorio y procedimientos organizacionales.',
    'fr': 'Comprendre la conformité réglementaire et les procédures organisationnelles.',
    'de': 'Verständnis der regulatorischen Compliance und organisatorischen Verfahren.'
  },
  'courses.socialMediaTitle': {
    'en': 'Social Media Policies',
    'es': 'Políticas de Redes Sociales',
    'fr': 'Politiques des Médias Sociaux',
    'de': 'Social Media Richtlinien'
  },
  'courses.socialMediaDesc': {
    'en': 'Guidelines for appropriate social media use in professional settings.',
    'es': 'Pautas para el uso apropiado de redes sociales en entornos profesionales.',
    'fr': 'Directives pour une utilisation appropriée des médias sociaux dans un cadre professionnel.',
    'de': 'Richtlinien für die angemessene Nutzung sozialer Medien in beruflichen Umgebungen.'
  },
  'courses.companyNetworkingTitle': {
    'en': 'Company Networking',
    'es': 'Redes de la Empresa',
    'fr': 'Réseautage d\'Entreprise',
    'de': 'Unternehmens-Networking'
  },
  'courses.companyNetworkingDesc': {
    'en': 'Building professional relationships and networking within the organization.',
    'es': 'Construir relaciones profesionales y redes dentro de la organización.',
    'fr': 'Construire des relations professionnelles et réseauter au sein de l\'organisation.',
    'de': 'Aufbau professioneller Beziehungen und Networking innerhalb der Organisation.'
  },

  // Activity descriptions
  'activities.completedModule': {
    'en': 'Completed module 3: Temperature Control and Storage',
    'es': 'Completó el módulo 3: Control de Temperatura y Almacenamiento',
    'fr': 'Module 3 terminé : Contrôle de la Température et Stockage',
    'de': 'Modul 3 abgeschlossen: Temperaturkontrolle und Lagerung'
  },
  'activities.passedAssessment': {
    'en': 'Passed final assessment with excellent score',
    'es': 'Aprobó la evaluación final con excelente puntuación',
    'fr': 'Évaluation finale réussie avec un excellent score',
    'de': 'Abschlussbewertung mit ausgezeichneter Punktzahl bestanden'
  },
  'activities.startedCourse': {
    'en': 'Started new course - Introduction to Cybersecurity',
    'es': 'Comenzó nuevo curso - Introducción a la Ciberseguridad',
    'fr': 'Nouveau cours commencé - Introduction à la Cybersécurité',
    'de': 'Neuer Kurs begonnen - Einführung in die Cybersicherheit'
  },
  'activities.teamDiscussion': {
    'en': 'Participated in team discussion about compliance procedures',
    'es': 'Participó en discusión de equipo sobre procedimientos de cumplimiento',
    'fr': 'Participation à une discussion d\'équipe sur les procédures de conformité',
    'de': 'Teilnahme an Teamdiskussion über Compliance-Verfahren'
  },
  'activities.attemptedQuiz': {
    'en': 'Attempted networking fundamentals quiz',
    'es': 'Intentó el cuestionario de fundamentos de redes',
    'fr': 'Tentative de quiz sur les fondamentaux du réseautage',
    'de': 'Versuch des Netzwerk-Grundlagen-Quiz'
  },
  'activities.workingThrough': {
    'en': 'Working through regulatory compliance modules',
    'es': 'Trabajando en módulos de cumplimiento regulatorio',
    'fr': 'Travail sur les modules de conformité réglementaire',
    'de': 'Bearbeitung von regulatorischen Compliance-Modulen'
  },

  // Job roles
  'roles.seniorDeveloper': {
    'en': 'Senior Developer',
    'es': 'Desarrollador Senior',
    'fr': 'Développeur Senior',
    'de': 'Senior-Entwickler'
  },
  'roles.softwareEngineer': {
    'en': 'Software Engineer',
    'es': 'Ingeniero de Software',
    'fr': 'Ingénieur Logiciel',
    'de': 'Software-Ingenieur'
  },
  'roles.marketingManager': {
    'en': 'Marketing Manager',
    'es': 'Gerente de Marketing',
    'fr': 'Responsable Marketing',
    'de': 'Marketing-Manager'
  },
  'roles.salesRepresentative': {
    'en': 'Sales Representative',
    'es': 'Representante de Ventas',
    'fr': 'Représentant Commercial',
    'de': 'Vertriebsmitarbeiter'
  },
  'roles.hrSpecialist': {
    'en': 'HR Specialist',
    'es': 'Especialista en RRHH',
    'fr': 'Spécialiste RH',
    'de': 'HR-Spezialist'
  },
  'roles.operationsManager': {
    'en': 'Operations Manager',
    'es': 'Gerente de Operaciones',
    'fr': 'Responsable des Opérations',
    'de': 'Betriebsleiter'
  },
  'roles.uxDesigner': {
    'en': 'UX Designer',
    'es': 'Diseñador UX',
    'fr': 'Designer UX',
    'de': 'UX-Designer'
  },
  'roles.salesManager': {
    'en': 'Sales Manager',
    'es': 'Gerente de Ventas',
    'fr': 'Responsable des Ventes',
    'de': 'Vertriebsleiter'
  },

  // Time expressions
  'time.hoursAgo': {
    'en': 'hours ago',
    'es': 'hace {count} horas',
    'fr': 'il y a {count} heures',
    'de': 'vor {count} Stunden'
  },
  'time.hourAgo': {
    'en': 'hour ago',
    'es': 'hace 1 hora',
    'fr': 'il y a 1 heure',
    'de': 'vor 1 Stunde'
  },
  'time.dayAgo': {
    'en': 'day ago',
    'es': 'hace 1 día',
    'fr': 'il y a 1 jour',
    'de': 'vor 1 Tag'
  },
  'time.weeksAgo': {
    'en': 'weeks ago',
    'es': 'hace {count} semanas',
    'fr': 'il y a {count} semaines',
    'de': 'vor {count} Wochen'
  },
  'time.daysAgo': {
    'en': 'days ago',
    'es': 'hace {count} días',
    'fr': 'il y a {count} jours',
    'de': 'vor {count} Tagen'
  },

  // Activity titles
  'activities.covidAssessment': {
    'en': 'Covid Protocols Assessment',
    'es': 'Evaluación de Protocolos Covid',
    'fr': 'Évaluation des Protocoles Covid',
    'de': 'Covid-Protokoll-Bewertung'
  },
  'activities.bestPracticesDiscussion': {
    'en': 'Best Practices Discussion',
    'es': 'Discusión de Mejores Prácticas',
    'fr': 'Discussion des Meilleures Pratiques',
    'de': 'Diskussion über bewährte Praktiken'
  },
  'activities.networkingQuiz': {
    'en': 'Company Networking Quiz',
    'es': 'Cuestionario de Redes de la Empresa',
    'fr': 'Quiz de Réseautage d\'Entreprise',
    'de': 'Unternehmens-Networking-Quiz'
  },
  'activities.safetyReview': {
    'en': 'Safety Guidelines Review',
    'es': 'Revisión de Pautas de Seguridad',
    'fr': 'Révision des Directives de Sécurité',
    'de': 'Überprüfung der Sicherheitsrichtlinien'
  },
  'activities.completedAllModules': {
    'en': 'Completed all modules and final assessment',
    'es': 'Completó todos los módulos y evaluación final',
    'fr': 'Terminé tous les modules et évaluation finale',
    'de': 'Alle Module und Abschlussbewertung abgeschlossen'
  },
  'activities.reviewedGuidelines': {
    'en': 'Reviewed new safety guidelines with team',
    'es': 'Revisó nuevas pautas de seguridad con el equipo',
    'fr': 'Examiné les nouvelles directives de sécurité avec l\'équipe',
    'de': 'Neue Sicherheitsrichtlinien mit dem Team überprüft'
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
  'getStarted.completeProfile': {
    'en': 'Complete Your Profile',
    'es': 'Completa tu Perfil',
    'fr': 'Complétez Votre Profil',
    'de': 'Vervollständigen Sie Ihr Profil'
  },
  'getStarted.completeProfileDesc': {
    'en': 'Set up your profile information and preferences to get personalized recommendations.',
    'es': 'Configura tu información de perfil y preferencias para obtener recomendaciones personalizadas.',
    'fr': 'Configurez vos informations de profil et préférences pour obtenir des recommandations personnalisées.',
    'de': 'Richten Sie Ihre Profilinformationen und Präferenzen ein, um personalisierte Empfehlungen zu erhalten.'
  },
  'getStarted.goToSettings': {
    'en': 'Go to Settings',
    'es': 'Ir a Configuración',
    'fr': 'Aller aux Paramètres',
    'de': 'Zu den Einstellungen'
  },
  'getStarted.exploreCourses': {
    'en': 'Explore Course Library',
    'es': 'Explora la Biblioteca de Cursos',
    'fr': 'Explorer la Bibliothèque de Cours',
    'de': 'Kursbibliothek Erkunden'
  },
  'getStarted.exploreCoursesDesc': {
    'en': 'Browse our comprehensive course library and find topics that interest you.',
    'es': 'Explora nuestra biblioteca completa de cursos y encuentra temas que te interesen.',
    'fr': 'Parcourez notre bibliothèque de cours complète et trouvez des sujets qui vous intéressent.',
    'de': 'Durchsuchen Sie unsere umfassende Kursbibliothek und finden Sie interessante Themen.'
  },
  'getStarted.viewLibrary': {
    'en': 'View Library',
    'es': 'Ver Biblioteca',
    'fr': 'Voir la Bibliothèque',
    'de': 'Bibliothek Anzeigen'
  },
  'getStarted.startLearning': {
    'en': 'Start Learning',
    'es': 'Comienza a Aprender',
    'fr': 'Commencer à Apprendre',
    'de': 'Mit dem Lernen Beginnen'
  },
  'getStarted.startLearningDesc': {
    'en': 'Begin your first course and start building your knowledge foundation.',
    'es': 'Comienza tu primer curso y empieza a construir tu base de conocimientos.',
    'fr': 'Commencez votre premier cours et construisez votre base de connaissances.',
    'de': 'Beginnen Sie Ihren ersten Kurs und bauen Sie Ihr Wissensfundament auf.'
  },
  'getStarted.startCourse': {
    'en': 'Start Course',
    'es': 'Iniciar Curso',
    'fr': 'Commencer le Cours',
    'de': 'Kurs Starten'
  },
  'getStarted.securityFundamentals': {
    'en': 'Security Fundamentals',
    'es': 'Fundamentos de Seguridad',
    'fr': 'Fondamentaux de Sécurité',
    'de': 'Sicherheitsgrundlagen'
  },
  'getStarted.securityFundamentalsDesc': {
    'en': 'Learn the basics of cybersecurity, data protection, and secure computing practices.',
    'es': 'Aprende los conceptos básicos de ciberseguridad, protección de datos y prácticas de computación segura.',
    'fr': 'Apprenez les bases de la cybersécurité, de la protection des données et des pratiques informatiques sécurisées.',
    'de': 'Lernen Sie die Grundlagen der Cybersicherheit, des Datenschutzes und sicherer Computing-Praktiken.'
  },
  'getStarted.complianceRegulations': {
    'en': 'Compliance & Regulations',
    'es': 'Cumplimiento y Regulaciones',
    'fr': 'Conformité et Réglementations',
    'de': 'Compliance & Vorschriften'
  },
  'getStarted.complianceRegulationsDesc': {
    'en': 'Understand regulatory requirements and compliance procedures for your role.',
    'es': 'Comprende los requisitos regulatorios y procedimientos de cumplimiento para tu rol.',
    'fr': 'Comprenez les exigences réglementaires et les procédures de conformité pour votre rôle.',
    'de': 'Verstehen Sie regulatorische Anforderungen und Compliance-Verfahren für Ihre Rolle.'
  },
  'getStarted.professionalDevelopment': {
    'en': 'Professional Development',
    'es': 'Desarrollo Profesional',
    'fr': 'Développement Professionnel',
    'de': 'Berufliche Entwicklung'
  },
  'getStarted.professionalDevelopmentDesc': {
    'en': 'Enhance your professional skills and advance your career with targeted training.',
    'es': 'Mejora tus habilidades profesionales y avanza en tu carrera con entrenamiento dirigido.',
    'fr': 'Améliorez vos compétences professionnelles et faites progresser votre carrière avec une formation ciblée.',
    'de': 'Verbessern Sie Ihre beruflichen Fähigkeiten und fördern Sie Ihre Karriere mit gezieltem Training.'
  },
  'getStarted.safetyWellness': {
    'en': 'Safety & Wellness',
    'es': 'Seguridad y Bienestar',
    'fr': 'Sécurité et Bien-être',
    'de': 'Sicherheit & Wohlbefinden'
  },
  'getStarted.safetyWellnessDesc': {
    'en': 'Learn about workplace safety, health protocols, and wellness best practices.',
    'es': 'Aprende sobre seguridad en el lugar de trabajo, protocolos de salud y mejores prácticas de bienestar.',
    'fr': 'Apprenez la sécurité au travail, les protocoles de santé et les meilleures pratiques de bien-être.',
    'de': 'Lernen Sie über Arbeitsplatzsicherheit, Gesundheitsprotokolle und bewährte Wellness-Praktiken.'
  },
  'getStarted.userGuide': {
    'en': 'User Guide',
    'es': 'Guía de Usuario',
    'fr': 'Guide Utilisateur',
    'de': 'Benutzerhandbuch'
  },
  'getStarted.userGuideDesc': {
    'en': 'Step-by-step instructions',
    'es': 'Instrucciones paso a paso',
    'fr': 'Instructions étape par étape',
    'de': 'Schritt-für-Schritt-Anleitungen'
  },
  'getStarted.videoTutorials': {
    'en': 'Video Tutorials',
    'es': 'Tutoriales en Video',
    'fr': 'Tutoriels Vidéo',
    'de': 'Video-Tutorials'
  },
  'getStarted.videoTutorialsDesc': {
    'en': 'Watch and learn',
    'es': 'Mira y aprende',
    'fr': 'Regardez et apprenez',
    'de': 'Schauen und lernen'
  },
  'getStarted.communityForum': {
    'en': 'Community Forum',
    'es': 'Foro de la Comunidad',
    'fr': 'Forum Communautaire',
    'de': 'Community-Forum'
  },
  'getStarted.communityForumDesc': {
    'en': 'Ask questions and share',
    'es': 'Haz preguntas y comparte',
    'fr': 'Posez des questions et partagez',
    'de': 'Fragen stellen und teilen'
  },
  'getStarted.contactSupport': {
    'en': 'Contact Support',
    'es': 'Contactar Soporte',
    'fr': 'Contacter le Support',
    'de': 'Support Kontaktieren'
  },
  'getStarted.contactSupportDesc': {
    'en': 'Get help when you need it',
    'es': 'Obtén ayuda cuando la necesites',
    'fr': 'Obtenez de l\'aide quand vous en avez besoin',
    'de': 'Hilfe erhalten, wenn Sie sie brauchen'
  },
  'getStarted.weeks': {
    'en': 'weeks',
    'es': 'semanas',
    'fr': 'semaines',
    'de': 'Wochen'
  },
  'getStarted.startPath': {
    'en': 'Start Path',
    'es': 'Iniciar Ruta',
    'fr': 'Commencer le Parcours',
    'de': 'Pfad Starten'
  },
  'getStarted.quickStartSteps': {
    'en': 'Quick Start Steps',
    'es': 'Pasos Rápidos',
    'fr': 'Étapes de Démarrage Rapide',
    'de': 'Schnellstart-Schritte'
  },
  'getStarted.learningPaths': {
    'en': 'Recommended Learning Paths',
    'es': 'Rutas de Aprendizaje Recomendadas',
    'fr': 'Parcours d\'Apprentissage Recommandés',
    'de': 'Empfohlene Lernpfade'
  },
  'getStarted.choosePathDesc': {
    'en': 'Choose a path that matches your role and interests',
    'es': 'Elige una ruta que coincida con tu rol e intereses',
    'fr': 'Choisissez un parcours qui correspond à votre rôle et à vos intérêts',
    'de': 'Wählen Sie einen Pfad, der zu Ihrer Rolle und Ihren Interessen passt'
  },

  // Settings
  'settings.title': {
    'en': 'Settings',
    'es': 'Configuración',
    'fr': 'Paramètres',
    'de': 'Einstellungen'
  },
  'settings.profile': {
    'en': 'Profile Settings',
    'es': 'Configuración del Perfil',
    'fr': 'Paramètres de Profil',
    'de': 'Profil-Einstellungen'
  },
  'settings.debugInfo': {
    'en': 'Debug Info',
    'es': 'Información de Depuración',
    'fr': 'Informations de Débogage',
    'de': 'Debug-Informationen'
  },
  'settings.currentTheme': {
    'en': 'Current theme',
    'es': 'Tema actual',
    'fr': 'Thème actuel',
    'de': 'Aktuelles Design'
  },
  'settings.isDarkMode': {
    'en': 'Is Dark Mode',
    'es': 'Modo Oscuro',
    'fr': 'Mode Sombre',
    'de': 'Dunkler Modus'
  },
  'settings.htmlHasDarkClass': {
    'en': 'HTML has dark class',
    'es': 'HTML tiene clase dark',
    'fr': 'HTML a la classe dark',
    'de': 'HTML hat dark-Klasse'
  },
  'settings.testDarkModeToggle': {
    'en': 'Test Dark Mode Toggle',
    'es': 'Probar Cambio de Modo Oscuro',
    'fr': 'Tester le Basculement du Mode Sombre',
    'de': 'Dunkelmodus-Umschaltung Testen'
  },
  'settings.saveSuccess': {
    'en': 'Settings saved successfully!',
    'es': '¡Configuración guardada exitosamente!',
    'fr': 'Paramètres enregistrés avec succès!',
    'de': 'Einstellungen erfolgreich gespeichert!'
  },
  'settings.fullName': {
    'en': 'Full Name',
    'es': 'Nombre Completo',
    'fr': 'Nom Complet',
    'de': 'Vollständiger Name'
  },
  'settings.email': {
    'en': 'Email',
    'es': 'Correo Electrónico',
    'fr': 'E-mail',
    'de': 'E-Mail'
  },
  'settings.department': {
    'en': 'Department',
    'es': 'Departamento',
    'fr': 'Département',
    'de': 'Abteilung'
  },
  'settings.role': {
    'en': 'Role',
    'es': 'Cargo',
    'fr': 'Rôle',
    'de': 'Rolle'
  },
  'settings.emailNotifications': {
    'en': 'Email Notifications',
    'es': 'Notificaciones por Correo',
    'fr': 'Notifications par E-mail',
    'de': 'E-Mail-Benachrichtigungen'
  },
  'settings.emailNotificationsDesc': {
    'en': 'Receive notifications via email',
    'es': 'Recibir notificaciones por correo electrónico',
    'fr': 'Recevoir des notifications par e-mail',
    'de': 'Benachrichtigungen per E-Mail erhalten'
  },
  'settings.pushNotifications': {
    'en': 'Push Notifications',
    'es': 'Notificaciones Push',
    'fr': 'Notifications Push',
    'de': 'Push-Benachrichtigungen'
  },
  'settings.pushNotificationsDesc': {
    'en': 'Receive push notifications in browser',
    'es': 'Recibir notificaciones push en el navegador',
    'fr': 'Recevoir des notifications push dans le navigateur',
    'de': 'Push-Benachrichtigungen im Browser erhalten'
  },
  'settings.courseReminders': {
    'en': 'Course Reminders',
    'es': 'Recordatorios de Cursos',
    'fr': 'Rappels de Cours',
    'de': 'Kurs-Erinnerungen'
  },
  'settings.courseRemindersDesc': {
    'en': 'Get reminded about incomplete courses',
    'es': 'Recibir recordatorios sobre cursos incompletos',
    'fr': 'Recevoir des rappels sur les cours incomplets',
    'de': 'Erinnerungen an unvollständige Kurse erhalten'
  },
  'settings.privacySecurity': {
    'en': 'Privacy & Security',
    'es': 'Privacidad y Seguridad',
    'fr': 'Confidentialité et Sécurité',
    'de': 'Datenschutz & Sicherheit'
  },
  'settings.dataSharing': {
    'en': 'Data Sharing',
    'es': 'Compartir Datos',
    'fr': 'Partage de Données',
    'de': 'Datenfreigabe'
  },
  'settings.dataSharingDesc': {
    'en': 'Allow anonymous usage data collection',
    'es': 'Permitir recopilación anónima de datos de uso',
    'fr': 'Autoriser la collecte anonyme de données d\'utilisation',
    'de': 'Anonyme Nutzungsdatenerfassung zulassen'
  },
  'settings.activityTracking': {
    'en': 'Activity Tracking',
    'es': 'Seguimiento de Actividad',
    'fr': 'Suivi d\'Activité',
    'de': 'Aktivitätsverfolgung'
  },
  'settings.activityTrackingDesc': {
    'en': 'Track learning progress and activity',
    'es': 'Rastrear progreso de aprendizaje y actividad',
    'fr': 'Suivre les progrès d\'apprentissage et l\'activité',
    'de': 'Lernfortschritt und Aktivität verfolgen'
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

  // Filters
  'filters.timeframe': {
    'en': 'Timeframe',
    'es': 'Período',
    'fr': 'Période',
    'de': 'Zeitraum'
  },
  'filters.allTime': {
    'en': 'All-time',
    'es': 'Todo el tiempo',
    'fr': 'Tout le temps',
    'de': 'Alle Zeit'
  },
  'filters.last30Days': {
    'en': 'Last 30 days',
    'es': 'Últimos 30 días',
    'fr': 'Derniers 30 jours',
    'de': 'Letzten 30 Tage'
  },
  'filters.last7Days': {
    'en': 'Last 7 days',
    'es': 'Últimos 7 días',
    'fr': 'Derniers 7 jours',
    'de': 'Letzten 7 Tage'
  },
  'filters.all': {
    'en': 'All',
    'es': 'Todos',
    'fr': 'Tous',
    'de': 'Alle'
  },
  'filters.activeUsers': {
    'en': 'Active Users',
    'es': 'Usuarios Activos',
    'fr': 'Utilisateurs Actifs',
    'de': 'Aktive Benutzer'
  },
  'filters.newUsers': {
    'en': 'New Users',
    'es': 'Usuarios Nuevos',
    'fr': 'Nouveaux Utilisateurs',
    'de': 'Neue Benutzer'
  },
  'filters.people': {
    'en': 'People',
    'es': 'Personas',
    'fr': 'Personnes',
    'de': 'Personen'
  },
  'filters.topic': {
    'en': 'Topic',
    'es': 'Tema',
    'fr': 'Sujet',
    'de': 'Thema'
  },
  'filters.download': {
    'en': 'Download',
    'es': 'Descargar',
    'fr': 'Télécharger',
    'de': 'Herunterladen'
  },

  // Reports/Dashboard
  'reports.activeUsers': {
    'en': 'Active Users',
    'es': 'Usuarios Activos',
    'fr': 'Utilisateurs Actifs',
    'de': 'Aktive Benutzer'
  },
  'reports.questionsAnswered': {
    'en': 'Questions Answered',
    'es': 'Preguntas Respondidas',
    'fr': 'Questions Répondues',
    'de': 'Beantwortete Fragen'
  },
  'reports.avgSessionLength': {
    'en': 'Av. Session Length',
    'es': 'Duración Promedio de Sesión',
    'fr': 'Durée Moyenne de Session',
    'de': 'Durchschnittliche Sitzungsdauer'
  },
  'reports.startingKnowledge': {
    'en': 'Starting Knowledge',
    'es': 'Conocimiento Inicial',
    'fr': 'Connaissances Initiales',
    'de': 'Anfangswissen'
  },
  'reports.currentKnowledge': {
    'en': 'Current Knowledge',
    'es': 'Conocimiento Actual',
    'fr': 'Connaissances Actuelles',
    'de': 'Aktuelles Wissen'
  },
  'reports.knowledgeGain': {
    'en': 'Knowledge Gain',
    'es': 'Ganancia de Conocimiento',
    'fr': 'Gain de Connaissances',
    'de': 'Wissenszuwachs'
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