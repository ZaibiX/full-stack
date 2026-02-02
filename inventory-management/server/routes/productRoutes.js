import express from "express";
import upload from "../utils/multerUploader.js";
import { createProduct, readAllProducts, updateProduct, deleteProduct,readSingleProduct} from "../controllers/products.controllers.js";
import protectRoutes from "../middleware/protectRoutes.js";
import allowedRoles from "../middleware/allowedRoles.js";

const router = express.Router();

router.get("/single-product/:id", protectRoutes, allowedRoles(["Admin", "Store-manager"]),readSingleProduct);

router.get("/products", protectRoutes, allowedRoles(["Admin", "Store-manager","Employee"]),readAllProducts);

router.post("/product",upload.single("imageFile"), protectRoutes, allowedRoles(["Admin", "Store-manager"]),createProduct );

router.put("/product/:id",upload.single("imageFile") ,protectRoutes, allowedRoles(["Admin", "Store-manager"]),updateProduct);

router.delete("/product/:id",protectRoutes, allowedRoles(["Admin", "Store-manager"]), deleteProduct);


export default router;

