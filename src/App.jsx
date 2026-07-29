import Navbar from './component/navbar/navbar';
import Cursor from './component/Cursor';
import SubTittle from './component/SubTittle';
import AboutMe from './component/about/AboutMe';
import Capabilities from './component/about/Capabilities';
import Timeline from './component/experience/Timeline';
import ListSkills from './component/experience/ListSkills';
import ListProjects from './component/projects/ListProjects';
import ContactForm from './component/contact/ContactForm';
import Footer from './component/footer/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';
import './style/App.css';

function App() {
  useSmoothScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <Cursor />
      <Navbar />

      <main id="main">
        <section id="aboutMe">
          <AboutMe />

          <div className="section section--tight">
            <Capabilities />
          </div>
        </section>

        <section id="experience" className="section section--line">
          <div className="shell">
            <SubTittle text="Trayectoria" index="02" eyebrow="Experiencia">
              Cinco años construyendo software de gestión, integraciones y
              productos con IA — desde el modelo de datos hasta la puesta en
              producción.
            </SubTittle>
          </div>
          <Timeline />
        </section>

        <section id="stack" className="section section--line">
          <div className="shell">
            <SubTittle text="Stack" index="03" eyebrow="Herramientas">
              Las tecnologías con las que trabajo todos los días, agrupadas por
              dominio.
            </SubTittle>
          </div>
          <ListSkills />
        </section>

        <section id="projects" className="section section--line">
          <ListProjects />
        </section>

        <section id="contactMe" className="section section--line">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
