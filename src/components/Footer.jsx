const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base mb-4">© 2024. Todos los derechos reservados.</p>
        
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.linkedin.com/in/henry-steven-jaimes/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            LinkedIn
          </a>
          <a href="https://github.com/stevenjaimes" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            GitHub
          </a>
          <a href="https://www.facebook.com/profile.php?id=100084311945092&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            Facebook
          </a>
        </div>
        
        <div className="text-xs opacity-75">
          <p>Hecho por Henry Steeven Jaimes Bastos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
