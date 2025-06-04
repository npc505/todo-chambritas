import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from './context/authContext'

function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contrasena })
      })

      if (!res.ok) {
        throw new Error('Error al iniciar sesión')
      }

      const data = await res.json()
      const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY
      localStorage.setItem(tokenKey, data.token)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      alert('Correo o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY
    localStorage.removeItem(tokenKey)
    setIsAuthenticated(false)
  }

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 h-[800px] mb-4'>
        <div className="relative w-full h-full">
          <img
            src="/assets/bg-estambre-login.jpg"
            alt="Fondo"
            className="absolute inset-0 w-full h-[820px] object-cover brightness-90"
          />
          <div className="relative z-10 flex items-center justify-center h-screen">
            <div className="backdrop-blur-sm bg-gray-300/40 border border-gray-200/20 rounded-lg p-6 shadow-md w-[600px] h-[648px] text-center">
              <div className='border-4 border-white rounded-lg h-full p-4'>
                {
                  isAuthenticated ? (
                    <>
                      <p className="text-white text-2xl font-bold mt-6">Ya estás logeado</p>
                      <button
                        onClick={handleLogout}
                        className="p-4 rounded-full bg-red-600 mt-6 text-white font-semibold text-lg px-8 hover:bg-red-800"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-3xl text-white mt-6">Login</p>
                      {/* resto del formulario */}
                      <p className='text-white pt-6'>Correo Electrónico</p>
                      <div className="relative my-4">
                         <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                          </div>
                        {/* input correo */}
                        <input
                          type="text"
                          className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          placeholder="name@mail.com"
                        />
                      </div>
                      <p className='text-white pt-6'>Contraseña</p>
                      <div className="relative mt-4">
                         <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className='w-4 h-4 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                          </div>
                        {/* input contraseña */}
                        <input
                          type="password"
                          className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                          value={contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          placeholder="contraseña"
                        />
                      </div>
                      <p className='text-white text-xs text-right mt-2 underline cursor-pointer mb-4'>
                        Olvidé mi contraseña
                      </p>
                      <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="p-4 rounded-full bg-[#bf795e] mt-4 text-white font-semibold text-lg px-8 hover:bg-[#9c493e] cursor-pointer"
                      >
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                      </button>
                      <Link to="/registro">
                        <p className='text-white pt-6 underline cursor-pointer'>Crear cuenta</p>
                      </Link>

                       <div className='flex flex-col items-center justify-center mt-6'>
                                <div className='bg-white h-[1px] w-80'></div>
                                    <div className='bg-white rounded-full p-2 mt-6'>
                                        <svg width="25" height="25" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                                        </svg>
                                    </div>
                        </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login

