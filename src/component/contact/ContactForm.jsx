import React, { useState } from 'react';
import { Input, Button } from 'antd';
import {
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import './contact.css';
import { redirect } from 'react-router-dom';

const ContactForm = () => {
  const [emailBody, setEmailBody] = useState('');

  const handleEmailChange = e => {
    setEmailBody(e.target.value);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:cordobajava@gmail.com?subject=Te%contatamos%desde%tu%portafolio&body=${encodeURIComponent(
      emailBody
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-form">
      <h2>Contáctame</h2>

      <section className="form-container">
        <article className="social-links">
          <GithubOutlined
            className="icon"
            onClick={() => {
              redirect('https://github.com/javi-cba');
            }}
          />

          <LinkedinOutlined
            className="icon"
            onClick={() => {
              redirect('www.linkedin.com/in/javi-cba');
            }}
          />
        </article>

        <article className="correo-form">
          <Input.TextArea
            rows={4}
            placeholder="Envíame un correo..."
            value={emailBody}
            className="input-area"
            onChange={handleEmailChange}
          />
          <Button
            type="primary"
            icon={<MailOutlined />}
            onClick={handleSendEmail}
            style={{ margin: '0.4rem' }}
          >
            Enviar correo
          </Button>
        </article>
      </section>
    </div>
  );
};

export default ContactForm;
