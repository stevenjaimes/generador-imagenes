export const initializeDB = () => {
    const request = indexedDB.open("ImageDatabase", 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id" });
      }
    };
  };
  
  export const saveImageToDB = (id, blob) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ImageDatabase", 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
  
        store.put({ id, blob });
  
        transaction.oncomplete = () => resolve();
        transaction.onerror = (err) => reject(err);
      };
  
      request.onerror = (err) => reject(err);
    });
  };
  
  export const getImagesFromDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ImageDatabase", 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("images", "readonly");
        const store = transaction.objectStore("images");
  
        const allRecords = store.getAll();
        allRecords.onsuccess = () => resolve(allRecords.result);
        allRecords.onerror = (err) => reject(err);
      };
  
      request.onerror = (err) => reject(err);
    });
  };

  export const deleteImageFromDB = (id) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ImageDatabase", 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
  
        const deleteRequest = store.delete(id); // Elimina la imagen por su ID
  
        deleteRequest.onsuccess = () => {
          resolve();
        };
  
        deleteRequest.onerror = () => {
          reject("Error al eliminar la imagen de la base de datos");
        };
      };
  
      request.onerror = () => reject("Error al abrir IndexedDB");
    });
  };
  