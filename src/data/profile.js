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
  objective:
    'Busco integrarme en un equipo dinámico donde pueda aportar mis habilidades y enfrentar desafíos complejos, en un entorno que valore la innovación y el aprendizaje continuo.',
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

/** Qué hago — capacidades principales, derivadas de la experiencia real. */
export const capabilities = [
  {
    id: 'fullstack',
    title: 'Desarrollo Full-Stack',
    description:
      'Aplicaciones de punta a punta con React, Next.js y TypeScript sobre APIs en Node.js, Django o ASP.NET.',
    tags: ['React', 'Next.js', 'Node.js', 'ASP.NET'],
  },
  {
    id: 'integrations',
    title: 'Integraciones & APIs',
    description:
      'Integraciones end-to-end con Meta, Mercado Libre, Mercado Pago, Google Cloud y plataformas de e-commerce.',
    tags: ['API REST', 'Webhooks', 'OAuth', 'Gateways'],
  },
  {
    id: 'ai',
    title: 'IA Aplicada',
    description:
      'Features con LLMs vía SDKs y APIs, NLP, modelos predictivos y detección de objetos con CNN.',
    tags: ['LLMs', 'NLP', 'CNN', 'RAG'],
  },
];

/** Experiencia laboral, del presente hacia atrás. */
export const experience = [
  {
    id: 'notchatbot',
    company: 'NotChatbot IA',
    role: 'Dev Full-Stack (Next.js) / Integrations Lead',
    period: 'Feb 2025 — Hoy',
    current: true,
    summary:
      'Desarrollo de chatbots de ventas y atención al cliente, y liderazgo de las integraciones con plataformas externas.',
    highlights: [
      'Integraciones con APIs de Meta, Mercado Libre, Mercado Pago y Google Cloud.',
      'Conectores de e-commerce: Tiendanube, Shopify, WooCommerce y VTEX.',
      'Features con LLMs integrados vía SDKs y APIs de IA.',
      'Demos y relevamiento de requerimientos directo con clientes.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'LLMs', 'Webhooks', 'Redis'],
  },
  {
    id: 'maser',
    company: 'Maser Informática',
    role: 'Dev Full-Stack .NET',
    period: '2021 — 2025',
    current: false,
    summary:
      'Sistemas de gestión para empresas: administración comercial y operación de depósito.',
    highlights: [
      'Sistema de gestión administrativa: clientes, ventas y finanzas.',
      'Gestión de artículos: control de stock, ubicaciones, preparación de pedidos y ofertas.',
      'Ciclo completo: desarrollo, testing e implementación en producción.',
      'Comunicación directa con el cliente durante todo el proyecto.',
    ],
    stack: ['ASP.NET', 'C#', 'SQL Server', 'MVC', 'JavaScript'],
  },
];

/** Formación académica. */
export const education = [
  {
    id: 'leibnitz',
    school: 'Instituto Superior Leibnitz',
    title: 'Analista en Sistemas',
    period: 'Ene 2023 — Ene 2025',
    note: 'Promedio final: 8,30',
  },
  {
    id: 'secundario',
    school: 'Instituto Secundario Dalmacio Vélez Sarsfield',
    title: 'Título de Nivel Secundario',
    period: 'Finalizado',
    note: null,
  },
];

/** Stack técnico agrupado por dominio. */
export const stack = [
  {
    id: 'languages',
    label: 'Lenguajes',
    items: ['JavaScript', 'TypeScript', 'C#', 'Python', 'SQL'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Tailwind', 'CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js / Express', 'ASP.NET', 'Django', 'API REST', 'gRPC'],
  },
  {
    id: 'data',
    label: 'Datos',
    items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Convex'],
  },
  {
    id: 'ai',
    label: 'Inteligencia Artificial',
    items: ['LLMs (SDKs/APIs)', 'NLP', 'Modelos predictivos', 'CNN'],
  },
  {
    id: 'architecture',
    label: 'Arquitectura',
    items: ['Microservicios', 'Webhooks', 'Gateway', 'MVC', 'Middlewares'],
  },
  {
    id: 'auth',
    label: 'Auth & Seguridad',
    items: ['OAuth', 'IAM', 'JWT', 'TOTP'],
  },
  {
    id: 'protocols',
    label: 'Protocolos',
    items: ['HTTP', 'WebSocket', 'gRPC', 'MQTT'],
  },
];

/** Logos de tecnologías para el ticker (mismas fuentes que ya usaba el sitio). */
export const techLogos = [
  { name: 'Node.js', src: 'https://i.ibb.co/k6cmZhb/node.png' },
  { name: 'React', src: 'https://i.ibb.co/VJBGFQX/react.png' },
  { name: 'SQL', src: 'https://i.ibb.co/3fbMpNg/sql.png' },
  { name: 'Visual Studio', src: 'https://i.ibb.co/zmcqn87/vs.png' },
  { name: 'VS Code', src: 'https://i.ibb.co/sbzwqJb/vsc.png' },
  { name: 'C#', src: 'https://i.ibb.co/N6rqP4g/C.png' },
  { name: 'CSS', src: 'https://i.ibb.co/pLLj4sn/css.png' },
  { name: 'Git', src: 'https://i.ibb.co/z5zS1LM/git.png' },
  { name: 'GitHub', src: 'https://i.ibb.co/3CcWq4L/gitHub.png' },
  { name: 'HTML', src: 'https://i.ibb.co/yQxqwcC/html.png' },
  { name: 'JavaScript', src: 'https://i.ibb.co/TthrJyY/js.png' },
  { name: 'MongoDB', src: 'https://i.ibb.co/vxjGgZW/mongo.png' },
  { name: '.NET', src: 'https://i.ibb.co/LpdTwfs/net.png' },
];

/** Palabras del ticker del hero. */
export const tickerWords = [
  'Full-Stack',
  'Next.js',
  'React',
  'Node.js',
  'TypeScript',
  'ASP.NET',
  'LLMs',
  'API REST',
  'SQL',
];

/** Navegación principal. Los ids coinciden con las secciones de App.jsx. */
export const navLinks = [
  { id: 'aboutMe', label: 'Perfil' },
  { id: 'experience', label: 'Trayectoria' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Proyectos' },
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
