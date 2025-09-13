import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home.js'
import Cart from './pages/Cart.js'
import NotFound from './pages/NotFound.js'

import './scss/app.scss'
import { JSX } from 'react'

const App = () : JSX.Element =>  {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App
