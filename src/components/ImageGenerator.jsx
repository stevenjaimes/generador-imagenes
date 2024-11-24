import { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeDB, saveImageToDB } from "../config/indexedDBUtils";

/* eslint-disable react/prop-types */
const ImageGenerator = ({ modelUrl, name, timeout }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    initializeDB();
  }, []);
  


  useEffect(() => {
    let interval = null;

    if (isLoading && progress < 99) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 99));
      }, timeout);
    } else if (!isLoading) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isLoading, progress, timeout]);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    try {
      const response = await axios.post(
        modelUrl, // Usamos el modelo recibido por prop
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);


          // Guardar en IndexedDB
    const id = new Date().toISOString(); // Usa un identificador único
    await saveImageToDB(id, response.data);
    console.log("Imagen guardada en IndexedDB con ID:", id);


    } catch (err) {
      console.error('Error generando la imagen:', err);
      setError('Hubo un error al generar la imagen.');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center p-6">
      <main className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Generador de Imágenes de {name}
        </h1>
        <textarea
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu prompt aquí..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateImage}
          disabled={isLoading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Generando...' : 'Generar Imagen'}
        </button>

        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex flex-col items-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-blue-600 font-medium">Cargando: {progress}%</p>
            </div>
          )}
          {!isLoading && image && (
            <div className="w-full mt-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-2 text-center">
                Imagen Generada:
              </h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={image} alt="Imagen generada" className="w-full" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageGenerator;
