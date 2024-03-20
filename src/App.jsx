import './App.css'
import Current from './components/current/Current'
import BanList from './components/ban-list/BanList'

function App() {

  return (
    <div className='home'>
      <BanList />
      <Current />
    </div>
  )
}

export default App
