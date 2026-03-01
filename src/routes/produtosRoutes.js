import express from "express";
import { getDb } from "../db/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);


// CRIAR
router.post("/", async (req, res) => {
  const { nome, quantidade, minimo } = req.body;

  const db = await getDb();

  await db.run(
    "INSERT INTO produtos (nome, quantidade, minimo) VALUES (?, ?, ?)",
    [nome, quantidade, minimo]
  );

  res.json({ mensagem: "Produto criado" });
});


// LISTAR
router.get("/", async (req, res) => {
  const db = await getDb();
  const lista = await db.all("SELECT * FROM produtos");
  res.json(lista);
});


// ATUALIZAR
router.patch("/:id", async (req, res) => {
  const { nome, minimo } = req.body;

  const db = await getDb();

  await db.run(
    "UPDATE produtos SET nome = ?, minimo = ? WHERE id = ?",
    [nome, minimo, req.params.id]
  );

  res.json({ mensagem: "Atualizado" });
});


// DELETAR
router.delete("/:id", async (req, res) => {
  const db = await getDb();
  await db.run("DELETE FROM produtos WHERE id = ?", [req.params.id]);
  res.json({ mensagem: "Deletado" });
});

export default router;