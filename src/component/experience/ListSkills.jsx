import React from 'react';
import SubTittle from '../SubTittle';
import './skill.css';

const skills = [
  'https://i.ibb.co/k6cmZhb/node.png',
  'https://i.ibb.co/VJBGFQX/react.png',
  'https://i.ibb.co/3fbMpNg/sql.png',
  'https://i.ibb.co/zmcqn87/vs.png',
  'https://i.ibb.co/sbzwqJb/vsc.png',
  'https://i.ibb.co/N6rqP4g/C.png',
  'https://i.ibb.co/pLLj4sn/css.png',
  'https://i.ibb.co/z5zS1LM/git.png',
  'https://i.ibb.co/3CcWq4L/gitHub.png',
  'https://i.ibb.co/yQxqwcC/html.png',
  'https://i.ibb.co/TthrJyY/js.png',
  'https://i.ibb.co/vxjGgZW/mongo.png',
  'https://i.ibb.co/LpdTwfs/net.png',
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
