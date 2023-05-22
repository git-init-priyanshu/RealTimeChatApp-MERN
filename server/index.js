// Connecting to mongodb
const connectToMongoDB = require("./mongodb");
connectToMongoDB();

const express = require("express");
const app = express();
const port = 5000;

// To access req.body
app.use(express.json());

// Fixing CORS issues
const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:5173" }));

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports = { app };
