import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageGenerator from './components/ImageGenerator';
import MainPage from './components/MainPage';
import ImageGallery from './components/ImageGallery';
import modelConfigs from './config/models.json';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/imagenes-creadas" element={<ImageGallery />} />
            {modelConfigs.map((model, index) => (
              
              <Route
                key={index}
                path={model.path}
                element={
                  <ImageGenerator
                    modelUrl={model.modelUrl}
                    name={model.name}
                    timeout={model.timeout}
                  />
                }
              />
            ))}
            <Route path="/" element={<MainPage />} />
            {/* Nueva ruta para la galería de imágenes */}
            
            <Route
              path="*"
              element={<h2>Ruta no encontrada. Por favor, selecciona un generador de imágenes válido.</h2>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
