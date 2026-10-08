<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Vendor Management System

A REST API backend built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/) for managing vendors and purchase orders and tracking vendor performance.

> **Status: work in progress.** The project does not compile or start in its current state. See [Known issues](#known-issues) below.

## Features

- **Vendors**: create, list, view, update and delete vendor profiles (name, contact details, address, unique vendor code).
- **Purchase orders**: create, list, view, update and delete purchase orders linked to a vendor (PO number, order/delivery/issue dates, items, quantity, status, optional quality rating and acknowledgment date).
- **Performance metrics**: each vendor stores an on-time delivery rate, average quality rating, average response time and fulfillment rate. A service method calculates these from the vendor's completed purchase orders, and an endpoint returns the stored values.

## Tech stack

- Node.js and TypeScript
- NestJS 10 (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`)
- TypeORM 0.3 (entities and repositories)
- Jest and Supertest for tests
- ESLint and Prettier

## Project structure

```
src/
  main.ts                      # Bootstrap; listens on port 3000
  app.module.ts                # Root module (Vendor, PurchaseOrder, Performance modules)
  app.controller.ts            # GET / -> "Hello World!"
  app.service.ts
  vendor/
    vendor.controller.ts       # /vendor routes
    vendor.service.ts
    dto/create-vendor.dto.ts
    entities/vendor.entity.ts
  purchase-order/
    purchase-order.controller.ts  # /purchase-order routes
    purchase-order.service.ts
    dto/create-purchase-order.dto.ts
    entities/purchase-order.entity.ts
  performance/
    performance.controller.ts  # /vendors/:vendorId/performance
    performance.service.ts
test/
  app.e2e-spec.ts              # e2e test for GET /
```

## API endpoints

The server listens on `http://localhost:3000`.

| Method | Path                               | Description                         |
| ------ | ---------------------------------- | ----------------------------------- |
| GET    | `/`                                | Returns `Hello World!`              |
| POST   | `/vendor`                          | Create a vendor                     |
| GET    | `/vendor`                          | List all vendors                    |
| GET    | `/vendor/:id`                      | Get a vendor by ID                  |
| PUT    | `/vendor/:id`                      | Update a vendor                     |
| DELETE | `/vendor/:id`                      | Delete a vendor                     |
| POST   | `/purchase-order`                  | Create a purchase order             |
| GET    | `/purchase-order`                  | List all purchase orders (with vendor) |
| GET    | `/purchase-order/:id`              | Get a purchase order by ID          |
| PUT    | `/purchase-order/:id`              | Update a purchase order             |
| DELETE | `/purchase-order/:id`              | Delete a purchase order             |
| GET    | `/vendors/:vendorId/performance`   | Get a vendor's stored performance metrics |

Example vendor body:

```json
{
  "name": "Acme Supplies",
  "contactDetails": "contact@example.com",
  "address": "123 Example Street",
  "vendorCode": "ACME001"
}
```

Example purchase order body:

```json
{
  "poNumber": "PO-0001",
  "vendorId": "<vendor uuid>",
  "orderDate": "2024-01-01",
  "deliveryDate": "2024-01-10",
  "items": [{ "name": "Widget" }],
  "quantity": 10,
  "status": "pending",
  "issueDate": "2024-01-01"
}
```

## Known issues

The code is incomplete and needs the following before it will build and run:

- `@nestjs/typeorm` and a database driver are not installed, and no `TypeOrmModule.forRoot(...)` database connection is configured.
- The services use `@InjectRepository(...)` without importing it, and the feature modules do not register their entities with `TypeOrmModule.forFeature(...)`.
- `app.module.ts` imports `VendorModule` twice.
- Repository calls such as `findOne(id)` use the pre-0.3 TypeORM signature; TypeORM 0.3 expects `findOneBy({ id })` or `findOne({ where: { id } })`.
- `PerformanceService.calculateMetrics` loads `vendor.purchaseOrders`, but the `Vendor` entity has no `purchaseOrders` relation, and no endpoint calls this method.

## Prerequisites

- Node.js (a version supported by NestJS 10) and npm

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run dev

# debug + watch mode
npm run start:debug

# production (after building)
npm run build
npm run start:prod
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Linting and formatting

```bash
npm run lint
npm run format
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
