import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './home'
import Login from './login'
import Description from './description'
import Estambre from './estambre'
import Agujas from './agujas'
import Accesorios from './accesorios'
import Herramientas from './herramientas'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/description" element={<Description />}  />
        <Route path="/estambre" element={<Estambre />}  />
        <Route path="/agujas" element={<Agujas />}  />
        <Route path="/accesorios" element={<Accesorios />}  />
        <Route path="/herramientas" element={<Herramientas />}  />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
