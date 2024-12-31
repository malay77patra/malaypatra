import './styles/components.css'
import Dock from "./components/Dock"
import Tooltip from './components/Tooltip'
import IconCloud from './components/IconCloud'
import './styles/app.css'
import { H1, H3, P } from './components/Typography'
import Sparkles from './components/Sparkles'
import Img from './components/Img'

function App() {

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
            <Img src="https://picsum.photos/300" alt="website logo" style={{
              marginTop: '1rem',
            }} />
          </div>
        </div>
      </div>
      <Dock />
      <Tooltip />
    </>
  )
}

export default App
