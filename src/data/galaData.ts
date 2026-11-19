/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  galaData.ts — single source of truth for the microsite.
 *
 *  • Every visible string lives here in `en` (default) and `es`.
 *  • Every image path lives in `ASSETS`. Upload files to /public/assets/ with
 *    the exact names below and they replace the vector fallbacks automatically.
 *  • To fill in alumni profiles, edit `ALUMNI_LINKS` (URLs, shared by both
 *    languages) and the `alumni` block of each language.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Lang = 'en' | 'es';
export const LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** Builds a path that works under any base (GitHub Pages sub-folder, Vercel root…). */
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

/* ───────────────────────────── Asset paths ───────────────────────────── */

export const ASSETS = {
  logos: {
    comexus35: asset('logos/comexus-35-anniversary.png'), // full-colour (white art on a blue panel)
    comexus35White: asset('logos/comexus-35-anniversary-white.png'), // transparent, for Navy backgrounds
    fulbrightComexus: asset('logos/fulbright-comexus.png'),
    fulbright80: asset('logos/fulbright-80th-anniversary-white.png'),
    fulbright80Blue: asset('logos/fulbright-80th-anniversary-blue.png'),
    freedom250: asset('logos/freedom-250-color.png'), // navy + gold, for light backgrounds
    freedom250White: asset('logos/freedom-250-white.png'), // white + gold, for Navy backgrounds
  },
  story: {
    y1948: asset('story/1948-fulbright-mexico.jpg'),
    y1980s: asset('story/1980s-growth.jpg'),
    y1990: asset('story/1990-comexus-established.jpg'),
    y1991: asset('story/1991-first-board-meeting.jpg'),
    y1992: asset('story/1992-garcia-robles.jpg'),
  },
  alumni: {
    photographer1: asset('alumni/photographer-1.jpg'),
    photographer2: asset('alumni/photographer-2.jpg'),
    photographer3: asset('alumni/photographer-3.jpg'),
    musician: asset('alumni/musician.jpg'),
  },
} as const;

/* ─────────────────────── Routing / QR anchor IDs ─────────────────────── */

export type TabId = 'overview' | 'alumni';
export const PROFILE_IDS = ['photographer-1', 'photographer-2', 'photographer-3', 'musician'] as const;
export type ProfileId = (typeof PROFILE_IDS)[number];
export const OVERVIEW_SECTION_IDS = ['top', 'story', 'program', 'milestones'] as const;
export type OverviewSectionId = (typeof OVERVIEW_SECTION_IDS)[number];

/* ─────────────────────── External links (alumni) ─────────────────────── */
// Replace "#" with the real URLs. Empty strings hide the link.

export const ALUMNI_LINKS: Record<ProfileId, { portfolio: string; website?: string; instagram?: string; linkedin?: string; spotify?: string; youtube?: string }> = {
  'photographer-1': { portfolio: '#' },
  'photographer-2': { portfolio: '#' },
  'photographer-3': { portfolio: '#' },
  musician: { portfolio: '', website: '#', instagram: '#', spotify: '#', youtube: '#' },
};

/* ───────────────────────────── Content types ─────────────────────────── */

