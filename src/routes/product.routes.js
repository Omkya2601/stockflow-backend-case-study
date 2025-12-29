const express = require("express");
const router = express.Router();

// Mock database
let products = [];
let inventory = [];

// POST /api/products
router.post("/api/products", (req, res) => {
  const { name, sku, price, warehouse_id, initial_quantity = 0 } = req.body;

  if (!name || !sku || !price || !warehouse_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check SKU uniqueness
  if (products.find(p => p.sku === sku)) {
    return res.status(409).json({ error: "SKU already exists" });
  }

  const product_id = products.length + 1;
  const product = { id: product_id, name, sku, price };
  products.push(product);

  const inventory_id = inventory.length + 1;
  inventory.push({
    id: inventory_id,
    product_id,
    warehouse_id,
    quantity: initial_quantity
  });

  res.status(201).json({
    message: "Product created",
    product_id
  });
});

module.exports = router;
