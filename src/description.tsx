import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import CardProduct from './components/cardsProduct'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Description() {
  const { id } = useParams(); // id viene como string
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5050/products/${id}`)
        .then(res => res.json())
        .then(data => setProducto(data))
        .catch(console.error);
    }
  }, [id]);

  if (!producto) return <div>Cargando producto...</div>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 p-8 mb-8">
        <div>
          <CardProduct producto={producto} />
        </div>
      </div>
      <Footer />
    </>
  );
}


export default Description