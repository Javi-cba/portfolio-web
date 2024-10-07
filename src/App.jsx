import ListSkills from './component/experience/ListSkills';
import AboutMe from './component/about/AboutMe';
import Navbar from './component/navbar/navbar';
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
    </>
  );
}

export default App;
