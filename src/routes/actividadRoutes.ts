import { Router } from "express";
import { listarActividad } from "../controllers/actividadController";

const router = Router();

router.get("/", listarActividad);

export default router;
