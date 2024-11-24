import { useState, useEffect } from "react";
import { getImagesFromDB, deleteImageFromDB } from "../config/indexedDBUtils"; // Asegúrate de importar la función deleteImageFromDB

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  // Estado para controlar la visibilidad del modal
  const [currentImage, setCurrentImage] = useState(null); // Estado para almacenar la imagen seleccionada

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storedImages = await getImagesFromDB();
        setImages(
          storedImages.map((record) => ({
            id: record.id,
            url: URL.createObjectURL(record.blob),
          }))
        );
      } catch (err) {
        console.error("Error al cargar imágenes de IndexedDB:", err);
      }
    };

    fetchImages();
  }, []);

  // Función para abrir el modal y mostrar la imagen
  const openModal = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  // Función para descargar la imagen
  const downloadImage = (image) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `image-${image.id}.jpg`; // Puedes ajustar el nombre del archivo
    link.click();
  };

  // Función para eliminar la imagen
  const handleDelete = async (imageId) => {
    try {
      await deleteImageFromDB(imageId);  // Elimina la imagen de IndexedDB
      setImages(images.filter((image) => image.id !== imageId)); // Actualiza el estado para reflejar el cambio
      closeModal();
    } catch (err) {
      console.error("Error al eliminar la imagen:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 z-8">
      {/* Condición para mostrar mensaje si no hay imágenes */}
      {images.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No se han generado imágenes aún.</div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((image) => (
            <div
              key={image.id}
              className="rounded overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
              onClick={() => openModal(image)}  // Abre el modal al hacer clic en la imagen
            >
              <img
                src={image.url}
                alt={`Imagen ${image.id}`}
                className="w-full h-56 object-cover rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
  
      {/* Modal de imagen */}
      {modalOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-3xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white font-bold bg-red-600 rounded-full py-2 px-4"
            >
              X
            </button>
            <img src={currentImage.url} alt="Imagen ampliada" className="w-full h-auto rounded-md" />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => downloadImage(currentImage)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Descargar
              </button>
              <button
                onClick={() => handleDelete(currentImage.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ImageGallery;
