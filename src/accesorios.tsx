import { useEffect, useState } from 'react';
import './index.css'
import CardCatalog from './components/cardCatalog'
import Navbar from './components/navbar'
import Footer from './components/footer'


import { fetchCatalog } from './api/catalogService';
import type { Producto } from './types/Producto';

function Accesorios() {

  const [catalog, setCatalog] = useState<Producto[]>([]);

  useEffect(() => {
    fetchCatalog('http://localhost:5050/products?page=1&pageSize=4')
      .then(setCatalog)
      .catch(error => console.error('Error al obtener el catálogo:', error));
  }, []);

  return (
    <>
    <div>
      <Navbar />

      <p className='text-4xl font-bold text-gray-400 text-center pt-8'>Accerios & Decoraciones</p>

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 m-10 justify-center items-center'>
       {catalog.map((producto, index) => (
        <CardCatalog
          key={index}
          id={producto.id}
          nombre={producto.nombre}
          calificacion={producto.calificacion}
          precio={producto.precio}
          imagenUrl={producto.imagen_dir}
        />
      ))}
      
      </div>

      <Footer />
    </div>
    </>
  )
}

export default Accesorios
