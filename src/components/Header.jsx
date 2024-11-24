import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/apolonampa.png';
import modelConfigs from '../config/models.json'; // Importamos el JSON

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menú para detectar clics fuera
  const buttonRef = useRef(null); // Referencia al botón para detectar clics dentro de él

  // Función para cerrar el menú
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Función para detectar clics fuera del menú y del botón
  const handleClickOutside = useCallback((event) => {
    // Si el clic no fue ni dentro del menú ni dentro del botón
    if (
      menuRef.current && !menuRef.current.contains(event.target) && 
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      closeMenu();
    }
  }, []); // useCallback garantiza que esta función no cambie entre renders

  // Detectar clics fuera del menú (cuando el menú está abierto)
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]); // Agregamos handleClickOutside como dependencia

  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg px-6 transition-all duration-300 ease-in-out sticky top-0 left-0 right-0 z-[40]">
      <div className="container mx-auto flex justify-between items-center relative z-[40]">
        {/* Logo que redirige al inicio */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-14 h-10 rounded z-10" />
        </Link>

        {/* Botón para abrir/cerrar el menú en móviles */}
        <button
          ref={buttonRef} // Asignamos la referencia al botón
          onClick={() => setIsOpen(!isOpen)} // Alterna entre abierto y cerrado
          className="sm:hidden flex flex-col items-end space-y-1 relative z-[40]" // z-40 para asegurarse de que el botón esté por encima del menú
          aria-label="Toggle Menu"
        >
          <div
            className={`w-6 h-1 bg-white rounded transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-4 h-1 bg-white rounded transition-all ${isOpen ? 'opacity-0' : ''}`}
          ></div>
          <div
            className={`w-6 h-1 bg-white rounded transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
          ></div>
        </button>

        {/* Navegación para pantallas grandes */}
        <nav className="hidden sm:flex space-x-4">
          {modelConfigs
            .filter((model) => model.showInMenu) // Filtramos solo los que deben mostrarse en el menú
            .map((model, index) => (
              <Link key={index} to={model.path} className="hover:underline">
                {model.name}
              </Link>
            ))}
        </nav>
      </div>

      {/* Menú vertical en dispositivos pequeños */}
      {isOpen && (
        <nav
          ref={menuRef} // Asignamos la referencia al menú
          className="sm:hidden bg-blue-700 text-white text-center space-y-4 pt-16 pb-8 transition-all fixed  top-0 left-0 right-0 z-30 bg-opacity-90"
        >
          {/* Links del menú */}
          {modelConfigs
            .filter((model) => model.showInMenu)
            .map((model, index) => (
              <Link
                key={index}
                to={model.path}
                className="block hover:bg-blue-500 py-2 rounded transition"
                onClick={closeMenu} // Cierra el menú cuando se hace clic en un enlace
              >
                {model.name}
              </Link>
            ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
