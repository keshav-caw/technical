const express = require("express");
const { getImages, uploadImage } = require("../controllers/galleryController");
const { JWTService } = require("../middlewares/jwtMiddleware");
const jwtService = new JWTService();

const router = express.Router();

router.route('/').get(getImages);
router.route('/').post(uploadImage);





module.exports = router;