import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { context } from './context/context'
import { useState } from "react"
import Home from './pages/Home'
import About from './pages/About'
import Regis from './pages/Register'
import Login from './pages/Login'
import Add from './pages/Add'


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
          <Route path="/Add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Regis />} />
        </Routes>
      </Router>
    </context.Provider>
  )
}

export default App
