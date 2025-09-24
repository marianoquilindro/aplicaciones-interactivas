import { Router } from "express";
import { crearUsuario, listarUsuarios } from "../controllers/usuariosController";

const router = Router();

// POST /usuarios
router.post("/", crearUsuario);

// GET /usuarios
router.get("/", listarUsuarios);

export default router;
