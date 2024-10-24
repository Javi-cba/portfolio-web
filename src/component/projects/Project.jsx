import { Descriptions } from 'antd';
import './projects.css';
import { GithubOutlined, DesktopOutlined } from '@ant-design/icons';
export default function Project({
  name,
  description,
  urlProject,
  tecnology,
  urlRepo,
  urlImg,
}) {
  const redirect = url => {
    window.open(url, '_blank');
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
        <GithubOutlined className="icon" onClick={() => redirect(urlRepo)} />
        <DesktopOutlined
          className="icon"
          onClick={() => redirect(urlProject)}
        />
      </div>
    </article>
  );
}
