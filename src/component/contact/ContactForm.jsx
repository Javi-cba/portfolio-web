import { useState } from 'react';
import { ArrowUpRight, Mail, Send } from 'lucide-react';
import Reveal, { AnimatedText } from '../Reveal';
import Magnetic from '../Magnetic';
import { GithubIcon, LinkedinIcon } from '../icons';
import { profile } from '../../data/profile';
import './contact.css';

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: props => <Mail size={props.size} strokeWidth={1.7} />,
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const canSend = message.trim().length > 0;

  const handleSubmit = event => {
    event.preventDefault();
    if (!canSend) return;

    const subject = name.trim()
      ? `Contacto desde tu portfolio — ${name.trim()}`
      : 'Contacto desde tu portfolio';

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="shell contact">
      <div className="contact-head">
        <Reveal y={14} duration={0.7}>
          <span className="mono contact-eyebrow">05 — Contacto</span>
        </Reveal>

        <h2 className="contact-title">
          <AnimatedText
            as="span"
            text="Construyamos"
            className="display contact-line"
            stagger={0.03}
          />
          <AnimatedText
            as="span"
            text="algo juntos"
            className="display contact-line contact-line--outline"
            stagger={0.03}
            delay={0.12}
          />
        </h2>
      </div>

      <div className="contact-grid">
        <div className="contact-left">
          <Reveal y={20}>
            <p className="lede">
              ¿Tenés un proyecto, una búsqueda abierta o una idea para validar?
              Escribime y lo charlamos.
            </p>
          </Reveal>


          <ul className="contact-socials">
            {profile.socials.map((social, index) => {
              const Icon = SOCIAL_ICONS[social.label];

              return (
                <Reveal
                  as="li"
                  key={social.label}
                  y={16}
                  delay={0.12 + index * 0.06}
                >
                  <a
                    href={social.url}
                    target={social.label === 'Email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="contact-social"
                    data-cursor="hover"
                  >
                    <span className="contact-social-label mono">
                      {Icon && <Icon size={14} />}
                      {social.label}
                    </span>
                    <span className="contact-social-handle">
                      {social.handle}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.7}
                      className="contact-social-arrow"
                    />
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal className="contact-form-wrap" y={24} delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="mono field-label" htmlFor="contact-name">
                Tu nombre
              </label>
              <input
                id="contact-name"
                type="text"
                className="field-input"
                placeholder="Cómo te llamás"
                value={name}
                onChange={event => setName(event.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label className="mono field-label" htmlFor="contact-message">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                className="field-input field-textarea"
                rows={5}
                placeholder="Contame en qué estás pensando…"
                value={message}
                onChange={event => setMessage(event.target.value)}
                required
              />
            </div>

            <Magnetic strength={0.15} className="contact-submit-wrap">
              <button
                type="submit"
                className="btn btn--solid btn--lg contact-submit"
                disabled={!canSend}
                data-cursor="hover"
              >
                <Send size={15} strokeWidth={1.8} />
                Enviar mensaje
              </button>
            </Magnetic>

            <p className="mono contact-note">
              Se abre tu cliente de correo con el mensaje listo para enviar.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
