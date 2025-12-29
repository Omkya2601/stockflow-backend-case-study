const express = require("express");
const router = express.Router();
const { getRecentSales } = require("../utils/sales.helper");

// Mock database (same as product.routes)
let inventory = [];
let products = [];
let warehouses = [
  { id: 1, name: "Main Warehouse" }
];
let suppliers = [
  { id: 1, name: "Supplier Corp", contact_email: "orders@supplier.com" }
];

// GET /api/companies/:companyId/alerts/low-stock
router.get("/api/companies/:companyId/alerts/low-stock", async (req, res) => {
  const alerts = [];

  for (const inv of inventory) {
    const product = products.find(p => p.id === inv.product_id);
    if (!product) continue;

    const recentSales = await getRecentSales(product.id);
    if (!recentSales) continue;

    const threshold = 20; // simple example threshold
    if (inv.quantity >= threshold) continue;

    const avgDailySales = recentSales / 30;
    const days_until_stockout = Math.floor(inv.quantity / avgDailySales);

    alerts.push({
      product_id: product.id,
      product_name: product.name,
      sku: product.sku,
      warehouse_id: inv.warehouse_id,
      warehouse_name: warehouses.find(w => w.id === inv.warehouse_id)?.name,
      current_stock: inv.quantity,
      threshold,
      days_until_stockout,
      supplier: suppliers[0]
    });
  }

  res.json({
    alerts,
    total_alerts: alerts.length
  });
});

module.exports = router;
