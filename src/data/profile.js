/**
 * Datos del perfil (fuente: CV). Centralizados acá para que las secciones
 * sean puramente presentacionales y actualizar el CV sea un solo archivo.
 */

// Local y redimensionada (960px, ~130KB): la original remota pesaba ~840KB.
import avatar from '../assets/profile.jpg';

export const CAREER_START_YEAR = 2021;

export const profile = {
  firstName: 'Javier',
  lastName: 'Córdoba',
  role: 'Desarrollador de Software',
  location: 'Córdoba, Argentina',
  email: 'cordobajava@gmail.com',
  phone: '+54 9 3546 416552',
  avatar,
  available: true,
  // Getter: los años salen calculados para que la presentación no quede
  // desactualizada sola el 1 de enero.
  get intro() {
    return `Analista en Sistemas y desarrollador full-stack. Más de ${yearsWord()} años construyendo software que las empresas usan todos los días. Autodidacta me obsesionan los detalles, la automatización y encontrar siempre una mejor solución.`;
  },
  socials: [
    { label: 'GitHub', handle: 'Javi-cba', url: 'https://github.com/javi-cba' },
    {
      label: 'LinkedIn',
      handle: 'javi-cba',
      url: 'https://www.linkedin.com/in/javi-cba',
    },
    { label: 'Email', handle: 'cordobajava@gmail.com', url: 'mailto:cordobajava@gmail.com' },
  ],
};

/** Experiencia laboral, del presente hacia atrás. `**texto**` se resalta en negrita. */
export const experience = [
  {
    id: 'notchatbot',
    company: 'NotChatbot AI',
    url: 'https://notchatbot.com',
    logo: '/logos/notchatbot.webp',
    role: 'Dev Full-Stack (Next.js) / Integrations Lead',
    period: 'Feb 2025',
    current: true,
    summary:
      'Plataforma de **agentes de IA multicanal** que atienden y venden en **múltiples canales**, junto con el **CRM** y el **marketing automatizado** que los rodea.',
    highlights: [
      'Agentes conversacionales basados en **LLMs**, potenciados con **RAG**, **embeddings**, **búsqueda vectorial**, **MCP**, **NLP** y **modelos predictivos** para dar respuestas precisas y adaptadas a cada negocio.',
      'Lideré y desarrollé **+5 integraciones end-to-end** con plataformas externas: **Mercado Pago**, **Google Cloud**, **VTEX**, **Resend** y **Shipnow**, cubriendo pagos, catálogo, emails transaccionales y envíos.',
      'Coordinación técnica y desarrollo junto a **consultoras y equipos IT** de los clientes: llamadas con sus desarrolladores para definir las APIs e implementar la conexión del chatbot con sus **e-commerce**, **sistemas de gestión** y **flujos internos**, de modo que el agente consulte y opere sobre ellos.',
      'Trato directo con clientes: **demos**, **feedback** y **relevamiento de requerimientos**, traduciendo necesidades de negocio en funcionalidades concretas.',
      'Agentes operando en **WhatsApp Business**, **Instagram**, **Facebook**, **email** y **Mercado Libre** (preventa, posventa y reclamos), entre otros canales, resolviendo consultas y **ventas de punta a punta** sin intervención humana.',
      'Manejo del ecosistema de **AWS**: despliegue de servicios, cómputo serverless, almacenamiento, permisos y monitoreo para que la plataforma escale.',
      'Manejo del ecosistema de Meta: **Business Manager** y **Meta Business Suite**, **portfolios comerciales** y alta y gestión de **números de teléfono** de WhatsApp Business.',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'LLMs',
      'RAG',
      'MCP',
      'META',
      'AWS',
    ],
  },
  {
    id: 'maser',
    company: 'Maser Informática',
    url: 'https://maserinformatica.com',
    logo: '/logos/maser.svg',
    role: 'Dev Full-Stack .NET',
    period: 'Ene 2023 — Ene 2025',
    current: false,
    summary:
      '**Sistemas de gestión** a medida para empresas, enfocados en la administración comercial y la operación de depósito.',
    highlights: [
      'Desarrollo del **sistema de gestión administrativa** (clientes, ventas y finanzas) con **C#** y **SQL Server**: nuevos módulos y mantenimiento de los existentes.',
      '**App mobile** de control de depósito con **Xamarin.Forms** y **ASP.NET MVC**: digitalizó el stock y la preparación de pedidos en los depósitos de **clientes mayoristas**, con **más de 30 usuarios por empresa**.',
      '**Modo offline** con **SQLite** y sincronización contra el servidor para operar sin conexión.',
      'Despliegue de las aplicaciones en **Windows Server** con **IIS** y **Nginx**: publicación de sitios y APIs, y configuración de **puertos**.',
      'Comunicación directa con los clientes durante todo el proyecto y las entregas.',
    ],
    stack: ['C#', 'ASP.NET', 'Xamarin.Forms', 'SQL Server', 'SQLite', 'IIS', 'Nginx'],
  },
];

