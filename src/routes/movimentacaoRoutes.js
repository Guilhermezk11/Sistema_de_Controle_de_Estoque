import express from "express";
import { getDb } from "../db/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);


// ENTRADA
router.post("/entrada", async (req, res) => {

  const { produto_id, quantidade } = req.body;

  const db = await getDb();

  const p = await db.get("SELECT * FROM produtos WHERE id=?", [produto_id]);

  const nova = p.quantidade + quantidade;

  await db.run("UPDATE produtos SET quantidade=? WHERE id=?", [nova, produto_id]);

  await db.run(
    "INSERT INTO movimentacoes VALUES (NULL, ?, 'entrada', ?, datetime('now'), ?)",
    [produto_id, quantidade, req.user.id]
  );

  res.json({ mensagem: "Entrada OK" });
});


// SAIDA
router.post("/saida", async (req, res) => {

  const { produto_id, quantidade } = req.body;

  const db = await getDb();

  const p = await db.get("SELECT * FROM produtos WHERE id=?", [produto_id]);

  if (p.quantidade < quantidade)
    return res.status(400).json({ erro: "Estoque insuficiente" });

  const nova = p.quantidade - quantidade;

  await db.run("UPDATE produtos SET quantidade=? WHERE id=?", [nova, produto_id]);

  await db.run(
    "INSERT INTO movimentacoes VALUES (NULL, ?, 'saida', ?, datetime('now'), ?)",
    [produto_id, quantidade, req.user.id]
  );

  res.json({ mensagem: "Saída OK" });
});


// LISTAR
router.get("/", async (req, res) => {
  const db = await getDb();
  const lista = await db.all("SELECT * FROM movimentacoes");
  res.json(lista);
});

export default router;