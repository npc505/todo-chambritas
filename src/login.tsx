import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'

function Login() {

  return (
    <>
    <div>
      <Navbar />
      <div className='grid grid-cols-1 h-[800px] mb-4'>
        <div>
            <div className="relative w-full h-full">
                <img
                src="/assets/bg-estambre-login.jpg"
                alt="Fondo"
                className="absolute inset-0 w-full h-[820px] object-cover brightness-90"
                />

                <div className="relative z-10 flex items-center justify-center h-screen">
                <div className="backdrop-blur-sm bg-gray-300/40 border border-gray-200/20 rounded-lg p-6 shadow-md w-[600px] h-[500px] text-center">
                    <div className='border-4 border-white rounded-lg h-full p-4'>
                        <p className="font-bold text-3xl text-white">Login</p>
                        <p className='text-white pt-6'>Correo Electrónico</p>
                            <div className="relative my-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="input-group-1" className="bg-tansparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white" placeholder="name@mail.com" />
                            </div>
                        <p className='text-white pt-6'>Contraseña</p>
                            <div className="relative my-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className='w-4 h-4 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </div>
                                <input type="password" id="input-group-1" className="bg-tansparent border-2 border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white" placeholder="contraseña" />
                            </div>
                    </div>
                </div>
                </div>
            </div>
        </div>      
      </div>
      <Footer />
    </div>
    </>
  )
}

export default Login
