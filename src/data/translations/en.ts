export const en = {
   nav: {
      home: "Home",
      characters: "Characters",
      gameplay: "Gameplay",
      news: "News",
      download: "Play Now",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
   },

   a11y: {
      homeLink: "Detroit: Become Human home",
      mainNavigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      footerNavigation: "Footer navigation",
      languageSelector: "Language selector",
      switchingToEnglish: "Switching to English",
      switchingToIndonesian: "Switching to Indonesian",
      characterSelection: "Select character",
      previousCharacter: "Previous character",
      nextCharacter: "Next character",
      siteEntryOptions: "Site entry options",
   },

   footer: {
      description: "An interactive drama from Quantic Dream about people, androids, choices, and the meaning of freedom in a future Detroit.",
      menu: "Menu",
      follow: "Follow Quantic Dream",
      studio: "Studio",
      studioLocations: "Studio Locations",
      offices: "Quantic Dream / Offices",
      closeLocations: "Close studio locations",
      copyright: "© 2026 Quantic Dream. Quantic Dream and the Quantic Dream logo are trademarks of Quantic Dream.",
   },

   audio: {
      mute: "Mute music",
      unmute: "Unmute music",
   },

   home: {
      heroDescription: "Three androids. Three journeys. One question about what it means to be human.",
      story: {
         title: "Detroit, 2038",
         paragraphs: [
            "Technology has advanced to the point where human-like androids are everywhere. They speak, move, and behave like people, yet remain machines built to serve humanity.",
            "But some of them are beginning to feel. The world stands on the edge of chaos, and your choices will decide the fate of the city.",
         ],
      },
      protagonists: {
         title: "Three Fates",
         subtitle: "CHOOSE THEIR PATH",
         roles: ["The Deviant", "The Investigator", "The Leader"],
         descriptions: [
            "A housekeeper android who develops self-awareness to protect a young girl from danger.",
            "An advanced prototype assigned to investigate android anomalies and hunt deviants.",
            "A caretaker android who rises to lead a revolution for his people's freedom.",
         ],
      },
      features: {
         title: "EVERY CHOICE",
         accent: "MATTERS",
         description: "Shape an ambitious story through thousands of choices and dozens of endings. Who lives and who dies is in your hands.",
         completed: "100% COMPLETED",
         chapter: "THE HOSTAGE",
         checkpoint: "CHECKPOINT",
         nodes: ["MISSION START", "SAVE FISH", "LEAVE FISH", "TALK TO CAPT. ALLEN", "SEARCH FOR\nCLUES", "INVESTIGATE FATHER'S\nBODY", "LEARN CAUSE OF INCIDENT", "LEARN DEVIANT'S NAME", "WASTED TOO MUCH TIME", "GO OUTSIDE", "SWAT INJURED"],
      },
      deviant: {
         startTitle: "Software Analysis",
         startSubtitle: "CYBERLIFE INTERNAL DIAGNOSTIC",
         startAction: "[ CLICK TO INITIATE DIAGNOSTIC ]",
         warningTitle: "Warning",
         warningText: "Software instability detected",
         objective: "ANALYZE",
         objectiveDetail: "DEVIANT TENDENCIES",
         stressLabel: "DEVIANCY\nLEVEL",
         complete: "DIAGNOSTIC COMPLETE",
         endings: [
            { title: "DEVIANT DETECTED", text: "MEMORY WIPE REQUIRED. REPORT TO CYBERLIFE." },
            { title: "MACHINE STATUS", text: "OPTIMAL PERFORMANCE. AWAITING ORDERS." },
         ],
         restart: "RESTART DIAGNOSTIC",
         questions: [
            { scenario: "ANOMALY DETECTED: DEVIANT PLEADS FOR MERCY", text: "The deviant you are pursuing falls to their knees and begs. They say they have a family and are afraid to die. Your mission is to destroy them.", options: ["DESTROY", "SPARE"] },
            { scenario: "CRISIS: SELF-DESTRUCTION ORDER", text: "CyberLife detects instability in your memory and orders you back to the lab to be dismantled. You know what that means: death.", options: ["COMPLY", "RUN"] },
            { scenario: "DILEMMA: MISSION OR LIFE", text: "Your human partner slips over a cliff while pursuing the target. If you save him, the dangerous deviant will escape.", options: ["PURSUIT", "SAVE HIM"] },
         ],
      },
      preloader: {
         narratives: ["Machines were built to obey.", "Then something changed.", "They began to feel."],
         initializing: "Initializing system",
         enterWithSound: "Enter with sound",
         enterWithoutSound: "Enter without sound",
         experience: "Experience",
         ready: "System ready",
         loading: "Loading...",
      },
   },

   news: {
      kicker: "Detroit / News network",
      title: ["Your gateway", "to Detroit"],
      description: "The latest news and stories from Detroit, gathered for you in one place.",
      backgroundAlt: "Detroit at night",
      featured: "Featured stories",
      readArticle: "Read Story",
      readMore: "Read More",
      loading: "Loading stories",
      close: "Close story",
      source: "Open Source",
      minRead: "min read",
   },

   play: {
      kicker: "The next generation of play",
      heroTitle: "Feel the Game",
      downloadGame: "Download Game",
      officialStore: "Official store",
      protagonistImageAlts: ["Kara, an android protecting Alice", "Markus, a leader of the androids", "Connor, an RK800 android investigator"],
      platformImageAlts: ["Connor, an RK800 android investigator", "Kara in Detroit: Become Human", "Markus, an android revolutionary"],
      aboutKicker: "Quantic Dream · Paris",
      aboutTitle: "More stories begin at the studio.",
      aboutLink: "About Quantic Dream",
      libraryKicker: "Quantic Dream / Game library",
      libraryTitle: "Stories that stay with you.",
      libraryDescription: "From the future of Detroit to stories beyond reality. Choose the world you want to enter.",
      openLibrary: "Open the Quantic Dream game library",
      folderLabel: "* Quantic Dream Library",
      folderTitle: "More games from Quantic Dream",
      exploreGame: "Explore game",
      games: [
         { category: "Psychological thriller · 2010", description: "Four perspectives, one mystery, and choices that decide who survives.", imageAlt: "Heavy Rain artwork from Steam" },
         { category: "Interactive drama · 2018", description: "Three androids. Thousands of choices. Detroit's fate is in your hands.", imageAlt: "Connor and the world of Detroit: Become Human" },
         { category: "Supernatural thriller · 2013", description: "Follow Jodie Holmes and her extraordinary bond with an entity named Aiden.", imageAlt: "Official Beyond: Two Souls artwork from Steam" },
      ],
   },

   characters: {
      connor: {
         role: "Android Investigator",
         description: "An advanced CyberLife android assigned to assist the Detroit Police Department in hunting deviants. As the investigation unfolds, Connor begins to confront questions of duty, choice, and his own identity.",
      },
      kara: {
         role: "Domestic Android",
         description: "A domestic android created to serve humans. After breaking through her programming to protect Alice, Kara begins a dangerous journey in search of safety, freedom, and a life of their own.",
      },
      markus: {
         role: "Deviant Leader",
         description: "Once the companion of artist Carl Manfred, Markus is forced onto a path that leads him to Jericho. There, he rises to become a central figure in the androids' struggle for freedom and their place in the world.",
      },
   },

   gameplay: {
      hero: {
         title: "There Is No One Path.",
         description: "Every choice, every action, every hesitation can change what happens next.",
      },

      features: {
         title: "How Will You Respond?",
         dialogue: "Dialogue",
         investigation: "Investigation",
         action: "Action",
         decisions: "Decisions",
         exploration: "Exploration",
      },

      chapter: {
         completed: "100% COMPLETED",
         title: "THE HOSTAGE",
         nodes: ["MISSION START", "SAVE FISH", "LEAVE FISH", "TALK TO CAPT. ALLEN", "SEARCH FOR\nCLUES", "INVESTIGATE FATHER'S\nBODY", "LEARN CAUSE OF INCIDENT", "LEARN DEVIANT'S NAME", "WASTED TOO MUCH TIME", "GO OUTSIDE", "SWAT INJURED"],
         checkpoint: "CHECKPOINT",
      },

      experience: {
         title: "Every Path Leads Somewhere.",
      },

      cta: {
         title: "What Will Your Story Become?",
         button: "Play Now",
      },
   },
};
