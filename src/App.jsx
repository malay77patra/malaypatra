import './styles/components.css'
import Dock from "./components/Dock"
import Tooltip from './components/Tooltip'

function App() {

  return (
    <div>
      <h1
        style={{
          backgroundColor: 'lightcoral',
          margin: 0,
        }}
      >Morden UI Website</h1>
      <Dock />
      <Tooltip />
    </div>
  )
}

export default App
