import './styles/components.css'
import Dock from "./components/Dock"
import Tooltip from './components/Tooltip'
import './styles/app.css'
import Home from './sections/Home'

function App() {


  return (
    <>
      <Home />
      <Dock />
      <Tooltip />
    </>
  );
}

export default App