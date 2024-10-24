import React from 'react';
import SubTittle from '../SubTittle';
import './skill.css';

const skills = [
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/js.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/react.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/html.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/css.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/git.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/gitHub.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/C%23.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/net.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/node.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/sql.png',
  'https://mi-proyect1.s3.us-east-2.amazonaws.com/img/mongo.png',
];

export default function ListSkills() {
  return (
    <div className="skills-container">
      <SubTittle text="Habilidades" />
      <ul className="list-skills">
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <li key={index}>
            <img src={skill} alt={`Skill ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
