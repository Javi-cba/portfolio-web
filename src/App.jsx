import Navbar from './component/navbar/navbar';
import Cursor from './component/Cursor';
import BackgroundGlow from './component/BackgroundGlow';
import SubTittle from './component/SubTittle';
import AboutMe from './component/about/AboutMe';
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

      <BackgroundGlow />

      <Cursor />
      <Navbar />

      <main id="main">
        <section id="aboutMe">
          <AboutMe />
        </section>

        <section id="experience" className="section section--line">
          <div className="shell">
            <SubTittle text="Trayectoria" index="02" eyebrow="Experiencia">
            </SubTittle>
          </div>
          <Timeline />
        </section>

        <section id="stack" className="section section--line">
          <div className="shell">
            <SubTittle text="Stack" index="03" eyebrow="Herramientas">            
            </SubTittle>
          </div>
          <ListSkills />
        </section>

        <section id="projects" className="section">
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
