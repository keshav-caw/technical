const express = require("express");
const dotenv = require("dotenv");

const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/users',userRoutes);
app.use('/movies',movieRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`running on port: ${PORT}`));