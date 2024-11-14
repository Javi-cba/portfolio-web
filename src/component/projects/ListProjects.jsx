import { useEffect, useState } from 'react';
import SubTittle from '../SubTittle';
import Project from './Project';
import { getProjects } from '../../services/gitHubServ';
import './projects.css';

export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const resp = await getProjects();
        setProjects(resp);
      } catch (error) {
        console.error(`Error Fetch getProjects: ${error}`);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className="projects-container">
      <SubTittle text="Proyectos" />

      <section className="list-projects">
        {projects.map((item, index) => (
          <Project
            key={index}
            name={item.name}
            description={item.description}
            tecnology={item.topics}
            urlProject={item.homepage}
            urlRepo={item.html_url}
            urlImg={item.urlImg}
            readme={item.readme}
          />
        ))}
      </section>
    </div>
  );
}
