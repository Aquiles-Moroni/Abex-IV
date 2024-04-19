import { Router } from "express";
import {
  roducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  getTotalnoticias,
  updateProductById,
} from "../controllers/noticias.controller.js";

const router = Router();

router.get("/noticias", getNoticias);

router.post("/noticias", createNewProduct);

router.get("/noticias/count", getTotalnoticias);

router.get("/noticias/:id", getProductById);

router.delete("/noticias/:id", deleteProductById);

router.put("/noticias/:id", updateProductById);

export default router;
