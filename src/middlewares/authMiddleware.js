import jwt from "jsonwebtoken";
import { SECRET } from "../config/auth.js";

export function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ erro: "Token não enviado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}