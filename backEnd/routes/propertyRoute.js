const express = require('express');
const multer = require('multer');
const propertyController = require('../controller/propertyController');
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router();


const upload = multer({ dest: 'uploads/' }); // Use with .any()
router.post('/addProperty', upload.any(), authMiddleware.authUser, propertyController.addProperty);
router.post('/deleteProperty', authMiddleware.authUser,propertyController.getdeleteProperty);
router.get('/getAllProperties', propertyController.getAllProperties);
router.get('/myProperties',authMiddleware.authUser,propertyController.getMyProperties);
module.exports = router;






