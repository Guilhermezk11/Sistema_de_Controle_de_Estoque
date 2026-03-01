import express from "express";
import { getDb } from "../db/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// RELATÓRIO BAIXO ESTOQUE (item 5.4)
router.get("/baixo-estoque", authMiddleware, async (req, res) => {

  const db = await getDb();

  const lista = await db.all(
    "SELECT * FROM produtos WHERE quantidade <= minimo"
  );

  res.json(lista);
});

export default router;