// src/cloudinaryConfig.js
import { toast } from "react-toastify";

const cloudinaryConfig = {
  cloudName: 'daypzcyol',
  uploadPreset: 'urgi2y0c',
};

export const openCloudinaryWidget = (callback) => {
  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
      multiple: false, // Solo una imagen por curso
      folder: 'courses', // Alineado con el backend
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        callback({
          imageUrl: result.info.secure_url,
          imagePublicId: result.info.public_id,
        });
      }
      if (error) {
        console.error('Error uploading image:', error);
        toast.error('Error al subir la imagen. Inténtalo de nuevo.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  );
  cloudinaryWidget.open();
};




