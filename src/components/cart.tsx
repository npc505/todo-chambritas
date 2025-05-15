const Cart = () => {
  return (
    <a href="#" className="flex flex-row items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm md:w-full">
        <img
            className="w-26 h-26 object-contain m-4 rounded"
            src="public/assets/Estambre.png"
            alt="Estambre"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900">Estambre amarillo</h5>
            <p className="mb-3 text-sm font-normal text-gray-700">Cantidad</p>
            <div className="flex items-center mb-4 mt-2">
            <button className="w-6 h-6 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200">
                −
            </button>
            <div className="w-10 h-8 flex items-center justify-center bg-white border border-gray-300 text-lg font-medium mx-2 rounded">
                14
            </div>
            <button className="w-6 h-6 flex items-center justify-center bg-[#d4a373] text-white text-xl font-bold rounded-full hover:bg-[#c08a5e] transition-colors duration-200">
                +
            </button>
            </div>
        </div>
    </a>
  );
};

export default Cart;