require("dotenv").config();

// Async errors
require("express-async-errors");

const express = require("express");
const app = express();

// DB setup
const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

// Errors
const notFound = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products Route</a>`);
});

// Products route
app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorMiddleware);

// PORT
const port = process.env.PORT || 3000;

// Start function
const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
