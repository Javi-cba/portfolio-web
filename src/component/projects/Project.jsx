import { useState } from 'react';
import './projects.css';
import {
  GithubOutlined,
  DesktopOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import Readme from './Readme';

export default function Project({
  name,
  description,
  urlProject,
  tecnology,
  urlRepo,
  urlImg,
  readme,
}) {
  const [openReadme, setOpenReadme] = useState(false);

  const redirect = url => {
    window.open(url, '_blank');
  };

  const handleReadme = () => {
    setOpenReadme(true);
  };

  return (
    <article className="card-project">
      <section>
        <img src={urlImg} alt={name} onClick={() => redirect(urlProject)} />
        <h2>{name}</h2>
        <p className="description">{description}</p>
        <section className="tecnology-container">
          {Array.isArray(tecnology) &&
            tecnology.length > 0 &&
            tecnology.map((tec, index) => (
              <span className="tecnology" key={index}>
                {tec}
              </span>
            ))}
        </section>
      </section>
      <div className="redireccions">
        <ReadOutlined className="icon" onClick={handleReadme} />
        <GithubOutlined className="icon" onClick={() => redirect(urlRepo)} />
        <DesktopOutlined
          className="icon"
          onClick={() => redirect(urlProject)}
        />
      </div>

      {openReadme && (
        <Readme
          open={openReadme}
          setOpen={setOpenReadme}
          readme={readme}
          repo={name}
        />
      )}
    </article>
  );
}
