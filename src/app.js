const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const productRoutes = require("./routes/product.routes");
const alertRoutes = require("./routes/alert.routes");

app.use(productRoutes);
app.use(alertRoutes);

module.exports = app;
