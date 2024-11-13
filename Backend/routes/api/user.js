const router = require('express').Router();
const UserController = require('../../controllers/userController');
//const { uploadProfileImage } = require('../../middleware/multer'); // Importación correcta
//const auth = require('../../middleware/auth');

router.post('/login', UserController.login);

router.post('/create', UserController.create);
//router.put('/update/:user_id', uploadProfileImage.single('profileImage'), UserController.update);
//router.get('/list',  UserController.list);
//router.get('/detail',  UserController.detail);

module.exports = router;