import Navbar from './component/navbar/navbar';
import AboutMe from './component/about/AboutMe';
import ListSkills from './component/experience/ListSkills';
import ListProjects from './component/projects/ListProjects';
import './style/App.css';

function App() {
  return (
    <>
      <Navbar />

      <section id="aboutMe">
        <AboutMe />
      </section>

      <section id="experience" className="experience">
        <ListSkills />
      </section>

      <section id="projects" className="projects">
        <ListProjects />
      </section>
    </>
  );
}

export default App;
