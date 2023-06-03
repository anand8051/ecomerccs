const express = require('express');
const router = express.Router();
const multer = require('multer');

const verify = require('../verifytoken');
const veriy  = require("../admintoken")
const ProductsController = require('../controller/productc');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/');

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.imagetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// };


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    // fileFilter: fileFilter
});

router.get('/getcategories', verify,function(req, res) {
    ProductsController.getproducts(req, res);
  });


  
router.post('/addproduct',upload.single('productImage'),veriy, function(req, res) {
    ProductsController.saveproduct(req, res);
  });

  router.get('/getproduct', verify,function(req, res) {
    ProductsController.getproduc(req, res);
  });


module.exports = router;