export interface TimelineItem {
  id: string;
  year: string; // big editorial label
  title: string;
  text: string;
  image: string;
  imageAlt: string;
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
  logo?: string;
  logoAlt?: string;
  emblem?: 'bbp'; // typographic emblem when no logo exists
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

export interface GalaContent {
  meta: { title: string };
  nav: {
    overview: string;
    alumni: string;
    story: string;
    program: string;
    milestones: string;
    langLabel: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    lockup: { line1: string; line2: string; line3: string };
    tagline: string;
    facts: { label: string; value: string; detail?: string; icon: 'calendar' | 'clock' | 'pin' }[];
    logosLabel: string;
    ctaAlumni: string;
    ctaAlumniHint: string;
    ctaProgram: string;
    scrollHint: string;
  };
  story: {
    eyebrow: string;
    title: string;
    intro: string;
    timeline: TimelineItem[];
    photoPending: string;
    closing: { eyebrow: string; paragraphs: string[]; highlight: string; signoff: string };
  };
  program: {
    eyebrow: string;
    title: string;
    intro: string;
    entries: ProgramEntry[];
    toBeConfirmed: string;
    note: string;
  };
  milestones: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Milestone[];
  };
  alumni: {
    back: string;
    eyebrow: string;
    title: string;
    intro: string;
    jumpTo: string;
    copyLink: string;
    copied: string;
    photoPending: string;
    photography: {
      eyebrow: string;
      title: string;
      intro: string;
      curatorial: string;
      cta: string;
      people: Photographer[];
    };
    music: {
      eyebrow: string;
      title: string;
      intro: string;
      careerLabel: string;
      linksLabel: string;
      linkLabels: { website: string; portfolio: string; instagram: string; spotify: string; youtube: string; linkedin: string };
      person: Musician;
    };
  };
  footer: {
    org: string;
    tagline: string;
    backToTop: string;
    rights: string;
  };
}

/* ═════════════════════════════════ ENGLISH ═════════════════════════════════ */

