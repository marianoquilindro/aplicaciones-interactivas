import { Router } from "express";
import { crearEtiqueta, listarEtiquetas } from "../controllers/etiquetasController";

const router = Router();

router.post("/", crearEtiqueta);
router.get("/", listarEtiquetas);

export default router;
