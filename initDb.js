import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

const db = new sqlite3.Database("./estoque.db");

db.serialize(async () => {

  // ===== USUARIOS =====
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT UNIQUE,
      senha TEXT
    )
  `);

  // ===== PRODUTOS =====
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      quantidade INTEGER,
      minimo INTEGER
    )
  `);

  // ===== MOVIMENTACOES =====
  db.run(`
    CREATE TABLE IF NOT EXISTS movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER,
      tipo TEXT,
      quantidade INTEGER,
      data_hora TEXT,
      usuario_id INTEGER
    )
  `);

  const hash = await bcrypt.hash("123", 10);

  db.run(
    "INSERT OR IGNORE INTO usuarios (usuario, senha) VALUES (?, ?)",
    ["admin", hash]
  );

  console.log("Banco criado!");
});