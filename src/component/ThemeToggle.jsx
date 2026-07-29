import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'jc-theme';
const META_COLOR = { light: '#f4f2ed', dark: '#0d0f0d' };

function currentTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(currentTheme);

  // El tema inicial ya lo aplicó el script inline de index.html; acá solo
  // sincronizamos el estado de React con lo que quedó en el DOM.
  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* modo privado: seguimos sin persistir */
    }

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', META_COLOR[next]);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      data-cursor="hover"
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      title={isDark ? 'Tema claro' : 'Tema oscuro'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -35 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 35 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', placeItems: 'center' }}
        >
          {isDark ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
