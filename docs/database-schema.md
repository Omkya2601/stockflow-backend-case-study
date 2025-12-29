# Database Schema Design – StockFlow

## Overview
This document describes the proposed database schema for the StockFlow B2B Inventory Management System.
The design supports multiple companies, warehouses, products, inventory tracking, suppliers, and bundled products.

---

## Tables and Relationships

### 1. companies
Stores company-level information.

**Columns:**
- id (PK)
- name
- created_at

**Notes:**
- A company can own multiple warehouses.

---

### 2. warehouses
Represents physical storage locations.

**Columns:**
- id (PK)
- company_id (FK → companies.id)
- name
- location

**Notes:**
- Each warehouse belongs to a single company.

---

### 3. products
Stores product master data.

**Columns:**
- id (PK)
- name
- sku (UNIQUE)
- price (DECIMAL)
- product_type
- created_at

**Notes:**
- SKU is globally unique across the platform.
- Products are not directly tied to a warehouse.

---

### 4. inventory
Maps products to warehouses with quantities.

**Columns:**
- id (PK)
- product_id (FK → products.id)
- warehouse_id (FK → warehouses.id)
- quantity

**Notes:**
- Enables products to exist in multiple warehouses.
- Unique constraint on (product_id, warehouse_id).

---

### 5. inventory_logs
Tracks inventory changes over time.

**Columns:**
- id (PK)
- inventory_id (FK → inventory.id)
- change_type (IN / OUT / ADJUSTMENT)
- quantity_changed
- created_at

**Notes:**
- Used for audit history and stock trend analysis.

---

### 6. suppliers
Stores supplier information.

**Columns:**
- id (PK)
- name
- contact_email
- phone

---

### 7. product_suppliers
Maps products to suppliers.

**Columns:**
- product_id (FK → products.id)
- supplier_id (FK → suppliers.id)

**Notes:**
- Supports multiple suppliers per product if needed.

---

### 8. product_bundles
Defines bundled products.

**Columns:**
- bundle_product_id (FK → products.id)
- child_product_id (FK → products.id)
- quantity

**Notes:**
- Allows products to be composed of other products.

---

## Design Considerations
- Normalized schema for scalability
- Inventory separated from products to support multi-warehouse storage
- Logs retained for traceability and analytics
- Flexible supplier and bundle relationships

---

## Open Questions / Assumptions
- Definition of “recent sales activity”
- Inventory log retention period
- Whether bundled products have independent pricing
- Supplier priority for reordering
