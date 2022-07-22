const express = require("express");
const { getMovies, createMovie, editMovie, deleteMovie } = require("../controllers/movieController");
const { JWTService } = require("../middlewares/jwtMiddleware");
const jwtService = new JWTService();

const router = express.Router();

router.route('/').get(jwtService.jwtMiddleware,getMovies);
router.route('/create').post(jwtService.jwtMiddleware,createMovie);
router.route('/edit').post(jwtService.jwtMiddleware,editMovie);
router.route('/delete').post(jwtService.jwtMiddleware,deleteMovie);

module.exports = router;