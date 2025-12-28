import express from "express";
import upload from "../utils/multerUploader.js";
import { createProduct } from "../controllers/products.controllers.js";


const router = express.Router();


// router.get("/products", readAllProducts);

router.post("/product",upload.single("imageFile"), createProduct );

// router.put("/product/:id", updateProduct);
// router.delete("/product/:id", deleteProduct);
export default router;

