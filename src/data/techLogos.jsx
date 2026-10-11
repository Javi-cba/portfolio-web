import {
  siConvex,
  siDjango,
  siDocker,
  siDotnet,
  siFastapi,
  siMeta,
  siModelcontextprotocol,
  siMongodb,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTypescript,
  siVercel,
  siWhatsapp,
} from 'simple-icons';

/*
 * Logos del ticker de Stack. Son SVG monocromos con `currentColor`, así toman
 * el color del tema (claro u oscuro) sin filtros ni versiones duplicadas.
 * AWS, C# y SQL Server no están en simple-icons (marcas de Amazon/Microsoft):
 * van dibujados a mano con el mismo estilo.
 */
const fromSimpleIcon = icon => (
  <path d={icon.path} />
);

const awsIcon = (
  <>
    <text
      x="12"
      y="13.5"
      textAnchor="middle"
      fontSize="12"
      fontWeight="700"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      aws
    </text>
    <path
      d="M3 16.8c5 2.8 13 2.8 18 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M19.2 15.2l2.8 1.3-1.5 2.6z" />
  </>
);

const csharpIcon = (
  <>
    <path
      d="M12 1.8l8.8 5.1v10.2L12 22.2l-8.8-5.1V6.9z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="15.4"
      textAnchor="middle"
      fontSize="8.5"
      fontWeight="700"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      C#
    </text>
  </>
);

const sqlServerIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
    <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </g>
);

export const techLogos = [
  { name: 'TypeScript', icon: fromSimpleIcon(siTypescript) },
  { name: 'Python', icon: fromSimpleIcon(siPython) },
  { name: 'C#', icon: csharpIcon },
  { name: 'React', icon: fromSimpleIcon(siReact) },
  { name: 'Next.js', icon: fromSimpleIcon(siNextdotjs) },
  { name: 'Node.js', icon: fromSimpleIcon(siNodedotjs) },
  { name: 'FastAPI', icon: fromSimpleIcon(siFastapi) },
  { name: 'Django', icon: fromSimpleIcon(siDjango) },
  { name: '', icon: fromSimpleIcon(siDotnet) },
  { name: 'PostgreSQL', icon: fromSimpleIcon(siPostgresql) },
  { name: 'SQL Server', icon: sqlServerIcon },
  { name: 'MongoDB', icon: fromSimpleIcon(siMongodb) },
  { name: 'Redis', icon: fromSimpleIcon(siRedis) },
  { name: 'Convex', icon: fromSimpleIcon(siConvex) },
  { name: 'MCP', icon: fromSimpleIcon(siModelcontextprotocol) },
  { name: 'AWS', icon: awsIcon },
  { name: 'Docker', icon: fromSimpleIcon(siDocker) },
  { name: 'Vercel', icon: fromSimpleIcon(siVercel) },
  { name: 'Nginx', icon: fromSimpleIcon(siNginx) },
  { name: 'WhatsApp API', icon: fromSimpleIcon(siWhatsapp) },
  { name: 'Meta', icon: fromSimpleIcon(siMeta) },
];
