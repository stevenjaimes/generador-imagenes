import { Link } from 'react-router-dom';
import modelConfigs from '../config/models.json';  
import ImageGallery from './ImageGallery';

const MainPage = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-6 py-12">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Selecciona un generador de imágenes</h2>
          <p className="text-lg font-medium text-gray-700 mb-4">
            Elige uno de los generadores de imágenes disponibles y empieza a crear arte digital.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {modelConfigs
              .filter((model) => model.showInMenu) // Solo los modelos con showInMenu como true
              .map((model, index) => (
                <span key={index} className="text-center">
                  <Link
                    to={model.path}
                    className="inline-block text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
                  >
                    {model.name}
                  </Link>
                  {index < modelConfigs.filter((model) => model.showInMenu).length - 1 && (
                    <span className="mx-2 text-gray-500">|</span>
                  )}
                </span>
              ))}
          </div>
        </div>
  
        {/* Galería de imágenes generadas */}
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto mt-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-6">Imágenes Generadas</h3>
          <ImageGallery />  {/* Aquí se inserta la galería de imágenes */}
        </div>
      </div>
    );
  };
  
  export default MainPage;