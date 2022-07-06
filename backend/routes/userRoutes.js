const express = require("express");
const { registerUser, loginUser, updateProfile, deleteProfile } = require("../controllers/userControllers");
const { JWTService } = require("../middlewares/jwtMiddleware");
const jwtService = new JWTService();

const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser);
router.route('/profile/update').post(jwtService.jwtMiddleware,updateProfile);
router.route('/profile/delete').post(jwtService.jwtMiddleware,deleteProfile);





module.exports = router;