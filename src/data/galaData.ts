/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  galaData.ts — single source of truth for the microsite (English only).
 *
 *  • Every visible string lives in `CONTENT`.
 *  • Every image path lives in `ASSETS`. Upload files to /public/assets/ with
 *    the exact names below and they replace the elegant fallbacks automatically.
 *  • Alumni profiles live in the `alumni` block of `CONTENT`; their external
 *    links live in `ALUMNI_LINKS` ("#" or "" hides a button).
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Builds a path that works under any base (GitHub Pages sub-folder, Vercel root…). */
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

/* ───────────────────────────── Asset paths ───────────────────────────── */

export const ASSETS = {
  logos: {
    comexus35White: asset('logos/comexus-35-anniversary-white.png'), // transparent, for Navy backgrounds (Hero, footer)
    comexus35Color: asset('logos/comexus-35-anniversary-color.png'), // full colour, for the Ivory milestone card
    fulbrightComexus: asset('logos/fulbright-comexus.png'),
    fulbright80: asset('logos/fulbright-80th-anniversary-white.png'),
    fulbright80Blue: asset('logos/fulbright-80th-anniversary-blue.png'),
    freedom250: asset('logos/freedom-250-color.png'), // navy + gold, for light backgrounds
    freedom250White: asset('logos/freedom-250-white.png'), // white + gold, for Navy backgrounds
    binationalBusiness: asset('logos/logo_original4.png'), // Fulbright-COMEXUS colour mark, for the 30-year BBP card
  },
  story: {
    y1948: asset('story/1948-fulbright-mexico.jpg'),
    y1980s: asset('story/1980s-growth.jpg'),
    y1990: asset('story/1990-comexus-established.png'),
    y1991: asset('story/1991-first-board-meeting.png'),
    y1992: asset('story/1992-garcia-robles.jpg'),
  },
  alumni: {
    // Portrait + featured work per photographer (any proportion; works are never cropped)
    photographer1: asset('alumni/photographer-1.jpg'),
    photographer1Work: asset('alumni/photographer-1-work.jpg'),
    photographer2: asset('alumni/photographer-2.jpg'),
    photographer2Work: asset('alumni/photographer-2-work.jpg'),
    photographer3: asset('alumni/photographer-3.jpg'),
    photographer3Work: asset('alumni/photographer-3-work.jpg'),
    photographer4: asset('alumni/photographer-4.jpg'),
    photographer4Work: asset('alumni/photographer-4-work.jpg'),
    photographer5: asset('alumni/photographer-5.jpg'),
    photographer5Work: asset('alumni/photographer-5-work.jpg'),
    musician: asset('alumni/musician.jpg'),
  },
} as const;

/* ─────────────────────── Routing / deep-link anchor IDs ─────────────────────── */

export type TabId = 'overview' | 'alumni';
export const PROFILE_IDS = [
  'photographer-1',
  'photographer-2',
  'photographer-3',
  'photographer-4',
  'photographer-5',
  'musician',
] as const;
export type ProfileId = (typeof PROFILE_IDS)[number];
export const OVERVIEW_SECTION_IDS = ['top', 'story', 'future', 'support', 'program', 'milestones'] as const;
export type OverviewSectionId = (typeof OVERVIEW_SECTION_IDS)[number];

/* ─────────────────────── External links ─────────────────────── */
// Replace "#" with the real URLs. Empty strings hide the link.

export interface ProfileLinks {
  /** "Explore Their Work" button. */
  portfolio: string;
  /** Optional discreet secondary link (e.g. a documentary). */
  secondary?: { label: string; href: string };
  website?: string;
}

