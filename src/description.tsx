import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Card from './components/cards'

function Description() {



    return (
        <>
        <div>
          <Navbar />
          <div className='grid grid-cols-1 h-[800px] mb-4'>
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

export default Description