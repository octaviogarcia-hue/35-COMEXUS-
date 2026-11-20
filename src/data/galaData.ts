/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  galaData.ts — single source of truth for the microsite (English only).
 *
 *  • Every visible string lives in `CONTENT`.
 *  • Every image path lives in `ASSETS`. Upload files to /public/assets/ with
 *    the exact names below and they replace the elegant fallbacks automatically.
 *  • To fill in alumni profiles, edit `ALUMNI_LINKS` (URLs) and the `alumni`
 *    block of `CONTENT`.
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
  },
  story: {
    y1948: asset('story/1948-fulbright-mexico.jpg'),
    y1980s: asset('story/1980s-growth.jpg'),
    y1990: asset('story/1990-comexus-established.png'),
    y1991: asset('story/1991-first-board-meeting.png'),
    y1992: asset('story/1992-garcia-robles.jpg'),
  },
  alumni: {
    photographer1: asset('alumni/photographer-1.jpg'),
    photographer2: asset('alumni/photographer-2.jpg'),
    photographer3: asset('alumni/photographer-3.jpg'),
    photographer4: asset('alumni/photographer-4.jpg'),
    photographer5: asset('alumni/photographer-5.jpg'),
    photographer6: asset('alumni/photographer-6.jpg'),
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
  'photographer-6',
  'musician',
] as const;
export type ProfileId = (typeof PROFILE_IDS)[number];
export const OVERVIEW_SECTION_IDS = ['top', 'story', 'future', 'support', 'program', 'milestones'] as const;
export type OverviewSectionId = (typeof OVERVIEW_SECTION_IDS)[number];

/* ─────────────────────── External links ─────────────────────── */
// Replace "#" with the real URLs. Empty strings hide the link.

export const ALUMNI_LINKS: Record<ProfileId, { portfolio: string; website?: string }> = {
  'photographer-1': { portfolio: '#' },
  'photographer-2': { portfolio: '#' },
  'photographer-3': { portfolio: '#' },
  'photographer-4': { portfolio: '#' },
  'photographer-5': { portfolio: '#' },
  'photographer-6': { portfolio: '#' },
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
  icon: 'mic' | 'award' | 'music' | 'glass' | 'moon';
  people?: { name: string; note?: string }[];
  segments?: { title: string; kind: 'award' | 'music' }[];
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
  cohort: string;
  bio: string;
  quote: string;
  image: string;
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

const photographer = (n: 1 | 2 | 3 | 4 | 5 | 6, image: string): Photographer => ({
  id: `photographer-${n}`,
  name: `[Photographer Name ${n}]`,
  program: 'Fulbright-García Robles [Program name]',
  cohort: '[Year / Generation]',
  bio: '[Short biography: two or three sentences about the artist’s background, discipline and how their Fulbright experience shaped their work.]',
  quote: '[A personal quote or testimonial from the photographer about exchange, perspective or the stories behind their images.]',
  image,
});

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
    toBeConfirmed: 'subject to confirmation',
    entries: [
      {
        time: '7:10 PM',
        title: 'Opening Remarks',
        icon: 'mic',
        people: [
          { name: 'Alma Calderón', note: 'Acting Executive Director, COMEXUS' },
          { name: 'Representative from the Ministry of Public Education (SEP)' },
          { name: 'Representative from the Ministry of Foreign Affairs (SRE)' },
          { name: 'Representative from the U.S. Embassy in Mexico City / A/S Cate Dillon', note: 'tbc' },
          { name: 'Representative of partner organizations and stakeholders' },
        ],
        segmentsTitle: 'Special Recognitions & Performances',
        segments: [
          { kind: 'award', title: 'Leadership Honor – Alumni Recognition' },
          { kind: 'music', title: 'Musical Performance' },
          { kind: 'award', title: 'Impact Honor – Alumni Recognition' },
          { kind: 'music', title: 'Musical Performance' },
        ],
      },
      { time: '8:00 PM', title: 'Cocktail Reception', icon: 'glass' },
      { time: '10:00 PM', title: 'End of Event', icon: 'moon' },
    ] as ProgramEntry[],
    note: 'Note: Names and titles of select institutional representatives are subject to confirmation.',
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
      people: [
        photographer(1, ASSETS.alumni.photographer1),
        photographer(2, ASSETS.alumni.photographer2),
        photographer(3, ASSETS.alumni.photographer3),
        photographer(4, ASSETS.alumni.photographer4),
        photographer(5, ASSETS.alumni.photographer5),
        photographer(6, ASSETS.alumni.photographer6),
      ],
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
  },
};

export type GalaContent = typeof CONTENT;
