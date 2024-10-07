import React from 'react';

export default function SubTittle({ text }) {
  return (
    <div className="divLine-container">
      <div className="divLine"></div>
      <h1>{text}</h1>
      <div className="divLine"></div>
    </div>
  );
}
