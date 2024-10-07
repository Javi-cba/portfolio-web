import React from 'react';
import SubTittle from '../../SubTittle';
import './skill.css';

const skills = [
  '../../../img/js.png',
  '../../../img/react.png',
  '../../../img/html.png',
  '../../../img/css.png',
  '../../../img/git.png',
  '../../../img/github.png',
  '../../../img/net.png',
  '../../../img/node.png',
  '../../../img/sql.png',
  '../../../img/mongo.png',
];

export default function ListSkills() {
  return (
    <div className="skills-container">
      <SubTittle text="Skills" />
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
