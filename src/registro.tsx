import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { useState } from 'react'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validarContrasena = (pass : string) => {
    // Ejemplo: mínimo 8 caracteres, al menos un número y una letra mayúscula
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    return regex.test(pass)
  }

  const handleSubmit = async () => {
    setError('')

    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !telefono.trim()) {
      setError('Por favor, completa todos los campos.')
      return
    }

    if (!validarContrasena(contrasena)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
      return
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.')
      return
    }

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5050/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido_paterno: apellido,
          correo,
          contrasena,
          celular: telefono
        })
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || 'Error al crear la cuenta.')
        setLoading(false)
        return
      }

      const data = await response.json()
      // Aquí podrías hacer algo con la respuesta, por ejemplo:
      alert(`Cuenta creada con éxito para ${data.email}`)
      navigate('/login') // redirigir a login después de registro exitoso

    } catch (e) {
      setError('Error en la conexión con el servidor.')
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <Navbar />
        <div className='grid grid-cols-1 h-[916px] mb-4'>
          <div>
            <div className="relative w-full h-full">
              <img
                src="/assets/bg-estambre-register.jpg"
                alt="Fondo"
                className="absolute inset-0 w-full h-[920px] object-cover brightness-90"
              />

              <div className="relative z-10 flex items-center justify-center h-screen">
                <div className="backdrop-blur-sm bg-gray-300/40 border border-gray-200/20 rounded-lg p-6 shadow-md w-[600px] h-[828px] text-center mt-26">
                  <div className='border-4 border-white rounded-lg h-full p-4'>
                    <p className="font-bold text-3xl text-white mt-4">Registro</p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className='text-white'>Nombre</p>
                        <div className="relative my-2">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <input
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            type="text"
                            className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                            placeholder="Nombre"
                          />
                        </div>
                      </div>
                      <div>
                        <p className='text-white'>Apellido</p>
                        <div className="relative my-2">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <input
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                            type="text"
                            className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                            placeholder="Apellido"
                          />
                        </div>
                      </div>
                    </div>

                    <p className='text-white pt-3'>Correo Electrónico</p>
                    <div className="relative my-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                      </div>
                      <input
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                        type="email"
                        className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                        placeholder="name@mail.com"
                      />
                    </div>

                    <p className='text-white pt-3'>Teléfono</p>
                    <div className="relative my-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <input
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        type="tel"
                        className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <p className='text-white pt-3'>Contraseña</p>
                    <div className="relative my-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                         <svg className='w-4 h-4 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                      </div>
                      <input
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        type="password"
                        className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                        placeholder="Contraseña"
                      />
                    </div>

                    <p className='text-white pt-3'>Confirmar Contraseña</p>
                    <div className="relative my-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                         <svg className='w-4 h-4 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                      </div>
                      <input
                        value={confirmarContrasena}
                        onChange={e => setConfirmarContrasena(e.target.value)}
                        type="password"
                        className="bg-transparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white"
                        placeholder="Confirmar contraseña"
                      />
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          checked={aceptaTerminos}
                          onChange={e => setAceptaTerminos(e.target.checked)}
                          type="checkbox"
                          id="aceptarTerminos"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                          required
                        />
                      </div>
                      <label htmlFor="aceptarTerminos" className="ml-2 text-sm font-medium text-white">
                        He leído y acepto los <Link to='/terminos' className='text-blue-400 underline'>términos y condiciones</Link>
                      </label>
                    </div>

                    {error && (
                      <p className="text-red-600 mt-3 font-semibold">{error}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="mt-4 p-4 rounded-full bg-[#bf795e] text-white font-semibold text-lg px-8 hover:bg-[#9c493e] cursor-pointer"
                    >
                      {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>


                    <p className='text-white pt-4'>¿Ya tienes una cuenta? 
                                    <Link to="/login">
                        <a className="underline cursor-pointer pl-2">Iniciar sesión</a>
                        </Link> 
                        </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Registro
