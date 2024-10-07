import React from 'react';
import { Avatar } from 'antd';
import './about.css';

export default function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
      <article className="texto-container ">
        <h3>Hi, my name is</h3>
        <h1>JAVIER CÓRDOBA</h1>
        <h2>Software Developer</h2>
        <p className="parrafo">
          Throughout my career as a systems analyst, I have worked with various
          technologies such as JavaScript, React, React Native, Node.js,
          ASP.NET, SQL, and MongoDB. This experience has enabled me to manage
          and develop innovative and scalable solutions. As a result, I am
          prepared to tackle projects in both backend and frontend development
          using these technologies.
        </p>
        <p className="message">Open for Work & Collaboration.</p>
      </article>

      <article className="img-container">
        <Avatar className="avatar" src="../img/profile.jpg" />
      </article>
    </section>
  );
}
