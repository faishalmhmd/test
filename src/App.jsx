import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { context } from './context/context'
import { useState } from "react"
import Home from './pages/Home'
import About from './pages/About'
import Regis from './pages/Register'
import Login from './pages/Login'
import Add from './pages/Add'
import Detail from './pages/Detail'
import AddTask from './pages/AddTask'
import UpdateTask from './pages/UpdateTask'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [tokenAuth,setTokenAuth] = useState()

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    tokenAuth,
    setTokenAuth,
  }

  return (
    <context.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id/add-task/:id" element={<AddTask />} />
          <Route path="/detail/:id/update-task/:taskId" element={<UpdateTask />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Regis />} />
        </Routes>
      </Router>
    </context.Provider>
  )
}

export default App
