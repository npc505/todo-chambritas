import './index.css'
import Card2 from './components/card2'
import Navbar from './components/navbar'
import Footer from './components/footer'

function Estambre() {

  return (
    <>
    <div>
      <Navbar />

      <p className='text-4xl font-bold text-gray-400 text-center pt-8'>Estambres</p>

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 m-10 justify-center items-center'>
      <Card2 />
      <Card2 />
      <Card2 />
      <Card2 />
      </div>

      <Footer />
    </div>
    </>
  )
}

export default Estambre
