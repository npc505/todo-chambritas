import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

interface CardCatalogProps {
  id : number;
  nombre: string;
  calificacion: number;
  precio: number;
  imagenUrl: string;
}

const CardCatalog = ({ id, nombre, calificacion, precio, imagenUrl }: CardCatalogProps) => {
  const estrellas = Math.round(calificacion);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className='flex items-center justify-center h-56'>
            <img className="p-4 rounded-t-lg object-contain" src={imagenUrl} alt="product image" />
        </div>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {nombre}
          </h5>
        </a>
        <div className="flex items-center justify-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < estrellas ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
            {calificacion.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${precio}</span>
         <Link to={`/description/${id}`}>
            <button className="text-white bg-[#284747] hover:bg-[#1a2d2d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center">
                Agregar a Carrito
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCatalog;
