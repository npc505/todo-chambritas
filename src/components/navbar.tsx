import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useAuth } from '../context/authContext'
import type { CartItemType } from "../types/cartItem";

import CartItem from "./cartItem";


export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      
      const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
      if (!token) return;
    
      try {
        const response = await fetch("http://localhost:5050/cart", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta");
        }

        const data = await response.json();


        setCartItems(data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setCartItems([])
      }
    };

    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);


  const onRemoveFromCart = (producto_id: number) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.producto_id !== producto_id)
    );
  };
  

  return (
    <nav className="bg-white relative z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-2">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/assets/todo-chambritas-logo.svg" className="h-26" alt="Logo" />
        </Link>

        <div className="w-full md:w-1/3 order-last md:order-none mt-4 md:mt-0 mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-4 md:space-x-8 items-center relative">

          {isAuthenticated && (
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 text-gray-700 hover:text-[#9c493e]">
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartItems?.length || 0}</span>
            </button>

          )}

          <Link to="/login">
            <button className="p-2 text-gray-700 hover:text-[#9c493e]">
              <UserCircleIcon className="w-6 h-6" />
            </button>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#9c493e]">
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* para celu */}

       {isAuthenticated && (
      <div className={`md:hidden transition-all ease-out duration-300 overflow-hidden 
        ${cartOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} 
        bg-gray-100 shadow-md rounded-md mx-4 mt-2 mb-4 overflow-y-auto`}>
        <p className="mb-2 font-semibold text-center pt-4">Tu carrito:</p>
        <div className="text-center">
          <div className="p-4 text-sm text-gray-700">
          <ul className="space-y-1">
            {cartItems?.map(item => (
                <CartItem key={item.producto_id} item={item} onRemove={onRemoveFromCart} />
              ))}
          </ul>
        </div>
        </div>
      </div>
       )}


      {/* para desktop */}
      {isAuthenticated && (
      <div className={`hidden md:block transition-all ease-out duration-300 origin-top-right
        ${cartOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        absolute right-20 mt-2 max-w-xs max-h-96 bg-white rounded-md shadow-lg z-30 w-64 overflow-y-auto`}>
        <div className="p-4 text-sm text-gray-700">
          <p className="mb-2 text-xl font-semibold text-center">Tu carrito</p>
          <ul className="space-y-1">
            {cartItems?.map(item => (
                <CartItem key={item.producto_id} item={item}   onRemove={onRemoveFromCart}/>
              ))}
          </ul>
        </div>
      </div>
      )}

      <div className={`bg-[#bf795e] p-4 transition-all duration-300 ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/" className="text-white font-semibold hover:text-[#9c493e]">Home</Link>
          <Link to="/estambre" className="text-white font-semibold hover:text-[#9c493e]">Estambre</Link>
          <Link to="/agujas" className="text-white font-semibold hover:text-[#9c493e]">Agujas</Link>
          <Link to="/accesorios" className="text-white font-semibold hover:text-[#9c493e]">Accesorios & Decoraciones</Link>
          <Link to="/herramientas" className="text-white font-semibold hover:text-[#9c493e]">Herramientas</Link>
        </div>
      </div>
    </nav>
  );
}
