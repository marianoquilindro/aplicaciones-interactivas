import { Router } from "express";
import {
  crearTarea,
  getTareas,
  getTareaDetalle,
  cambiarEstadoTarea,
  borrarTarea,
  editarTarea,
} from "../controllers/tareasController";


const router = Router();

router.post("/", crearTarea);
router.get("/", getTareas);
router.get("/", getTareaDetalle);
router.put("/:id", editarTarea);
router.patch("/:id/estado", cambiarEstadoTarea);
router.delete("/:id", borrarTarea);

export default router;
