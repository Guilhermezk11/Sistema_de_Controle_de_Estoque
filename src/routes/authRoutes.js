import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDb } from "../db/database.js";
import { SECRET } from "../config/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {

  const { usuario, senha } = req.body;

  const db = await getDb();

  const user = await db.get(
    "SELECT * FROM usuarios WHERE usuario = ?",
    [usuario]
  );

  if (!user)
    return res.status(401).json({ erro: "Usuário não encontrado" });

  const ok = await bcrypt.compare(senha, user.senha);

  if (!ok)
    return res.status(401).json({ erro: "Senha inválida" });

  const token = jwt.sign(
    { id: user.id, usuario: user.usuario },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;