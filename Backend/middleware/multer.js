const multer = require('multer');
const path = require('path');
const idGenerate = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

// Configuración de almacenamiento para imágenes de perfil
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/'); // Directorio específico para imágenes de perfil
    },
    filename: (req, file, cb) => {
        cb(null, idGenerate() + path.extname(file.originalname)); // Nombre único para evitar sobrescrituras
    }
});

const uploadProfileImage = multer({ storage: profileStorage });

module.exports = {
    uploadProfileImage
};
