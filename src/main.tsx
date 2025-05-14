import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './home'
import Login from './login'
import Description from './description'
import Registro from './registro'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/description" element={<Description />}  />
        <Route path="/registro" element={< Registro/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