const en: GalaContent = {
  meta: { title: 'Celebrating a Legacy of Exchange · COMEXUS' },
  nav: {
    overview: 'Gala Overview',
    alumni: 'Alumni Showcase',
    story: 'Our Story',
    program: 'Program',
    milestones: 'Milestones',
    langLabel: 'Language',
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
    ],
    logosLabel: 'Celebrating together',
    ctaAlumni: 'Meet the Alumni',
    ctaAlumniHint: 'QR Showcase',
    ctaProgram: 'View the program',
    scrollHint: 'Scroll',
  },
  story: {
    eyebrow: 'Our Story',
    title: 'An Enduring Legacy of Exchange',
    intro:
      'For generations, educational and cultural exchange has created opportunities for people to learn from one another, build lasting connections, and contribute to a stronger relationship between Mexico and the United States.',
    photoPending: 'Archival photograph',
    timeline: [
      {
        id: '1948',
        year: '1948',
        title: 'The Fulbright Program comes to Mexico',
        text: 'The Fulbright Program began operating in Mexico, only two years after its establishment in the United States, opening new opportunities for educational exchange between the two countries.',
        image: ASSETS.story.y1948,
        imageAlt: 'Archival photograph of the early Fulbright Program in Mexico, 1948',
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
      },
    ],
    closing: {
      eyebrow: 'A Legacy in Motion',
      paragraphs: [
        'Over the years, COMEXUS has developed and supported a wide range of programs for students, scholars, researchers, teachers, and professionals. Some programs have evolved, others have concluded, and new opportunities have emerged.',
        'Each has contributed to building the binational academic and cultural relationships that define COMEXUS today.',
      ],
      highlight: '35 years of connecting people, institutions, and opportunities across borders.',
      signoff: 'And the story continues.',
    },
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
    ],
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
        caption: 'The Mexico-U.S. Commission for Educational and Cultural Exchange.',
        logo: ASSETS.logos.comexus35,
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
        caption: 'Three decades of professional exchange between Mexico and the United States.',
        emblem: 'bbp',
      },
      {
        number: '250',
        unit: 'Years',
        title: 'of American Independence',
        caption: 'Freedom 250 — commemorating the 250th anniversary of the United States.',
        logo: ASSETS.logos.freedom250,
        logoAlt: 'Freedom 250 logo',
      },
    ],
  },
  alumni: {
    back: 'Gala Overview',
    eyebrow: 'Meet the Alumni',
    title: 'Alumni Showcase',
    intro: 'Fulbright-García Robles alumni whose art and music accompany tonight’s celebration.',
    jumpTo: 'Jump to',
    copyLink: 'Copy link to this profile',
    copied: 'Link copied',
    photoPending: 'Portrait coming soon',
    photography: {
      eyebrow: 'Photography Showcase',
      title: 'Through Their Lens: A Fulbright Alumni Photography Showcase',
      intro:
        'Discover the work of Fulbright-García Robles alumni through a photography showcase celebrating their perspectives, creativity, and the stories they tell through their lens.',
      curatorial:
        "Featured works are projected on screen during the gala evening. Explore the artists' profiles and digital portfolios below.",
      cta: 'Explore Their Work',
      people: [
        {
          id: 'photographer-1',
          name: '[Photographer Name 1]',
          program: 'Fulbright-García Robles [Program name]',
          cohort: '[Year / Generation]',
          bio: '[Short biography: two or three sentences about the artist’s background, discipline and how their Fulbright experience shaped their work.]',
          quote: '[A personal quote or testimonial from the photographer about exchange, perspective or the stories behind their images.]',
          image: ASSETS.alumni.photographer1,
        },
        {
          id: 'photographer-2',
          name: '[Photographer Name 2]',
          program: 'Fulbright-García Robles [Program name]',
          cohort: '[Year / Generation]',
          bio: '[Short biography: two or three sentences about the artist’s background, discipline and how their Fulbright experience shaped their work.]',
          quote: '[A personal quote or testimonial from the photographer about exchange, perspective or the stories behind their images.]',
          image: ASSETS.alumni.photographer2,
        },
        {
          id: 'photographer-3',
          name: '[Photographer Name 3]',
          program: 'Fulbright-García Robles [Program name]',
          cohort: '[Year / Generation]',
          bio: '[Short biography: two or three sentences about the artist’s background, discipline and how their Fulbright experience shaped their work.]',
          quote: '[A personal quote or testimonial from the photographer about exchange, perspective or the stories behind their images.]',
          image: ASSETS.alumni.photographer3,
        },
      ],
    },
    music: {
      eyebrow: 'Musical Performance',
      title: 'Meet the Musician',
      intro: 'Meet the Fulbright-García Robles alumnus whose musical performance will accompany our celebration.',
      careerLabel: 'Musical & professional journey',
      linksLabel: 'Listen & connect',
      linkLabels: {
        website: 'Website',
        portfolio: 'Portfolio',
        instagram: 'Instagram',
        spotify: 'Spotify',
        youtube: 'YouTube',
        linkedin: 'LinkedIn',
      },
      person: {
        id: 'musician',
        name: '[Musician Name]',
        program: 'Fulbright-García Robles [Program name]',
        cohort: '[Year / Generation]',
        bio: '[Short biography: who they are, their instrument or voice, and where they studied as a Fulbright-García Robles grantee.]',
        career:
          '[Description of their musical and professional trajectory: ensembles, recordings, notable stages, teaching, research or collaborations that connect Mexico and the United States.]',
        image: ASSETS.alumni.musician,
      },
    },
  },
  footer: {
    org: 'Mexico-U.S. Commission for Educational and Cultural Exchange',
    tagline: '35 years of connecting people, institutions, and opportunities across borders.',
    backToTop: 'Back to top',
    rights: 'COMEXUS · Fulbright-García Robles',
  },
};

/* ═════════════════════════════════ ESPAÑOL ═════════════════════════════════ */

