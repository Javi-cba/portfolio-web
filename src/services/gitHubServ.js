import axios from 'axios';
const URL = import.meta.env.VITE_URL;
const USER = import.meta.env.VITE_OWNER;
const TOKEN = import.meta.env.VITE_TOKEN;

const headers = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export function getProfile() {
  try {
    const resp = axios
      .get(`${URL}/users/${USER}`, headers)
      .then(res => res.data);
    return resp;
  } catch (error) {
    console.error(`Error Fetch getProfile: ${error}`);
    throw error;
  }
}

async function getReadmeContent(repo) {
  try {
    const url = `${URL}/repos/${USER}/${repo}/contents/README.md`;
    const response = await axios.get(url, headers);

    // README está codificado en base64, decodificamos el contenido base64 a un ArrayBuffer
    const base64Content = response.data.content;
    const binaryContent = atob(base64Content);

    // Convierte el contenido binario a un ArrayBuffer
    const byteArray = new Uint8Array(binaryContent.length);
    for (let i = 0; i < binaryContent.length; i++) {
      byteArray[i] = binaryContent.charCodeAt(i);
    }

    // Usa TextDecoder para que se interpreta como UTF-8
    const textDecoder = new TextDecoder('utf-8');
    const decodedText = textDecoder.decode(byteArray);

    return decodedText;
  } catch (error) {
    console.error(`Error Fetch getReadmeContent: ${error}`);
    throw error;
  }
}

function extractImageUrl(readmeContent) {
  const regex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g; // Expresión regular para encontrar imágenes
  let match;
  const imageUrls = [];

  // Busca todas las imágenes en el contenido del README
  while ((match = regex.exec(readmeContent)) !== null) {
    imageUrls.push(match[2]); // match[2] contiene la URL de la imagen
  }

  return imageUrls.length > 0 ? imageUrls[0] : null; // Devuelve URL de imagen encontrada
}

// Los topics `order-N` del repo son metadata de orden, no tecnologías: se leen
// para ordenar el listado y se sacan de los tags que ve el usuario.
const ORDER_TOPIC = /^order-(\d+)$/i;

function readOrder(topics) {
  for (const topic of topics) {
    const match = ORDER_TOPIC.exec(topic);
    if (match) return Number(match[1]);
  }
  return Number.POSITIVE_INFINITY;
}

/** Topics visibles: sin `order-N`, en mayúsculas, sin guiones y sin repetidos. */
function buildTags(language, topics) {
  const tags = [language, ...topics.filter(topic => !ORDER_TOPIC.test(topic))]
    .filter(Boolean)
    .map(topic => topic.replace(/-/g, ' ').toUpperCase().trim());

  return [...new Set(tags)];
}

export function getProjects() {
  try {
    const resp = axios
      .get(`${URL}/users/${USER}/repos`, headers)
      .then(async res => {
        const resp = await Promise.all(
          Object.values(res.data)
            .map(item => ({ item, topics: item.topics ?? [] }))
            // Solo los que tienen topics reales (`order-N` no cuenta como topic)
            .filter(({ topics }) => topics.some(topic => !ORDER_TOPIC.test(topic)))
            .map(async ({ item, topics }) => {
              // contenido del README.md
              let readmeContent = await getReadmeContent(item.name);

              // Extrae la URL de la imagen desde el README.md
              const urlImg = extractImageUrl(readmeContent);

              // Remueve las imágenes usando una expresión regular
              readmeContent = readmeContent.replace(/!\[.*?\]\(.*?\)/g, '');

              return {
                ...item,
                name: item.name.replace(/-/g, ' '), // Reemplaza los guiones por espacios
                topics: buildTags(item.language, topics),
                order: readOrder(topics),
                urlImg: urlImg, // La URL de la imagen externa
                readme: readmeContent,
              };
            })
        );

        // Orden explícito desde GitHub; los repos sin `order-N` van al final
        // manteniendo el orden que devolvió la API.
        return resp.sort((a, b) =>
          a.order === b.order ? 0 : a.order - b.order
        );
      });
    return resp;
  } catch (error) {
    console.error(`Error Fetch getProjects: ${error}`);
    throw error;
  }
}
