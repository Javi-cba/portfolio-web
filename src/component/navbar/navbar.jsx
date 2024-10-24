import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth); // Actualiza el ancho de la ventana
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize); // Escucha los cambios de tamaño de la ventana
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header">
      <nav>
        <h2>Portfolio</h2>

        <MenuOutlined className="menu-toggle" onClick={toggleMenu} />

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a className="link" href="#aboutMe">
            Sobre Mí
          </a>
          <a className="link" href="#experience">
            Habilidades
          </a>
          <a className="link" href="#projects">
            Proyectos
          </a>
          {windowWidth <= 700 && (
            <Button>
              <a className="link" href="#contactMe">
                Contáctame
              </a>
            </Button>
          )}
        </ul>

        {windowWidth > 700 && (
          <Button>
            <a className="link" href="#contactMe">
              Contáctame
            </a>{' '}
          </Button>
        )}
      </nav>
    </header>
  );
}
