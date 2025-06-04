import React, { useState } from "react";
import type { CartItemType } from "../types/cartItem";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

type Props = {
  item: CartItemType;
  onRemove: (producto_id: number) => void;
};

const CartItem = ({ item, onRemove }: Props) => {
  const { isAuthenticated } = useAuth();
  const [cantidad, setCantidad] = useState<number>(item.cantidad);
  const navigate = useNavigate();

  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY;
  const token = localStorage.getItem(tokenKey);

  const incrementar = () => {
    if (cantidad < item.stock) {
      setCantidad(prev => prev + 1);
    }
  };

  const decrementar = async () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    } else if (cantidad === 1) {
      // Si la cantidad baja a 0, hacemos petición DELETE para borrar el item
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      if (!token) {
        console.error('No JWT token found');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5050/cart/${item.producto_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({ producto_id: item.producto_id })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

       
        onRemove(item.producto_id);

      } catch (error) {
        console.error('Fallo al eliminar el producto del carrito:', error);
      }
    }
  };

  return (
    <a href="#" className="flex flex-row items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm md:w-full">
      <img
        className="w-26 h-26 object-contain m-4 rounded"
        src={item.imagen_dir}
        alt={item.nombre}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900">{item.nombre}</h5>
        <p className="mb-3 text-sm font-normal text-gray-700">Cantidad</p>
        <div className="flex items-center mb-4 mt-2">
          <button 
            onClick={decrementar}
            className="w-6 h-6 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200"
          >
            −
          </button>
          <div className="w-10 h-8 flex items-center justify-center bg-white border border-gray-300 text-lg font-medium mx-2 rounded">
            {cantidad}
          </div>
          <button 
            onClick={incrementar}
            className="w-6 h-6 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200"
          >
            +
          </button>
        </div>
      </div>
    </a>
  );
};

export default CartItem;
