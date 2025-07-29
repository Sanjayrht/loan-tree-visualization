import './App.css'
import AddNode from './Components/AddNode'
import Header from './Components/Header'
import MainScreen from './Components/MainScreen/MainScreen'
import SidePanel from './Components/SidePanel/SidePanel'


function App() {

  return (
    <div className='h-screen w-full'>
      <div className=''>
        <Header />
        <AddNode />
      </div>
      <div className='flex'>
        <MainScreen />
        <SidePanel />
      </div>
    </div>
  )
}

export default App
