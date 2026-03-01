import express from "express";

import authRoutes from "./routes/authRoutes.js";
import produtosRoutes from "./routes/produtosRoutes.js";
import movimentacaoRoutes from "./routes/movimentacaoRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/produtos", produtosRoutes);
app.use("/movimentacoes", movimentacaoRoutes);
app.use("/relatorios", relatorioRoutes);

export default app;