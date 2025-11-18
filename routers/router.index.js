import { Router } from "express";

import create from "../controllers/controller.create.js";

import productValidator from "../middlewares/middleware.validate.product.js";
import categoryValidator from "../middlewares/middleware.validate.category.js";
import brandValidator from "../middlewares/middleware.validate.brand.js";

import getAll from "../controllers/controller.getAll.js";
import getById from "../controllers/controller.getById.js";
import Delete from "../controllers/controller.delete.js";

import isAdmin from "../middlewares/middleware.IsAdmin.js";
import authToken from "../middlewares/middleware.hasToken.js";
import ownerOrAdmin from "../middlewares/middleware.ownerOrAdmin.js";

import productUpdate from "../controllers/controller.update.product.js";
import productUpdateValidator from "../middlewares/middleware.update.product.validator.js";

import productUpdatePrice from "../controllers/product/controller.product.update.price.js";
import productUpdateStock from "../controllers/product/controller.product.update.stock.js";
import updateProductSale from "../controllers/product/controller.product.update.sale.js";

import productUpdatePriceValidator from "../middlewares/middleware.product.update.validator.price.js";
import productUpdateStockValidator from "../middlewares/middleware.product.update.validator.stock.js";
import updateProductSaleValidator from "../middlewares/middleware.product.update.validator.sale.js";

function ROUTER_MODULE() {
  const router = Router();

  router.post("/product", productValidator, create("product"));
  router.get("/product", authToken, isAdmin, getAll("product"));
  router.get("/product/:id", authToken, getById("product"));
  router.delete("/product/:id", authToken, ownerOrAdmin, Delete("product"));

  router.post("/category", categoryValidator, create("category"));
  router.get("/category", getAll("category"));
  router.get("/category/:id", authToken, isAdmin, getById("category"));
  router.delete("/category/:id", authToken, isAdmin, Delete("category"));
  
  router.post("/brand", brandValidator, create("brand"));
  router.get("/brand",getAll("brand"));
  router.get("/brand/:id", authToken, isAdmin, getById("brand"));
  router.delete("/brand/:id", authToken, isAdmin, Delete("brand"));

  router.patch("/product/:id", authToken, ownerOrAdmin, productUpdateValidator, productUpdate);
  router.patch("/product/:id/update-price", authToken, ownerOrAdmin, productUpdatePriceValidator, productUpdatePrice);
  router.patch("/product/:id/update-stock", authToken, ownerOrAdmin, productUpdateStockValidator, productUpdateStock);
  router.patch("/product/:id/update-sale", authToken, ownerOrAdmin, updateProductSaleValidator, updateProductSale);

  return router;
}

export default ROUTER_MODULE;
