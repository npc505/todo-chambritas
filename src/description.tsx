import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Card from './components/cards'

function Agujas() {



    return (
        <>
        <div>
          <Navbar />
          <div className='grid grid-cols-1 p-8 mb-8'>
            <div>
               
            <p className="text-4xl text-white font-bold">Agujas</p>

            <Card/>
            </div>      
          </div>
          <Footer />
        </div>
        </>
      )
}

export default Agujas