/** Formación académica. Mismos campos que `experience` para reutilizar el timeline. */
export const education = [
  {
    id: 'leibnitz',
    role: 'Analista en Sistemas',
    company: 'Instituto Superior Leibnitz',
    url: 'https://leibnitz.edu.ar/',
    logo: '/logos/leibnitz.webp',
    period: 'Ene 2023 — Ene 2025',
    badge: 'Promedio 8,30',
    summary:
      'Formación integral en el desarrollo de software: del relevamiento y el diseño hasta la implementación y la gestión del proyecto.',
    highlights: [
      '**Ciclo de vida del software**, **ingeniería de requerimientos** y metodologías de desarrollo.',
      'Análisis y diseño de sistemas con **UML**: casos de uso, clases y diagramas de secuencia.',
      'Programación, **algoritmos**, **estructuras de datos** y **programación orientada a objetos**.',
      'Modelado y diseño de **bases de datos** con **SQL** y **NoSQL**.',
      '**Redes**, **sistemas operativos** y arquitectura de computadoras.',
      '**Administración de proyectos** y prácticas profesionalizantes sobre **casos reales**.',
    ],
    stack: ['Ingeniería de Software', 'UML', 'POO', 'SQL', 'NoSQL', 'Redes', 'Gestión de proyectos'],
  },
];

/** Stack técnico agrupado por dominio. */
export const stack = [
  {
    id: 'languages',
    label: 'Lenguajes',
    items: ['JavaScript', 'TypeScript', 'Python', 'C#'],
  },
  {
    id: 'ai',
    label: 'IA aplicada',
    items: [
      'LLMs vía API/SDK',
      'RAG',
      'Embeddings',
      'Búsqueda vectorial',
      'MCP',
      'NLP',
      'Modelos predictivos',
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Django', 'ASP.NET'],
  },
  {
    id: 'data',
    label: 'Bases de datos',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Convex'],
  },
  {
    id: 'cloud',
    label: 'Infra & Cloud',
    items: ['AWS', 'Docker', 'Vercel', 'Nginx'],
  },
  {
    id: 'architecture',
    label: 'Arquitectura',
    items: ['API REST', 'Microservicios', 'MVC'],
  },
  {
    id: 'protocols',
    label: 'Protocolos & integraciones',
    items: ['WebSocket', 'gRPC', 'Webhooks', 'MQTT'],
  },
  {
    id: 'auth',
    label: 'Auth',
    items: ['OAuth', 'IAM', 'JWT', 'TOTP'],
  },
];

/**
 * Navegación principal. Los ids coinciden con las secciones de App.jsx y el
 * `slug` es lo que se ve en la URL (`?seccion=trayectoria`).
 */
export const navLinks = [
  { id: 'aboutMe', label: 'Perfil', slug: 'perfil' },
  { id: 'experience', label: 'Trayectoria', slug: 'trayectoria' },
  { id: 'stack', label: 'Stack', slug: 'stack' },
  { id: 'projects', label: 'Proyectos', slug: 'proyectos', featured: true },
];

/** Años de experiencia calculados, para no dejar un número que envejezca. */
export function yearsOfExperience() {
  return Math.max(1, new Date().getFullYear() - CAREER_START_YEAR);
}

const YEAR_WORDS = {
  4: 'Cuatro',
  5: 'Cinco',
  6: 'Seis',
  7: 'Siete',
  8: 'Ocho',
  9: 'Nueve',
  10: 'Diez',
  11: 'Once',
  12: 'Doce',
};

/** Los años en palabra, para que la presentación se lea como una frase. */
export function yearsWord() {
  const years = yearsOfExperience();
  return YEAR_WORDS[years] ?? String(years);
}
