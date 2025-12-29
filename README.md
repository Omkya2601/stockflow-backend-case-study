## API Endpoints

### Create Product
POST /api/products

Creates a product and initializes inventory for a warehouse.

### Low Stock Alerts
GET /api/companies/:companyId/alerts/low-stock

Returns low-stock alerts for products with recent sales activity.
