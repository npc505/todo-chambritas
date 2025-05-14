import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const Card2 = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <a href="#">
            <img className="p-4 rounded-t-lg" src="/assets/estambre2.jpg" alt="product image" />
        </a>
        <div className="px-5 pb-5">
            <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                Estambre Red Heart Hugs & Kisses
            </h5>
            </a>
            <div className="flex items-center justify-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <StarIcon className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">5.0</span>
            </div>
            <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">$150</span>
                <Link to="/description">
                    <a href="#" className="text-white bg-[#284747] hover:bg-[#1a2d2d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center">
                        Agregar a Carrito
                    </a>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Card2;