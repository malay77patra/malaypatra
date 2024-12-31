import './styles/components.css'
import Dock from "./components/Dock"
import Tooltip from './components/Tooltip'
import IconCloud from './components/IconCloud'
import './styles/app.css'
import { H1, H3, P } from './components/Typography'
import Sparkles from './components/Sparkles'
import { useEffect, useState, useContext } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ThemeContext } from "./context/ThemeContext"
import { loadSlim } from "@tsparticles/slim";
import { particleNasaTheme } from './utils/utils'

function App() {
  const { theme, _ } = useContext(ThemeContext);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      <div className="hero-container">
        <div className='hero-1'>
          <IconCloud />
        </div>
        <div className='hero-2'>
          <div>
            <Sparkles>
              <H1>Hi, I am Malay</H1>
            </Sparkles>
            <H3>Full Stack Wev Developer</H3>
            <P>Build, Integrate and Deploy Web & APIs with MERN & Python experties.</P>
          </div>
        </div>

        <div id="space-container" className='space-container'>
          {init && (
            <Particles
              id="tsparticles"
              loaded={particlesLoaded}
              options={particleNasaTheme(theme)}
            />
          )}
        </div>

      </div>
      <Dock />
      <Tooltip />
    </>
  );
}

export default App