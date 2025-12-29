# StockFlow – Backend Case Study (Bynry)

## Candidate Details
- **Name:** Omkar Atmaram Jadhav  
- **Role Applied For:** Backend Engineering Intern  
- **Tech Stack:** Node.js, Express.js  
- **Submission Type:** Backend Case Study (GitHub Repository)

---

##  Case Study Overview

This repository contains my solution for the **Backend Engineering Intern case study** provided by **Bynry Inc**.

The case study is based on designing and implementing backend components for a **B2B Inventory Management System (StockFlow)**. The system allows companies to manage products across multiple warehouses, track inventory levels, and generate low-stock alerts with supplier information.

As instructed in the submission form, the complete solution is provided through this GitHub repository.

---

##  Part 1: Code Review & Debugging

### Problems Identified
- Missing input validation for required and optional fields
- SKU uniqueness not enforced at application or database level
- Price handled without considering decimal precision
- No database transaction management
- Risk of partial writes (product created but inventory fails)
- Product incorrectly tied to a single warehouse
- No error handling or meaningful responses

### Production Impact
- Duplicate SKUs across the platform
- Inconsistent or corrupt inventory data
- Pricing errors due to floating-point precision
- Data inconsistency if any database operation fails
- Poor reliability and difficult debugging

### Fix Strategy
- Validate request payload
- Enforce unique SKU constraints
- Use decimal-safe data types
- Wrap operations inside database transactions
- Handle errors and rollbacks properly

---

##  Part 2: Database Schema Design

### Core Tables
- `companies`
- `warehouses`
- `products`
- `inventory`
- `inventory_logs`
- `suppliers`
- `product_suppliers`
- `product_bundles`

### Key Relationships
- One company → many warehouses
- Products ↔ warehouses (many-to-many via inventory)
- Inventory changes tracked in inventory_logs
- Products linked to suppliers for reordering
- Bundles supported through product_bundles mapping

### Design Decisions
- SKU is globally unique
- Inventory quantities stored per warehouse
- Inventory history retained for auditing
- Normalized schema for scalability and clarity

### Missing Requirements / Questions
- Can a product have multiple suppliers?
- How is “recent sales activity” defined?
- Should bundled products have independent pricing?
- Inventory log retention policy?

---

##  Part 3: Low Stock Alerts API


## API Endpoints

### Create Product
POST /api/products

Creates a product and initializes inventory for a warehouse.

### Low Stock Alerts
GET /api/companies/:companyId/alerts/low-stock


### Business Rules Implemented
- Product-specific low-stock thresholds
- Alerts only for products with recent sales activity
- Handles multiple warehouses per company
- Includes supplier information for reordering
- Estimates days until stockout

### Sample Response
```json
{
  "alerts": [
    {
      "product_id": 123,
      "product_name": "Widget A",
      "sku": "WID-001",
      "warehouse_id": 456,
      "warehouse_name": "Main Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 12,
      "supplier": {
        "id": 789,
        "name": "Supplier Corp",
        "contact_email": "orders@supplier.com"
      }
    }
  ],
  "total_alerts": 1
}

Technology Stack

Node.js

Express.js

RESTful API Design

SQL-based relational database (assumed)

Git & GitHub for version control

 Notes

The original case study was provided as a Google Document.

Since the submission form required a GitHub repository, all explanations and solutions have been consolidated here.

Assumptions were made where requirements were incomplete and have been documented above.

 Conclusion

This submission demonstrates:

Backend engineering fundamentals

Thoughtful database design

API design aligned with business requirements

Ability to reason through incomplete specifications

Returns low-stock alerts for products with recent sales activity.
