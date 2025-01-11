const express = require('express');
const multer = require('multer');
const propertyController = require('../controller/propertyController');
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

router.post('/addProperty', upload.array('images', 10),authMiddleware.authUser, propertyController.addProperty); // Limit 10 images
router.post('/deleteProperty', authMiddleware.authUser,propertyController.getdeleteProperty);
router.get('/getAllProperties', propertyController.getAllProperties);
module.exports = router;






// module.exports = router;