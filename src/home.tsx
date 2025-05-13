import './index.css'
import Navbar from './components/navbar'
import Card2 from './components/card2'
import Footer from './components/footer'

function Home() {

  return (
    <>
    <div>
      <Navbar />
     <div className="relative w-full h-[600px] bg-black">
        <img
          src="/assets/bg-chambritas.jpg"
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="uppercase text-3xl md:text-4xl text-white font-bold pb-8">Venta de verano</p>
          <p className="uppercase text-4xl md:text-7xl text-white font-bold">25% EN ARTÍCULOS</p>
          <p className="uppercase text-4xl md:text-7xl text-white font-bold">SELECCIONADOS</p>

          <a className="p-4 rounded-full bg-[#bf795e] mt-10 text-white font-semibold text-lg px-8 hover:bg-[#9c493e]">Explorar Ofertas</a>
        </div>
      </div>

      <div className='w-full text-center p-8'>
        <p className='font-bold text-gray-400 text-3xl'>Top Picks</p>
        <div className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 p-6 gap-6'>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>
      
      <div className='w-full text-center px-8'>
        <p className='font-bold text-gray-400 text-3xl pb-6'>Tenemos de todo para tu chambrita</p>
        <div className='grid grid-cols-1'>
          <div className="relative w-full h-64 bg-black rounded-lg">
            <img
              src="/assets/bg-estambre.jpg"
              alt="Fondo"
              className="absolute inset-0 w-full h-full object-cover opacity-85 rounded-lg"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl text-white font-bold">Estambre</p>

              <a className="p-4 rounded-full bg-[#bf795e] mt-10 text-white font-semibold text-lg px-8 hover:bg-[#9c493e]">Explorar</a>
            </div>
          </div>
        </div>

         <div className='grid grid-cols-1 md:grid-cols-3 py-6 gap-6 pb-12'>
          <div className="relative w-full h-64 bg-black rounded-lg">
            <img
              src="/assets/bg-agujas.jpg"
              alt="Fondo"
              className="absolute inset-0 w-full h-full object-cover opacity-85 rounded-lg"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl text-white font-bold">Agujas</p>

              <a className="p-4 rounded-full bg-[#bf795e] mt-10 text-white font-semibold text-lg px-8 hover:bg-[#9c493e]">Explorar</a>
            </div>
          </div>
          
          <div className="relative w-full h-64 bg-black rounded-lg">
            <img
              src="/assets/bg-buttons.jpeg"
              alt="Fondo"
              className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-lg"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl text-white font-bold">Accesorios y Decoraciones</p>

              <a className="p-4 rounded-full bg-[#bf795e] mt-10 text-white font-semibold text-lg px-8 hover:bg-[#9c493e]">Explorar</a>
            </div>
          </div>

          <div className="relative w-full h-64 bg-black rounded-lg">
            <img
              src="/assets/bg-herramientas.webp"
              alt="Fondo"
              className="absolute inset-0 w-full h-full object-cover opacity-80 rounded-lg"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl text-white font-bold">Herramientas</p>

              <a className="p-4 rounded-full bg-[#bf795e] mt-10 text-white font-semibold text-lg px-8 hover:bg-[#9c493e]">Explorar</a>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
    </>
  )
}

export default Home
