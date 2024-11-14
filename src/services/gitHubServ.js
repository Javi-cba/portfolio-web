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

    // README está codificado en base64, asi q lo decodificamos
    const base64Content = response.data.content;
    const readmeContent = atob(base64Content); // Decodifica el contenido base64

    return readmeContent;
  } catch (error) {
    console.error(`Error Fetch getReadmeContent: ${error}`);
    throw error;
  }
}

function extractImageUrl(readmeContent) {
  const regex = /!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g; // Expresión regular para encontrar imágenes
  let match;
  const imageUrls = [];

  // Busca todas las imágenes en el contenido del README
  while ((match = regex.exec(readmeContent)) !== null) {
    imageUrls.push(match[2]); // match[2] contiene la URL de la imagen
  }

  return imageUrls.length > 0 ? imageUrls[0] : null; // Devuelve URL de imagen encontrada
}

export function getProjects() {
  try {
    const resp = axios
      .get(`${URL}/users/${USER}/repos`, headers)
      .then(async res => {
        const resp = await Promise.all(
          Object.values(res.data)
            .filter(item => item.topics?.length > 0) // Solo los que tienen topics
            .map(async item => {
              // contenido del README.md
              let readmeContent = await getReadmeContent(item.name);

              // Extrae la URL de la imagen desde el README.md
              const urlImg = extractImageUrl(readmeContent);

              // Remueve las imágenes usando una expresión regular
              readmeContent = readmeContent.replace(/!\[.*?\]\(.*?\)/g, '');

              return {
                ...item,
                name: item.name.replace(/-/g, ' '), // Reemplaza los guiones por espacios
                topics: [
                  item.language?.toUpperCase(), // Agrega el lenguaje
                  ...item.topics.map(topic => topic.toUpperCase()),
                ],
                urlImg: urlImg, // La URL de la imagen externa
                readme: readmeContent,
              };
            })
        );

        return resp;
      });
    return resp;
  } catch (error) {
    console.error(`Error Fetch getProjects: ${error}`);
    throw error;
  }
}
