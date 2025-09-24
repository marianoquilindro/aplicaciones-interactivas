import { Router } from "express";
import { crearEquipo, listarEquipos } from "../controllers/equiposController";

const router = Router();

router.post("/", crearEquipo);
router.get("/", listarEquipos);

export default router;