export const ALUMNI_LINKS: Record<ProfileId, ProfileLinks> = {
  'photographer-1': {
    portfolio: 'https://www.instagram.com/desmothernista/',
    secondary: { label: 'PBS Documentary', href: 'https://www.pbs.org/video/a-ruben-ortiz-torres-story-9lkwvl/' },
  },
  'photographer-2': { portfolio: 'https://paulturounet.com/' },
  'photographer-3': { portfolio: '#' }, // pending official link — button hidden while "#"
  'photographer-4': { portfolio: '#' }, // pending official link — button hidden while "#"
  'photographer-5': { portfolio: 'https://andrescaballero.me' },
  musician: { portfolio: '', website: '#' },
};

export const DONATE_URL = 'https://www.comexus.org.mx/donativos.php';

/* ───────────────────────────── Content types ─────────────────────────── */

export interface TimelineItem {
  id: string;
  year: string; // big editorial label
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  /** Portrait photos get an upright 3:4 frame anchored at the top, so faces are never cropped. */
  portrait?: boolean;
}

export interface ProgramEntry {
  time?: string;
  title: string;
  icon: 'mic' | 'award' | 'music' | 'glass' | 'moon' | 'spotlight';
  people?: { name: string; note?: string }[];
  segments?: { title: string; kind: 'award' | 'music' | 'spotlight' }[];
  segmentsTitle?: string;
}

export interface Milestone {
  number: string;
  unit: string;
  title: string;
  caption: string;
  /** Omit for a typography-only card. */
  logo?: string;
  logoAlt?: string;
}

export interface Photographer {
  id: ProfileId;
  name: string;
  program: string;
  bio: string;
  /** Fulbright Impact Quote — omit while pending. */
  quote?: string;
  /** Portrait (shown as a round medallion next to the name). */
  image: string;
  /** CSS object-position for the portrait medallion. */
  imagePosition?: string;
  /** Featured work, shown uncropped at its own proportions. */
  work: string;
  workTitle?: string;
}

export interface Musician {
  id: ProfileId;
  name: string;
  program: string;
  cohort: string;
  bio: string;
  career: string;
  image: string;
}

/* ═════════════════════════════════ CONTENT ═════════════════════════════════ */

