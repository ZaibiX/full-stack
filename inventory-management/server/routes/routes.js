import express from "express";

const router = express.Router();


router.get("/products", readAllProducts);

router.post("/product", createProduct);

router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

