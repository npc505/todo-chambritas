import { useEffect, useState } from 'react';
import type { Producto } from "../types/producto";


const crearIncrementador = (stock: number, cantidad: number, setCantidad: (valor: number) => void) => {
  return () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };
};


const cardProduct = ({ producto }: { producto: Producto }) => {

  const [cantidad, setCantidad] = useState<number>(1);

  const incrementar = crearIncrementador(producto.stock, cantidad, setCantidad);

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden">
      {/* Product Image */}
      <div className="md:w-1/2 p-4 flex items-center justify-center">
        <img 
          className="object-contain h-64 md:h-80 rounded-lg" 
          src={producto.imagen_dir || "/assets/Estambre.png"} 
          alt={`${producto.nombre} - ${producto.marca}`} 
        />
      </div>
      
      {/* Product Info */}
      <div className="md:w-1/2 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          {producto.nombre}, {producto.marca}, de {producto.peso}g.
        </h2>
        
        <div className="text-2xl font-bold text-gray-900 mb-3">
          ${producto.precio.toFixed(2)} MXN
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Color: {producto.codigo_color}</p>
          <div className="grid grid-cols-5 gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre001.png" alt="Cenizo" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre002.png" alt="Marrón" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre003.png" alt="Rojo" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre004.png" alt="Azul" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre005.png" alt="Gris" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre006.png" alt="Rosa" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre007.png" alt="Índigo" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre008.png" alt="Azul marino" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre009.png" alt="Naranja" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre010.png" alt="Morado" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre011.png" alt="Verde agua" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre012.png"alt="Burgundy" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre013.png" alt="Rosa pálido" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre014.png" alt="Negro" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent overflow-hidden cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all">
              <img src="/assets/Estambre015.png" alt="Verde oliva" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-6">
          <p className="text-gray-700 mb-4">
            {producto.descripcion}
          </p>
          
          <div className="space-y-1 text-gray-700">
            <p><span className="font-semibold">Fibra:</span> {producto.fibra}</p>
            <p><span className="font-semibold">Grosor:</span> {producto.grosor}</p>
            <p><span className="font-semibold">Peso:</span> {producto.peso}g</p>
            <p><span className="font-semibold">Largo:</span> {producto.largo}m</p>
            <p><span className="font-semibold">Calibre:</span> {producto.calibre}</p>
            <p><span className="font-semibold">Agujas sugeridas:</span> {producto.agujas_sugeridas} mm</p>
            <p><span className="font-semibold">Ganchos sugeridos:</span> {producto.ganchos_sugeridos} mm</p>
          </div>
        </div>
        
        {/* Quantity Selector */}
         <div className="flex items-center mb-4 mt-6">
          <button
            onClick={decrementar}
            className="w-10 h-10 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200"
          >
            −
          </button>
          <div className="w-16 h-10 flex items-center justify-center bg-white border border-gray-300 text-lg font-medium mx-2 rounded">
            {cantidad}
          </div>
          <button
            onClick={incrementar}
            className="w-10 h-10 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200"
          >
            +
          </button>
        </div>
        
        <button className="w-full bg-[#bf795e] hover:bg-[#a66a53] text-white py-4 px-4 rounded-full flex items-center justify-center text-xl font-medium tracking-wide mt-4">
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default cardProduct;