export const CONTENT = {
  meta: { title: 'Celebrating a Legacy of Exchange · COMEXUS' },
  nav: {
    overview: 'Gala Overview',
    alumni: 'Alumni Showcase',
    skip: 'Skip to content',
  },
  hero: {
    eyebrow: 'COMEXUS · Fulbright-García Robles',
    lockup: { line1: 'Celebrating a', line2: 'Legacy of', line3: 'Exchange' },
    tagline: 'Honoring the people, partnerships and opportunities that connect our nations.',
    facts: [
      { icon: 'calendar', label: 'Date', value: 'December 2, 2026' },
      { icon: 'clock', label: 'Time', value: '7:00 PM – 10:00 PM' },
      {
        icon: 'pin',
        label: 'Venue',
        value: 'Museo de Historia Natural y Cultura Ambiental',
        detail: 'Bosque de Chapultepec, Mexico City',
      },
    ] as { label: string; value: string; detail?: string; icon: 'calendar' | 'clock' | 'pin' }[],
    logosLabel: 'Celebrating together',
    ctaProgram: 'View the program',
    scrollHint: 'Scroll',
  },
  story: {
    eyebrow: 'Our Story',
    title: 'An Enduring Legacy of Exchange',
    intro: [
      "For 80 years, the Fulbright Program has brought people together through international educational and cultural exchange. As the U.S. government's flagship international educational exchange program, Fulbright creates opportunities for individuals to learn from one another, share ideas, and build connections that transcend borders.",
      'In Mexico, this mission has grown through the work of COMEXUS. For 35 years, the Commission has fostered academic, professional, and cultural exchange between Mexico and the United States through the Fulbright-García Robles Program.',
      'What began as an opportunity for individuals to study, teach, and conduct research across borders has grown into a lasting binational community, one that continues to contribute to both countries and strengthen their relationship.',
    ],
    photoPending: 'Archival photograph',
    timeline: [
      {
        id: '1948',
        year: '1948',
        title: 'The Fulbright Program comes to Mexico',
        text: 'The Fulbright Program began operating in Mexico, only two years after its establishment in the United States, opening new opportunities for educational exchange between the two countries.',
        image: ASSETS.story.y1948,
        imageAlt: 'Archival portrait from the early years of the Fulbright Program',
        portrait: true,
      },
      {
        id: '1980s',
        year: 'The 1980s',
        title: 'A decade of growth',
        text: 'The number of grants for Mexican and U.S. participants grew steadily, from approximately 50 in 1980 to 180 in 1990. During this period, the idea of establishing a binational commission gained momentum.',
        image: ASSETS.story.y1980s,
        imageAlt: 'Fulbright grantees during the 1980s',
      },
      {
        id: '1990',
        year: 'November 27, 1990',
        title: 'The establishment of COMEXUS',
        text: 'The Mexico-U.S. Commission for Educational and Cultural Exchange (COMEXUS) was established through a bilateral agreement signed in Monterrey, Nuevo León, in the presence of Mexican President Carlos Salinas de Gortari and U.S. President George H. W. Bush. Its mission was to promote mutual understanding between the peoples of Mexico and the United States through educational and cultural exchange.',
        image: ASSETS.story.y1990,
        imageAlt: 'Signing of the bilateral agreement establishing COMEXUS in Monterrey, 1990',
      },
      {
        id: '1991',
        year: 'April 1991',
        title: 'The first Board of Directors meeting',
        text: "The Commission's Board of Directors held its inaugural session in Mexico City, marking an important step in the development of its binational institutional structure.",
        image: ASSETS.story.y1991,
        imageAlt: 'Inaugural session of the COMEXUS Board of Directors, Mexico City, 1991',
      },
      {
        id: '1992',
        year: 'January 1992',
        title: 'The Fulbright-García Robles name',
        text: 'In keeping with the binational spirit of the Commission, its Board approved the designation of all grants as Fulbright-García Robles, honoring Mexican Ambassador Emeritus and Nobel Peace Prize Laureate Alfonso García Robles.',
        image: ASSETS.story.y1992,
        imageAlt: 'Portrait of Ambassador Alfonso García Robles',
        portrait: true,
      },
    ] as TimelineItem[],
    closing: {
      eyebrow: 'A Legacy in Motion',
      paragraphs: [
        'Since the establishment of COMEXUS in 1990, a total of 5,792 grantees have participated in the Fulbright-García Robles Program, building connections between Mexico and the United States through academic, professional, and cultural exchange.',
        'Each grantee represents more than an international experience. Together, they form a binational community that carries forward the values of mutual understanding, collaboration, and shared learning across institutions, disciplines, generations, and borders.',
      ],
      /** Shown as the closing line of the box. */
      highlight: 'The legacy of exchange is not only measured in years, but in the people who continue to move it forward.',
      /** Figure picked out in Champagne inside the first paragraph. */
      figure: '5,792',
    },
  },
  future: {
    eyebrow: 'Looking Ahead',
    title: 'The Next 35 Years',
    intro: [
      'As we look toward the next 35 years, we envision a future where educational and cultural exchange continues to evolve, reaching new communities and creating opportunities for more people to connect, learn, and collaborate across borders.',
      'Building on the legacy of the Fulbright-García Robles Program, COMEXUS is exploring new ways to expand access to international exchange, strengthen partnerships, and engage its binational community.',
    ],
    pillars: [
      {
        icon: 'compass',
        title: 'Expanding Opportunities',
        text: 'Exploring new program formats, including short-term academic experiences and micro-certifications, to make international learning opportunities more accessible and responsive to emerging needs.',
      },
      {
        icon: 'handshake',
        title: 'Building Partnerships',
        text: 'Strengthening collaboration with institutional partners, private-sector organizations, and state governments to develop new opportunities and diversify the support available for educational exchange.',
      },
      {
        icon: 'users',
        title: 'Engaging Our Community',
        text: 'Recognizing alumni as one of the program’s greatest strengths. Their experiences, knowledge, and continued connection to Fulbright can help inspire future generations and contribute to the program’s evolving mission.',
      },
    ] as { icon: 'compass' | 'handshake' | 'users'; title: string; text: string }[],
    closing: 'The next chapter is ours to build…together.',
  },
  support: {
    title: 'Investing in the Future',
    subtitle: 'Help Shape the Next 35 Years',
    paragraphs: [
      'Every contribution helps create new opportunities for educational and cultural exchange between Mexico and the United States.',
      'Join us in investing in the next generation of exchange.',
    ],
    cta: 'Support COMEXUS',
    href: DONATE_URL,
  },
  program: {
    eyebrow: 'December 2, 2026',
    title: 'Event Program',
    intro: 'An evening of remarks, recognition and music in honor of a shared binational legacy.',
    entries: [
      {
        time: '7:10 PM',
        title: 'Opening Remarks',
        icon: 'mic',
        people: [
          { name: 'Alma Calderón', note: 'Acting Executive Director, COMEXUS' },
          { name: 'Representative from SEP' },
          { name: 'Cristina Planter', note: 'Undersecretary for North America, SRE' },
          { name: 'Douglas Benning', note: 'Deputy Chief of Mission, U.S. Embassy in Mexico' },
        ],
        segmentsTitle: 'Special Recognitions & Performances',
        segments: [
          { kind: 'spotlight', title: 'Stakeholder Spotlight' },
          { kind: 'award', title: 'Leadership Honor' },
          { kind: 'music', title: 'Musical Performance' },
          { kind: 'award', title: 'Impact Honor' },
          { kind: 'music', title: 'Musical Performance' },
        ],
      },
      { time: '8:00 PM', title: 'Cocktail Reception', icon: 'glass' },
      { time: '10:00 PM', title: 'End of Event', icon: 'moon' },
    ] as ProgramEntry[],
  },
  milestones: {
    eyebrow: 'Four anniversaries, one evening',
    title: 'Celebrating Four Milestones',
    intro: 'This gala brings together four anniversaries that speak to the power of exchange, partnership and shared ideals.',
    items: [
      {
        number: '35',
        unit: 'Years',
        title: 'of COMEXUS',
        caption: 'A binational commission advancing educational and cultural exchange between Mexico and the United States.',
        logo: ASSETS.logos.comexus35Color,
        logoAlt: 'COMEXUS 35th Anniversary logo',
      },
      {
        number: '80',
        unit: 'Years',
        title: 'of the Fulbright Program',
        caption: 'The flagship international educational exchange program of the United States.',
        logo: ASSETS.logos.fulbright80Blue,
        logoAlt: 'Fulbright Program 80th Anniversary logo',
      },
      {
        number: '30',
        unit: 'Years',
        title: 'of the Binational Business Program',
        caption: 'Building connections and fostering a deeper understanding between Mexico’s and the United States’ private sectors.',
        logo: ASSETS.logos.binationalBusiness,
        logoAlt: 'Fulbright-COMEXUS logo · Binational Business Program',
      },
      {
        number: '250',
        unit: 'Years',
        title: 'of American Independence',
        caption: 'Freedom 250 — commemorating the 250th anniversary of the United States.',
        logo: ASSETS.logos.freedom250,
        logoAlt: 'Freedom 250 logo',
      },
    ] as Milestone[],
  },
  alumni: {
    back: 'Gala Overview',
    title: 'Exchange That Lasts Beyond the Experience',
    intro: [
      'The impact of Fulbright extends far beyond the time spent abroad. Its alumni carry forward the knowledge, perspectives, and connections gained through their experiences, contributing to their communities and professional fields while strengthening the ties between Mexico and the United States.',
      'Across generations and disciplines, they are part of a binational community that continues to shape the legacy of exchange.',
    ],
    jumpTo: 'Jump to',
    photoPending: 'Portrait coming soon',
    photography: {
      eyebrow: 'Photography Showcase',
      title: 'Through Their Lens: A Fulbright Alumni Photography Showcase',
      intro: [
        'Exchange takes many forms. Through art, photography, and music, Fulbright-García Robles alumni bring cultures, perspectives, and stories together, creating new ways to connect and understand one another.',
        'Discover their work through a photography showcase celebrating the perspectives, creativity, and stories captured through their lens.',
      ],
      curatorial: "Featured works are projected on screen during the gala evening. Explore the artists' profiles and digital portfolios below.",
      cta: 'Explore Their Work',
      quoteLabel: 'Fulbright Impact',
      workLabel: 'Featured work',
      workPending: 'Featured work coming soon',
      people: [
        {
          id: 'photographer-1',
          name: 'Rubén Ortiz-Torres',
          program: 'Fulbright-García Robles Fellow · CalArts (MFA in Art)',
          bio: "Born in Mexico City in 1964, Rubén Ortiz-Torres traded early dreams of Major League Baseball and architectural studies at Harvard for visual arts, graduating from both the historic Academia de San Carlos in Mexico and the experimental California Institute of the Arts (CalArts) as a Fulbright-García Robles Fellow. A multidisciplinary artist working across photography, painting, customized cars, video, and opera, he is currently a professor at UC San Diego. His work belongs to major public collections including MoMA (New York), Tate Modern (London), LACMA, MOCA (Los Angeles), MUAC (Mexico City), and Museo Reina Sofía (Madrid). After exhibiting worldwide, he admits he has finally confirmed that his parents' folk music was, in fact, better than most rock.",
          quote:
            "In the early 1990s, when grants for visual artists were rare, the Fulbright-García Robles Fellowship allowed me to argue for a cultural exchange beyond economics—bringing me to Southern California, where Mexican postmodernism and Chicano culture naturally collided. Over 36 years later, that seed culminated in co-curating AztLÁn: Túnel del Tiempo at Mexico City’s Palacio de Bellas Artes, the institution's first Chicano art exhibition, which drew over 400,000 visitors and created a deeply emotional bridge between both countries.",
          image: ASSETS.alumni.photographer1,
          imagePosition: '50% 40%',
          work: ASSETS.alumni.photographer1Work,
          workTitle: 'Tempest Toast',
        },
        {
          id: 'photographer-2',
          name: 'Paul Turounet',
          program: 'Fulbright-García Robles Fellow (1997) · MFA in Photography, Yale University School of Art',
          bio: 'Born in 1962 in the San Francisco Bay Area, Paul Turounet received his MFA in Photography from the Yale University School of Art in 1995 and was awarded a Fulbright-García Robles Fellowship in 1997. Upon completing his fellowship, his photographic series Tierra Brava was presented at Centro Cultural Tijuana as part of FotoSeptiembre 1998, launching a body of work focused exclusively on Mexico’s border region through 2015. His exhibitions include the El Paso Museum of Art, Museo de Arte de Ciudad Juárez, and the Museum of Contemporary Art in Tucson. His self-published artist books are held in special collections including the Beinecke Rare Book & Manuscript Library at Yale University and Stanford University, while his 2016 monograph Estamos Buscando A was shortlisted for the Paris Photo–Aperture Foundation First PhotoBook Award and named one of The New York Times Best Photo Books of 2016.',
          quote:
            'In 1997, upon receiving the Fulbright-García Robles Fellowship, I walked across the border from El Paso into Ciudad Juárez with a duffle bag of clothes, a camera, and an FM-3 visa to live and photograph across the entire northern border of Mexico, from Matamoros to Tijuana. That initial support became the most profound year of my life—marking the start of a twenty-year existential journey along La Frontera to create work in a physical and emotional landscape of continuous transformation, where so many travel in search of renewal.',
          image: ASSETS.alumni.photographer2,
          imagePosition: '50% 30%',
          work: ASSETS.alumni.photographer2Work,
        },
        {
          id: 'photographer-3',
          name: 'Kathya Landeros',
          program: 'Fulbright-García Robles Fellow',
          bio: 'Fulbright-García Robles alumni photographer participating in the 35th Anniversary Gala Photography Showcase, celebrating binational perspectives and visual storytelling across Mexico and the United States.',
          image: ASSETS.alumni.photographer3,
          work: ASSETS.alumni.photographer3Work,
        },
        {
          id: 'photographer-4',
          name: 'Josh Meltzer',
          program: 'Fulbright-García Robles Fellow',
          bio: 'Fulbright-García Robles alumni photographer participating in the 35th Anniversary Gala Photography Showcase, celebrating binational perspectives and visual storytelling across Mexico and the United States.',
          image: ASSETS.alumni.photographer4,
          work: ASSETS.alumni.photographer4Work,
        },
        {
          id: 'photographer-5',
          name: 'Andrés Caballero',
          program: 'Fulbright-García Robles Fellow (2023) · MFA in Photography, Video, and Imaging, University of Arizona',
          bio: 'Born in Mexico City, Andrés Caballero is an interdisciplinary artist whose work explores the dynamics of the U.S.–Mexico border through an expanded documentary lens. His research repurposes data-capture and processing technologies—such as LiDAR sensors, depth cameras, programming, and computer vision—into tools for counter-narratives. Working across photography, video, and installation, Caballero traces what resists digitization under contemporary data regimes and what is lost in that translation. He holds an MFA in Photography, Video, and Imaging from the University of Arizona and is the recipient of the Fulbright-García Robles Fellowship (2023), the Mellon Fronteridades Graduate Fellowship (2024), the Tinker Field Research Grant (2024), and the Marcia Grand Centennial Award (2025). His work has been exhibited in Mexico and the United States at institutions including the Tucson Museum of Art, El Paso Museum of Art, Museo de Arte de Sonora, and Museo Archivo de la Fotografía.',
          quote:
            'Pursuing my MFA in the United States allowed me to build personal, academic, and professional relationships that transformed how I understand and develop my artistic practice. Learning from established contemporary artists who became key mentors—and sharing studio spaces with peers from around the world—sparked collaborations that went far beyond academia. Living in a border city like Tucson showed me firsthand how exchange between nations fuels art, culture, and a deep sense of community resilience.',
          image: ASSETS.alumni.photographer5,
          imagePosition: '50% 30%',
          work: ASSETS.alumni.photographer5Work,
        },
      ] as Photographer[],
    },
    music: {
      eyebrow: 'Musical Performance',
      title: 'Meet the Musician',
      intro: [
        'Music is another language of cultural exchange. Through their talent and artistic expression, our Fulbright-García Robles alumni bring people and cultures together.',
        'Discover the musician joining us for this special celebration and experience the power of music to connect across borders.',
      ],
      careerLabel: 'Musical & professional journey',
      websiteLabel: 'Website',
      person: {
        id: 'musician',
        name: '[Musician Name]',
        program: 'Fulbright-García Robles [Program name]',
        cohort: '[Year / Generation]',
        bio: '[Short biography: who they are, their instrument or voice, and where they studied as a Fulbright-García Robles grantee.]',
        career:
          '[Description of their musical and professional trajectory: ensembles, recordings, notable stages, teaching, research or collaborations that connect Mexico and the United States.]',
        image: ASSETS.alumni.musician,
      } as Musician,
    },
  },
  footer: {
    org: 'U.S.-Mexico Commission for Educational and Cultural Exchange',
    tagline: '35 years of connecting people, institutions, and opportunities across borders.',
    backToTop: 'Back to top',
    rights: 'COMEXUS · Fulbright-García Robles',
    credit: { label: 'Developed by', name: 'hellosarly@sarlystudio.com', href: 'mailto:hellosarly@sarlystudio.com' },
  },
};

export type GalaContent = typeof CONTENT;