const es: GalaContent = {
  meta: { title: 'Celebrando un legado de intercambio · COMEXUS' },
  nav: {
    overview: 'La Gala',
    alumni: 'Exbecarios',
    story: 'Nuestra historia',
    program: 'Programa',
    milestones: 'Aniversarios',
    langLabel: 'Idioma',
    skip: 'Ir al contenido',
  },
  hero: {
    eyebrow: 'COMEXUS · Fulbright-García Robles',
    // The official lockup stays in English, as on the printed invitation.
    lockup: { line1: 'Celebrating a', line2: 'Legacy of', line3: 'Exchange' },
    tagline: 'Honramos a las personas, las alianzas y las oportunidades que unen a nuestras naciones.',
    facts: [
      { icon: 'calendar', label: 'Fecha', value: '2 de diciembre de 2026' },
      { icon: 'clock', label: 'Horario', value: '7:00 p. m. – 10:00 p. m.' },
      {
        icon: 'pin',
        label: 'Sede',
        value: 'Museo de Historia Natural y Cultura Ambiental',
        detail: 'Bosque de Chapultepec, Ciudad de México',
      },
    ],
    logosLabel: 'Celebramos juntos',
    ctaAlumni: 'Conoce a los exbecarios',
    ctaAlumniHint: 'Muestra QR',
    ctaProgram: 'Ver el programa',
    scrollHint: 'Desliza',
  },
  story: {
    eyebrow: 'Nuestra historia',
    title: 'Un legado perdurable de intercambio',
    intro:
      'Durante generaciones, el intercambio educativo y cultural ha creado oportunidades para que las personas aprendan unas de otras, construyan vínculos duraderos y contribuyan a una relación más sólida entre México y Estados Unidos.',
    photoPending: 'Fotografía de archivo',
    timeline: [
      {
        id: '1948',
        year: '1948',
        title: 'El Programa Fulbright llega a México',
        text: 'El Programa Fulbright comenzó a operar en México apenas dos años después de su creación en Estados Unidos, abriendo nuevas oportunidades de intercambio educativo entre ambos países.',
        image: ASSETS.story.y1948,
        imageAlt: 'Fotografía de archivo de los inicios del Programa Fulbright en México, 1948',
      },
      {
        id: '1980s',
        year: 'Década de 1980',
        title: 'Una década de crecimiento',
        text: 'El número de becas para participantes mexicanos y estadounidenses creció de manera constante, de aproximadamente 50 en 1980 a 180 en 1990. Durante este periodo cobró fuerza la idea de establecer una comisión binacional.',
        image: ASSETS.story.y1980s,
        imageAlt: 'Becarios Fulbright durante la década de 1980',
      },
      {
        id: '1990',
        year: '27 de noviembre de 1990',
        title: 'La creación de COMEXUS',
        text: 'La Comisión México-Estados Unidos para el Intercambio Educativo y Cultural (COMEXUS) se estableció mediante un acuerdo bilateral firmado en Monterrey, Nuevo León, en presencia del presidente de México, Carlos Salinas de Gortari, y del presidente de Estados Unidos, George H. W. Bush. Su misión: promover el entendimiento mutuo entre los pueblos de México y Estados Unidos a través del intercambio educativo y cultural.',
        image: ASSETS.story.y1990,
        imageAlt: 'Firma del acuerdo bilateral que estableció COMEXUS en Monterrey, 1990',
      },
      {
        id: '1991',
        year: 'Abril de 1991',
        title: 'La primera sesión del Consejo Directivo',
        text: 'El Consejo Directivo de la Comisión celebró su sesión inaugural en la Ciudad de México, un paso importante en la consolidación de su estructura institucional binacional.',
        image: ASSETS.story.y1991,
        imageAlt: 'Sesión inaugural del Consejo Directivo de COMEXUS, Ciudad de México, 1991',
      },
      {
        id: '1992',
        year: 'Enero de 1992',
        title: 'El nombre Fulbright-García Robles',
        text: 'Fiel al espíritu binacional de la Comisión, su Consejo aprobó designar todas las becas como Fulbright-García Robles, en honor al embajador emérito mexicano y Premio Nobel de la Paz, Alfonso García Robles.',
        image: ASSETS.story.y1992,
        imageAlt: 'Retrato del embajador Alfonso García Robles',
      },
    ],
    closing: {
      eyebrow: 'Un legado en movimiento',
      paragraphs: [
        'A lo largo de los años, COMEXUS ha desarrollado e impulsado una amplia gama de programas para estudiantes, académicos, investigadores, docentes y profesionales. Algunos programas han evolucionado, otros han concluido y han surgido nuevas oportunidades.',
        'Cada uno ha contribuido a construir las relaciones académicas y culturales binacionales que hoy definen a COMEXUS.',
      ],
      highlight: '35 años conectando personas, instituciones y oportunidades más allá de las fronteras.',
      signoff: 'Y la historia continúa.',
    },
  },
  program: {
    eyebrow: '2 de diciembre de 2026',
    title: 'Programa del evento',
    intro: 'Una velada de mensajes, reconocimientos y música en honor a un legado binacional compartido.',
    toBeConfirmed: 'por confirmar',
    entries: [
      {
        time: '7:10 p. m.',
        title: 'Palabras de bienvenida',
        icon: 'mic',
        people: [
          { name: 'Alma Calderón', note: 'Directora Ejecutiva Interina, COMEXUS' },
          { name: 'Representante de la Secretaría de Educación Pública (SEP)' },
          { name: 'Representante de la Secretaría de Relaciones Exteriores (SRE)' },
          { name: 'Representante de la Embajada de Estados Unidos en la Ciudad de México / A/S Cate Dillon', note: 'tbc' },
          { name: 'Representante de organizaciones aliadas y socios estratégicos' },
        ],
        segmentsTitle: 'Reconocimientos especiales y presentaciones',
        segments: [
          { kind: 'award', title: 'Reconocimiento al Liderazgo – Exbecarios' },
          { kind: 'music', title: 'Presentación musical' },
          { kind: 'award', title: 'Reconocimiento al Impacto – Exbecarios' },
          { kind: 'music', title: 'Presentación musical' },
        ],
      },
      { time: '8:00 p. m.', title: 'Cóctel', icon: 'glass' },
      { time: '10:00 p. m.', title: 'Cierre del evento', icon: 'moon' },
    ],
    note: 'Nota: Los nombres y cargos de algunos representantes institucionales están sujetos a confirmación.',
  },
  milestones: {
    eyebrow: 'Cuatro aniversarios, una velada',
    title: 'Celebramos cuatro aniversarios',
    intro: 'Esta gala reúne cuatro aniversarios que dan cuenta del poder del intercambio, las alianzas y los ideales compartidos.',
    items: [
      {
        number: '35',
        unit: 'Años',
        title: 'de COMEXUS',
        caption: 'La Comisión México-Estados Unidos para el Intercambio Educativo y Cultural.',
        logo: ASSETS.logos.comexus35,
        logoAlt: 'Logotipo del 35 aniversario de COMEXUS',
      },
      {
        number: '80',
        unit: 'Años',
        title: 'del Programa Fulbright',
        caption: 'El principal programa de intercambio educativo internacional de Estados Unidos.',
        logo: ASSETS.logos.fulbright80Blue,
        logoAlt: 'Logotipo del 80 aniversario del Programa Fulbright',
      },
      {
        number: '30',
        unit: 'Años',
        title: 'del Programa Binacional de Negocios',
        caption: 'Tres décadas de intercambio profesional entre México y Estados Unidos.',
        emblem: 'bbp',
      },
      {
        number: '250',
        unit: 'Años',
        title: 'de la Independencia de Estados Unidos',
        caption: 'Freedom 250: conmemoración del 250 aniversario de Estados Unidos.',
        logo: ASSETS.logos.freedom250,
        logoAlt: 'Logotipo de Freedom 250',
      },
    ],
  },
  alumni: {
    back: 'La Gala',
    eyebrow: 'Conoce a los exbecarios',
    title: 'Muestra de exbecarios',
    intro: 'Exbecarios Fulbright-García Robles cuyo arte y música acompañan la celebración de esta noche.',
    jumpTo: 'Ir a',
    copyLink: 'Copiar enlace a este perfil',
    copied: 'Enlace copiado',
    photoPending: 'Retrato próximamente',
    photography: {
      eyebrow: 'Muestra fotográfica',
      title: 'A través de su lente: muestra fotográfica de exbecarios Fulbright',
      intro:
        'Descubre el trabajo de exbecarios Fulbright-García Robles a través de una muestra fotográfica que celebra sus perspectivas, su creatividad y las historias que cuentan a través de su lente.',
      curatorial:
        'Las obras seleccionadas se proyectan en pantalla durante la gala. Explora a continuación los perfiles y portafolios digitales de los artistas.',
      cta: 'Explora su obra',
      people: [
        {
          id: 'photographer-1',
          name: '[Nombre del fotógrafo 1]',
          program: 'Fulbright-García Robles [Nombre del programa]',
          cohort: '[Año / Generación]',
          bio: '[Biografía breve: dos o tres frases sobre la trayectoria del artista, su disciplina y cómo su experiencia Fulbright influyó en su obra.]',
          quote: '[Una frase o testimonio personal del fotógrafo sobre el intercambio, la mirada o las historias detrás de sus imágenes.]',
          image: ASSETS.alumni.photographer1,
        },
        {
          id: 'photographer-2',
          name: '[Nombre del fotógrafo 2]',
          program: 'Fulbright-García Robles [Nombre del programa]',
          cohort: '[Año / Generación]',
          bio: '[Biografía breve: dos o tres frases sobre la trayectoria del artista, su disciplina y cómo su experiencia Fulbright influyó en su obra.]',
          quote: '[Una frase o testimonio personal del fotógrafo sobre el intercambio, la mirada o las historias detrás de sus imágenes.]',
          image: ASSETS.alumni.photographer2,
        },
        {
          id: 'photographer-3',
          name: '[Nombre del fotógrafo 3]',
          program: 'Fulbright-García Robles [Nombre del programa]',
          cohort: '[Año / Generación]',
          bio: '[Biografía breve: dos o tres frases sobre la trayectoria del artista, su disciplina y cómo su experiencia Fulbright influyó en su obra.]',
          quote: '[Una frase o testimonio personal del fotógrafo sobre el intercambio, la mirada o las historias detrás de sus imágenes.]',
          image: ASSETS.alumni.photographer3,
        },
      ],
    },
    music: {
      eyebrow: 'Presentación musical',
      title: 'Conoce al músico',
      intro: 'Conoce al exbecario Fulbright-García Robles cuya interpretación musical acompañará nuestra celebración.',
      careerLabel: 'Trayectoria musical y profesional',
      linksLabel: 'Escucha y conecta',
      linkLabels: {
        website: 'Sitio web',
        portfolio: 'Portafolio',
        instagram: 'Instagram',
        spotify: 'Spotify',
        youtube: 'YouTube',
        linkedin: 'LinkedIn',
      },
      person: {
        id: 'musician',
        name: '[Nombre del músico]',
        program: 'Fulbright-García Robles [Nombre del programa]',
        cohort: '[Año / Generación]',
        bio: '[Biografía breve: quién es, su instrumento o voz y dónde estudió como becario Fulbright-García Robles.]',
        career:
          '[Descripción de su trayectoria musical y profesional: ensambles, grabaciones, escenarios destacados, docencia, investigación o colaboraciones que conectan a México y Estados Unidos.]',
        image: ASSETS.alumni.musician,
      },
    },
  },
  footer: {
    org: 'Comisión México-Estados Unidos para el Intercambio Educativo y Cultural',
    tagline: '35 años conectando personas, instituciones y oportunidades más allá de las fronteras.',
    backToTop: 'Volver arriba',
    rights: 'COMEXUS · Fulbright-García Robles',
  },
};

export const CONTENT: Record<Lang, GalaContent> = { en, es };
