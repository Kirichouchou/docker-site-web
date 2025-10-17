export const LANGUAGE_OPTIONS = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" }
] as const;

export type Language = typeof LANGUAGE_OPTIONS[number]["code"];
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

export const DEFAULT_LANGUAGE: Language = "fr";

export const TRANSLATIONS: Record<Language, any> = {
  fr: {
    common: {
      brand: "Fynora",
      languageSelector: {
        ariaLabel: "Changer de langue",
        tooltip: "Langue",
        active: "Actif"
      }
    },
    navbar: {
      links: {
        home: "Accueil",
        services: "Services"
      },
      cta: "Réserver un appel",
      aria: {
        mainNav: "Navigation principale"
      }
    },
    hero: {
      titleLineOne: "Un site internet n'est pas",
      titleLineTwo: "qu'une vitrine",
      description:
        "C'est un outil pour séduire vos visiteurs, inspirer confiance et transformer l'intérêt en action. Chaque site est conçu pour devenir un véritable levier de croissance.",
      cta: "Réserver un appel",
    },
    features: {
      heading: "Atouts principaux",
      items: []
    },
    ctaSection: {
      eyebrow: "On s'occupe de tout.",
      title: "Vous vous concentrez sur vos clients.",
      description:
        "Nous orchestrons la conception, le pilotage et l'optimisation afin que vous puissiez vous focaliser sur l'essentiel : votre cur de métier.",
      cta: "Réserver un appel"
    },
    homepage: {
      servicesHighlight: {
        eyebrow: "Nos services",
        title: "Des sites pensés pour la conversion",
        subtitle:
          "Nous concevons des landing pages et sites sur mesure conçus pour maximiser vos ventes et votre visibilité en ligne.",
        pillars: [
          {
            title: "Design & Expérience",
            description:
              "Nous designons et développons des landing pages et sites optimisés pour transformer vos visiteurs en clients, avec un parcours fluide et efficace.",
            stack: ["Design responsive"]
          },
          {
            title: "Analyse & Performance",
            description:
              "Des tableaux de bord clairs et actionnables pour piloter votre acquisition et identifier les prochaines priorités.",
            stack: ["GA4", "Looker Studio", "Tag Manager"]
          }
        ]
      }
    },
    legal: {
      hero: {
        eyebrow: "Informations officielles",
        title: "Mentions légales",
        description:
          "Remplacez les champs ci-dessous par vos informations afin de rendre cette page conforme à votre activité."
      },
      sections: [
        {
          id: "editor",
          title: "1 - Édition du site",
          paragraphs: [
            "Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, voici les informations à communiquer aux visiteurs."
          ],
          list: [
            "Propriétaire du site : {{owner}}",
            "Entreprise : {{companyName}} - {{legalForm}}",
            "SIRET : {{siret}}",
            "Adresse : {{address}}",
            "Contact : {{contactEmail}}",
            "Directeur de la publication : {{director}}",
            "Hébergeur : {{hostName}} — {{hostAddress}} — {{hostPhone}} ({{hostWebsite}})",
            "Délégué à la protection des données : {{dpoName}} — {{dpoEmail}}",
            "Immatriculation : Entreprise immatriculée au RCS de (ville) sous le numéro (SIRET).",
            "Forme juridique : Micro-entreprise (sans capital social).",
            "Responsable de la protection des données : (Nom du responsable ou « le propriétaire du site ») — (adresse e-mail).",
            "Aucun Délégué à la Protection des Données (DPO) officiellement désigné à ce jour."
          ]
        },
        {
          id: "intellectualProperty",
          title: "2 - Propriété intellectuelle et contrefaçons",
          paragraphs: [
            "{companyName} est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site internet (textes, images, graphismes, logo, vidéos, architecture, icônes, sons). Toute reproduction ou adaptation est interdite sans autorisation écrite préalable.",
            "Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.",
            "Les marques, logos et noms commerciaux figurant sur le site (nomdusite.fr) sont la propriété exclusive de (Nom de votre entreprise), sauf mention contraire. Certaines images, icônes ou vidéos peuvent provenir de banques de contenus libres de droits ou de partenaires externes. Ces ressources demeurent soumises à leurs conditions d'utilisation respectives."
          ]
        },
        {
          id: "liability",
          title: "3 - Limitations de responsabilité",
          paragraphs: [
            "{companyName} ne pourra être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site. L'utilisateur s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération.",
            "{companyName} décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur le site. L'entreprise s'engage néanmoins à sécuriser au mieux la plateforme.",
            "(Nom de votre entreprise) s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Cependant, des erreurs ou omissions peuvent survenir. L'entreprise ne garantit pas la disponibilité continue ou sans erreur du site, ni l'absence totale d'interruptions techniques. L'utilisateur reconnaît utiliser le site sous sa responsabilité exclusive."
          ]
        },
        {
          id: "data",
          title: "4 - CNIL et gestion des données personnelles",
          paragraphs: [
            "À ce jour, le site (nomdusite.fr) ne collecte pas de données personnelles nominatives. Si des formulaires de contact, inscriptions ou outils d'analyse sont mis en place, (Nom de votre entreprise) s'engage à respecter la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD) et la loi Informatique et Libertés.",
            "Dans ce cas, les données ne seraient collectées qu'après consentement explicite de l'utilisateur et uniquement pour des finalités déterminées (ex. : contact, statistiques, amélioration du service). Si Google Analytics 4 (GA4) est activé, il servira uniquement à mesurer la fréquentation du site de manière anonymisée, conformément aux recommandations de la CNIL.",
            "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et d'opposition. Vous pouvez exercer ces droits en écrivant à (adresse e-mail du responsable). Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr)."
          ]
        },
        {
          id: "cookies",
          title: "5 - Liens hypertextes et cookies",
          paragraphs: [
            "Le site (nomdusite.fr) utilise uniquement des cookies nécessaires à son bon fonctionnement. Si des cookies de mesure d'audience (tels que Google Analytics 4) sont utilisés, ils seront activés uniquement après votre consentement explicite. Ces cookies permettent d'analyser de manière anonyme la navigation afin d'améliorer le contenu et l'expérience utilisateur.",
            "Vous pouvez accepter, refuser ou personnaliser l'utilisation des cookies à tout moment via le bandeau de gestion des cookies présent sur le site. Les cookies techniques sont conservés pour une durée maximale de 13 mois conformément aux recommandations de la CNIL."
          ]
        }
      ]
    },
    overlays: {
      contact: {
        closeAria: "Fermer la fenêtre de contact",
        closeLabel: "Fermer",
        eyebrow: "Passez à l'action avec Fynora.",
        title: "0changer autour de votre projet digital.",
        description:
          "Réservez votre appel et repartez avec une vision claire, un plan d'action concret et les clés pour accélérer votre croissance digitale.",
        summaryTitle: "Créneau sélectionné",
        summaryHint:
          "Confirmez ce créneau ou choisissez-en un autre via « Voir le calendrier de rendez-vous ».",
        bookingTitle: "Réserver un appel",
        bookingDescription: "Réservez un appel de 30 minutes pour discuter ensemble de votre projet digital.",
        bookingButton: "Voir le calendrier de rendez-vous",
        bookingQuickMessage: "Besoin d'un message rapide ? Utilisez le formulaire ci-contre.",
        formTitle: "Nous écrire",
        formSubtitle: "Posez vos questions, nous revenons vers vous sous 24 h."
      },
      booking: {
        eyebrow: "Fynora",
        title: "Un créneau dédié à votre projet.",
        description:
          "Nous analyserons vos objectifs et bâtirons un plan d'action concret pour accélérer votre croissance digitale.",
        back: "Retour",
        confirm: "Confirmer",
        monthPrevious: "Mois précédent",
        monthNext: "Mois suivant",
        timeHeading: "Horaires",
        format24: "24 h",
        format12: "12 h",
        availabilityTag: "dispo",
        selectedTitle: "Créneau sélectionné",
        selectedDescription:
          "Cliquez sur « Confirmer » pour revenir au formulaire avec ce créneau pré-rempli.",
        selectPrompt: "Sélectionnez une date puis un horaire pour continuer.",
        selectionSeparator: "à",
        prefer12Hour: false
      },
      calendar: {
        days: ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"],
        locale: "fr-FR"
      }
    },
    footer: {
      copyright: "© {year} Fynora. Tous droits réservés.",
      legal: "Mentions légales",
      support: "Support"
    }
  },
  en: {
    common: {
      brand: "Fynora",
      languageSelector: {
        ariaLabel: "Change language",
        tooltip: "Language",
        active: "Active"
      }
    },
    navbar: {
      links: {
        home: "Home",
        services: "Services"
      },
      cta: "Book a call",
      aria: {
        mainNav: "Primary navigation"
      }
    },
    hero: {
      titleLineOne: "A website is not",
      titleLineTwo: "just a storefront",
      description:
        "It's a tool to captivate your visitors, inspire trust, and turn interest into action. Every site is crafted to become a true growth engine.",
      cta: "Book a call",
    },
    features: {
      heading: "Key advantages",
      items: []
    },
    ctaSection: {
      eyebrow: "We take care of everything.",
      title: "You keep your focus on your clients.",
      description:
        "We handle design, management, and optimisation so you can concentrate on what matters most: your core business.",
      cta: "Book a call"
    },
    homepage: {
      servicesHighlight: {
        eyebrow: "Our services",
        title: "Steer your growth",
        subtitle:
          "Every project is tracked with precision: strategy, monitoring, and continuous optimisation to improve your results week after week.",
        pillars: [
          {
            title: "Design & Experience",
            description:
              "We design and build landing pages and sites optimised to turn your visitors into customers through a smooth and efficient journey.",
            stack: ["Responsive design", "GA4"]
          },
          {
            title: "Optimisation & reporting",
            description:
              "Clear, actionable dashboards to drive your acquisition and spot the next priorities.",
            stack: ["Looker Studio", "Tag Manager"]
          }
        ]
      }
    },
    legal: {
      hero: {
        eyebrow: "Official information",
        title: "Legal notice",
        description:
          "Replace the fields below with your own details to keep this page compliant with your business."
      },
      sections: [
        {
          id: "editor",
          title: "1 - Website publisher",
          paragraphs: [
            "In accordance with Article 6 of French Law no. 2004-575 of 21 June 2004 on confidence in the digital economy, please share the following information with visitors."
          ],
          list: [
            "Site owner: {{owner}}",
            "Company: {{companyName}} - {{legalForm}}",
            "SIRET: {{siret}}",
            "Address: {{address}}",
            "Contact: {{contactEmail}}",
            "Publishing director: {{director}}",
            "Hosting provider: {{hostName}} — {{hostAddress}} — {{hostPhone}} ({{hostWebsite}})",
            "Data protection officer: {{dpoName}} — {{dpoEmail}}",
            "Registration: Company registered with the RCS in (city) under number (SIRET).",
            "Legal form: Sole proprietorship (no share capital).",
            "Data protection manager: (Name of the manager or “the site owner”) — (email address).",
            "No Data Protection Officer (DPO) has been formally appointed to date."
          ]
        },
        {
          id: "intellectualProperty",
          title: "2 - Intellectual property and infringement",
          paragraphs: [
            "{companyName} owns the intellectual property rights or holds the user rights for all elements accessible on the website (texts, images, graphics, logo, videos, architecture, icons, sounds). Any reproduction or adaptation is forbidden without prior written consent.",
            "Any unauthorised use of the site or of any element it contains will be considered an infringement and prosecuted in accordance with Articles L.335-2 and following of the French Intellectual Property Code.",
            "The trademarks, logos and trade names displayed on the site (nomdusite.fr) are the exclusive property of (Name of your company), unless otherwise stated. Some images, icons or videos may come from royalty-free libraries or external partners. These resources remain subject to their respective terms of use."
          ]
        },
        {
          id: "liability",
          title: "3 - Limitation of liability",
          paragraphs: [
            "{companyName} cannot be held liable for direct or indirect damage caused to the user's equipment when accessing the site. Users undertake to access the site with up-to-date devices, free of viruses, and using a modern browser.",
            "{companyName} declines all responsibility for how the information and content available on the site may be used. The company nevertheless undertakes to secure the platform to the best of its ability.",
            "(Name of your company) strives to ensure the accuracy and updating of the information published on the site. However, errors or omissions may occur. The company does not guarantee continuous, error-free availability of the site, nor the total absence of technical interruptions. Users acknowledge that they browse the site under their sole responsibility."
          ]
        },
        {
          id: "data",
          title: "4 - Data protection and privacy",
          paragraphs: [
            "As of today, the site (nomdusite.fr) does not collect personal data. Should contact forms, registrations or analytics tools be implemented, (Name of your company) undertakes to comply with all applicable regulations, including the GDPR and the French Data Protection Act.",
            "In such cases, data would only be collected after the user's explicit consent and solely for specific purposes (e.g. contact, statistics, service improvement). If Google Analytics 4 (GA4) is activated, it will only be used to measure site traffic anonymously, in accordance with CNIL guidelines.",
            "You have the right to access, rectify, delete, restrict or object to the processing of your data. You can exercise these rights by writing to (email address of the data controller). You also have the right to lodge a complaint with the CNIL (www.cnil.fr)."
          ]
        },
        {
          id: "cookies",
          title: "5 - Hyperlinks and cookies",
          paragraphs: [
            "The site (nomdusite.fr) only uses cookies required for its proper functioning. If audience measurement cookies (such as Google Analytics 4) are used, they will only be activated after your explicit consent. These cookies help analyse browsing behaviour anonymously to improve content and user experience.",
            "You can accept, refuse or customise cookie usage at any time via the banner available on the site. Technical cookies are stored for up to 13 months, in line with CNIL recommendations."
          ]
        }
      ]
    },
    overlays: {
      contact: {
        closeAria: "Close contact modal",
        closeLabel: "Close",
        eyebrow: "Take action with Fynora.",
        title: "Discuss your digital project.",
        description:
          "Share your objectives and we'll prepare a tailored action plan to boost your acquisition and conversion.",
        summaryTitle: "Selected slot",
        summaryHint: "Confirm this slot or pick another one via \"View the meeting calendar\".",
        bookingTitle: "Book a call",
        bookingDescription: "30 minutes on video to understand your goals and outline a concrete plan.",
        bookingButton: "View the meeting calendar",
        bookingQuickMessage: "Need a quick note? Use the form on the right.",
        formTitle: "Write to us",
        formSubtitle: "Send your questions, we reply within 24 hours."
      },
      booking: {
        eyebrow: "Fynora",
        title: "A slot dedicated to your project.",
        description:
          "We'll analyse your goals and craft a precise action plan to accelerate your acquisition.",
        back: "Back",
        confirm: "Confirm",
        monthPrevious: "Previous month",
        monthNext: "Next month",
        timeHeading: "Time slots",
        format24: "24 hr",
        format12: "12 hr",
        availabilityTag: "open",
        selectedTitle: "Selected slot",
        selectedDescription: "Click \"Confirm\" to return to the form with this slot pre-filled.",
        selectPrompt: "Choose a date and a time to continue.",
        selectionSeparator: "at",
        prefer12Hour: true
      },
      calendar: {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        locale: "en-GB"
      }
    },
    footer: {
      copyright: "© {year} Fynora. All rights reserved.",
      legal: "Legal notice",
      support: "Support"
    }
  },
  es: {
    common: {
      brand: "Fynora",
      languageSelector: {
        ariaLabel: "Cambiar idioma",
        tooltip: "Idioma",
        active: "Activo"
      }
    },
    navbar: {
          legal: {
      hero: {
        eyebrow: "Información oficial",
        title: "Aviso legal",
        description:
          "Sustituye los campos siguientes por tus propios datos para mantener esta página conforme a tu actividad."
      },
      sections: [
        {
          id: "editor",
          title: "1 - Edición del sitio",
          paragraphs: [
            "De conformidad con el artículo 6 de la Ley francesa n.º 2004-575 del 21 de junio de 2004 para la confianza en la economía digital, facilita la información siguiente a los visitantes."
          ],
          list: [
            "Propietario del sitio: {{owner}}",
            "Empresa: {{companyName}} - {{legalForm}}",
            "SIRET: {{siret}}",
            "Dirección: {{address}}",
            "Contacto: {{contactEmail}}",
            "Director de la publicación: {{director}}",
            "Proveedor de alojamiento: {{hostName}} — {{hostAddress}} — {{hostPhone}} ({{hostWebsite}})",
            "Delegado de protección de datos: {{dpoName}} — {{dpoEmail}}",
            "Inscripción: Empresa inscrita en el RCS de (ciudad) con el número (SIRET).",
            "Forma jurídica: Microempresa (sin capital social).",
            "Responsable de protección de datos: (Nombre del responsable o «el propietario del sitio») — (correo electrónico).",
            "Ningún Delegado de Protección de Datos (DPO) ha sido designado oficialmente hasta la fecha."
          ]
        },
        {
          id: "intellectualProperty",
          title: "2 - Propiedad intelectual y falsificaciones",
          paragraphs: [
            "{companyName} posee los derechos de propiedad intelectual o los derechos de uso de todos los elementos accesibles en el sitio web (textos, imágenes, gráficos, logotipo, vídeos, arquitectura, iconos, sonidos). Cualquier reproducción o adaptación está prohibida sin autorización escrita previa.",
            "Cualquier uso no autorizado del sitio o de cualquiera de los elementos que contiene se considerará constitutivo de falsificación y será perseguido conforme a lo dispuesto en los artículos L.335-2 y siguientes del Código de Propiedad Intelectual francés.",
            "Las marcas, logotipos y nombres comerciales que aparecen en el sitio (nomdusite.fr) son propiedad exclusiva de (Nombre de tu empresa), salvo mención contraria. Algunas imágenes, iconos o vídeos pueden proceder de bancos de contenidos libres de derechos o de socios externos. Estos recursos siguen sujetos a sus condiciones de uso respectivas."
          ]
        },
        {
          id: "liability",
          title: "3 - Limitaciones de responsabilidad",
          paragraphs: [
            "{companyName} no podrá ser considerada responsable de los daños directos o indirectos causados al equipo del usuario durante el acceso al sitio. El usuario se compromete a acceder al sitio con un equipo actualizado, libre de virus y con un navegador de última generación.",
            "{companyName} declina toda responsabilidad sobre el uso que pueda hacerse de la información y los contenidos presentes en el sitio. La empresa, no obstante, se compromete a asegurar la plataforma lo mejor posible.",
            "(Nombre de tu empresa) se esfuerza por garantizar la exactitud y actualización de la información publicada en el sitio. Sin embargo, pueden producirse errores u omisiones. La empresa no garantiza la disponibilidad continua o sin errores del sitio, ni la ausencia total de interrupciones técnicas. El usuario reconoce que utiliza el sitio bajo su exclusiva responsabilidad."
          ]
        },
        {
          id: "data",
          title: "4 - Protección de datos y privacidad",
          paragraphs: [
            "Hasta la fecha, el sitio (nomdusite.fr) no recoge datos personales nominativos. Si se implantan formularios de contacto, inscripciones u herramientas de análisis, (Nombre de tu empresa) se compromete a respetar la normativa vigente, incluido el RGPD y la Ley francesa de Informática y Libertades.",
            "En ese caso, los datos solo se recogerán tras el consentimiento explícito del usuario y únicamente con fines determinados (por ejemplo: contacto, estadísticas, mejora del servicio). Si se activa Google Analytics 4 (GA4), se utilizará únicamente para medir la audiencia del sitio de forma anonimizada, conforme a las recomendaciones de la CNIL.",
            "Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento y oposición. Puedes ejercer estos derechos escribiendo a (correo electrónico del responsable). También tienes derecho a presentar una reclamación ante la CNIL (www.cnil.fr)."
          ]
        },
        {
          id: "cookies",
          title: "5 - Enlaces de hipertexto y cookies",
          paragraphs: [
            "El sitio (nomdusite.fr) solo utiliza cookies necesarias para su correcto funcionamiento. Si se utilizan cookies de medición de audiencia (como Google Analytics 4), se activarán únicamente tras tu consentimiento explícito. Estas cookies permiten analizar de forma anónima la navegación para mejorar el contenido y la experiencia del usuario.",
            "Puedes aceptar, rechazar o personalizar el uso de cookies en cualquier momento mediante el banner de gestión disponible en el sitio. Las cookies técnicas se conservan durante un máximo de 13 meses, conforme a las recomendaciones de la CNIL."
          ]
        }
      ]
    },
links: {
        home: "Inicio",
        services: "Servicios"
      },
      cta: "Reservar una llamada",
      aria: {
        mainNav: "Navegación principal"
      }
    },
    hero: {
      titleLineOne: "Un sitio web no es",
      titleLineTwo: "solo un escaparate",
      description:
        "Es una herramienta para seducir a tus visitantes, inspirar confianza y transformar el interés en acción. Cada sitio está diseñado para convertirse en un verdadero motor de crecimiento.",
      cta: "Reservar una llamada",
    },
    features: {
      heading: "Ventajas clave",
      items: []
    },
    ctaSection: {
      eyebrow: "Nos encargamos de todo.",
      title: "Te concentras en tus clientes.",
      description:
        "Orquestamos el diseño, la gestión y la optimización para que puedas centrarte en lo esencial: tu actividad principal.",
      cta: "Reservar una llamada"
    },
    homepage: {
      servicesHighlight: {
        eyebrow: "Nuestros servicios",
        title: "Impulsa tu crecimiento",
        subtitle:
          "Cada proyecto se sigue con precisión: estrategia, seguimiento y optimización continua para mejorar tus resultados semana tras semana.",
        pillars: [
          {
            title: "Diseño y experiencia",
            description:
              "Diseñamos y desarrollamos landing pages y sitios optimizados para transformar a tus visitantes en clientes con un recorrido fluido y eficaz.",
            stack: ["Diseño adaptable", "GA4"]
          },
          {
            title: "Optimización y reporting",
            description:
              "Paneles de control claros y accionables para pilotar tu adquisición e identificar las próximas prioridades.",
            stack: ["Looker Studio", "Tag Manager"]
          }
        ]
      }
    },
    overlays: {
      contact: {
        closeAria: "Cerrar la ventana de contacto",
        closeLabel: "Cerrar",
        eyebrow: "Actúa con Fynora.",
        title: "Conversemos sobre tu proyecto digital.",
        description:
          "Comparte tus objetivos: prepararemos un plan de acción a medida para acelerar tu adquisición y conversión.",
        summaryTitle: "Franja seleccionada",
        summaryHint:
          "Confirma esta franja o elige otra desde « Ver calendario de citas ».",
        bookingTitle: "Reservar una llamada",
        bookingDescription: "30 minutos en videollamada para entender tus retos y definir un plan concreto.",
        bookingButton: "Ver calendario de citas",
        bookingQuickMessage: "¿Necesitas un mensaje rápido? Usa el formulario a la derecha.",
        formTitle: "Escríbenos",
        formSubtitle: "Envíanos tus preguntas; respondemos en menos de 24 h."
      },
      booking: {
        eyebrow: "Fynora",
        title: "Una franja dedicada a tu proyecto.",
        description:
          "Analizaremos tus objetivos y construiremos un plan de acción preciso para impulsar tu adquisición.",
        back: "Volver",
        confirm: "Confirmar",
        monthPrevious: "Mes anterior",
        monthNext: "Mes siguiente",
        timeHeading: "Horarios",
        format24: "24 h",
        format12: "12 h",
        availabilityTag: "libre",
        selectedTitle: "Franja seleccionada",
        selectedDescription:
          "Haz clic en « Confirmar » para volver al formulario con esta franja preseleccionada.",
        selectPrompt: "Selecciona una fecha y un horario para continuar.",
        selectionSeparator: "a las",
        prefer12Hour: false
      },
      calendar: {
        days: ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"],
        locale: "es-ES"
      }
    },
    footer: {
      copyright: "© {year} Fynora. Todos los derechos reservados.",
      legal: "Aviso legal",
      support: "Soporte"
    }
  }
};




