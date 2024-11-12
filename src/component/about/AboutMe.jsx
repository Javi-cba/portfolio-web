import { Avatar } from 'antd';
import './about.css';

export default function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
      <article className="texto-container ">
        <h3>Hola, mi nombre es</h3>
        <h1>JAVIER CÓRDOBA</h1>
        <h2>Desarrollador de Software</h2>
        <p className="parrafo">
          A lo largo de mi carrera como analista de sistemas, he trabajado con
          diversas tecnologías como JavaScript, React, React Native, Node.js,
          ASP.NET, SQL y MongoDB. Esta experiencia me ha permitido gestionar y
          desarrollar soluciones innovadoras y escalables. Como resultado, estoy
          preparado para abordar proyectos tanto en el desarrollo backend como
          en el frontend utilizando estas tecnologías.
        </p>
        <p className="message">Abierto a oportunidades y colaboraciones.</p>
      </article>

      <article className="img-container">
        <Avatar className="avatar" src="https://i.ibb.co/W3wYp01/profile.jpg" />
      </article>
    </section>
  );
}
